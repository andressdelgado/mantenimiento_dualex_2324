<?php

require_once('./daos/daociclo.php');

class Ciclo{
    function get($pathParams, $queryParams, $usuario){
        $resultado = DAOCiclo::verCiclos();
        $json = json_encode($resultado);
        header('Content-type: application/json; charset=utf-8');
        header('HTTP/1.1 200 OK');
        echo $json;
        die();
    }
}
