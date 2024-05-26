<?php
	/**
		DAO de Tarea.
		Objeto para el acceso a los datos relacionados con las tareas.
	**/

class DAOTarea{
	/**
		Devuelve un array de tareas de un alumno.
		@param $idAlumno Identificador del alumno.
		@return Un array de arrays con los datos de cada tarea.
	**/
	public static function verTareasDeAlumno($idAlumno){
		$sql  = 'SELECT Tarea.id AS id, Tarea.titulo AS titulo, Tarea.descripcion AS descripcion, Tarea.fecha, Tarea.fecha_fin,Tarea.imagenes ';
		$sql .= ', Tarea.id_calificacion_empresa, Tarea.comentario_calificacion_empresa ';
		$sql .= ', Calificacion.titulo AS calificacion_empresa ';
		$sql .= ', Actividad.id AS id_actividad, Actividad.titulo AS actividad_titulo, Actividad.descripcion AS actividad_descripcion';
		$sql .= ', Modulo.id AS id_modulo, Modulo.codigo, Modulo.titulo AS modulo_titulo, Modulo.color_fondo, Modulo.color_letra ';
		$sql .= ', Actividad_Modulo_Tarea.revisado AS modulo_revisado ';
		$sql .= ', Actividad_Modulo_Tarea.comentario AS modulo_comentario ';
		$sql .= 'FROM Tarea ';
		$sql .= 'JOIN Alumno ON Alumno.id = Tarea.id_alumno ';
		$sql .= 'LEFT JOIN Calificacion ON Calificacion.id = Tarea.id_calificacion_empresa ';
		$sql .= 'JOIN Actividad_Tarea ON Actividad_Tarea.id_tarea = Tarea.id ';
		$sql .= 'JOIN Actividad ON Actividad_Tarea.id_actividad = Actividad.id ';
		$sql .= 'JOIN Actividad_Modulo ON Actividad_Modulo.id_actividad = Actividad.id ';
		$sql .= 'JOIN Modulo ON Modulo.id = Actividad_Modulo.id_modulo ';
		$sql .= 'JOIN Actividad_Modulo_Tarea ON (Actividad.id = Actividad_Modulo_Tarea.id_actividad AND Modulo.id = Actividad_Modulo_Tarea.id_modulo AND Tarea.id = Actividad_Modulo_Tarea.id_tarea) ';
		$sql .= 'WHERE Alumno.id = :id_alumno ';
		$sql .= 'ORDER BY Tarea.fecha DESC ';
		
		$params = array('id_alumno' => $idAlumno);

		return BD::seleccionar($sql, $params);
	}
	/**
		Devuelve una tarea de un alumno.
		@param $idTarea Identificador de la tarea solicitada.
		@param $idAlumno Identificador del alumno.
		@return Un array de arrays con los datos de cada tarea.
	**/
	public static function verTareaDeAlumno($idTarea, $idAlumno){
		$sql	= 'SELECT Tarea.id AS id, Tarea.titulo AS titulo, Tarea.descripcion AS descripcion, Tarea.fecha,Tarea.fecha_fin ';
		$sql .= ', Tarea.id_calificacion_empresa, Tarea.comentario_calificacion_empresa ';
		$sql .= ', Calificacion.titulo AS calificacion_empresa ';
		$sql .= ', Actividad.id AS id_actividad, Actividad.titulo AS actividad_titulo, Actividad.descripcion AS actividad_descripcion';
		$sql .= ', Modulo.id AS id_modulo, Modulo.codigo, Modulo.titulo AS modulo_titulo, Modulo.color_fondo, Modulo.color_letra ';
		$sql .= ', Curso_Modulo.id_curso AS id_curso ';
		$sql .= ', Actividad_Modulo_Tarea.revisado AS modulo_revisado ';
		$sql .= ', Actividad_Modulo_Tarea.comentario AS modulo_comentario ';
		//$sql .= ', Imagen.id AS id_imagen, Imagen.imagen ';
		$sql .= 'FROM Tarea ';
		$sql .= 'LEFT JOIN Calificacion ON Calificacion.id = Tarea.id_calificacion_empresa ';
		$sql .= 'LEFT JOIN Actividad_Tarea ON Actividad_Tarea.id_tarea = Tarea.id ';
		$sql .= 'LEFT JOIN Actividad ON Actividad_Tarea.id_actividad = Actividad.id ';
		$sql .= 'LEFT JOIN Actividad_Modulo ON Actividad_Modulo.id_actividad = Actividad.id ';
		$sql .= 'LEFT JOIN Modulo ON Modulo.id = Actividad_Modulo.id_modulo ';
		$sql .= 'LEFT JOIN Curso_Modulo ON Modulo.id = Curso_Modulo.id_modulo ';
		$sql .= 'LEFT JOIN Actividad_Modulo_Tarea ON (Actividad.id = Actividad_Modulo_Tarea.id_actividad AND Modulo.id = Actividad_Modulo_Tarea.id_modulo AND Tarea.id = Actividad_Modulo_Tarea.id_tarea) ';
		//$sql .= 'LEFT JOIN Imagen ON Tarea.id = Imagen.id_tarea ';
		$sql .= 'WHERE Tarea.id_alumno = :id_alumno AND Tarea.id = :id_tarea ';
		$sql .= 'ORDER BY Actividad.titulo, Tarea.titulo ';
		
		$params = array('id_alumno' => $idAlumno, 'id_tarea' => $idTarea);

		return BD::seleccionar($sql, $params);
	}
	/**
		Devuelve un array de tareas de un alumno.
		El alumno debe estar inscrito en algún módulo impartido por el profesor.
		@param $id_alumno Identificador del alumno.
		@param $id_profesor Identificador del profesor.
		@return Un array de arrays con los datos de cada tarea.
	**/
	public static function verTareasDeAlumnoComoProfesor($id_alumno, $id_profesor){
		$sql  = 'SELECT Tarea.id AS id, Tarea.titulo AS titulo, Tarea.descripcion AS descripcion, Tarea.fecha,Tarea.fecha_fin,Tarea.imagenes ';
		$sql .= ', Tarea.id_calificacion_empresa, Tarea.comentario_calificacion_empresa ';
		$sql .= ', Calificacion.titulo AS calificacion_empresa ';
		$sql .= ', Actividad.id AS id_actividad, Actividad.titulo AS actividad_titulo, Actividad.descripcion AS actividad_descripcion';
		$sql .= ', Modulo.id AS id_modulo, Modulo.codigo, Modulo.titulo AS modulo_titulo, Modulo.color_fondo, Modulo.color_letra ';
		$sql .= ', Actividad_Modulo_Tarea.revisado AS modulo_revisado, Actividad_Modulo_Tarea.comentario AS modulo_comentario ';
		$sql .= ', Alumno.id_curso AS id_curso ';
		$sql .= ', CASE  WHEN Actividad_Modulo_Tarea.revisado = 0 AND Modulo_Profesor.id_profesor = :id_profesor  THEN ';
		$sql .= ' CASE ';
    	$sql .= ' WHEN DATEDIFF(NOW(), Tarea.fecha_fin) > 7 THEN 1 ';
        $sql .= ' WHEN DATEDIFF(NOW(), Tarea.fecha_fin) > 10 THEN 2 ELSE 0 ';
        $sql .= ' END ELSE -1 END AS retrasada '; 
		$sql .= 'FROM Tarea ';
		$sql .= 'JOIN Alumno ON Alumno.id = Tarea.id_alumno ';
		$sql .= 'LEFT JOIN Calificacion ON Calificacion.id = Tarea.id_calificacion_empresa ';
		$sql .= 'LEFT JOIN Actividad_Tarea ON Actividad_Tarea.id_tarea = Tarea.id ';
		$sql .= 'LEFT JOIN Actividad ON Actividad_Tarea.id_actividad = Actividad.id ';
		$sql .= 'LEFT JOIN Actividad_Modulo ON Actividad_Modulo.id_actividad = Actividad.id ';
		$sql .= 'LEFT JOIN Modulo ON Modulo.id = Actividad_Modulo.id_modulo ';
		$sql .= 'LEFT JOIN Modulo_Profesor ON Modulo.id = Modulo_Profesor.id_modulo ';
		$sql .= 'JOIN Actividad_Modulo_Tarea ON (Actividad_Modulo_Tarea.id_actividad = Actividad.id AND Actividad_Modulo_Tarea.id_modulo = Modulo.id AND Actividad_Modulo_Tarea.id_tarea = Tarea.id) ';
		$sql .= 'WHERE Alumno.id = :id_alumno ';
		$sql .= 'AND Modulo_Profesor.id_profesor = :id_profesor ';
		$sql .= 'ORDER BY Tarea.fecha DESC ';

		$params = array('id_alumno' => $id_alumno, 'id_profesor' => $id_profesor);

		return BD::seleccionar($sql, $params);
	}
	/**
		Devuelve una tarea de un alumno.
		@param $idTarea Identificador de la tarea solicitada.
		@param $idProfesor Identificador del profesor.
		@return Un array de arrays con los datos de cada tarea.
	**/
	public static function verTareaDeAlumnoComoProfesor($idTarea, $idProfesor){
		$sql	= 'SELECT Tarea.id AS id, Tarea.titulo AS titulo, Tarea.descripcion AS descripcion, Tarea.fecha,Tarea.fecha_fin, Tarea.id_alumno,Tarea.imagenes ';
		$sql .= ', Tarea.id_calificacion_empresa, Tarea.comentario_calificacion_empresa ';
		$sql .= ', Calificacion.titulo AS calificacion_empresa ';
		$sql .= ', Actividad.id AS id_actividad, Actividad.titulo AS actividad_titulo, Actividad.descripcion AS actividad_descripcion';
		$sql .= ', Modulo.id AS id_modulo, Modulo.codigo, Modulo.titulo AS modulo_titulo, Modulo.color_fondo, Modulo.color_letra ';
		$sql .= ', Curso_Modulo.id_curso AS id_curso ';
		$sql .= ', Actividad_Modulo_Tarea.revisado AS modulo_revisado, Actividad_Modulo_Tarea.comentario AS modulo_comentario ';
		//$sql .= ', Imagen.id AS id_imagen, Imagen.imagen ';
		$sql .= 'FROM Tarea ';
		$sql .= 'LEFT JOIN Calificacion ON Calificacion.id = Tarea.id_calificacion_empresa ';
		$sql .= 'LEFT JOIN Actividad_Tarea ON Actividad_Tarea.id_tarea = Tarea.id ';
		$sql .= 'LEFT JOIN Actividad ON Actividad_Tarea.id_actividad = Actividad.id ';
		$sql .= 'LEFT JOIN Actividad_Modulo ON Actividad_Modulo.id_actividad = Actividad.id ';
		$sql .= 'LEFT JOIN Modulo ON Modulo.id = Actividad_Modulo.id_modulo ';
		$sql .= 'LEFT JOIN Curso_Modulo ON Modulo.id = Curso_Modulo.id_modulo ';
		$sql .= 'LEFT JOIN Modulo_Profesor ON Modulo.id = Modulo_Profesor.id_modulo ';
		$sql .= 'JOIN Actividad_Modulo_Tarea ON (Actividad_Modulo_Tarea.id_actividad = Actividad.id AND Actividad_Modulo_Tarea.id_modulo = Modulo.id AND Actividad_Modulo_Tarea.id_tarea = Tarea.id) ';
		//$sql .= 'LEFT JOIN Imagen ON Tarea.id = Imagen.id_tarea ';
		$sql .= 'WHERE Modulo_Profesor.id_profesor = :id_profesor AND Tarea.id = :id_tarea ';
		$sql .= 'ORDER BY Actividad.titulo, Tarea.titulo ';
		
		$params = array('id_profesor' => $idProfesor, 'id_tarea' => $idTarea);

		return BD::seleccionar($sql, $params);
	}
	/**
		Inserta una nueva tarea.
		@param tarea {Tarea} Datos de la tarea a insertar.
		@param usuario {Usuario} Datos del usuario loggeado.
		@return id {Integer} Identificador de la tarea insertada.
	**/
	public static function insertar($tarea, $usuario){
		if (!BD::iniciarTransaccion())
			throw new Exception('No es posible iniciar la transacción.');
		$sql = 'INSERT INTO Tarea (id_alumno, titulo, descripcion , fecha,fecha_fin, id_calificacion_empresa, comentario_calificacion_empresa) ';
		$sql .= 'VALUES (:id_alumno, :titulo, :descripcion, :fecha,:fecha_fin, :idCalificacionEmpresa, :comentarioCalificacionEmpresa)';
		
		$params = array('id_alumno' => $usuario->id, 'titulo'=>$tarea->titulo, 'descripcion'=>$tarea->descripcion, 'fecha'=>$tarea->fecha,'fecha_fin'=>$tarea->fecha_fin, 'idCalificacionEmpresa'=>$tarea->idCalificacionEmpresa, 'comentarioCalificacionEmpresa'=>$tarea->comentarioCalificacionEmpresa);

		$tarea->id = BD::insertar($sql, $params);

		if (count($tarea->actividades) > 0){
			$sql = 'INSERT INTO Actividad_Tarea (id_actividad, id_tarea) VALUES ';
			$values = array();
			$params = array();
			for ($i = 0; $i < count($tarea->actividades); $i++){
				array_push($values, "(:campo_$i, $tarea->id)");
				$params["campo_$i"] = $tarea->actividades[$i];
			}
			$sql .= join(",", $values);
//echo $sql;
			BD::insertar($sql, $params);
		}

		//Insertamos la relación con Módulo y Actividad
		$sql  = 'INSERT INTO Actividad_Modulo_Tarea (id_actividad, id_modulo, id_tarea) ';
		$sql .= 'SELECT Actividad_Modulo.id_actividad, id_modulo, :id_tarea1 ';
		$sql .= 'FROM Actividad_Modulo ';
		$sql .= 'JOIN Actividad_Tarea ON Actividad_Modulo.id_actividad = Actividad_Tarea.id_actividad ';
		$sql .= 'WHERE id_tarea = :id_tarea2';

		$params = array('id_tarea1' => $tarea->id, 'id_tarea2' => $tarea->id);
		BD::insertar($sql, $params);

		//Inserción de imágenes
		self::_insertarImagenes($tarea);

		if (!BD::commit())
			throw new Exception('No se pudo confirmar la transacción.');
		return $tarea->id;
	}
	/**
		Modificación de tarea por alumno.
		Condiciones: la tarea tiene que pertenceder al alumno y no puede tener calificación ni de empresa ni del profesor.
		@param tarea {Tarea} Datos de la tarea a modificar.
		@param usuario {Usuario} Datos del usuario loggeado.
	**/
	public static function modificar($tarea, $usuario){
		if (!BD::iniciarTransaccion())
			throw new Exception('No es posible iniciar la transacción.');

		//Actualizamos la información básica (Tarea)
		if ($usuario->rol == 'profesor'){
			$sql = 'UPDATE Tarea SET titulo = :titulo, descripcion = :descripcion , fecha = :fecha,fecha_fin = :fecha_fin, id_calificacion_empresa = :idCalificacionEmpresa, ';
			$sql .= 'comentario_calificacion_empresa = :comentarioCalificacionEmpresa ';
			$sql .= 'WHERE Tarea.id = :id';
		
			$params = array('id'=>$tarea->id, 'titulo'=>$tarea->titulo, 'descripcion'=>$tarea->descripcion, 'fecha'=>$tarea->fecha,'fecha_fin'=>$tarea->fecha_fin, 'idCalificacionEmpresa'=>$tarea->idCalificacionEmpresa, 'comentarioCalificacionEmpresa'=>$tarea->comentarioCalificacionEmpresa);
		}
		if ($usuario->rol == 'alumno'){
			$sql = 'UPDATE Tarea SET titulo = :titulo,descripcion = :descripcion , fecha = :fecha,fecha_fin = :fecha_fin, id_calificacion_empresa = :idCalificacionEmpresa, ';
			$sql .= 'comentario_calificacion_empresa = :comentarioCalificacionEmpresa ';
			$sql .= 'WHERE Tarea.id = :id AND Tarea.id_alumno = :idAlumno ';
			$sql .= ' AND Tarea.id_calificacion_empresa IS NULL ';
			$sql .= ' AND Tarea.id NOT IN (SELECT DISTINCT id_tarea FROM Actividad_Modulo_Tarea WHERE revisado = 1) '; 
		
			$params = array('id'=>$tarea->id, 'titulo'=>$tarea->titulo,'descripcion'=>$tarea->descripcion, 'fecha'=>$tarea->fecha,'fecha_fin'=>$tarea->fecha_fin, 'idCalificacionEmpresa'=>$tarea->idCalificacionEmpresa,'comentarioCalificacionEmpresa'=>$tarea->comentarioCalificacionEmpresa, 'idAlumno'=>$usuario->id);
		}
		//print_r($params);die($sql);
		$idNuevo = BD::actualizar($sql, $params);

		//Vemos si la tarea está calificada.
		$sql = 'SELECT COUNT(*) AS count FROM Actividad_Modulo_Tarea WHERE id_tarea = :id AND revisado != 0';
		$params = array('id' => $tarea->id);
		$resultado = BD::seleccionar($sql, $params)[0]['count'];

		//Si ya está calificado en algún módulo, no se pueden cambiar las actividades
		if ($resultado == 0){
			//Actualizamos las relaciones N:M, solo si no están calificadas
			//Borramos sus actividades
			if ($usuario->rol == 'profesor'){
				$sql = 'DELETE FROM Actividad_Tarea WHERE id_tarea = :id';
				$params = array('id' => $tarea->id);
			}
			if ($usuario->rol == 'alumno'){
				$sql = 'DELETE FROM Actividad_Tarea WHERE Actividad_Tarea.id_tarea = :id AND id_tarea IN (SELECT id FROM Tarea WHERE Tarea.id_alumno = :idAlumno)';
				$params = array('id' => $tarea->id, 'idAlumno' => $usuario->id);
			}
			BD::borrar($sql, $params);

			//Las volvemos a insertar
			if (count($tarea->actividades) > 0){
				$sql = 'INSERT INTO Actividad_Tarea (id_actividad, id_tarea) VALUES ';
				$values = array();
				for ($i = 0; $i < count($tarea->actividades); $i++)
					array_push($values, '('.$tarea->actividades[$i].', '.$tarea->id.')');

				$sql .= join(",", $values);

				BD::insertar($sql);
			}

			//Insertamos la relación con Módulo y Actividad
			//TODO: refactorizar con DaoTarea.insertar
			$sql  = 'INSERT INTO Actividad_Modulo_Tarea (id_actividad, id_modulo, id_tarea) ';
			$sql .= 'SELECT Actividad_Modulo.id_actividad, id_modulo, id_tarea ';
			$sql .= 'FROM Actividad_Modulo ';
			$sql .= 'JOIN Actividad_Tarea ON Actividad_Modulo.id_actividad = Actividad_Tarea.id_actividad ';
			$sql .= 'WHERE id_tarea = :id_tarea';
			$params = array('id_tarea' => $tarea->id);
			BD::insertar($sql, $params);
		}
		
		//Si es profesor, actualizamos con las calificaciones de sus módulos
		if ($usuario->rol == 'profesor'){
			for ($i = 0; $i  < count($tarea->evaluaciones); $i++){
				$sql  = 'UPDATE Actividad_Modulo_Tarea SET revisado = :revisado, comentario = :comentario ';
				$sql .= 'WHERE id_tarea = :id_tarea AND id_modulo = :id_modulo';
				$params = array(
					'revisado' => $tarea->evaluaciones[$i]->revisado, 
					'comentario' => $tarea->evaluaciones[$i]->comentario,
					'id_tarea' => $tarea->id,
					'id_modulo' => $tarea->evaluaciones[$i]->id
				);
				BD::actualizar($sql, $params);
			}
		}

		//Actualización (Inserción/Eliminación) de imágenes
		//Inserción de imágenes
		if ($resultado == 0 || $usuario->rol == 'profesor'){
			self::_insertarImagenes($tarea);
			//Borrado de imágenes
			if (count($tarea->idImagenesBorrar) > 0){
				for ($i = 0; $i  < count($tarea->idImagenesBorrar); $i++){
					$values = array();
					$param = array();
					for ($i = 0; $i < count($tarea->idImagenesBorrar); $i++){
						array_push($values, ":campo_$i");
						$param["campo_$i"] = $tarea->idImagenesBorrar[$i];
					}
				}
				$sql  = 'DELETE FROM Imagen WHERE id IN ('.join(',', $values).') AND id_tarea = :id_tarea';
				$param['id_tarea'] = $tarea->id;
				BD::borrar($sql, $param);
			}
		}


		if (!BD::commit())
			throw new Exception('No se pudo confirmar la transacción.');
	}

