<?php

require_once('./daos/daoconvenio.php');

class Convenio{
    function altaConvenio($titulo, $fecha_firma, $documento_convenio){
        // Validaciones
        if (!empty($titulo) && !empty($fecha_firma) && !empty($documento_convenio)) {
            $documento = file_get_contents($documento_convenio);

            // Alta convenio
            if (DAOConvenio::insertar($titulo, $fecha_firma, $documento)) {
                echo "Convenio subido exitosamente.";
            } else {
                echo "Error al subir el convenio.";
            }
        } else {
            echo "Faltan parámetros para realizar la solicitud.";
        }
    }
}

