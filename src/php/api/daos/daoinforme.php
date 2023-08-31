<?php
	/**
		DAO de Informe.
		Objeto para el acceso a los datos relacionados con los informes de evaluación.
	**/

class DAOInforme{
	/**
		Devuelve un array con las valoraciones del alumno en cada actividad.
		La valoración de cada actividad se calcula como la media entre la calificación de la empresa y la calificación del profesor de todas las tareas del periodo asociadas a la actividad.
		@param $idAlumno Identificador del alumno.
		@param $idPeriodo Identificador del periodo solicitado.
		@param $idProfesor Identificador del profesor.
		@return Un array de arrays con los datos de cada tarea.
	**/
	public static function verValoracion_old($idAlumno, $idPeriodo, $idProfesor){
		$sql  = 'SELECT Actividad_Curso.orden, CONCAT(Actividad_Curso.orden, ".-", Actividad.titulo) AS titulo, ';
		$sql .= 'ROUND((AVG(calificacion) + AVG(Calificacion.valor))/2, 1) as calificacion ';
		//$sql .= 'Modulo.codigo AS modulo_codigo, Modulo.titulo AS modulo_titulo, Modulo.color_fondo, Modulo.color_letra ';
		$sql .= 'FROM `Actividad` ';
		$sql .= 'LEFT JOIN Actividad_Curso ON Actividad.id = Actividad_Curso.id_actividad ';
		$sql .= 'LEFT JOIN Actividad_Modulo ON Actividad.id = Actividad_Modulo.id_actividad ';
		$sql .= 'LEFT JOIN Actividad_Modulo_Tarea ON (Actividad.id = Actividad_Modulo_Tarea.id_actividad AND Actividad_Modulo.id_modulo = Actividad_Modulo_Tarea.id_modulo) ';
		$sql .= 'LEFT JOIN Tarea ON Actividad_Modulo_Tarea.id_tarea = Tarea.id ';
		$sql .= 'LEFT JOIN Actividad_Tarea ON Actividad.id = Actividad_Tarea.id_actividad ';
		$sql .= 'LEFT JOIN Calificacion ON Calificacion.id = Tarea.id_calificacion_empresa ';
		//$sql .= 'LEFT JOIN Modulo ON Modulo.id = Actividad_Modulo.id_modulo ';
		$sql .= 'WHERE ';
		//Solo los módulos del curso del alumno 
		$sql .= 'Actividad_Curso.id_curso = (SELECT id_curso FROM Alumno WHERE Alumno.id = :id_alumno) ';
		//Solo las tareas del periodo seleccionado
		$sql .= 'AND ((Tarea.fecha BETWEEN ';
		$sql .= '	(SELECT fecha_inicio from Periodo WHERE id = :id_periodo1) AND ';
		$sql .= '	(SELECT fecha_fin from Periodo WHERE id = :id_periodo2) ) ';
		$sql .= '	OR Tarea.fecha IS NULL) '; //Para mantener el left join y que salgan todas las actividades
		$sql .= 'GROUP BY Actividad.id, Actividad_Curso.orden ';
		$sql .= 'ORDER BY Actividad_Curso.orden';

		$params = array('id_alumno' => $idAlumno, 'id_periodo1' => $idPeriodo, 'id_periodo2' => $idPeriodo);

		return BD::seleccionar($sql, $params);
	}
	public static function verValoracion($idAlumno, $idPeriodo, $idProfesor){
		$sql = 'SELECT Actividad_Curso.orden, CONCAT(Actividad_Curso.orden, ".-", Actividad.titulo) AS titulo, ';
		$sql .= 'ROUND ( ((SELECT AVG(calificacion) ';
		$sql .= 'FROM Actividad_Modulo_Tarea ';
		$sql .= 'WHERE Actividad_Modulo_Tarea.id_actividad = Actividad.id ';
		$sql .= 'AND Actividad_Modulo_Tarea.id_tarea IN (SELECT Tarea.id FROM Tarea WHERE Tarea.fecha BETWEEN   (SELECT fecha_inicio from Periodo WHERE id = :id_periodo1) AND  (SELECT fecha_fin from Periodo WHERE id = :id_periodo2)) ';
		$sql .= 'GROUP BY id_actividad) + ';
		$sql .= '(SELECT AVG(Calificacion.valor) ';
		$sql .= 'FROM Tarea ';
		$sql .= 'LEFT JOIN Calificacion ON Calificacion.id = Tarea.id_calificacion_empresa ';
		$sql .= 'LEFT JOIN Actividad_Modulo_Tarea ON Tarea.id = Actividad_Modulo_Tarea.id_tarea ';
		$sql .= 'WHERE Actividad_Modulo_Tarea.id_actividad = Actividad.id ';
		$sql .= 'AND Actividad_Modulo_Tarea.id_tarea IN (SELECT Tarea.id FROM Tarea WHERE Tarea.fecha BETWEEN   (SELECT fecha_inicio from Periodo WHERE id = :id_periodo3) AND  (SELECT fecha_fin from Periodo WHERE id = :id_periodo4))  ';
		$sql .= 'GROUP BY id_actividad ';
		$sql .= '))/2,1) as calificacion ';
 		$sql .= 'FROM `Actividad`  ';
 		$sql .= 'LEFT JOIN Actividad_Curso ON Actividad.id = Actividad_Curso.id_actividad  ';
 		$sql .= 'WHERE Actividad_Curso.id_curso = (SELECT id_curso FROM Alumno WHERE Alumno.id = :id_alumno) ';
 		$sql .= 'ORDER BY Actividad_Curso.orden ';

		$params = array('id_alumno' => $idAlumno, 'id_periodo1' => $idPeriodo, 'id_periodo2' => $idPeriodo, 'id_periodo3' => $idPeriodo, 'id_periodo4' => $idPeriodo);

		return BD::seleccionar($sql, $params);
	}
	public static function verModulos($idAlumno, $idPeriodo, $idProfesor){
		$sql  = 'SELECT Actividad_Curso.orden AS actividad_orden, Modulo.codigo AS modulo_codigo, Modulo.titulo AS modulo_titulo, Modulo.color_fondo, Modulo.color_letra ';
		$sql .= 'FROM `Actividad` ';
		$sql .= 'LEFT JOIN Actividad_Curso ON Actividad.id = Actividad_Curso.id_actividad ';
		$sql .= 'LEFT JOIN Actividad_Modulo ON Actividad.id = Actividad_Modulo.id_actividad ';
		$sql .= 'LEFT JOIN Modulo ON Modulo.id = Actividad_Modulo.id_modulo ';
		$sql .= 'WHERE ';
		$sql .= 'Actividad_Curso.id_curso = (SELECT id_curso FROM Alumno WHERE Alumno.id = :id_alumno) ';
		$sql .= 'ORDER BY Actividad_Curso.orden, Modulo.orden';

		$params = array('id_alumno' => $idAlumno);

		return BD::seleccionar($sql, $params);
	}
	/**
		Devuelve un array con las evaluaciones del alumno en cada módulo.
		La valoración de cada módulo se calcula como la media entre la calificación de la empresa y la calificación del profesor de todas las tareas del periodo asociadas a actividades que corresponden con el módulo.
		@param $idAlumno Identificador del alumno.
		@param $idPeriodo Identificador del periodo solicitado.
		@param $idProfesor Identificador del profesor.
		@return Un array de arrays con los datos de cada tarea.
	**/
	public static function verEvaluacion($idAlumno, $idPeriodo, $idProfesor){
		$sql  = 'SELECT CONCAT(Modulo.codigo, " - ", Modulo.titulo) AS titulo, ';
		$sql .= 'ROUND((AVG(media_tarea_profesor) + AVG(media_tarea_empresa))/2,1) AS calificacion ';
		$sql .= 'FROM ';
		$sql .= '(SELECT id_modulo, id_tarea, AVG(calificacion) AS media_tarea_profesor, AVG(Calificacion.valor) AS media_tarea_empresa ';
		$sql .= 'FROM Actividad_Modulo_Tarea ';
		$sql .= 'LEFT JOIN Tarea ON Tarea.id = Actividad_Modulo_Tarea.id_tarea ';
		$sql .= 'LEFT JOIN Calificacion ON Calificacion.id = Tarea.id_calificacion_empresa ';
		$sql .= 'WHERE ';
		//Solo los módulos del curso del alumno 
		//Actividad_Curso.id_curso = (SELECT id_curso FROM Alumno WHERE Alumno.id = :id_alumno) 
		$sql .= 'Tarea.id_alumno = :id_alumno ';
		//Solo las tareas del periodo seleccionado
		$sql .= 'AND ((Tarea.fecha BETWEEN ';
		$sql .= '(SELECT fecha_inicio from Periodo WHERE id = :id_periodo1) AND ';
		$sql .= '(SELECT fecha_fin from Periodo WHERE id = :id_periodo2) ) ';
		$sql .= 'OR Tarea.fecha IS NULL) ';	//Para mantener el left join y que salgan todas las actividades
		$sql .= 'GROUP BY id_modulo, id_tarea ';
		$sql .= ') temporal ';
		$sql .= 'LEFT JOIN Modulo ON Modulo.id = temporal.id_modulo ';
		$sql .= 'GROUP BY id_modulo ';
		$sql .= 'ORDER BY Modulo.orden ';
		$params = array('id_alumno' => $idAlumno, 'id_periodo1' => $idPeriodo, 'id_periodo2' => $idPeriodo);

		return BD::seleccionar($sql, $params);
	}
	/**
		Devuelve un array con el nombre del periodo indicado.
		@param $idPeriodo Identificador del periodo solicitado.
		@return Un array de arrays con el nombre del periodo.
	**/
	public static function verPeriodo($idPeriodo){
		$sql  = 'SELECT  nombre ';
		$sql .= 'FROM Periodo ';
		$sql .= 'WHERE id = :id_periodo ';

		$params = array('id_periodo' => $idPeriodo);

		return BD::seleccionar($sql, $params);
	}
	/**
		Devuelve un texto con el nombre del coordinado asignado al curso en el que está matriculado el alumno.
		@param $idAlumno Identificador del alumno.
		@return Texto con el nombre completo del coordinador.
	**/
	public static function verCoordinadorYCiclo($idAlumno){
		$sql  = 'SELECT CONCAT(Usuario.nombre, " ", Usuario.apellidos) AS coordinador, ';
		$sql .= 'grado ';
		$sql .= 'FROM Usuario ';
		$sql .= 'JOIN Curso ON Curso.id_profesor = Usuario.id ';
		$sql .= 'WHERE Curso.id IN (SELECT Alumno.id_curso FROM Alumno WHERE Alumno.id = :id_alumno) ';

		$params = array('id_alumno' => $idAlumno);

		return BD::seleccionar($sql, $params)[0];
	}
}
