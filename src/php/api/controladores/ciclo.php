<?php

require_once('./daos/daociclo.php');

/**
    Clase controlador del ciclo
 */
class Ciclo{
    /**
        Devuelve la lista de ciclos.
        @param $pathParams {Array} No utilizado
        @param $queryParams {Array} No utilizado
        @param $usuario {Usuario} No utilizado
        @return {Array[Ciclo]}
     * */
    function get($pathParams, $queryParams, $usuario){
        $resultado = DAOCiclo::verCiclos();
        $json = json_encode($resultado);
        header('Content-type: application/json; charset=utf-8');
        header('HTTP/1.1 200 OK');
        echo $json;
        die();
    }
}