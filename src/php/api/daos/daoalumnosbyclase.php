<?php
	/**
		DAO de Alumnos por clase.
		Objeto para el acceso a los datos relacionados con los alumnos.
	**/

class DAOAlumnosByClase{


    public static function verAlumnosByCurso($curso){
        $sql = "SELECT *";
        $sql .= "FROM alumnos a";
        $sql .= "JOIN curso c ON a.id_curso = c.id_curso";
        $sql .= "WHERE c.codigo = $curso";

        $params = array('curso' => $curso);
        return BD::seleccionar($sql, $params);
    }

}
