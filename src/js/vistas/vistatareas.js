/**
  Vista con la lista de tareas de un alumno.
**/
import { Vista } from './vista.js'

export class VistaTareas extends Vista {
  /**
    Constructor de la clase.
    @param {Object} controlador Controlador de la vista.
    @param {Node} base Nodo al que se añadirá la vista.
  **/
  constructor (controlador, base) {
    super(controlador)
    this.base = base
    this.callback = null // Función que se llamará al cerrar el diálogo.

    // Cogemos referencias a los elementos del interfaz
    this.btnNueva = this.base.getElementsByClassName('icono_grande')[0]

    // Asociamos eventos

  }

  /**
    Carga las tareas.
    @param tareas {Array} Array de tareas.
  **/
  cargar (tareas) {
    this.eliminarHijos(this.base)
    if (!tareas) { this.base.appendChild(document.createTextNode('No tiene tareas.')) } else { tareas.forEach(this.crearDivTarea.bind(this)) }
  }

  /**
    Crea el div asociado a una tarea y lo añade a la base.
    @param tarea {Tarea} Datos de la tarea.
  **/
  crearDivTarea (tarea) {
    const div = document.createElement('div')
    this.base.appendChild(div)
    div.id = `tarea_${tarea.id}` // Nos servirá para las pruebas
    // TODO: Refactorizar para evitar DRY.
    const divIconos = document.createElement('div')
    div.appendChild(divIconos)
    divIconos.classList.add('iconos')
    let editable = true
    if (this.controlador.getUsuario().rol === 'alumno') {
      for (const modulo of tarea.modulos) {
        if (modulo.calificacion) { editable = false }
      }
      if (tarea.calificacion_empresa != null || tarea.calificacion_profesor != null) { editable = false }
    }
    if (editable) {
      const iconoEditar = document.createElement('img')
      divIconos.appendChild(iconoEditar)
      iconoEditar.classList.add('icono')
      iconoEditar.setAttribute('title', 'editar')
      iconoEditar.setAttribute('src', 'iconos/edit.svg')
      iconoEditar.onclick = this.pulsarEditar.bind(this, tarea)

      const iconoEliminar = document.createElement('img')
      divIconos.appendChild(iconoEliminar)
      iconoEliminar.classList.add('icono')
      iconoEliminar.setAttribute('title', 'eliminar')
      iconoEliminar.setAttribute('src', 'iconos/delete.svg')
      iconoEliminar.onclick = this.pulsarEliminar.bind(this, tarea)
    } else {
      const iconoConsultar = document.createElement('img')
      divIconos.appendChild(iconoConsultar)
      iconoConsultar.classList.add('icono')
      iconoConsultar.setAttribute('title', 'consultar')
      iconoConsultar.setAttribute('src', 'iconos/visibility.svg')
      iconoConsultar.onclick = this.pulsarConsultar.bind(this, tarea)
    }
    // TODO: Código de colores para las tareas en función de su evaluación.
    tarea.modulos.forEach(this.crearSpanModulo.bind(this, div))
    const spanTarea = document.createElement('span')
    div.appendChild(spanTarea)
    spanTarea.classList.add('tarea')
    spanTarea.onclick = this.pulsarEditar.bind(this, tarea)
    // Si es profesor, ponemos el aviso de tarea pendiente de corrección
    if (this.controlador.getUsuario().rol === 'profesor') {
      if (!tarea.calificacion_profesor) {
        const spanAviso = document.createElement('span')
        spanTarea.appendChild(spanAviso)
        spanAviso.classList.add('tarea_pendiente')
        spanAviso.textContent = '!'
        spanAviso.setAttribute('title', 'pendiente de evaluación')
      }
    }
    let texto = `${tarea.titulo} - `
    if (tarea.calificacion_empresa) { texto += tarea.calificacion_empresa } else { texto += 'Sin calificación de empresa' }
    // Formamos las calificaciones de cada módulo para la tarea
    const calificaciones = []
    for (const modulo of tarea.modulos) { calificaciones.push(modulo.calificacion) }
    texto += ' - Calificaciones Profesores: (' + calificaciones.join(',') + ')'
    spanTarea.appendChild(document.createTextNode(texto))
  }

  // TODO: DRY con vistaalumnos.js
  /**
    Crea el span asociado a un módulo y lo añade al div.
    @param div {DivElement} Elemento div la que se añadirá el span.
    @param alumno {Modulo} Datos del módulo.
    @param index {Number} Índice del alumno en el array.
    @param array {Array} Array de alumnos.
  **/
  crearSpanModulo (div, modulo, index, array) {
    const span = document.createElement('span')
    div.appendChild(span)
    span.classList.add('modulo')
    span.textContent = modulo.codigo
    span.setAttribute('title', modulo.titulo)
    span.style.backgroundColor = modulo.color_fondo
    span.style.color = modulo.color_letra
  }

  /**
    Atención a la pulsación en el icono de "Nueva"
  **/
  pulsarNueva () {
    this.controlador.mostrarTarea()
  }

  /**
    Atención a la pulsación en el icono de "Consultar"
    @param tarea {Tarea} Datos de la tarea.
  **/
  pulsarConsultar (tarea) {
    this.controlador.mostrarTarea(tarea)
  }

  /**
    Atención a la pulsación en el icono de "Eliminar"
    @param tarea {Tarea} Datos de la tarea.
  **/
  pulsarEliminar (tarea) {
    this.controlador.eliminarTarea(tarea)
  }

  /**
    Atención a la pulsación en el icono de "Editar"
    @param tarea {Tarea} Datos de la tarea.
  **/
  pulsarEditar (tarea) {
    this.controlador.mostrarTarea(tarea)
  }
}
