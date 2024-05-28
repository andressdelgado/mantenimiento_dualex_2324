-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para dualex3
CREATE DATABASE IF NOT EXISTS `dualex3` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `dualex3`;

-- Volcando estructura para tabla dualex3.actividad
CREATE TABLE IF NOT EXISTS `Actividad` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(1024) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.actividad_curso
CREATE TABLE IF NOT EXISTS `Actividad_Curso` (
  `id_actividad` int(10) unsigned NOT NULL,
  `id_curso` int(10) unsigned NOT NULL,
  `orden` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_actividad`,`id_curso`),
  UNIQUE KEY `id_curso_uq` (`id_curso`,`orden`),
  KEY `id_curso` (`id_curso`),
  CONSTRAINT `Actividad_Curso_ibfk_1` FOREIGN KEY (`id_actividad`) REFERENCES `Actividad` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Actividad_Curso_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `Curso` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.actividad_modulo
CREATE TABLE IF NOT EXISTS `Actividad_Modulo` (
  `id_actividad` int(10) unsigned NOT NULL,
  `id_modulo` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_actividad`,`id_modulo`),
  KEY `id_modulo` (`id_actividad`,`id_modulo`),
  KEY `Actividad_Modulo_ibfk_2` (`id_modulo`),
  CONSTRAINT `Actividad_Modulo_ibfk_1` FOREIGN KEY (`id_actividad`) REFERENCES `Actividad` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Actividad_Modulo_ibfk_2` FOREIGN KEY (`id_modulo`) REFERENCES `Modulo` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.actividad_modulo_tarea
CREATE TABLE IF NOT EXISTS `Actividad_Modulo_Tarea` (
  `id_actividad` int(10) unsigned NOT NULL COMMENT 'Cualquier actividad del módulo relacionada con la tarea',
  `id_modulo` int(10) unsigned NOT NULL,
  `id_tarea` int(10) unsigned NOT NULL,
  `revisado` tinyint(4) NOT NULL DEFAULT 0,
  `comentario` text DEFAULT NULL COMMENT 'Evaluación del profesor',
  PRIMARY KEY (`id_actividad`,`id_modulo`,`id_tarea`),
  KEY `id_actividad` (`id_actividad`,`id_tarea`),
  CONSTRAINT `Actividad_Modulo_Tarea_ibfk_1` FOREIGN KEY (`id_actividad`, `id_tarea`) REFERENCES `Actividad_Tarea` (`id_actividad`, `id_tarea`) ON DELETE CASCADE,
  CONSTRAINT `Actividad_Modulo_Tarea_ibfk_2` FOREIGN KEY (`id_actividad`, `id_modulo`) REFERENCES `Actividad_Modulo` (`id_actividad`, `id_modulo`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.actividad_tarea
CREATE TABLE IF NOT EXISTS `Actividad_Tarea` (
  `id_actividad` int(10) unsigned NOT NULL,
  `id_tarea` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_actividad`,`id_tarea`),
  KEY `id_tarea` (`id_tarea`),
  CONSTRAINT `Actividad_Tarea_ibfk_1` FOREIGN KEY (`id_actividad`) REFERENCES `Actividad` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Actividad_Tarea_ibfk_2` FOREIGN KEY (`id_tarea`) REFERENCES `Tarea` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.alumno
CREATE TABLE IF NOT EXISTS `Alumno` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_curso` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_curso` (`id_curso`),
  CONSTRAINT `Alumno_ibfk_1` FOREIGN KEY (`id`) REFERENCES `Usuario` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Alumno_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `Curso` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.calificacion
CREATE TABLE IF NOT EXISTS `Calificacion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(256) DEFAULT NULL,
  `valor` int(11) NOT NULL,
  `descripcion` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='Valores de la calificación de la empresa';

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.ciclo
CREATE TABLE IF NOT EXISTS `Ciclo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `siglas` varchar(256) DEFAULT NULL,
  `grado` enum('Grado Superior','Grado Medio') DEFAULT NULL,
  `nombre` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.convenio
CREATE TABLE IF NOT EXISTS `Convenio` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `fecha_firma` date NOT NULL,
  `documento` longblob DEFAULT NULL,
  `id_ciclo` int(10) unsigned NOT NULL,
  `id_empresa` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_convenio_ciclo` (`id_ciclo`),
  KEY `fk_convenio_empresa` (`id_empresa`),
  CONSTRAINT `fk_convenio_ciclo` FOREIGN KEY (`id_ciclo`) REFERENCES `Ciclo` (`id`),
  CONSTRAINT `fk_convenio_empresa` FOREIGN KEY (`id_empresa`) REFERENCES `Empresa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.curso
CREATE TABLE IF NOT EXISTS `Curso` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `codigo` varchar(256) DEFAULT NULL,
  `titulo` varchar(256) DEFAULT NULL,
  `grado` enum('Grado Superior','Grado Medio') DEFAULT NULL,
  `id_profesor` int(10) unsigned DEFAULT NULL COMMENT 'Coordinador del curso',
  `color_fondo` varchar(256) DEFAULT '#0000FF',
  `color_letra` varchar(256) DEFAULT '#FFFFFF',
  PRIMARY KEY (`id`),
  KEY `id_profesor` (`id_profesor`),
  CONSTRAINT `Curso_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `Profesor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.curso_modulo
CREATE TABLE IF NOT EXISTS `Curso_Modulo` (
  `id_curso` int(10) unsigned NOT NULL,
  `id_modulo` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_curso`,`id_modulo`),
  KEY `Curso_Modulo_ibfk_2` (`id_modulo`),
  CONSTRAINT `Curso_Modulo_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `Curso` (`id`),
  CONSTRAINT `Curso_Modulo_ibfk_2` FOREIGN KEY (`id_modulo`) REFERENCES `Modulo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.dualex
