<?php

class DAOConvenio
{
    public static function insertar($titulo, $fecha_firma, $documento, $idCiclo, $idEmpresa){
        $sql = 'INSERT INTO Convenio(titulo, fecha_firma, documento, idCiclo, idEmpresa)';
        $sql .= 'VALUES (:titulo, :fecha_firma, :documento, :idCiclo, :idEmpresa)';

        $params = array('titulo'=>$titulo, 'fecha_firma' => $fecha_firma,
            'documento'=> $documento, 'idCiclo'=>$idCiclo, 'idEmpresa'=>$idEmpresa);

        $id = BD::insertar($sql,$params);
        return $id;
    }
}
