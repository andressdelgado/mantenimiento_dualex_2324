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
    public static function insertar($titulo, $fecha_firma, $documento, $id_ciclo, $id_empresa, $id_profesor){
        $sql = 'INSERT INTO Convenio(titulo, fecha_firma, documento, id_ciclo, id_empresa, id_profesor)';
        $sql .= 'VALUES (:titulo, :fecha_firma, :documento, :id_ciclo, :id_empresa, :id_profesor)';

        $params = array('titulo'=>$titulo, 'fecha_firma' => $fecha_firma,
            'documento'=> $documento, 'id_ciclo'=>$id_ciclo, 'id_empresa'=>$id_empresa, 'id_profesor' => $id_profesor);

        $id = BD::insertar($sql,$params);
        return $id;
    }

    /**
     * Devuelve un array con los datos de los convenios.
     * @param $id_profesor Identificador del profesor
     * @return {Array[Convenio]} Array de convenios.
     */
    public static function verConvenios($id_profesor){
        $sql = "SELECT Convenio.id, Convenio.titulo, Convenio.fecha_firma, Convenio.documento, Ciclo.nombre AS nombreCiclo, Empresa.nombre AS nombreEmpresa FROM Convenio ";
        $sql .= "INNER JOIN Ciclo ON Convenio.id_ciclo = Ciclo.id ";
        $sql .= "INNER JOIN Empresa ON Convenio.id_empresa = Empresa.id ";
        $sql .= "WHERE id_profesor = :id_profesor ";
        $sql .= "ORDER BY Convenio.fecha_firma DESC";

        $params = array('id_profesor' => $id_profesor);

        return BD::seleccionar($sql, $params);
    }

    /**
     * Muestra los datos de un convenio especifico.
     * @param $id {Integer} Identificador del convenio.
     * @return array|false {Array} Datos del convenio.
     */
    public static function mostrarDatosConvenio($id){
        $sql = "SELECT c.*,ci.nombre AS nombre_ciclo, e.nombre AS nombre_empresa FROM Convenio c ";
        $sql .= "INNER JOIN Ciclo ci ON c.id_ciclo = ci.id ";
        $sql .= "INNER JOIN Empresa e ON c.id_empresa = e.id ";
        $sql .= "WHERE c.id = ?";
        return BD::seleccionar($sql, [$id]);
    }

    /**
     * Edita un convenio en la base de datos.
     * @param $id {Integer} Identificador del convenio que se quiere editar.
     * @param $titulo {String} Título del convenio.
     * @param $fecha_firma {Date} Fecha de firma del convenio.
     * @param $documento {String} Contenido del documento del convenio codificado en B64.
     * @param $id_ciclo {Integer} Identificador del ciclo.
     * @param $id_empresa {Integer} Identificador de la empresa.
     * @return false|string|null {String} Identificador del convenio insertado.
 */
    public static function editarConvenio($id,$titulo, $fecha_firma, $documento, $id_ciclo, $id_empresa, $id_profesor){
        $sql = "UPDATE Convenio ";
        $sql .= "SET titulo = :titulo, fecha_firma = :fecha_firma, documento = :documento, id_ciclo = :id_ciclo, id_empresa = :id_empresa, id_profesor = :id_profesor ";
        $sql .= "WHERE id = :id";

        $params = array('id' => $id, 'titulo' => $titulo, 'fecha_firma' => $fecha_firma, 'documento' => $documento, 'id_ciclo' => $id_ciclo, 'id_empresa' => $id_empresa, 'id_profesor' => $id_profesor);

        return BD::actualizar($sql, $params);
    }

    /**
     * Borra un convenio de la base de datos.
     * @param $id {Integer} Identificador del convenio que se quiere borrar.
     * @return false|string|null {String} Identificador del convenio borrado.
     */
    public static function borrarConvenio($id){
        $sql = "DELETE FROM Convenio WHERE id = ?";
        return BD::borrar($sql, [$id]);
    }
}
