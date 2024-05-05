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

    public static function verConvenios()
    {
        $sql = "SELECT convenio.id, convenio.titulo, convenio.fecha_firma, convenio.documento, ciclo.nombre AS nombreCiclo, empresa.nombre AS nombreEmpresa FROM convenio ";
        $sql .= "INNER JOIN ciclo ON convenio.idCiclo = ciclo.id ";
        $sql .= "INNER JOIN empresa ON convenio.idEmpresa = empresa.id ";
        $sql .= "ORDER BY convenio.id ";

        $params = array();

        return BD::seleccionar($sql, $params);
    }
}
