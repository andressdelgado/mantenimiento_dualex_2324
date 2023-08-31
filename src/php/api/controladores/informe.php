<?php
/**
	Controlador de informes.
**/
require_once('./daos/daoinforme.php');

class Informe{
	/**
		Devuelve los datos del informe de evaluación de un alumno.
		Solo los profesores que tienen asignado al alumno a uno de sus módulos pueden consultar el informe de evaluación.
		@param $pathParams {Array} Array de parámetros.
		@param $queryParams {Array} Array de parámetros. Array con el identificador del alumno y el identificador del periodo.
		@param $usuario {Usuario} Usuario que realiza la petición.
		@return {Array} Datos del informe
	**/
	function get($pathParams, $queryParams, $usuario){
		if ($usuario->rol != 'profesor'){
      		header('HTTP/1.1 401 Unauthorized');
			die();
		}
		$resultado = [];
		$resultado['valoracion'] = DAOInforme::verValoracion($queryParams['id_alumno'], $queryParams['id_periodo'], $usuario->id);
		$resultado['modulos'] = DAOInforme::verModulos($queryParams['id_alumno'], $queryParams['id_periodo'], $usuario->id);

		//$resultado['valoracion'] = $this->agruparModulos($resultado['valoracion']);
		$resultado['evaluacion'] = DAOInforme::verEvaluacion($queryParams['id_alumno'], $queryParams['id_periodo'], $usuario->id);
		$resultado['periodo'] = DAOInforme::verPeriodo($queryParams['id_periodo'])[0]['nombre'];
		$temp = DAOInforme::verCoordinadorYCiclo($queryParams['id_alumno']);
		$resultado['coordinador'] = $temp['coordinador'];
		$resultado['grado'] = $temp['grado'];

		$json = json_encode($resultado);
		header('Content-type: application/json; charset=utf-8');
		header('HTTP/1.1 200 OK');
		echo $json;
		die();
	}
	/**
		Procesa un array de valoraciones para crear en cada actividad un array con la información de sus módulos.
		@param $valoraciones {[Valoracion]} Array de valoraciones con una fila por actividad del informe.
		@return {[Valoracion]} Array de valoracion de actividades con un campo de array que agrupa todos sus módulos.
	**/
	function agruparModulos($valoraciones){
		if (count($valoraciones) == 0) return [];
		
		$resultado = [];
		for($i = 0; $i < count($valoraciones); $i++){
			//Vemos si ya existe
			for ($j = 0; $j < count($resultado); $j++)
				if ($resultado[$j]['orden'] == $valoraciones[$i]['orden'])
					break;
			if ($j == count($resultado)){	
				//No está, lo añadimos
				$valoracion = [];
				$valoracion['orden'] = $valoraciones[$i]['orden'];
				$valoracion['titulo'] = $valoraciones[$i]['titulo'];
				$valoracion['calificacion'] = $valoraciones[$i]['calificacion'];
				$valoracion['modulos'] = [];
				array_push($resultado, $valoracion);
			}
			//Añadimos el módulo
			$modulo = [];
			$modulo['codigo'] = $valoraciones[$i]['modulo_codigo'];
			$modulo['titulo'] = $valoraciones[$i]['modulo_titulo'];
			$modulo['color_fondo'] = $valoraciones[$i]['color_fondo'];
			$modulo['color_letra'] = $valoraciones[$i]['color_letra'];
			
			array_push($resultado[$j]['modulos'], $modulo);
		}
		return $resultado;
	}
}
