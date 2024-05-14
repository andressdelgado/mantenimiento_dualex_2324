<?php

/**
    DAO de Convenio.
    Objeto para el acceso a los datos relacionados con los convenios.
 **/
class DAOConvenio{
    /**
     * Inserta un convenio en la base de datos.
     * @param $titulo {String} Título del convenio.
     * @param $fecha_firma {Date} Fecha de firma del convenio.
     * @param $documento {String} Contenido del documento del convenio codificado en B64.
     * @param $idCiclo {Integer} Identificador del ciclo.
     * @param $idEmpresa {Integer} Identificador de la empresa.
     * @return false|string|null {Integer} Identificador del convenio insertado.
     */
    public static function insertar($titulo, $fecha_firma, $documento, $idCiclo, $idEmpresa){
        $sql = 'INSERT INTO Convenio(titulo, fecha_firma, documento, idCiclo, idEmpresa)';
        $sql .= 'VALUES (:titulo, :fecha_firma, :documento, :idCiclo, :idEmpresa)';

        $params = array('titulo'=>$titulo, 'fecha_firma' => $fecha_firma,
            'documento'=> $documento, 'idCiclo'=>$idCiclo, 'idEmpresa'=>$idEmpresa);

        $id = BD::insertar($sql,$params);
        return $id;
    }

    /**
     * Devuelve un array con los datos de los convenios.
     * @return {Array[Convenio]} Array de convenios.
     */
    public static function verConvenios(){
        $sql = "SELECT Convenio.id, Convenio.titulo, Convenio.fecha_firma, Convenio.documento, Ciclo.nombre AS nombreCiclo, Empresa.nombre AS nombreEmpresa FROM Convenio ";
        $sql .= "INNER JOIN Ciclo ON Convenio.idCiclo = Ciclo.id ";
        $sql .= "INNER JOIN Empresa ON Convenio.idEmpresa = Empresa.id ";
        $sql .= "ORDER BY convenio.id ";

        $params = array();

        return BD::seleccionar($sql, $params);
    }
}
