<?php
/**
	Controlador de alumnos.
**/
require_once('./daos/daoalumno.php');

class AlumnosByClase{

    /**
    Devuelve la lista de ciclos.
    @param $pathParams {Array} No utilizado
    @param $queryParams {Array} No utilizado
    @param $usuario {Usuario} No utilizado
    @return {Array[Ciclo]}
     **/
    function get($pathParams, $queryParams, $usuario){
        echo $queryParams[0];
        $resultado = DAOAlumnosByClase::verAlumnosByCurso($queryParams[0]);
        $json = json_encode($resultado);
        header('Content-type: application/json; charset=utf-8');
        header('HTTP/1.1 200 OK');
        echo $json;
        die();
    }

}