CREATE TABLE IF NOT EXISTS `Dualex` (
  `parametro` varchar(256) NOT NULL,
  `valor` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`parametro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.empresa
CREATE TABLE IF NOT EXISTS `Empresa` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cif` char(9) DEFAULT NULL,
  `direccion` varchar(256) DEFAULT NULL,
  `nombre` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.empresa_ciclo_convenio
CREATE TABLE IF NOT EXISTS `Empresa_Ciclo_Convenio` (
  `id_empresa` int(10) unsigned NOT NULL,
  `id_ciclo` int(10) unsigned NOT NULL,
  `id_convenio` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_empresa`,`id_ciclo`,`id_convenio`),
  UNIQUE KEY `Empresa_Convenio` (`id_empresa`,`id_convenio`),
  KEY `Empresa_Ciclo_Convenio_ibfk_2` (`id_ciclo`),
  KEY `Empresa_Ciclo_Convenio_ibfk_3` (`id_convenio`),
  CONSTRAINT `Empresa_Ciclo_Convenio_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `Empresa` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `Empresa_Ciclo_Convenio_ibfk_2` FOREIGN KEY (`id_ciclo`) REFERENCES `Ciclo` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `Empresa_Ciclo_Convenio_ibfk_3` FOREIGN KEY (`id_convenio`) REFERENCES `Convenio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.imagen
CREATE TABLE IF NOT EXISTS `Imagen` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_tarea` int(10) unsigned NOT NULL,
  `imagen` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tarea` (`id_tarea`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.log
CREATE TABLE IF NOT EXISTS `Log` (
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `usuario` varchar(256) DEFAULT NULL,
  `controlador` varchar(256) DEFAULT NULL,
  `metodo` varchar(256) DEFAULT NULL,
  `pathParams` text DEFAULT NULL,
  `queryParams` longtext DEFAULT NULL,
  `body` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.modulo
CREATE TABLE IF NOT EXISTS `Modulo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `orden` int(10) unsigned DEFAULT NULL COMMENT 'Orden en el que aparecerán en el informe',
  `codigo` varchar(256) DEFAULT NULL,
  `titulo` varchar(256) DEFAULT NULL,
  `color_fondo` varchar(256) DEFAULT '#0000FF',
  `color_letra` varchar(256) DEFAULT '#FFFFFF',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.modulo_profesor
CREATE TABLE IF NOT EXISTS `Modulo_Profesor` (
  `id_modulo` int(10) unsigned NOT NULL,
  `id_profesor` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_modulo`,`id_profesor`),
  KEY `id_profesor` (`id_profesor`),
  CONSTRAINT `Modulo_Profesor_ibfk_1` FOREIGN KEY (`id_modulo`) REFERENCES `Modulo` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Modulo_Profesor_ibfk_2` FOREIGN KEY (`id_profesor`) REFERENCES `Profesor` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.periodo
CREATE TABLE IF NOT EXISTS `Periodo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(256) DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='Fechas de los periodos de evaluación';

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.profesor
CREATE TABLE IF NOT EXISTS `Profesor` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  CONSTRAINT `Profesor_ibfk_1` FOREIGN KEY (`id`) REFERENCES `Usuario` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.tarea
CREATE TABLE IF NOT EXISTS `Tarea` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_alumno` int(10) unsigned DEFAULT NULL,
  `titulo` varchar(256) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha` date DEFAULT NULL COMMENT 'Fecha de realización de la tarea',
  `fecha_fin` date DEFAULT NULL,
  `id_calificacion_empresa` int(10) unsigned DEFAULT NULL COMMENT 'Calificación del tutor de empresa',
  `comentario_calificacion_empresa` text DEFAULT NULL,
  `calificacion_v1` bit(1) DEFAULT NULL COMMENT 'Calificación del profesor.',
  `evaluacion_v1` text DEFAULT NULL COMMENT 'Evaluación del profesor',
  `imagenes` longtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_alumno` (`id_alumno`),
  KEY `id_calificacion_empresa` (`id_calificacion_empresa`),
  CONSTRAINT `Tarea_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `Alumno` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Tarea_ibfk_2` FOREIGN KEY (`id_calificacion_empresa`) REFERENCES `Calificacion` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla dualex3.usuario
CREATE TABLE IF NOT EXISTS `Usuario` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(256) DEFAULT NULL,
  `apellidos` varchar(256) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- La exportación de datos fue deseleccionada.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
