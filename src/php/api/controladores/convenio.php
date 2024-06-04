<?php

require_once('./daos/daoconvenio.php');

class Convenio{

    /**
        Inserta un convenio en la base de datos
        @param $pathParams {Array} Array de parámetros.
        @param $queryParams {Array} Array de parámetros.
        @param $body {Object} Cuerpo de la petición.
        @param $usuario {Usuario} Usuario que realiza la petición.
     * */
    function post($pathParams, $queryParams, $body, $usuario){
        if ($usuario->rol != 'coordinador') {
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
        // Extraer datos del body
        $titulo = $body->tituloConvenio;
        $fecha_firma = $body->fechaFirma;
        $documento_convenio = $body->documento;
        $id_ciclo = $body->id_ciclo;
        $id_empresa = $body->id_empresa;

        // Validaciones
        if (!empty($titulo) && strlen($titulo) > 0 && strlen($titulo) <= 255 && $titulo !== ' '
            && !empty($fecha_firma) && !empty($documento_convenio)) {
            // Alta convenio
            $id = DAOConvenio::insertar($titulo, $fecha_firma, $documento_convenio, $id_ciclo, $id_empresa, $usuario->id);
            if (!empty($id)) {
                header('HTTP/1.1 200 OK');
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

    /**
        Devuelve la lista de convenios.
        @param $pathParams {Array} No utilizado
        @param $queryParams {Array} No utilizado
        @param $usuario {Usuario} No utilizado
        @return {Array[Convenio]}
     * */
    function get($pathParams, $queryParams, $usuario){
        if (isset($pathParams[0]) && !empty($pathParams[0]) && is_numeric($pathParams[0])) {
            // Si hay un ID de convenio válido en la URL, obtener y mostrar datos de ese convenio
            $resultado = DAOConvenio::mostrarDatosConvenio($pathParams[0]);
        } else {
            // Si no hay un ID de convenio válido, mostrar todos los convenios
            $resultado = DAOConvenio::verConvenios($usuario->id);
        }
        $json = json_encode($resultado);
        header('Content-type: application/json; charset=utf-8');
        header('HTTP/1.1 200 OK');
        echo $json;
        die();
    }

    /**
        Edita un convenio en la base de datos
        @param $pathParams {Array} Array de parámetros.
        @param $queryParams {Array} Array de parámetros.
        @param $body {Object} Cuerpo de la petición.
        @param $usuario {Usuario} Usuario que realiza la petición.
     * */
    function put($pathParams, $queryParams, $body, $usuario) {
        if ($usuario->rol != 'coordinador') {
            header('HTTP/1.1 401 Unauthorized');
            die();
        }

        // Extraer datos del body
        $id = $pathParams[0];
        $titulo = $body->tituloConvenio;
        $fecha_firma = $body->fechaFirma;
        $documento_convenio = $body->documento;
        $id_ciclo = $body->id_ciclo;
        $id_empresa = $body->id_empresa;

        // Validaciones
        if (!empty($titulo) && strlen($titulo) > 0 && strlen($titulo) <= 255 && $titulo !== ' '
            && !empty($fecha_firma) && !empty($documento_convenio)) {
            // Edicion de convenio
            DAOConvenio::editarConvenio($id, $titulo, $fecha_firma, $documento_convenio, $id_ciclo, $id_empresa, $usuario->id);
            header('HTTP/1.1 200 OK');
            die();
        } else {
            header('HTTP/1.1 422 Unprocessable Entity');
            die();
        }
    }

    /**
        Borra un convenio de la base de datos
        @param $pathParams {Array} Array de parámetros.
        @param $queryParams {Array} Array de parámetros.
        @param $usuario {Usuario} Usuario que realiza la petición.
     * */
    function delete($pathParams, $queryParams, $usuario) {
        if ($usuario->rol != 'coordinador') {
            header('HTTP/1.1 401 Unauthorized');
            die();
        }

        DAOConvenio::borrarConvenio($pathParams[0]);

        header('HTTP/1.1 200 OK');
        die();
    }
}

