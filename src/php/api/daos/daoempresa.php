<?php

/**
    DAO de Empresa.
    Objeto para el acceso a los datos relacionados con las empresas.
 **/
class DAOEmpresa {
    /**
        Devuelve un array con los datos de las empresas.
     */
    public static function verEmpresas(){
        $sql = "SELECT * FROM Empresa";

        $params = array();

        return BD::seleccionar($sql, $params);
    }
}
