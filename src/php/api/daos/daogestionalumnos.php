<?php
	/**
		DAO de Alumnos por clase.
		Objeto para el acceso a los datos relacionados con los alumnos.
	**/

class DAOGestionAlumnos{

    public static function verAlumnosByCurso($curso){
        $sql = "SELECT u.id, u.nombre, u.apellidos, u.email ";
        $sql .= "FROM alumno a ";
        $sql .= "JOIN curso c ON a.id_curso = c.id ";
        $sql .= "JOIN usuario u ON u.id = a.id ";
        $sql .= "WHERE c.codigo = :curso ";

        $params = array(':curso' => $curso);
        return BD::seleccionar($sql, $params);
    }

    public static function eliminarAlumno($id){
        $sql = "DELETE FROM usuario ";
        $sql .= "WHERE id = :id";

        $params = array(':id' => $id);
        BD::ejecutar($sql, $params);
    }

}
