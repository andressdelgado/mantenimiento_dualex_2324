<?php

class DAOCiclo {
    public static function verCiclos()
    {
        $sql = "SELECT * FROM ciclo";

        $params = array();

        return BD::seleccionar($sql, $params);
    }
}
