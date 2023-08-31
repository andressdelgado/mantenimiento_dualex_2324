<?php
/**
	Controlador General 
**/
require_once('./daos/daogeneral.php');

class Controlador{
	/**
		Constructor de la clase.
		@param $recurso {String} Nombre del recurso de la que se obtendrán los campos.
	**/
	function __construct($recurso){
		$this->entidad = null;
		switch($recurso){
			case 'actividad':
				$this->entidad = 'Actividad';
				break; 
			case 'calificacion':
				$this->entidad = 'Calificacion';
				break; 
			case 'curso':
				$this->entidad = 'Curso';
				break; 
			case 'periodo':
				$this->entidad = 'Periodo';
				break; 
			default:
				header('HTTP/1.1 500 Internal Server Error');
				die();
		}
	}
	/**
		Devuelve la lista de campos de una tabla.
		@param $pathParams {Array} Array de parámetros.
		@param $queryParams {Array} Array de parámetros. Array con el identificador del alumno.
		@param $usuario {Usuario} Usuario que realiza la petición.
		@return {Array[Array[String]]}
	**/
	function get($pathParams, $queryParams, $usuario){
		$resultado = DAOGeneral::ver($this->entidad);
		$json = json_encode($resultado);
		header('Content-type: application/json; charset=utf-8');
		header('HTTP/1.1 200 OK');
		echo $json;
		die();
	}
}
