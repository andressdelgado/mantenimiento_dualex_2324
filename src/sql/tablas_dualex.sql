-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-06-2024 a las 22:17:28
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dualex4`
--

-- --------------------------------------------------------

CREATE DATABASE IF NOT EXISTS dualex3;
USE dualex3;

--
-- Estructura de tabla para la tabla `actividad`
--

CREATE TABLE `actividad` (
                             `id` int(10) UNSIGNED NOT NULL,
                             `titulo` varchar(1024) DEFAULT NULL,
                             `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad_curso`
--

CREATE TABLE `actividad_curso` (
                                   `id_actividad` int(10) UNSIGNED NOT NULL,
                                   `id_curso` int(10) UNSIGNED NOT NULL,
                                   `orden` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad_modulo`
--

CREATE TABLE `actividad_modulo` (
                                    `id_actividad` int(10) UNSIGNED NOT NULL,
                                    `id_modulo` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad_modulo_tarea`
--

CREATE TABLE `actividad_modulo_tarea` (
                                          `id_actividad` int(10) UNSIGNED NOT NULL COMMENT 'Cualquier actividad del módulo relacionada con la tarea',
                                          `id_modulo` int(10) UNSIGNED NOT NULL,
                                          `id_tarea` int(10) UNSIGNED NOT NULL,
                                          `revisado` tinyint(4) NOT NULL DEFAULT 0,
                                          `comentario` text DEFAULT NULL COMMENT 'Evaluación del profesor'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad_tarea`
--

CREATE TABLE `actividad_tarea` (
                                   `id_actividad` int(10) UNSIGNED NOT NULL,
                                   `id_tarea` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE `alumno` (
                          `id` int(10) UNSIGNED NOT NULL,
                          `id_curso` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificacion`
--

CREATE TABLE `calificacion` (
                                `id` int(10) UNSIGNED NOT NULL,
                                `titulo` varchar(256) DEFAULT NULL,
                                `valor` int(11) NOT NULL,
                                `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='Valores de la calificación de la empresa';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciclo`
--

CREATE TABLE `ciclo` (
                         `id` int(10) UNSIGNED NOT NULL,
                         `siglas` varchar(256) DEFAULT NULL,
                         `grado` enum('Grado Superior','Grado Medio') DEFAULT NULL,
                         `nombre` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `convenio`
--

CREATE TABLE `convenio` (
                            `id` int(10) UNSIGNED NOT NULL,
                            `titulo` varchar(255) NOT NULL,
                            `fecha_firma` date NOT NULL,
                            `documento` longblob DEFAULT NULL,
                            `id_ciclo` int(10) UNSIGNED NOT NULL,
                            `id_empresa` int(10) UNSIGNED NOT NULL,
                            `id_profesor` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
                         `id` int(10) UNSIGNED NOT NULL,
                         `codigo` varchar(256) DEFAULT NULL,
                         `titulo` varchar(256) DEFAULT NULL,
                         `grado` enum('Grado Superior','Grado Medio') DEFAULT NULL,
                         `id_profesor` int(10) UNSIGNED DEFAULT NULL COMMENT 'Coordinador del curso',
                         `color_fondo` varchar(256) DEFAULT '#0000FF',
                         `color_letra` varchar(256) DEFAULT '#FFFFFF'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso_modulo`
--

CREATE TABLE `curso_modulo` (
                                `id_curso` int(10) UNSIGNED NOT NULL,
                                `id_modulo` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dualex`
--

CREATE TABLE `dualex` (
                          `parametro` varchar(256) NOT NULL,
                          `valor` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
                           `id` int(10) UNSIGNED NOT NULL,
                           `siglas` char(9) DEFAULT NULL,
                           `nombre` varchar(255) DEFAULT NULL,
                           `notas` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa_ciclo_convenio`
--

CREATE TABLE `empresa_ciclo_convenio` (
                                          `id_empresa` int(10) UNSIGNED NOT NULL,
                                          `id_ciclo` int(10) UNSIGNED NOT NULL,
                                          `id_convenio` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagen`
--

CREATE TABLE `imagen` (
                          `id` int(10) UNSIGNED NOT NULL,
                          `id_tarea` int(10) UNSIGNED NOT NULL,
                          `imagen` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log`
--

CREATE TABLE `log` (
                       `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
                       `usuario` varchar(256) DEFAULT NULL,
                       `controlador` varchar(256) DEFAULT NULL,
                       `metodo` varchar(256) DEFAULT NULL,
                       `pathParams` text DEFAULT NULL,
                       `queryParams` longtext DEFAULT NULL,
                       `body` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulo`
--

CREATE TABLE `modulo` (
                          `id` int(10) UNSIGNED NOT NULL,
                          `orden` int(10) UNSIGNED DEFAULT NULL COMMENT 'Orden en el que aparecerán en el informe',
                          `codigo` varchar(256) DEFAULT NULL,
                          `titulo` varchar(256) DEFAULT NULL,
                          `color_fondo` varchar(256) DEFAULT '#0000FF',
                          `color_letra` varchar(256) DEFAULT '#FFFFFF'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulo_profesor`
--

CREATE TABLE `modulo_profesor` (
                                   `id_modulo` int(10) UNSIGNED NOT NULL,
                                   `id_profesor` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `periodo`
--

CREATE TABLE `periodo` (
                           `id` int(11) NOT NULL,
                           `nombre` varchar(256) DEFAULT NULL,
                           `fecha_inicio` date NOT NULL,
                           `fecha_fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='Fechas de los periodos de evaluación';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

CREATE TABLE `profesor` (
                            `id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
                         `id` int(10) UNSIGNED NOT NULL,
                         `id_alumno` int(10) UNSIGNED DEFAULT NULL,
                         `titulo` varchar(256) DEFAULT NULL,
                         `descripcion` text DEFAULT NULL,
                         `fecha` date DEFAULT NULL COMMENT 'Fecha de realización de la tarea',
                         `fecha_fin` date DEFAULT NULL,
                         `id_calificacion_empresa` int(10) UNSIGNED DEFAULT NULL COMMENT 'Calificación del tutor de empresa',
                         `comentario_calificacion_empresa` text DEFAULT NULL,
                         `calificacion_v1` bit(1) DEFAULT NULL COMMENT 'Calificación del profesor.',
                         `evaluacion_v1` text DEFAULT NULL COMMENT 'Evaluación del profesor',
                         `imagenes` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
                           `id` int(10) UNSIGNED NOT NULL,
                           `nombre` varchar(256) DEFAULT NULL,
                           `apellidos` varchar(256) DEFAULT NULL,
                           `email` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividad`
--
ALTER TABLE `actividad`
    ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `actividad_curso`
--
ALTER TABLE `actividad_curso`
    ADD PRIMARY KEY (`id_actividad`,`id_curso`),
  ADD UNIQUE KEY `id_curso_uq` (`id_curso`,`orden`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indices de la tabla `actividad_modulo`
--
ALTER TABLE `actividad_modulo`
    ADD PRIMARY KEY (`id_actividad`,`id_modulo`),
  ADD KEY `id_modulo` (`id_actividad`,`id_modulo`),
  ADD KEY `Actividad_Modulo_ibfk_2` (`id_modulo`);

--
-- Indices de la tabla `actividad_modulo_tarea`
--
ALTER TABLE `actividad_modulo_tarea`
    ADD PRIMARY KEY (`id_actividad`,`id_modulo`,`id_tarea`),
  ADD KEY `id_actividad` (`id_actividad`,`id_tarea`);

--
-- Indices de la tabla `actividad_tarea`
--
ALTER TABLE `actividad_tarea`
    ADD PRIMARY KEY (`id_actividad`,`id_tarea`),
  ADD KEY `id_tarea` (`id_tarea`);

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
    ADD PRIMARY KEY (`id`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indices de la tabla `calificacion`
--
ALTER TABLE `calificacion`
    ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ciclo`
--
ALTER TABLE `ciclo`
    ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `convenio`
--
ALTER TABLE `convenio`
    ADD PRIMARY KEY (`id`),
  ADD KEY `fk_convenio_ciclo` (`id_ciclo`),
  ADD KEY `fk_convenio_empresa` (`id_empresa`),
  ADD KEY `id_profesor` (`id_profesor`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
    ADD PRIMARY KEY (`id`),
  ADD KEY `id_profesor` (`id_profesor`);

--
-- Indices de la tabla `curso_modulo`
--
ALTER TABLE `curso_modulo`
    ADD PRIMARY KEY (`id_curso`,`id_modulo`),
  ADD KEY `Curso_Modulo_ibfk_2` (`id_modulo`);

--
-- Indices de la tabla `dualex`
--
ALTER TABLE `dualex`
    ADD PRIMARY KEY (`parametro`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
    ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `empresa_ciclo_convenio`
--
ALTER TABLE `empresa_ciclo_convenio`
    ADD PRIMARY KEY (`id_empresa`,`id_ciclo`,`id_convenio`),
  ADD UNIQUE KEY `Empresa_Convenio` (`id_empresa`,`id_convenio`),
  ADD KEY `Empresa_Ciclo_Convenio_ibfk_2` (`id_ciclo`),
  ADD KEY `Empresa_Ciclo_Convenio_ibfk_3` (`id_convenio`);

--
-- Indices de la tabla `imagen`
--
ALTER TABLE `imagen`
    ADD PRIMARY KEY (`id`),
  ADD KEY `id_tarea` (`id_tarea`);

--
-- Indices de la tabla `modulo`
--
ALTER TABLE `modulo`
    ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `modulo_profesor`
--
ALTER TABLE `modulo_profesor`
    ADD PRIMARY KEY (`id_modulo`,`id_profesor`),
  ADD KEY `id_profesor` (`id_profesor`);

--
-- Indices de la tabla `periodo`
--
ALTER TABLE `periodo`
    ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `profesor`
--
ALTER TABLE `profesor`
    ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
    ADD PRIMARY KEY (`id`),
  ADD KEY `id_alumno` (`id_alumno`),
  ADD KEY `id_calificacion_empresa` (`id_calificacion_empresa`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividad`
--
ALTER TABLE `actividad`
    MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `alumno`
--
ALTER TABLE `alumno`
    MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `calificacion`
--
ALTER TABLE `calificacion`
    MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ciclo`
--
ALTER TABLE `ciclo`
    MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `convenio`
--
ALTER TABLE `convenio`
    MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
    MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
    MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `imagen`
--
ALTER TABLE `imagen`
    MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `modulo`
--
ALTER TABLE `modulo`
    MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `profesor`
--
ALTER TABLE `profesor`
    MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
    MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
    MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividad_curso`
--
ALTER TABLE `actividad_curso`
    ADD CONSTRAINT `Actividad_Curso_ibfk_1` FOREIGN KEY (`id_actividad`) REFERENCES `actividad` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Actividad_Curso_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `actividad_modulo`
--
ALTER TABLE `actividad_modulo`
    ADD CONSTRAINT `Actividad_Modulo_ibfk_1` FOREIGN KEY (`id_actividad`) REFERENCES `actividad` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Actividad_Modulo_ibfk_2` FOREIGN KEY (`id_modulo`) REFERENCES `modulo` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `actividad_modulo_tarea`
--
ALTER TABLE `actividad_modulo_tarea`
    ADD CONSTRAINT `Actividad_Modulo_Tarea_ibfk_1` FOREIGN KEY (`id_actividad`,`id_tarea`) REFERENCES `actividad_tarea` (`id_actividad`, `id_tarea`) ON DELETE CASCADE,
  ADD CONSTRAINT `Actividad_Modulo_Tarea_ibfk_2` FOREIGN KEY (`id_actividad`,`id_modulo`) REFERENCES `actividad_modulo` (`id_actividad`, `id_modulo`) ON DELETE CASCADE;

--
-- Filtros para la tabla `actividad_tarea`
--
ALTER TABLE `actividad_tarea`
    ADD CONSTRAINT `Actividad_Tarea_ibfk_1` FOREIGN KEY (`id_actividad`) REFERENCES `actividad` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Actividad_Tarea_ibfk_2` FOREIGN KEY (`id_tarea`) REFERENCES `tarea` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `alumno`
--
ALTER TABLE `alumno`
    ADD CONSTRAINT `Alumno_ibfk_1` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Alumno_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `convenio`
--
ALTER TABLE `convenio`
    ADD CONSTRAINT `convenio_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id`),
  ADD CONSTRAINT `fk_convenio_ciclo` FOREIGN KEY (`id_ciclo`) REFERENCES `ciclo` (`id`),
  ADD CONSTRAINT `fk_convenio_empresa` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id`);

--
-- Filtros para la tabla `curso`
--
ALTER TABLE `curso`
    ADD CONSTRAINT `Curso_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id`);

--
-- Filtros para la tabla `curso_modulo`
--
ALTER TABLE `curso_modulo`
    ADD CONSTRAINT `Curso_Modulo_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id`),
  ADD CONSTRAINT `Curso_Modulo_ibfk_2` FOREIGN KEY (`id_modulo`) REFERENCES `modulo` (`id`);

--
-- Filtros para la tabla `empresa_ciclo_convenio`
--
ALTER TABLE `empresa_ciclo_convenio`
    ADD CONSTRAINT `Empresa_Ciclo_Convenio_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `Empresa_Ciclo_Convenio_ibfk_2` FOREIGN KEY (`id_ciclo`) REFERENCES `ciclo` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `Empresa_Ciclo_Convenio_ibfk_3` FOREIGN KEY (`id_convenio`) REFERENCES `convenio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `modulo_profesor`
--
ALTER TABLE `modulo_profesor`
    ADD CONSTRAINT `Modulo_Profesor_ibfk_1` FOREIGN KEY (`id_modulo`) REFERENCES `modulo` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Modulo_Profesor_ibfk_2` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `profesor`
--
ALTER TABLE `profesor`
    ADD CONSTRAINT `Profesor_ibfk_1` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
    ADD CONSTRAINT `Tarea_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Tarea_ibfk_2` FOREIGN KEY (`id_calificacion_empresa`) REFERENCES `calificacion` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
