<?php

class DAOCiclo {
    function verCiclos()
    {
        $sql = "SELECT * FROM ciclo";

        $params = array();

        return BD::seleccionar($sql, $params);
    }
}
