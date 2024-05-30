/**
 Vista con el listado de alumnos de un ciclo.
 **/
import { Vista } from './vista.js'

export class VistaGestionAlumnos extends Vista {
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
    this.listaAlumnos = document.getElementById('gestionAlumnosListado')
    this.listaAlumnosSelect = document.getElementById('selectCursoListadoAlumnos')

    // Asociamos eventos
    this.listaAlumnosSelect.addEventListener("change",this.cargarFiltrado.bind(this))

    // Ejecutar metodos necesarios

  }

  /**
   * Carga los cursos en el select de la vista.
   */
  cargarFiltroCursos(){
    if (this.cursos.length === 0) {
      this.controlador.getCursos()
        .then(cursos => {

          let option1 = document.createElement('option')
          this.listaAlumnosSelect.appendChild(option1)
          option1.value = ''
          option1.textContent = 'Seleccione'
          option1.disabled = 'true'

          for (let i = 0; i < cursos.length; i++) {
            this.cursos[i] = cursos[i]
            let option = document.createElement('option')
            this.listaAlumnosSelect.appendChild(option)
            option.value = cursos[i].codigo
            option.textContent = cursos[i].codigo
          }
        })
        .catch(error => console.log(error))
    }
  }

  /**
   * Carga los alumnos en el listado filtrados por curso.
   */
  cargarFiltrado(){
    this.listaAlumnos.innerHTML = ''
    const curso = this.listaAlumnosSelect.value
    this.controlador.getAlumnosByCurso(curso)
      .then(alumnos => {
        if (alumnos.length > 0){
          for(let i=0; i<alumnos.length; i++){
              this.crearDivAlumno(alumnos[i])
          }
        } else {
          const div = document.createElement('div')
          this.base.appendChild(div)
          div.textContent = 'No hay ningún alumno que coincida.'
        }
      })
  }

  /**
   Crea el div asociado a un alumno y lo añade a la base.
   @param alumno {Alumno} Datos del alumno.
   **/
  crearDivAlumno (alumno){

    const div = document.createElement('div')
    this.listaAlumnos.appendChild(div)

    const spanAlumno = document.createElement('span')
    div.appendChild(spanAlumno)
    spanAlumno.classList.add('alumno')
    spanAlumno.textContent = `${alumno.nombre} ${alumno.apellidos} `
    spanAlumno.addEventListener("click", () => this.modificarAlumno(alumno))

    const spanAlumnoEmail = document.createElement('span')
    div.appendChild(spanAlumnoEmail)
    spanAlumnoEmail.textContent = `/ ${alumno.email}`

    const spanIconos = document.createElement('span')
    div.appendChild(spanIconos)
    spanIconos.classList.add('iconos')

    const spanIconoBorrar = document.createElement('img')
    spanIconos.appendChild(spanIconoBorrar)
    spanIconoBorrar.classList.add('icono')
    spanIconoBorrar.src = 'iconos/delete.svg'
    spanIconoBorrar.addEventListener("click", () => this.borrarAlumno(alumno.id, alumno.nombre))

  }

  /**
   * Borra el alumno seleccionado.
   * @param alumnoId {Number} Identificador del alumno.
   */
  borrarAlumno(alumnoId, alumnoNombre) {
    this.controlador.eliminarAlumno(alumnoId, alumnoNombre)
  }


  /**
   * Redirige a la vista para modificar el alumno.
   * @param alumno {} Datos modificables del alumno.
   */
  modificarAlumno (alumno) {
    this.controlador.mostrarModificarAlumno(alumno, this.cursos)
  }

}
