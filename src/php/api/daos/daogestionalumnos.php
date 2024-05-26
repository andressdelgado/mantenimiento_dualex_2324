<?php
	/**
		DAO de Alumnos por clase.
		Objeto para el acceso a los datos relacionados con los alumnos.
	**/

class DAOGestionAlumnos{

    public static function verAlumnosByCurso($curso){
        $sql = "SELECT u.id, u.nombre, u.apellidos, u.email, c.codigo ";
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

    public static function insertarAlumno($alumno){
        $sql = "INSERT INTO usuario (nombre, apellidos, email) ";
        $sql .= "VALUES (:nombre, :apellidos, :email)";

        $params = array(
            ':nombre' => $alumno->nombre,
            ':apellidos' => $alumno->apellidos,
            ':email' => $alumno->email
        );

        $usuarioId = BD::ejecutar($sql, $params);

        $sql = "INSERT INTO alumno (id, id_curso) ";
        $sql .= "VALUES (:id, :curso)";

        $params = array(
            ':id' => $usuarioId,
            ':curso' => $alumno->curso
        );

        BD::ejecutar($sql, $params);
    }

    public static function actualizarAlumno($alumno){
        $sql = "UPDATE usuario ";
        $sql .= "SET nombre = :nombre, apellidos = :apellidos, email = :email ";
        $sql .= "WHERE id = :id";

        $params = array(
            ':nombre' => $alumno->nombre,
            ':apellidos' => $alumno->apellidos,
            ':email' => $alumno->email,
            ':id' => $alumno->id
        );

        BD::ejecutar($sql, $params);

        $sql = "UPDATE alumno ";
        $sql .= "SET id_curso = :curso ";
        $sql .= "WHERE id = :id";

        $params = array(
            ':curso' => $alumno->curso,
            ':id' => $alumno->id
        );

        BD::ejecutar($sql, $params);
    }

}
