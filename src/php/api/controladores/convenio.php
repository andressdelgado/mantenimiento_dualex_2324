<?php

require_once('./daos/daoconvenio.php');

class Convenio{
    function post($pathParams, $queryParams, $body, $usuario){
        // Extraer datos del body
        $titulo = $body->tituloConvenio;
        $fecha_firma = $body->fechaFirma;
        $documento_convenio = $body->documento;

        // Validaciones
        if (!empty($titulo) && strlen($titulo) > 0 && strlen($titulo) <= 255 && $titulo !== ' '
            && !empty($fecha_firma) && !empty($documento_convenio)) {
            // Alta convenio
            if (DAOConvenio::insertar($titulo, $fecha_firma, $documento_convenio)) {
                echo "Convenio subido exitosamente.";
            } else {
                echo "Error al subir el convenio.";
            }
        } else {
            echo "Faltan parámetros para realizar la solicitud.";
        }
    }
}

