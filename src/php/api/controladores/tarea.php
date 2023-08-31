<?php
/**
	Controlador de tareas.
**/
require_once('./daos/daotarea.php');

class Tarea{
	public static $email_aviso = false;

	/**
		Devuelve la lista de tareas.
		Si recibe el parámetro con el valor 'alumno', devuelve la lista de tareas del alumno.
		No está permitido que un alumno consulte las tareas de otro alumno. Un profesor solo puede consultar las tareas de sus alumnos.
		@param $pathParams {Array} Array de parámetros.
		@param $queryParams {Array} Array de parámetros. Array con el identificador del alumno.
		@param $usuario {Usuario} Usuario que realiza la petición.
		@return {Array[Tarea]}
	**/
	function get($pathParams, $queryParams, $usuario){
		switch(count($pathParams)){
			case 1:
				if ($pathParams[0] == 'alumno'){
			 		if (!array_key_exists('id', $queryParams)){
						header('HTTP/1.1 403 Forbidden');
						die();
					}
					if ($usuario->rol == 'profesor')
						$resultado = DAOTarea::verTareasDeAlumnoComoProfesor($queryParams['id'], $usuario->id);
					if ($usuario->rol == 'alumno')
						$resultado = DAOTarea::verTareasDeAlumno($usuario->id);
				}
				elseif (is_numeric($pathParams[0]))
					if ($usuario->rol == 'alumno')
						$resultado = DAOTarea::verTareaDeAlumno($pathParams[0], $usuario->id);
					else 
						$resultado = DAOTarea::verTareaDeAlumnoComoProfesor($pathParams[0], $usuario->id);
				else{
					header('HTTP/1.1 422 Unprocesable entity');
					die();
				}
				break;
			default:
				die("No implementado.");
		}
		//Adaptación del Resultado
		//El resultado tiene una fila por tarea, actividad módulo. Debemos agruparlo.
		if (count($resultado) > 0)
			$resultado = $this->agrupar($resultado);
		$json = json_encode($resultado);
		header('Content-type: application/json; charset=utf-8');
		header('HTTP/1.1 200 OK');
		echo $json;
		die();
	}
	/**
		Inserta una nueva tarea en la base de datos
		@param $pathParams {Array} Array de parámetros.
		@param $queryParams {Array} Array de parámetros.
		@param $tarea {Tarea} Datos de la tarea a insertar.
		@param $usuario {Usuario} Usuario que realiza la petición.
	**/
	function post($pathParams, $queryParams, $tarea, $usuario){
		//Control de valores nulos
		if ($tarea->idCalificacionEmpresa === "null")
			$tarea->idCalificacionEmpresa = null;

    	$id = DAOTarea::insertar($tarea, $usuario);
    	//Respuesta a un POST
    	header('HTTP/1.1 201 Created');
    	$localizacion = '/tarea/'.$id; //Localización del nuevo recurso
    	echo $localizacion;
    	die();
  	}
	/**
		Actualiza una tarea en la base de datos
		@param $pathParams {Array} Array de parámetros.
		@param $queryParams {Array} Array de parámetros.
		@param $tarea {Tarea} Datos de la tarea a actualizar.
		@param $usuario {Usuario} Usuario que realiza la petición.
	**/
	function put($pathParams, $queryParams, $tarea, $usuario){
		//Control de valores nulos
		if ($tarea->idCalificacionEmpresa === "null")
			$tarea->idCalificacionEmpresa = null;
		for ($i = 0; $i < count($tarea->evaluaciones); $i++)
			if ($tarea->evaluaciones[$i]->calificacion === "")
				$tarea->evaluaciones[$i]->calificacion = null;

    	$id = DAOTarea::modificar($tarea, $usuario);

		if (self::$email_aviso){
			//Preparamos el mensaje para el alumno
			$alumno = DAOTarea::verAlumnoDeTarea($tarea->id)[0];
			$mensaje = [];
			$mensaje['para'] = $alumno['email'];
			$mensaje['titulo'] = '[DUALEX] Se ha actualizado la tarea '.$tarea->titulo;
			$mensaje['cuerpo'] = $usuario->nombre.' '.$usuario->apellidos.' ha actualizado la tarea: '.$tarea->titulo.'.';
			$cabeceras = "From: dualex@fundacionloyola.net";

			mail ($mensaje['para'], $mensaje['titulo'], $mensaje['cuerpo'], $cabeceras);
		}

    	//Respuesta a un PUT
    	header('HTTP/1.1 200 Ok');
    	die();
  	}
	/**
		Elimina una tarea de la base de datos
		@param $pathParams {Array} Array de parámetros. Lleva el identificador de la tarea a borrar.
		@param $queryParams {Array} Array de parámetros.
		@param $usuario {Usuario} Usuario que realiza la petición.
	**/
	function delete($pathParams, $queryParams, $usuario){
    	$id = DAOTarea::borrar($pathParams[0], $usuario);
    	//Respuesta a un DELETE
    	header('HTTP/1.1 200 Ok');
    	die();
  	}
	/**
		Procesa un array de tareas x modulos para crear arrays de módulos.
		@params $tareas {[Tareas]} Array de tareas con una fila por módulo de la tarea y otra por actividad.
		@return {[Tareas]} Array de tareas con un campo de array que agrupa todos sus módulos y actividades.
	**/
	function agruparPorModulos($tareas){
		if (count($tareas) == 0) return [];
		
		$resultado = [];

		for($i = 0; $i < count($tareas); $i++){
			//Vemos si la tarea ya está en los resultados
			for ($j = 0; $j < count($resultado); $j++)
				if ($resultado[$j]['id'] == $tareas[$i]['id'])
					break;
			if ($j == count($resultado)){	//La tarea no está en el resultado
				$tareas[$i]['modulos'] = [];
				$tareas[$i]['actividades'] = [];
				array_push($resultado, $tareas[$i]);
			}

			//Vemos si el módulo ya está en el resultado
			for($k = 0; $k < count($resultado[$j]['modulos']); $k++)
				if ($resultado[$j]['modulos'][$k]['id'] == $tareas[$i]['id_modulo'])
					break;
			if ($k == count($resultado[$j]['modulos']))	//El módulo no está en los resultados
				array_push($resultado[$j]['modulos'], $this->verModulo($tareas[$i]));
		}
		return $resultado;
	}
	/**
		Procesa un array de tareas x módulo, actividades e imágenes para crear arrays de módulos y actividades.
		@params $tareas {[Tareas]} Array de tareas con una fila por módulo de la tarea y otra por actividad.
		@return {[Tareas]} Array de tareas con un campo de array que agrupa todos sus módulos y actividades.
	**/
	function agrupar($tareas){
		if (count($tareas) == 0) return [];
		$resultado = [];

		for($i = 0; $i < count($tareas); $i++){
			//Vemos si la tarea ya está en los resultados
			for ($j = 0; $j < count($resultado); $j++)
				if ($resultado[$j]['id'] == $tareas[$i]['id'])
					break;
			if ($j == count($resultado)){	//La tarea no está en el resultado
				$tareas[$i]['modulos'] = [];
				$tareas[$i]['actividades'] = [];
				$tareas[$i]['imagenes'] = [];
				array_push($resultado, $tareas[$i]);
			}

			//Vemos si el módulo ya está en el resultado
			for($k = 0; $k < count($resultado[$j]['modulos']); $k++)
				if ($resultado[$j]['modulos'][$k]['id'] == $tareas[$i]['id_modulo'])
					break;
			if ($k == count($resultado[$j]['modulos']))	//El módulo no está en los resultados
				array_push($resultado[$j]['modulos'], $this->verModulo($tareas[$i]));
			
			//Vemos si la actividad ya está en el resultado
			for($k = 0; $k < count($resultado[$j]['actividades']); $k++)
				if ($resultado[$j]['actividades'] == $tareas[$i]['id_actividad'])
					break;
			if ($k == count($resultado[$j]['actividades']))	//La actividad no está en los resultados
				array_push($resultado[$j]['actividades'], $this->verActividad($tareas[$i]));

			//Vemos si la actividad ya está en el resultado
			if (array_key_exists('id_imagen', $tareas[$i])) { 	//Al seleccionar la lista de tareas, no traemos las imágenes
				for($k = 0; $k < count($resultado[$j]['imagenes']); $k++)
					if ($resultado[$j]['imagenes'][$k]['id'] == $tareas[$i]['id_imagen'])
						break;
				if ($k == count($resultado[$j]['imagenes']))	//La imagen no está en los resultados
					if ($tareas[$i]['id_imagen'])
						array_push($resultado[$j]['imagenes'], array('id' => $tareas[$i]['id_imagen'], 'imagen' => $tareas[$i]['imagen']));
			}
		}
		//Quitamos los elementos que sobran
		for($i = 0; $i < count($resultado); $i++)
			unset($resultado[$i]['imagen'], $resultado[$i]['id_imagen'], $resultado[$i]['id_actividad'], $resultado[$i]['actividad_titulo'], $resultado[$i]['actividad_descripcion'], $resultado[$i]['id_modulo'],$resultado[$i]['codigo'],$resultado[$i]['modulo_titulo'], $resultado[$i]['color_fondo'], $resultado[$i]['color_letra'],$resultado[$i]['modulo_calificacion'], $resultado[$i]['modulo_evaluacion'], $resultado[$i]['imagen']);
		return $resultado;
	}
	/**
		Devuelve el módulo de un elemento.
		@param $elemento {Elemento} Elemento con información de módulo.
		@return {Modulo} Módulo del elemento.
	**/
	function verModulo($elemento){
		$modulo = [];
		$modulo['id'] = $elemento['id_modulo'];
		$modulo['codigo'] = $elemento['codigo'];
		$modulo['titulo'] = $elemento['modulo_titulo'];
		$modulo['calificacion'] = $elemento['modulo_calificacion'];
		$modulo['evaluacion'] = $elemento['modulo_evaluacion'];
		$modulo['color_fondo'] = $elemento['color_fondo'];
		$modulo['color_letra'] = $elemento['color_letra'];
		return $modulo;
	}
	/**
		Devuelve la actividad de un elemento.
		@param $elemento {Elemento} Elemento con información de tarea.
		@return {Actividad} Actividad del elemento.
	**/
	function verActividad($elemento){
		$actividad = [];
		$actividad['id'] = $elemento['id_actividad'];
		$actividad['titulo'] = $elemento['actividad_titulo'];
		$actividad['descripcion'] = $elemento['actividad_descripcion'];
		return $actividad;
	}
}
