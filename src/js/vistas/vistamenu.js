/**
  Vista del menú de navegación de la aplicación.
  Muestra los enlaces de contexto.
**/

import { Vista } from './vista.js'

export class VistaMenu extends Vista{
  /**
    Constructor de la clase.
    @param {Object} controlador Controlador de la vista principal.
    @param {Node} base Nodo al que se añadirá la vista principal.
  **/
  constructor (controlador, base) {
	super(controlador, 'flex')
    this.base = base
  
    // Cogemos referencias a los elementos del interfaz

    // Asociamos eventos
  }

  /**
    Muestra el menú asociado a la lista de alumnos de un profesor.
    El menú incluye: título y logout.
  **/
  verAlumnosProfesor () {
    this.limpiar()
    this.verUsuario()
    // this.verTitulo('Lista Alumnos')
    const h1 = document.createElement('h1')
    this.base.appendChild(h1)
    h1.appendChild(document.createTextNode('Lista de Alumnos'))
    h1.appendChild(this.crearIconoAyuda('Muestra la lista de alumnos que tienen tareas registradas de los módulos asignados al profesor'))
    this.verLogout(2)
    this.verAcercaDe()
  }

  /**
    Muestra el menú asociado a la vista de informe de alumno.
    @param alumno {Alumno} Datos del alumno.
  **/
  verInforme (alumno) {
    this.limpiar()
    this.verUsuario()
    this.verTitulo(`Informe de ${alumno.nombre} ${alumno.apellidos}`)
    this.base.appendChild(this.crearIcono('volver.svg', 2, 'volver', this.controlador.mostrarAlumnos.bind(this.controlador)))
    this.base.appendChild(this.crearIcono('print.svg', 1, 'imprimir', this.controlador.imprimir.bind(this.controlador)))
    this.verLogout(3)
    this.verAcercaDe()
  }

  /**
    Muestra el menú asociado a la vista de créditos.
  **/
  verCreditos () {
    this.limpiar()
    this.verUsuario()
    this.verTitulo('Acerca de DUALEX')
    if (this.controlador.getUsuario().rol === 'profesor') { this.base.appendChild(this.crearIcono('volver.svg', 2, 'volver', this.controlador.mostrarAlumnos.bind(this.controlador))) } else { this.base.appendChild(this.crearIcono('volver.svg', 2, 'volver', this.controlador.mostrarTareasAlumno.bind(this.controlador, this.controlador.getUsuario()))) }
    this.verLogout(3)
    this.verAcercaDe()
  }

  /**
    Muestra el menú asociado a la vista de tarea.
    @param tarea {Tarea} Datos de la tarea.
  **/
  verTarea (tarea) {
    this.limpiar()
    this.verUsuario()
    if (tarea) { this.verTitulo(`Tarea: ${tarea.titulo}`) } else { this.verTitulo('Nueva Tarea') }
    this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarTareasAlumno.bind(this.controlador, null)))
    this.verLogout(2)
    this.verAcercaDe()
  }

  /**
    Muestra el menú asociado a la lista de tareas de un alumno.
    El menú incluye: título y logout. Y si es un alumno se añade el icono de crear tarea.
    @param alumno {Alumno} Datos del alumno.
  **/
  verTareasAlumno (alumno) {
    this.limpiar()
    this.verUsuario()
    if (this.controlador.getUsuario().rol === 'alumno') {
      this.verTitulo('Tus Tareas')
      this.base.appendChild(this.crearIcono('add.svg', 1, 'nueva tarea', this.controlador.mostrarTarea.bind(this.controlador, null)))
    } else {
      this.verTitulo(`Tareas de ${alumno.nombre} ${alumno.apellidos}`)
      this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarAlumnos.bind(this.controlador)))
    }
    this.verLogout(2)
    this.verAcercaDe()
  }

  /**
    Elimina los elementos del menú.
  **/
  limpiar () {
	this.eliminarHijos(this.base)
  }

  /**
    Pone el icono de "Acerca de"
  **/
  verAcercaDe () {
    this.base.appendChild(this.crearIcono('question_mark.svg', 10, 'acerca de Dualex', this.controlador.verCreditos.bind(this.controlador)))
  }

  /**
    Muestra el usuario logeado.
  **/
  verUsuario () {
    const div = document.createElement('div')
    this.base.appendChild(div)
    div.textContent = this.controlador.getUsuario().email
    div.classList.add('usuario')
  }

  /**
    Muestra el título del menú.
    @param titulo {String} Título del menú.
  **/
  verTitulo (titulo) {
    const h1 = document.createElement('h1')
    this.base.appendChild(h1)
    h1.textContent = titulo
  }

  /**
    Añade el icono de logout.
    @param orden {Number} Orden de posición en el menú.
  **/
  verLogout (orden) {
    this.base.appendChild(this.crearIcono('logout.svg', orden, 'logout', this.controlador.logout.bind(this.controlador)))
  }

  /**
    Añade el icono de Nueva Tarea.
    @param order {Number} Orden de posición en el menú.
  **/
  verNuevaTarea (orden) {
    this.base.appendChild(this.crearIcono('add.svg', orden, 'nueva tarea', this.controlador.mostrarTarea.bind(this.controlador, null)))
  }

  /**
    Crea un icono para el menú.
    @param imagen {String} Nombre del fichero de imagen (svg) que formará el icono.
    @param orden {Number} Número de orden del icono en el menú.
    @param titulo {String} Texto que se mostrará en el tooltip del icono.
    @param callback {Function} Función que se llamará al pulsar el icono.
    @return {HTMLElement} Elemento HTML (img) que forma el icono.
  **/
  crearIcono (imagen, orden = null, titulo, callback = null) {
    const icono = document.createElement('img')
    icono.setAttribute('src', 'iconos/' + imagen)
    icono.setAttribute('title', titulo)
    icono.classList.add('icono')
    if (orden) { icono.style.order = orden }
    if (callback) { icono.onclick = callback }
    return icono
  }

  crearIconoAyuda (texto) {
    return this.crearIcono('help.svg', null, texto)
  }
}
