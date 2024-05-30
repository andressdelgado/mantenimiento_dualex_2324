<?php

require_once('./daos/daoempresa.php');

class Empresa {
    /**
     * Crea una nueva empresa.
     * @param pathParams {Array} - Parámetros de la ruta.
     * @param queryParams {Array} - Parámetros de la consulta.
     * @param empresa {Object} - Datos de la empresa a crear.
     * @param usuario {Object} - Usuario que realiza la solicitud.
     */
    function post($pathParams, $queryParams, $empresa, $usuario) {
        if ($usuario->rol != 'profesor' && $usuario->rol != 'coordinador') {
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
        // Extraer datos del body
        $siglas = $empresa->siglas;
        $nombre = $empresa->nombre;
        $notas = $empresa->notas;
        // Validaciones
        if (!empty($siglas) && !empty($nombre)) {
            // Alta empresa
            $id = DAOEmpresa::insertar($empresa);
            if (!empty($id)) {
                header('HTTP/1.1 200 OK');
                $localizacion = '/empresa/' . $id; //id insertado
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

    /**
     * Obtiene la lista de empresas.
     * @param pathParams {Array} - Parámetros de la ruta.
     * @param queryParams {Array} - Parámetros de la consulta.
     * @param usuario {Object} - Usuario que realiza la solicitud.
     */
    function get($pathParams, $queryParams, $usuario) {
//        if ($usuario->rol != 'profesor' && $usuario->rol != 'coordinador') {
//            header('HTTP/1.1 401 Unauthorized');
//            die();
//        }
        if (isset($pathParams[0]) && !empty($pathParams[0]) && is_numeric($pathParams[0])) {
            // Si hay un ID de empresa válido en la URL, obtener y mostrar datos de esa empresa
            $resultado = DAOEmpresa::mostrarDatosEmpresa($pathParams[0]);
        } else {
            // Si no hay un ID de empresa válido, mostrar todas las empresas
            $resultado = DAOEmpresa::verEmpresas();
        }
        // Adaptación del Resultado
        $json = json_encode($resultado);
        header('Content-type: application/json; charset=utf-8');
        header('HTTP/1.1 200 OK');
        echo $json;
        die();
    }

    /**
     * Borra una empresa por su ID.
     * @param pathParams {Array} - Parámetros de la ruta.
     * @param queryParams {Array} - Parámetros de la consulta.
     * @param usuario {Object} - Usuario que realiza la solicitud.
     */
    function delete($pathParams, $queryParams, $usuario) {
        if ($usuario->rol != 'profesor' && $usuario->rol != 'coordinador') {
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
        $resultado = DAOEmpresa::borrarEmpresa($pathParams[0]);
        //Adaptación del Resultado
        header('HTTP/1.1 200 OK');
        die();
    }

    /**
     * Edita una empresa.
     * @param pathParams {Array} - Parámetros de la ruta.
     * @param queryParams {Array} - Parámetros de la consulta.
     * @param empresa {Object} - Datos de la empresa a editar.
     * @param usuario {Object} - Usuario que realiza la solicitud.
     */
    function put($pathParams, $queryParams, $empresa, $usuario) {
        if ($usuario->rol != 'profesor' && $usuario->rol != 'coordinador') {
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
        if (DAOEmpresa::editar($empresa)) {
            header('HTTP/1.1 200 OK');
            die();
        } else {
            echo "Error en put.";
            header('HTTP/1.1 500 Internal Server Error');
            die();
        }
    }
}
