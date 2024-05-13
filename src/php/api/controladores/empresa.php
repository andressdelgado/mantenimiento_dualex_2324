<?php

require_once('./daos/daoempresa.php');

class Empresa{
    function post($pathParams, $queryParams, $empresa){
        //if ($usuario->rol != 'coordinador') {
        //    header('HTTP/1.1 401 Unauthorized');
        //    die();
        //}
        // Extraer datos del body
        $siglas = $empresa->siglas;
        $nombre = $empresa->nombre;
        $notas = $empresa->notas;
            // Validaciones
        if (!empty($siglas) && !empty($nombre) &&!empty($notas)) {
            // Alta empresa
            $id = DAOEmpresa::insertar($empresa);
            if (!empty($id)) {
                header('HTTP/1.1 200 OK');
                $localizacion = '/empresa/'.$id; //id insertado
                echo $localizacion;
                die();
            } else {
                header('HTTP/1.1 500 Internal Server Error');
                die();
            }
        } else {
            header('HTTP/1.1 422 Unprocessable Entity');
            die();
        }
    }

    function get($pathParams, $queryParams, $empresa){
        $resultado = DAOEmpresa::verEmpresas();
        //Adaptación del Resultado
        $json = json_encode($resultado);
        header('Content-type: application/json; charset=utf-8');
        header('HTTP/1.1 200 OK');
        echo $json;
        die();
    }
}