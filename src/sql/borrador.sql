SELECT Actividad.orden, CONCAT(Actividad.orden, ".-", Actividad.titulo) AS titulo, 
ROUND(( 
SELECT AVG((Tarea.calificacion + Calificacion.valor)/2) FROM Tarea  
JOIN Calificacion ON Tarea.id_calificacion_empresa = Calificacion.id 
JOIN Actividad_Tarea ON Tarea.id = Actividad_Tarea.id_tarea 
WHERE id_alumno = :id_alumno1 
AND Actividad_Tarea.id_actividad = Actividad.id 
AND Tarea.fecha BETWEEN 
(SELECT fecha_inicio from Periodo WHERE id = :id_periodo1) AND 
(SELECT fecha_fin from Periodo WHERE id = :id_periodo2) 
)) as calificacion, 
Modulo.codigo AS modulo_codigo, Modulo.titulo AS modulo_titulo, Modulo.color_fondo, Modulo.color_letra 
FROM `Actividad` 
JOIN Actividad_Modulo ON Actividad.id = Actividad_Modulo.id_actividad 
JOIN Modulo ON Actividad_Modulo.id_modulo = Modulo.id 
WHERE Actividad.id_ciclo = 
(SELECT id_ciclo FROM Alumno WHERE Alumno.id = :id_alumno2) 
ORDER BY Actividad.orden, Modulo.orden



-- Todas las actividades del ciclo del alumno
SELECT Actividad.id, Actividad.titulo
FROM Actividad 
WHERE Actividad.id_ciclo = 
(SELECT id_ciclo FROM Alumno WHERE Alumno.id = 10) 
ORDER BY Actividad.orden
;

-- Todas las actividades con sus módulos y sus calificaciones
SELECT Actividad.id AS id_actividad, Actividad_Modulo.id_modulo, calificacion, Tarea.id, Tarea.fecha
FROM Actividad 
LEFT JOIN Actividad_Modulo ON Actividad.id = Actividad_Modulo.id_actividad
LEFT JOIN Actividad_Modulo_Tarea ON (Actividad.id = Actividad_Modulo_Tarea.id_actividad AND Actividad_Modulo.id_modulo = Actividad_Modulo_Tarea.id_modulo)
LEFT JOIN Tarea ON Actividad_Modulo_Tarea.id_tarea = Tarea.id 
WHERE
	-- Solo los módulos del ciclo del alumno 
	Actividad.id_ciclo = (SELECT id_ciclo FROM Alumno WHERE Alumno.id = 10) 
	-- Solo las tareas del periodo seleccionado
	AND ((Tarea.fecha BETWEEN
		(SELECT fecha_inicio from Periodo WHERE id = 1) AND
		(SELECT fecha_fin from Periodo WHERE id = 1) )
		OR Tarea.fecha IS NULL) -- Para mantener el left join y que salgan todas las actividades
ORDER BY Actividad.orden
;

-- Media de las calificaciones de profesores por actividad
SELECT Actividad.id AS id_actividad, AVG(calificacion)
FROM Actividad 
LEFT JOIN Actividad_Modulo ON Actividad.id = Actividad_Modulo.id_actividad
LEFT JOIN Actividad_Modulo_Tarea ON (Actividad.id = Actividad_Modulo_Tarea.id_actividad AND Actividad_Modulo.id_modulo = Actividad_Modulo_Tarea.id_modulo)
LEFT JOIN Tarea ON Actividad_Modulo_Tarea.id_tarea = Tarea.id 
WHERE
	-- Solo los módulos del ciclo del alumno 
	Actividad.id_ciclo = (SELECT id_ciclo FROM Alumno WHERE Alumno.id = 10) 
	-- Solo las tareas del periodo seleccionado
	AND ((Tarea.fecha BETWEEN
		(SELECT fecha_inicio from Periodo WHERE id = 1) AND
		(SELECT fecha_fin from Periodo WHERE id = 1) )
		OR Tarea.fecha IS NULL) -- Para mantener el left join y que salgan todas las actividades
GROUP BY (id_actividad)
ORDER BY Actividad.orden
;

-- Media de las calificaciones de empresa por actividad
SELECT Actividad.id AS id_actividad, AVG(Calificacion.valor)
FROM Actividad 
LEFT JOIN Actividad_Tarea ON Actividad.id = Actividad_Tarea.id_actividad
LEFT JOIN Tarea ON Actividad_Tarea.id_tarea = Tarea.id
LEFT JOIN Calificacion ON Calificacion.id = Tarea.id_calificacion_empresa 
WHERE
	-- Solo los módulos del ciclo del alumno 
	Actividad.id_ciclo = (SELECT id_ciclo FROM Alumno WHERE Alumno.id = 10) 
	-- Solo las tareas del periodo seleccionado
	AND ((Tarea.fecha BETWEEN (SELECT fecha_inicio from Periodo WHERE id = 1) AND (SELECT fecha_fin from Periodo WHERE id = 1) )OR Tarea.fecha IS NULL) -- Para mantener el left join y que salgan todas las actividades
GROUP BY (Actividad.id)
ORDER BY Actividad.orden
;

