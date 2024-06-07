/**
 Vista con el listado de profesores.
 **/
import { Vista } from './vista.js'

export class VistaGestionProfesores extends Vista{
  /**
   Constructor de la clase.
   @param {Object} controlador Controlador de la vista.
   @param {Node} base Nodo al que se añadirá la vista.
   **/
  constructor (controlador, base) {
    super(controlador)
    this.base = base
    this.cursos = []

    // Cogemos referencias a los elementos del interfaz
    this.listaProfesores = document.getElementById('gestionProfesoresListado')


    // Ejecutar metodos necesarios

  }

  /**
   * Carga los profesores en el listado filtrados por curso.
   */
  cargarFiltrado(){
    this.limpiar()
    this.controlador.getProfesores()
      .then(profesores => {
        if (profesores.length > 0){
          for(let i=0; i<profesores.length; i++){
              this.crearDivProfesor(profesores[i])
          }
        } else {
          const div = document.createElement('div')
          this.base.appendChild(div)
          div.textContent = 'No hay ningún profesor que coincida.'
        }
      })
  }

  /**
   Crea el div asociado a un profesor y lo añade a la base.
   @param profesor {Profesor} Datos del profesor.
   **/
  crearDivProfesor (profesor){

    const div = document.createElement('div')
    this.listaProfesores.appendChild(div)

    const spanProfesor = document.createElement('span')
    div.appendChild(spanProfesor)
    spanProfesor.classList.add('profesor')
    spanProfesor.textContent = `${profesor.nombre} ${profesor.apellidos} `
    spanProfesor.addEventListener("click", () => this.modificarProfesor(profesor))

    const spanProfesorEmail = document.createElement('span')
    div.appendChild(spanProfesorEmail)
    spanProfesorEmail.textContent = `/ ${profesor.email}`

    const spanIconos = document.createElement('span')
    div.appendChild(spanIconos)
    spanIconos.classList.add('iconos')

    const spanIconoBorrar = document.createElement('img')
    spanIconos.appendChild(spanIconoBorrar)
    spanIconoBorrar.classList.add('icono')
    spanIconoBorrar.src = 'iconos/delete.svg'
    spanIconoBorrar.addEventListener("click", () => this.borrarProfesor(profesor.id, profesor.nombre))

  }

  /**
   * Borra el profesor seleccionado.
   * @param profesorId {Number} Identificador del profesor.
   */
  borrarProfesor(profesorId, profesorNombre) {
    this.controlador.eliminarProfesor(profesorId, profesorNombre)
  }


  /**
   * Redirige a la vista para modificar el profesor.
   * @param profesor {} Datos modificables del profesor.
   */
  modificarProfesor (profesor) {
    this.controlador.mostrarModificarProfesor(profesor)
  }

  /**
   * Limpia la lista de profesores.
   */
  limpiar() {
    this.listaProfesores.innerHTML = ''
  }

}
