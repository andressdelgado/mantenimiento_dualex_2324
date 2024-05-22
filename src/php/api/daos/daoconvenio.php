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
     * @param $id_ciclo {Integer} Identificador del ciclo.
     * @param $id_empresa {Integer} Identificador de la empresa.
     * @return false|string|null {Integer} Identificador del convenio insertado.
     */
    public static function insertar($titulo, $fecha_firma, $documento, $id_ciclo, $id_empresa){
        $sql = 'INSERT INTO Convenio(titulo, fecha_firma, documento, id_ciclo, id_empresa)';
        $sql .= 'VALUES (:titulo, :fecha_firma, :documento, :id_ciclo, :id_empresa)';

        $params = array('titulo'=>$titulo, 'fecha_firma' => $fecha_firma,
            'documento'=> $documento, 'id_ciclo'=>$id_ciclo, 'id_empresa'=>$id_empresa);

        $id = BD::insertar($sql,$params);
        return $id;
    }

    /**
     * Devuelve un array con los datos de los convenios.
     * @return {Array[Convenio]} Array de convenios.
     */
    public static function verConvenios(){
        $sql = "SELECT Convenio.id, Convenio.titulo, Convenio.fecha_firma, Convenio.documento, Ciclo.nombre AS nombreCiclo, Empresa.nombre AS nombreEmpresa FROM Convenio ";
        $sql .= "INNER JOIN Ciclo ON Convenio.id_ciclo = Ciclo.id ";
        $sql .= "INNER JOIN Empresa ON Convenio.id_empresa = Empresa.id ";
        $sql .= "ORDER BY convenio.id ";

        $params = array();

        return BD::seleccionar($sql, $params);
    }
}
