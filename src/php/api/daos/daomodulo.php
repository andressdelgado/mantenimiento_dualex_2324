<?php
	/**
		DAO de Modulo.
		Objeto para el acceso a los datos relacionados con las actividades.
	**/

class DAOModulo{
	/**
	 * Devuelve los módulos con su nota
	 * @return array con id del módulo, su nombre y su nota final
	 */
	
	public static function getModulosNotas($id_alumno,$periodo){
		$sql  = 'SELECT Modulo.id, Modulo.titulo, AVG(Calificacion.valor) AS "nota_final" FROM Modulo
		LEFT JOIN Actividad_Modulo_Tarea ON Modulo.id = Actividad_Modulo_Tarea.id_modulo
		LEFT JOIN Actividad ON Actividad.id = Actividad_Modulo_Tarea.id_actividad
		LEFT JOIN Tarea ON Tarea.id = Actividad_Modulo_Tarea.id_tarea
		LEFT JOIN Calificacion ON Calificacion.id = Tarea.id_calificacion_empresa
		LEFT JOIN Alumno ON Alumno.id = Tarea.id_alumno
		WHERE Alumno.id=:id_alumno AND ((Tarea.fecha BETWEEN (SELECT fecha_inicio FROM Periodo WHERE id = :periodo) AND (SELECT fecha_fin FROM Periodo WHERE id = :periodo) ))
		GROUP BY Modulo.id;';

		$params = array('id_alumno' => $id_alumno,'periodo'=>$periodo);
		return BD::seleccionar($sql, $params);
	}
}
