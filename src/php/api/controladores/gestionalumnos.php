<?php
/**
	Controlador de alumnos.
**/
require_once('./daos/daogestionalumnos.php');

class GestionAlumnos{

    /**
    Devuelve la lista de ciclos.
    @param $pathParams {Array} No utilizado
    @param $queryParams {Array} Contiene el código del curso
    @param $usuario {Usuario} No utilizado
    @return {Array[Ciclo]}
     **/
    function get($pathParams, $queryParams, $usuario){
        $resultado = DAOGestionAlumnos::verAlumnosByCurso($queryParams['curso']);
        $json = json_encode($resultado);
        header('Content-type: application/json; charset=utf-8');
        header('HTTP/1.1 200 OK');
        echo $json;
        die();
    }

    function delete($pathParams, $queryParams, $usuario){
        if ($usuario->rol == 'profesor' || $usuario->rol == 'coordinador'){
            DAOGestionAlumnos::eliminarAlumno($pathParams[0]);
            header('HTTP/1.1 200 OK');
            die();
        }
        else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }

    function post($pathParams, $queryParams, $alumno, $usuario){
        if ($usuario->rol == 'profesor' || $usuario->rol == 'coordinador'){
            DAOGestionAlumnos::insertarAlumno($alumno);
            header('HTTP/1.1 200 OK');
            die();
        }
        else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }

    function put($pathParams, $queryParams, $alumno, $usuario){
        if ($usuario->rol == 'profesor' || $usuario->rol == 'coordinador'){
            DAOGestionAlumnos::actualizarAlumno($alumno);
            header('HTTP/1.1 200 OK');
            die();
        }
        else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }

}
