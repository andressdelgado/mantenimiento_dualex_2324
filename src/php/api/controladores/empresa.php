<?php

require_once('./daos/daoempresa.php');

class Empresa{
    function get($pathParams, $queryParams, $usuario){
        $resultado = DAOEmpresa::verEmpresas();
        $json = json_encode($resultado);
        header('Content-type: application/json; charset=utf-8');
        header('HTTP/1.1 200 OK');
        echo $json;
        die();
    }
}