--------------------------------
SELECT Actividad.id AS id_actividad, (AVG(calificacion) + AVG(Calificacion.valor)) / 2 AS CAL_FINAL
FROM Actividad 
LEFT JOIN Actividad_Modulo ON Actividad.id = Actividad_Modulo.id_actividad
LEFT JOIN Actividad_Modulo_Tarea ON (Actividad.id = Actividad_Modulo_Tarea.id_actividad AND Actividad_Modulo.id_modulo = Actividad_Modulo_Tarea.id_modulo)
LEFT JOIN Tarea ON Actividad_Modulo_Tarea.id_tarea = Tarea.id 
LEFT JOIN Actividad_Tarea ON Actividad.id = Actividad_Tarea.id_actividad
LEFT JOIN Calificacion ON Calificacion.id = Tarea.id_calificacion_empresa 
WHERE
	-- Solo los módulos del ciclo del alumno 
	Actividad.id_ciclo = (SELECT id_ciclo FROM Alumno WHERE Alumno.id = 10) 
	-- Solo las tareas del periodo seleccionado
	AND ((Tarea.fecha BETWEEN
		(SELECT fecha_inicio from Periodo WHERE id = 1) AND
		(SELECT fecha_fin from Periodo WHERE id = 1) )
		OR Tarea.fecha IS NULL) -- Para mantener el left join y que salgan todas las actividades
GROUP BY (id_actividad)
ORDER BY Actividad.orden
;

SELECT Actividad.id AS id_actividad, (AVG(calificacion) + AVG(Calificacion.valor)) / 2 AS calificacion, 
Modulo.codigo AS modulo_codigo, Modulo.titulo AS modulo_titulo, Modulo.color_fondo, Modulo.color_letra
FROM Actividad 
LEFT JOIN Actividad_Modulo ON Actividad.id = Actividad_Modulo.id_actividad
LEFT JOIN Actividad_Modulo_Tarea ON (Actividad.id = Actividad_Modulo_Tarea.id_actividad AND Actividad_Modulo.id_modulo = Actividad_Modulo_Tarea.id_modulo)
LEFT JOIN Tarea ON Actividad_Modulo_Tarea.id_tarea = Tarea.id 
LEFT JOIN Actividad_Tarea ON Actividad.id = Actividad_Tarea.id_actividad
LEFT JOIN Calificacion ON Calificacion.id = Tarea.id_calificacion_empresa 
LEFT JOIN Modulo ON Modulo.id = Actividad_Modulo.id_modulo 
WHERE
	-- Solo los módulos del ciclo del alumno 
	Actividad.id_ciclo = (SELECT id_ciclo FROM Alumno WHERE Alumno.id = :id_alumno) 
	-- Solo las tareas del periodo seleccionado
	AND ((Tarea.fecha BETWEEN
		(SELECT fecha_inicio from Periodo WHERE id = :id_periodo1) AND
		(SELECT fecha_fin from Periodo WHERE id = :id_periodo2) )
		OR Tarea.fecha IS NULL) -- Para mantener el left join y que salgan todas las actividades
GROUP BY Actividad.id, Modulo.id
ORDER BY Actividad.orden

------------------------------------------------------------
-- VALORACIÓN DE ACTIVIDADES	
-- 1.Calculamos la media de las calificaciones en todas las tareas asociadas al módulo.
SELECT Modulo.id, Modulo.codigo, Actividad_Modulo_Tarea.id_tarea AS id_tarea, Actividad_Modulo_Tarea.id_actividad AS id_actividad,  
-- Actividad.id AS id_actividad, 
calificacion AS calificacion 
FROM Modulo
-- LEFT JOIN Actividad_Modulo ON Modulo.id = Actividad_Modulo.id_modulo
-- LEFT JOIN Actividad ON Actividad.id = Actividad_Modulo.id_actividad
-- LEFT JOIN Actividad_Modulo_Tarea ON (Actividad_Modulo.id_actividad = Actividad_Modulo_Tarea.id_actividad AND Actividad_Modulo.id_modulo = Actividad_Modulo_Tarea.id_modulo)
LEFT JOIN Actividad_Modulo_Tarea ON Modulo.id = Actividad_Modulo_Tarea.id_modulo
LEFT JOIN Tarea ON Actividad_Modulo_Tarea.id_tarea = Tarea.id 
-- LEFT JOIN Actividad_Tarea ON Actividad.id = Actividad_Tarea.id_actividad
-- LEFT JOIN Calificacion ON Calificacion.id = Tarea.id_calificacion_empresa 
-- LEFT JOIN Modulo ON Modulo.id = Actividad_Modulo.id_modulo 
WHERE
	-- Solo los módulos del ciclo del alumno 
	-- Actividad.id_ciclo = (SELECT id_ciclo FROM Alumno WHERE Alumno.id = 10) 
	Tarea.id_alumno = 10
	-- Solo las tareas del periodo seleccionado
	AND ((Tarea.fecha BETWEEN
		(SELECT fecha_inicio from Periodo WHERE id = 1) AND
		(SELECT fecha_fin from Periodo WHERE id = 1) )
		OR Tarea.fecha IS NULL) -- Para mantener el left join y que salgan todas las actividades

GROUP BY Actividad.id, Modulo.id
ORDER BY Actividad.orden




3. Calculamos la media de las calificaciones de empresa para cada tarea asociada al módulo.
3. Calculamos la media entre los dos valores anteriores.
