<?php

require_once('./daos/daoconvenio.php');

class Convenio{
    function post($pathParams, $queryParams, $body, $usuario){
        //if ($usuario->rol == 'coordinador') {
        //    header('HTTP/1.1 401 Unauthorized');
        //    die();
        //}
        // Extraer datos del body
        $titulo = $body->tituloConvenio;
        $fecha_firma = $body->fechaFirma;
        $documento_convenio = $body->documento;
        $idCiclo = $body->idCiclo;
        $idEmpresa = $body->idEmpresa;

        // Validaciones
        if (!empty($titulo) && strlen($titulo) > 0 && strlen($titulo) <= 255 && $titulo !== ' '
            && !empty($fecha_firma) && !empty($documento_convenio)) {
            // Alta convenio
            $id = DAOConvenio::insertar($titulo, $fecha_firma, $documento_convenio, $idCiclo, $idEmpresa);
            if (!empty($id)) {
                header('HTTP/1.1 200 OK');
                $localizacion = '/convenio/'.$id; //id insertado
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
    function get($pathParams, $queryParams, $usuario){
        $resultado = DAOConvenio::verConvenios();
        $json = json_encode($resultado);
        header('Content-type: application/json; charset=utf-8');
        header('HTTP/1.1 200 OK');
        echo $json;
        die();
    }
}

