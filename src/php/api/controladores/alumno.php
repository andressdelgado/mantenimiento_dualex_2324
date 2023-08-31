<?php
/**
	Controlador de alumnos.
**/
require_once('./daos/daoalumno.php');

class Alumno{
	/**
		Devuelve la lista de alumnos.
		Si recibe un parámetro con el valor 'profesor', devuelve la lista de alumnos que cursan módulos impartidos por el profesor y que tienen tareas registradas.
		@param $pathParams {Array} Array de parámetros.
		@param $queryParams {Array} No utilizado
		@param $usuario {Usuario} Profesor del que se quieren conocer los alumnos.
		@return {Array[Usuario]}
	**/
	function get($pathParams, $queryParams, $usuario){
	switch(count($pathParams)){
		case 1:
			if ($pathParams[0] == 'profesor'){
				if ($usuario->rol != 'profesor'){
							header('HTTP/1.1 401 Unauthorized');
							die();
				}
				$resultado = DAOAlumno::verAlumnosPorProfesor($usuario->id);
			}
			else{
				$id = $pathParams[0];
				die("No implementado.");
			}
			break;
		default:
			die("No implementado.");
	}
		//Adaptación del Resultado
		$json = json_encode($resultado);
		header('Content-type: application/json; charset=utf-8');
		header('HTTP/1.1 200 OK');
		echo $json;
		die();
	}
	/**
		Procesa un array de alumnos x módulo para unificar los módulos en un array.
		Espera que en el array los elementos del mismo módulo sean contiguos.
		@param $alumnos {[Alumnos]} Array de alumnos con una fila por módulo del alumno.
		@return {[Alumno]} Array de alumnos con un campo de array que agrupa todos sus módulos.
	**/
	function agruparModulos($alumnos){
		if (count($alumnos) == 0) return [];
		
		$resultado = [];
		$alumnos[0]['modulos'] = [$this->verModuloAlumno($alumnos[0])];
		array_push($resultado, $alumnos[0]);
		for($i = 1; $i < count($alumnos); $i++){
			//Si es igual que el actual, añadimos el módulo al alumno actual
			if ($alumnos[$i]['id'] == $resultado[count($resultado) - 1]['id'])
				array_push($resultado[count($resultado) -1]['modulos'], $this->verModuloAlumno($alumnos[$i]));
			else{
				$alumnos[$i]['modulos'] = [$this->verModuloAlumno($alumnos[$i])];
				array_push($resultado, $alumnos[$i]);
			}
		}
		return $resultado;
	}
	/**
		Devuelve el módulo de un alumno.
		@param $alumno {Alumno} Alumno con información de módulo.
		@return {Modulo} Módulo del alumno.
	**/
	function verModuloAlumno($alumno){
		$modulo = [];
		$modulo['codigo'] = $alumno['codigo'];
		$modulo['titulo'] = $alumno['titulo'];
		$modulo['color_fondo'] = $alumno['color_fondo'];
		$modulo['color_letra'] = $alumno['color_letra'];
		$modulo['icono'] = $alumno['icono'];
		return $modulo;
	}
}
