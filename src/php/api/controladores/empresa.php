<?php

require_once('./daos/daoempresa.php');

/**
 * Clase controlador de la empresa
 */
class Empresa{
    /**
     * Devuelve la lista de empresas.
     * @param $pathParams {Array} No utilizado
     * @param $queryParams {Array} No utilizado
     * @param $usuario {Usuario} No utilizado
     * @return {Array[Empresa]}
     */
    function get($pathParams, $queryParams, $usuario){
        $resultado = DAOEmpresa::verEmpresas();
        $json = json_encode($resultado);
        header('Content-type: application/json; charset=utf-8');
        header('HTTP/1.1 200 OK');
        echo $json;
        die();
    }
}
