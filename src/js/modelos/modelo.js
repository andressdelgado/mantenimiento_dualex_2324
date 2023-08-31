/**
  Modelo de la aplicación.
  Se responsabiliza del mantenimiento y gestión de los datos.
  Utiliza el Servicio de Rest.
**/

// Servicios
import { Rest } from '../servicios/rest.js'

/**
  Modelo de la aplicación.
  Se responsabiliza del mantenimiento y gestión de los datos.
  Utiliza el Servicio de Rest.
**/
export class Modelo {
  /**
    Devuelve la lista de alumnos de un profesor.
    La lista está formada por los alumnos que están asignados a los módulos a los que el profesor está asignado.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  getAlumnosProfesor () {
    return Rest.get('alumno', ['profesor'])
  }

  /**
    Devuelve la lista de tareas de un alumno.
    @param alumno {Alumno} Datos del alumno.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  getTareasAlumno (alumno) {
    const queryParams = new Map()
    queryParams.set('id', alumno.id)
    return Rest.get('tarea', ['alumno'], queryParams)
  }

  /**
    Devuelve la lista de actividades definidas.
    @param idCurso {Number} Identificador del curso.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  getActividades (idCurso) {
    return Rest.get('actividad', [idCurso])
  }

  /**
    Devuelve la lista de calificaciones definidas.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  getCalificaciones () {
    return Rest.get('calificacion')
  }

  /**
    Devuelve la lista de periodos definidos.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  getPeriodos () {
    return Rest.get('periodo')
  }

  /**
    Crea una tarea.
    @param tarea {Tarea} Datos de la tarea.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  crearTarea (tarea) {
    return Rest.post('tarea', [], tarea)
  }

  /**
    Devuelve los datos de una tarea.
    @param idTarea {Number} Identificador de la tarea.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  getTarea (idTarea) {
    return Rest.get('tarea', [idTarea])
  }

  /**
    Modifica una tarea.
    @param tarea {Tarea} Datos de la tarea.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  modificarTarea (tarea) {
    return Rest.put('tarea', [], tarea)
  }

  /**
    Borrar una tarea.
    @param tarea {Tarea} Datos de la tarea.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  borrarTarea (tarea) {
    return Rest.delete('tarea', [tarea.id])
  }

  /**
    Devuelve la información del informe de evaluación de un alumno.
    @param alumno {Alumno} Datos del alumno.
    @param periodo {Number} Identificador del periodo para el que se solicita el informe.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  getInformeAlumno (alumno, periodo) {
    const queryParams = new Map()
    queryParams.set('id_alumno', alumno.id)
    queryParams.set('id_periodo', periodo)
    return Rest.get('informe', [], queryParams)
  }

  /**
    Devuelve la lista de ciclos definidos.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
    getCursos () {
      return Rest.get('curso')
    }
    /**
    Devuelve la lista de actividades del alumno con su nota media.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
    getActividadNotas (id,periodo) {
      const queryParams = new Map()
      queryParams.set('id_alumno', id)
      queryParams.set('periodo', periodo)
      return Rest.get('actividad', ['actividadNota'], queryParams)
    }
    /**
    Devuelve la lista de módulos del alumno con su nota media.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
    getModulosNotas (id,periodo) {
      const queryParams = new Map()
      queryParams.set('id_alumno', id)
      queryParams.set('periodo', periodo)
      return Rest.get('modulo', ['moduloNota'], queryParams)
    }
}