	private static function _insertarImagenes($tarea){
		//Inserción de imágenes
		if (count($tarea->imagenes) > 0){
			$sql  = 'INSERT INTO Imagen (id_tarea, imagen) VALUES ';
			$values = array();
			$param = array();
			$contador = 0;
			for ($i = 0; $i < count($tarea->imagenes); $i++){
				if ($tarea->imagenes[$i]->id === 'null'){
					$contador++;
					array_push($values, "($tarea->id, :campo_$i)");
					$param["campo_$i"] = $tarea->imagenes[$i]->src;
				}
			}
			if ($contador > 0){
				$sql .= join(",", $values);
				BD::insertar($sql, $param);
			}
		}

	}

	/**
		Borrado de tarea por alumno.
		Condiciones: la tarea tiene que pertenceder al alumno y no puede tener calificación ni de empresa ni del profesor.
		@param idTarea {Number} Identificador de la tarea a eliminar.
		@param usuario {Usuario} Datos del usuario loggeado.
	**/
	public static function borrarTareaAlumno($idTarea, $usuario){
		$sql = 'DELETE FROM Tarea ';
		$sql .= 'WHERE Tarea.id = :id AND Tarea.id_alumno = :idAlumno AND Tarea.id_calificacion_empresa IS NULL ';
		$sql .= 'AND Tarea.id NOT IN (SELECT DISTINCT id_tarea FROM Actividad_Modulo_Tarea WHERE revisado != 1) '; 
		
		$params = array('id'=>$idTarea, 'idAlumno'=>$usuario->id);

		$idNuevo = BD::borrar($sql, $params);
	}
	/**
		Borrado de tarea por profesor.
		@param idTarea {Number} Identificador de la tarea a eliminar.
	**/
	public static function borrarTareaProfesor($idTarea){
		$sql = 'DELETE FROM Tarea ';
		$sql .= 'WHERE Tarea.id = :id'; 
		
		$params = array('id'=>$idTarea);

		$idNuevo = BD::borrar($sql, $params);
	}
	/**
		Ver alumno de tarea. 
		Devuelve los datos de un alumno a partir del identificador de tarea.
		@param idTarea {Number} Identificador de la tarea
		@return {Alumno} Datos del alumno que dio de alta la tarea.
	**/
	public static function verAlumnoDeTarea($idTarea){
		$sql  = 'SELECT Usuario.nombre, Usuario.apellidos, Usuario.email ';
		$sql .= 'FROM Usuario ';
		$sql .= 'JOIN Alumno ON Usuario.id = Alumno.id ';
		$sql .= 'WHERE Alumno.id = (SELECT id_alumno FROM Tarea WHERE id = :id_tarea) ';
		
		$params = array('id_tarea' => $idTarea);

		return BD::seleccionar($sql, $params);
	}
}
