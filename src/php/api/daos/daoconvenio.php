<?php

class DAOConvenio
{
    public static function insertar($titulo, $fecha_firma, $documento){
        $sql = 'INSERT INTO Convenio(titulo, fecha_firma, documento)';
        $sql .= 'VALUES (:titulo, :fecha_firma, :documento)';

        $params = array('titulo'=>$titulo, 'fecha_firma' => $fecha_firma, 'documento'=> $documento);

        $id = BD::insertar($sql,$params);
        return $id;
    }
}
