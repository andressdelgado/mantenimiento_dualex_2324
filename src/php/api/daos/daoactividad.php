<?php
	/**
		DAO de Actividad.
		Objeto para el acceso a los datos relacionados con las actividades.
	**/

class DAOActividad{
	/**
		Devuelve un array de actividades de un curso ordenadas.
		@return Un array de arrays con los datos de cada actividad.
	**/
	public static function ver($idCurso){
		$sql  = 'SELECT Actividad.id, Actividad_Curso.id_curso, Actividad_Curso.orden, Actividad.titulo, Actividad.descripcion ';
		$sql .= 'FROM Actividad ';
		$sql .= 'JOIN Actividad_Curso ON Actividad_Curso.id_actividad = Actividad.id ';
		$sql .= 'WHERE Actividad_Curso.id_curso = :id_curso ';
		$sql .= 'ORDER BY Actividad_Curso.orden ASC ';
		
		$params = array('id_curso' => $idCurso);

		return BD::seleccionar($sql, $params);
	}
	/**
	 * Devuelve las actividades con su nota
	 * @return array con id de la actividad, su nombre y su nota final
	 */
	public static function getActividadNotas($id_alumno,$periodo){
		$sql  = 'SELECT Actividad.id AS id_actividad, Actividad.titulo, AVG(Calificacion.valor) AS "nota_final" FROM Actividad 
		LEFT JOIN Actividad_Tarea ON Actividad.id = Actividad_Tarea.id_actividad 
		LEFT JOIN Tarea ON Actividad_Tarea.id_tarea = Tarea.id 
		LEFT JOIN Calificacion ON Calificacion.id = Tarea.id_calificacion_empresa 
		LEFT JOIN Actividad_Curso ON Actividad_Curso.id_actividad = Actividad.id
		LEFT JOIN Alumno ON Alumno.id = Tarea.id_alumno 
		WHERE Alumno.id=:id_alumno AND Tarea.fecha BETWEEN (SELECT fecha_inicio FROM Periodo WHERE id = :periodo) AND (SELECT fecha_fin FROM Periodo WHERE id = :periodo) 
		GROUP BY Actividad.id';

		$params = array('id_alumno' => $id_alumno,'periodo'=>$periodo);
		return BD::seleccionar($sql, $params);
	}
}
