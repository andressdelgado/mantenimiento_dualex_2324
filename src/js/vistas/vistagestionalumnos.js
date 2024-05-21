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
    this.listaAlumnosAltaBtn = document.getElementById('gestionAlumnosAlta')
    this.listaAlumnosSelect = document.getElementById('selectCicloListadoAlumnos')

    // Asociamos eventos
    this.listaAlumnosAltaBtn.addEventListener('click', this.altaAlumno.bind(this))

    // Ejecutar metodos necesarios
    this.cargarCiclos()
    this.cargarDatosAlumnos()
  }

  /**
   * Carga los ciclos en el select de la vista.
   */

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
