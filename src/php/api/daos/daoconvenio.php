<?php

class DAOConvenio
{
    public static function insertar($titulo, $fecha_firma, $documento){
        if (!BD::iniciarTransaccion())
            throw new Exception('No es posible iniciar la transacción.');
        $sql = 'INSERT INTO Convenio(titulo, fecha_firma, documento)';
        $sql .= 'VALUES (:titulo, :fecha_firma, :documento)';

        $params = array('titulo'=>$titulo, 'fecha_firma' => $fecha_firma, 'documento'=> $documento);

        $id = BD::insertar($sql,$params);

        if (!BD::commit())
            throw new Exception('No se pudo confirmar la transacción.');
        return $id;
    }
}
