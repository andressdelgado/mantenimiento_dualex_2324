/**
 Vista con el listado de alumnos de un ciclo.
 **/
import { Vista } from './vista.js'

export class VistaGestionAlumnos extends Vista{
  /**
   Constructor de la clase.
   @param {Object} controlador Controlador de la vista.
   @param {Node} base Nodo al que se añadirá la vista.
   **/
  constructor (controlador, base) {
    super(controlador)
    this.base = base

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
    console.log('cargarFiltroCursos')
    this.cursos = []
    this.controlador.getCursos()
      .then(cursos => {

        let option1 = document.createElement('option')
        this.listaAlumnosSelect.appendChild(option1)
        option1.value = ''
        option1.textContent = 'Seleccione'
        option1.disabled = 'true'

        for(let i=0; i<cursos.length; i++){
          this.cursos[i]=cursos[i]
          let option = document.createElement('option')
          this.listaAlumnosSelect.appendChild(option)
          option.value = cursos[i].codigo
          option.textContent = cursos[i].codigo
        }
      })
      .catch(error => console.log(error))
  }

  /**
   * Carga los alumnos en el listado filtrados por curso.
   */
  cargarFiltrado(){
    this.eliminarHijos(this.listaAlumnos, 1)
    const curso = this.listaAlumnosSelect.value
    this.controlador.getAlumnosByCurso(curso)
      .then(alumnos => {
        //     if(this.select.value=='todos'){
        //       for(let i=0; i<alumnos.length; i++){
        //         this.crearDivAlumno(alumnos[i])
        //       }
        //     }
        //     else{
        //       this.creadivs = false
        for (let i = 0; i < alumnos.length; i++) {
          if (alumnos[i].codigo == this.select.value) {
            this.creadivs = true
            this.crearDivAlumno(alumnos[i])
          }
        }
        //       if(this.creadivs == false){
        //         const div = document.createElement('div')
        //         this.base.appendChild(div)
        //         div.textContent = 'No hay ningún alumno de este curso.'
        //       }
        //     }
        //   })
      })
  }

  /**
   Crea el div asociado a un alumno y lo añade a la base.
   @param alumno {Alumno} Datos del alumno.
   **/
  crearDivAlumno (alumno){
    const div = document.createElement('div')
    this.base.appendChild(div)

    const spanAlumno = document.createElement('span')
    div.appendChild(spanAlumno)
    spanAlumno.classList.add('alumno')
    spanAlumno.textContent = `${alumno.nombre} ${alumno.apellidos}`
    spanAlumno.onclick = this.pulsarTareas.bind(this, alumno)
  }

  /**
   * Carga los alumnos en el listado.
   */
  cargarDatosAlumnos () {
    this.controlador.recibirDatosAlumnos()
      .then(alumnos => {
        // Limpiar contenido actual de la lista
        this.listaAlumnos.innerHTML = ''

        // Sobre cada alumno crear fila de la lista
        alumnos.forEach(alumno => {
          const fila = document.createElement('span')
          fila.textContent = alumno.nombre
          fila.textContent += " " + alumno.apellidos
          this.listaAlumnos.appendChild(fila)
        })
      })
  }

}
