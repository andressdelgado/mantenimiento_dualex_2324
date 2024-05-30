<?php
/**
 * DAO de Empresas.
 * Objeto para el acceso a los datos relacionados con las empresas.
 */
class DAOEmpresa {
    /**
     * Inserta una nueva empresa.
     * @param empresa {Empresa} Datos de la empresa a insertar.
     * @return id {Integer} Identificador de la empresa insertada.
     */
    public static function insertar($empresa) {
        $sql = 'INSERT INTO Empresa(siglas, nombre, notas) ';
        $sql .= 'VALUES (:siglas, :nombre, :notas)';
        $params = array('siglas' => $empresa->siglas, 'nombre' => $empresa->nombre, 'notas' => $empresa->notas);
        $id = BD::insertar($sql, $params);
        return $id;
    }

    /**
     * Obtiene la lista de empresas.
     * @return {Array} Array de objetos empresa.
     */
    public static function verEmpresas() {
        $sql = 'SELECT * FROM Empresa';
        return BD::seleccionar($sql, []);
    }

    /**
     * Borra una empresa por su ID.
     * @param id {Integer} ID de la empresa a borrar.
     * @return {Integer} Número de filas afectadas.
     */
    public static function borrarEmpresa($id) {
        $sql = "DELETE FROM Empresa WHERE id = ?";
        return BD::borrar($sql, [$id]);
    }

    /**
     * Obtiene los datos de una empresa por su ID.
     * @param id {Integer} ID de la empresa.
     * @return {Array} Datos de la empresa.
     */
    public static function mostrarDatosEmpresa($id) {
        $sql = 'SELECT * FROM Empresa WHERE id = ?';
        return BD::seleccionar($sql, [$id]);
    }

    /**
     * Edita una empresa.
     * @param empresa {Empresa} Datos de la empresa a editar.
     * @return {Boolean} True si la edición fue exitosa, false de lo contrario.
     */
    public static function editar($empresa) {
        // Construir la consulta SQL para actualizar la empresa
        $sql = 'UPDATE Empresa ';
        $sql .= 'SET siglas = :siglas, nombre = :nombre, notas = :notas ';
        $sql .= 'WHERE id = :id';

        // Parámetros para la consulta preparada
        $params = array(
            'siglas' => $empresa->siglas,
            'nombre' => $empresa->nombre,
            'notas' => $empresa->notas,
            'id' => $empresa->id
        );

        // Ejecutar la consulta preparada para actualizar la empresa
        $idNuevo = BD::actualizar($sql, $params);

        // Retornar el nuevo ID, si es necesario
        return true;
    }
}