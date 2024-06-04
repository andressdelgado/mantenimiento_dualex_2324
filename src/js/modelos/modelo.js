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

    getEmpresas(){
        return Rest.get('empresa')
    }

    /**
     * Crea una empresa.
     * @param {Empresa} empresa - Datos de la empresa.
     * @return {Promise} - Devuelve la promesa asociada a la petición.
     */
    crearEmpresa(empresa) {
      return Rest.post('empresa', [], empresa);
    }

    /**
     * Borra una empresa por su ID.
     * @param {number} id - ID de la empresa a borrar.
     * @return {Promise} - Devuelve la promesa asociada a la petición.
     */
    borrarEmpresa(id) {
      return Rest.delete('empresa', [id]);
    }

    /**
     * Obtiene los datos de una empresa por su ID.
     * @param {number} id - ID de la empresa.
     * @return {Promise} - Devuelve la promesa asociada a la petición.
     */
    getEmpresaById(id) {
      return Rest.get('empresa', [id]);
    }

    /**
     * Edita una empresa.
     * @param {Empresa} datosdelaempresa - Datos actualizados de la empresa.
     * @return {Promise} - Devuelve la promesa asociada a la petición.
     */
    editarEmpresa(datosdelaempresa) {
      return Rest.put('empresa', [], datosdelaempresa);
    }

      /**
   Devuelve la lista de alumnos por curso.
   La lista está formada por los alumnos que están asignados a un curso.
   @return {Promise} Devuelve la promesa asociada a la petición.
   **/
  getAlumnosByCurso (curso) {
    const queryParams = new Map()
    queryParams.set('curso', curso)
    return Rest.get('gestionalumnos', [], queryParams)
  }

  /**
   Borrar un alumno.
   @param alumnoId {Number} Identificador del alumno.
   @return {Promise} Devuelve la promesa asociada a la petición.
   **/
  borrarAlumno (alumnoId) {
    return Rest.delete('gestionalumnos', [alumnoId])
  }

  /**
   * Realiza el alta de un alumno.
   * @param alumno {} Datos del alumno.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  altaAlumno (alumno) {
    return Rest.post('gestionalumnos', [], alumno)
  }

  /**
   * Modifica un alumno.
   * @param alumno {} Datos del alumno.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  modificarAlumno (alumno) {
    return Rest.put('gestionalumnos', [], alumno)
  }

  /**
   * Peticion que realiza una inserccion de un convenio.
   * @param datos - {Object} Datos del convenio.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  insertarConvenio (datos) {
    return Rest.post('convenio', [], datos, false)
  }

  /**
   * Peticion que devuelve los datos de un ciclo por su id.
   * @param id - {Number} Identificador del ciclo.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  recibirDatosCiclo () {
    return Rest.get('ciclo')
  }

  /**
   * Peticion que devuelve los datos de las empresas.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  recibirDatosEmpresa () {
    return Rest.get('empresa')
  }

  /**
   * Peticion que devuelve los datos de los convenios.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  recibirDatosConvenios () {
    return Rest.get('convenio')
  }

  /**
   * Peticion que edita los datos de un convenio por su id.
   * @param id - {Number} Identificador del convenio.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  editarConvenio (id, datos) {
    return Rest.put('convenio', [id], datos)
  }

  /**
   * Peticion que devuelve los datos de un convenio por su id.
   * @param id - {Number} Identificador del convenio.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  getConvenioById (id) {
    return Rest.get('convenio', [id])
  }

  /**
   * Peticion que borra un convenio por su id.
   * @param id - {Number} Identificador del convenio.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  borrarConvenioById (id) {
    return Rest.delete('convenio', [id])
  }
}
