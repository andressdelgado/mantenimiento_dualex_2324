<?php
  /**
    DAO de Alumno.
    Objeto para el acceso a los datos relacionados con los alumnos.
  **/

class DAOAlumno{
  /**
    Devuelve un array de alumnos de un profesor que tengan tareas registradas.
    @param $id_profesor Identificador del profesor.
    @return Un array de arrays con los datos de cada alumno.
  **/
  public static function verAlumnosPorProfesor($id_profesor){
    $sql  = 'SELECT DISTINCT Usuario.id, Usuario.nombre, Usuario.apellidos, Usuario.email ';
	$sql .= ', Curso.codigo, Curso.titulo, Curso.color_fondo, Curso.color_letra ';
	$sql .= 'FROM Usuario ';
	$sql .= 'JOIN Alumno ON Usuario.id = Alumno.id ';
	$sql .= 'JOIN Curso ON Alumno.id_curso = Curso.id ';
	$sql .= 'JOIN Curso_Modulo ON Curso.id = Curso_Modulo.id_curso ';
	$sql .= 'JOIN Modulo ON Modulo.id = Curso_Modulo.id_curso ';
	$sql .= 'JOIN Modulo_Profesor ON Curso_Modulo.id_modulo = Modulo_Profesor.id_modulo '; 
	$sql .= 'JOIN Tarea ON Tarea.id_alumno = Alumno.id '; 
	$sql .= 'JOIN Actividad_Tarea ON Actividad_Tarea.id_tarea = Tarea.id ';
	$sql .= 'JOIN Actividad_Modulo ON Actividad_Modulo.id_actividad = Actividad_Tarea.id_actividad ';
	$sql .= 'WHERE ';
	$sql .= 'Actividad_Modulo.id_modulo = Modulo_Profesor.id_modulo ';
	$sql .= 'AND Modulo_Profesor.id_profesor = :id_profesor ';
	$sql .= 'ORDER BY Curso.codigo, Usuario.apellidos, Usuario.nombre '; 

    $params = array('id_profesor' => $id_profesor);

    return BD::seleccionar($sql, $params);
  }
}
