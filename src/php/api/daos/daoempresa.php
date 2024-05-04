<?php

class DAOEmpresa {
    public static function verEmpresas()
    {
        $sql = "SELECT * FROM empresa";

        $params = array();

        return BD::seleccionar($sql, $params);
    }
}
