<?php

/**
    DAO de Ciclo.
    Objeto para el acceso a los datos relacionados con el ciclo.
    TODO: Pasar a DAOGeneral.
 **/
class DAOCiclo {
    /**
        Devuelve un array con los datos de los ciclos.
     */
    public static function verCiclos() {
        $sql = "SELECT * FROM Ciclo";

        $params = array();

        return BD::seleccionar($sql, $params);
    }
}