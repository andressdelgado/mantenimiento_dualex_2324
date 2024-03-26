-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 24-03-2024 a las 07:37:38
-- Versión del servidor: 8.0.36
-- Versión de PHP: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `jaque_dualex`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Actividad`
--

CREATE TABLE `Actividad` (
  `id` int UNSIGNED NOT NULL,
  `titulo` varchar(1024) DEFAULT NULL,
  `descripcion` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Actividad_Curso`
--

CREATE TABLE `Actividad_Curso` (
  `id_actividad` int UNSIGNED NOT NULL,
  `id_curso` int UNSIGNED NOT NULL,
  `orden` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Actividad_Modulo`
--

CREATE TABLE `Actividad_Modulo` (
  `id_actividad` int UNSIGNED NOT NULL,
  `id_modulo` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Actividad_Modulo_Tarea`
--

CREATE TABLE `Actividad_Modulo_Tarea` (
  `id_actividad` int UNSIGNED NOT NULL COMMENT 'Cualquier actividad del módulo relacionada con la tarea',
  `id_modulo` int UNSIGNED NOT NULL,
  `id_tarea` int UNSIGNED NOT NULL,
  `revisado` tinyint NOT NULL DEFAULT '0',
  `comentario` text COMMENT 'Evaluación del profesor'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Actividad_Tarea`
--

CREATE TABLE `Actividad_Tarea` (
  `id_actividad` int UNSIGNED NOT NULL,
  `id_tarea` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Alumno`
--

CREATE TABLE `Alumno` (
  `id` int UNSIGNED NOT NULL,
  `id_curso` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Calificacion`
--

CREATE TABLE `Calificacion` (
  `id` int UNSIGNED NOT NULL,
  `titulo` varchar(256) DEFAULT NULL,
  `valor` int NOT NULL,
  `descripcion` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='Valores de la calificación de la empresa';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Curso`
--

CREATE TABLE `Curso` (
  `id` int UNSIGNED NOT NULL,
  `codigo` varchar(256) DEFAULT NULL,
  `titulo` varchar(256) DEFAULT NULL,
  `grado` enum('Grado Superior','Grado Medio') DEFAULT NULL,
  `id_profesor` int UNSIGNED DEFAULT NULL COMMENT 'Coordinador del curso',
  `color_fondo` varchar(256) DEFAULT '#0000FF',
  `color_letra` varchar(256) DEFAULT '#FFFFFF'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Curso_Modulo`
--

CREATE TABLE `Curso_Modulo` (
  `id_curso` int UNSIGNED NOT NULL,
  `id_modulo` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Dualex`
--

CREATE TABLE `Dualex` (
  `parametro` varchar(256) NOT NULL,
  `valor` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Imagen`
--

CREATE TABLE `Imagen` (
  `id` int UNSIGNED NOT NULL,
  `id_tarea` int UNSIGNED NOT NULL,
  `imagen` longtext NOT NULL
) ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Log`
--

CREATE TABLE `Log` (
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `usuario` varchar(256) DEFAULT NULL,
  `controlador` varchar(256) DEFAULT NULL,
  `metodo` varchar(256) DEFAULT NULL,
  `pathParams` text,
  `queryParams` longtext,
  `body` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Modulo`
--

CREATE TABLE `Modulo` (
  `id` int UNSIGNED NOT NULL,
  `orden` int UNSIGNED DEFAULT NULL COMMENT 'Orden en el que aparecerán en el informe',
  `codigo` varchar(256) DEFAULT NULL,
  `titulo` varchar(256) DEFAULT NULL,
  `color_fondo` varchar(256) DEFAULT '#0000FF',
  `color_letra` varchar(256) DEFAULT '#FFFFFF'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Modulo_Profesor`
--

CREATE TABLE `Modulo_Profesor` (
  `id_modulo` int UNSIGNED NOT NULL,
  `id_profesor` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Periodo`
--

CREATE TABLE `Periodo` (
  `id` int NOT NULL,
  `nombre` varchar(256) DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='Fechas de los periodos de evaluación';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Profesor`
--

CREATE TABLE `Profesor` (
  `id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Tarea`
--

CREATE TABLE `Tarea` (
  `id` int UNSIGNED NOT NULL,
  `id_alumno` int UNSIGNED DEFAULT NULL,
  `titulo` varchar(256) DEFAULT NULL,
  `descripcion` text,
  `fecha` date DEFAULT NULL COMMENT 'Fecha de realización de la tarea',
  `fecha_fin` date DEFAULT NULL,
  `id_calificacion_empresa` int UNSIGNED DEFAULT NULL COMMENT 'Calificación del tutor de empresa',
  `comentario_calificacion_empresa` text,
  `calificacion_v1` bit(1) DEFAULT NULL COMMENT 'Calificación del profesor.',
  `evaluacion_v1` text COMMENT 'Evaluación del profesor',
  `imagenes` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuario`
--

CREATE TABLE `Usuario` (
  `id` int UNSIGNED NOT NULL,
  `nombre` varchar(256) DEFAULT NULL,
  `apellidos` varchar(256) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Actividad`
--
ALTER TABLE `Actividad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Actividad_Curso`
--
ALTER TABLE `Actividad_Curso`
  ADD PRIMARY KEY (`id_actividad`,`id_curso`),
  ADD UNIQUE KEY `id_curso_uq` (`id_curso`,`orden`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indices de la tabla `Actividad_Modulo`
--
ALTER TABLE `Actividad_Modulo`
  ADD PRIMARY KEY (`id_actividad`,`id_modulo`),
  ADD KEY `id_modulo` (`id_actividad`,`id_modulo`),
  ADD KEY `Actividad_Modulo_ibfk_2` (`id_modulo`);

--
-- Indices de la tabla `Actividad_Modulo_Tarea`
--
ALTER TABLE `Actividad_Modulo_Tarea`
  ADD PRIMARY KEY (`id_actividad`,`id_modulo`,`id_tarea`),
  ADD KEY `id_actividad` (`id_actividad`,`id_tarea`);

--
-- Indices de la tabla `Actividad_Tarea`
--
ALTER TABLE `Actividad_Tarea`
  ADD PRIMARY KEY (`id_actividad`,`id_tarea`),
  ADD KEY `id_tarea` (`id_tarea`);

--
-- Indices de la tabla `Alumno`
--
ALTER TABLE `Alumno`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indices de la tabla `Calificacion`
--
ALTER TABLE `Calificacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Curso`
--
ALTER TABLE `Curso`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_profesor` (`id_profesor`);

--
-- Indices de la tabla `Curso_Modulo`
--
ALTER TABLE `Curso_Modulo`
  ADD PRIMARY KEY (`id_curso`,`id_modulo`),
  ADD KEY `Curso_Modulo_ibfk_2` (`id_modulo`);

--
-- Indices de la tabla `Dualex`
--
ALTER TABLE `Dualex`
  ADD PRIMARY KEY (`parametro`);

--
-- Indices de la tabla `Imagen`
--
ALTER TABLE `Imagen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tarea` (`id_tarea`);

--
-- Indices de la tabla `Modulo`
--
ALTER TABLE `Modulo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Modulo_Profesor`
--
ALTER TABLE `Modulo_Profesor`
  ADD PRIMARY KEY (`id_modulo`,`id_profesor`),
  ADD KEY `id_profesor` (`id_profesor`);

--
-- Indices de la tabla `Periodo`
--
ALTER TABLE `Periodo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Profesor`
--
ALTER TABLE `Profesor`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Tarea`
--
ALTER TABLE `Tarea`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_alumno` (`id_alumno`),
  ADD KEY `id_calificacion_empresa` (`id_calificacion_empresa`);

--
-- Indices de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Actividad`
--
ALTER TABLE `Actividad`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Alumno`
--
ALTER TABLE `Alumno`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Calificacion`
--
ALTER TABLE `Calificacion`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Curso`
--
ALTER TABLE `Curso`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Imagen`
--
ALTER TABLE `Imagen`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Modulo`
--
ALTER TABLE `Modulo`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Profesor`
--
ALTER TABLE `Profesor`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Tarea`
--
ALTER TABLE `Tarea`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Actividad_Curso`
--
ALTER TABLE `Actividad_Curso`
  ADD CONSTRAINT `Actividad_Curso_ibfk_1` FOREIGN KEY (`id_actividad`) REFERENCES `Actividad` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Actividad_Curso_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `Curso` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Actividad_Modulo`
--
ALTER TABLE `Actividad_Modulo`
  ADD CONSTRAINT `Actividad_Modulo_ibfk_1` FOREIGN KEY (`id_actividad`) REFERENCES `Actividad` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Actividad_Modulo_ibfk_2` FOREIGN KEY (`id_modulo`) REFERENCES `Modulo` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Actividad_Modulo_Tarea`
--
ALTER TABLE `Actividad_Modulo_Tarea`
  ADD CONSTRAINT `Actividad_Modulo_Tarea_ibfk_1` FOREIGN KEY (`id_actividad`,`id_tarea`) REFERENCES `Actividad_Tarea` (`id_actividad`, `id_tarea`) ON DELETE CASCADE,
  ADD CONSTRAINT `Actividad_Modulo_Tarea_ibfk_2` FOREIGN KEY (`id_actividad`,`id_modulo`) REFERENCES `Actividad_Modulo` (`id_actividad`, `id_modulo`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Actividad_Tarea`
--
ALTER TABLE `Actividad_Tarea`
  ADD CONSTRAINT `Actividad_Tarea_ibfk_1` FOREIGN KEY (`id_actividad`) REFERENCES `Actividad` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Actividad_Tarea_ibfk_2` FOREIGN KEY (`id_tarea`) REFERENCES `Tarea` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Alumno`
--
ALTER TABLE `Alumno`
  ADD CONSTRAINT `Alumno_ibfk_1` FOREIGN KEY (`id`) REFERENCES `Usuario` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Alumno_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `Curso` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Curso`
--
ALTER TABLE `Curso`
  ADD CONSTRAINT `Curso_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `Profesor` (`id`);

--
-- Filtros para la tabla `Curso_Modulo`
--
ALTER TABLE `Curso_Modulo`
  ADD CONSTRAINT `Curso_Modulo_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `Curso` (`id`),
  ADD CONSTRAINT `Curso_Modulo_ibfk_2` FOREIGN KEY (`id_modulo`) REFERENCES `Modulo` (`id`);

--
-- Filtros para la tabla `Modulo_Profesor`
--
ALTER TABLE `Modulo_Profesor`
  ADD CONSTRAINT `Modulo_Profesor_ibfk_1` FOREIGN KEY (`id_modulo`) REFERENCES `Modulo` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Modulo_Profesor_ibfk_2` FOREIGN KEY (`id_profesor`) REFERENCES `Profesor` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Profesor`
--
ALTER TABLE `Profesor`
  ADD CONSTRAINT `Profesor_ibfk_1` FOREIGN KEY (`id`) REFERENCES `Usuario` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Tarea`
--
ALTER TABLE `Tarea`
  ADD CONSTRAINT `Tarea_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `Alumno` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Tarea_ibfk_2` FOREIGN KEY (`id_calificacion_empresa`) REFERENCES `Calificacion` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
