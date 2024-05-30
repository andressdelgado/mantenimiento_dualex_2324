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
    const tabla = document.createElement('table')
    const tbody = document.createElement('tbody')
    tabla.appendChild(tbody)

    // Primer TR
    const tr1 = document.createElement('tr')
    tbody.appendChild(tr1)

    // Primer TD con los módulos
    const tdModulos = document.createElement('td')
    tdModulos.setAttribute('rowspan', '2')
    tdModulos.classList.add('tdModulos')
    tarea.modulos.forEach(this.crearSpanModulo.bind(this, tdModulos))
    tr1.appendChild(tdModulos)

    // Segundo TD con el título de la tarea
    const tdTitulo = document.createElement('td')
    tdTitulo.classList.add('tarea')
    tdTitulo.setAttribute('colspan', '4')
    tdTitulo.textContent = tarea.titulo
    tdTitulo.onclick = this.pulsarEditar.bind(this, tarea)
    if(tarea.retrasada === 1)
        tdTitulo.classList.add('retrasada')
    if(tarea.retrasada === 2)
        tdTitulo.classList.add('muyRetrasada')
    tr1.appendChild(tdTitulo)

    // Tercer TD con el icono de eliminar
    let revisiones = tarea.modulos.reduce((accumulator, modulo) => accumulator + modulo.revisado, 0)
    let editable = true

    if (this.controlador.getUsuario().rol === 'alumno') {
      if (tarea.calificacion_empresa !== null) { editable = false }
      if (revisiones > 0) { editable = false }
    }

    if (editable) {
      const tdIconoEliminar = document.createElement('td')
      tdIconoEliminar.setAttribute('rowspan', '2')
      tdIconoEliminar.classList.add('centrado-vertical')
      tdIconoEliminar.classList.add('centrado-horizontal')
      const iconoEliminar = document.createElement('img')
      iconoEliminar.classList.add('icono')
      iconoEliminar.setAttribute('title', 'eliminar')
      iconoEliminar.setAttribute('src', 'iconos/delete.svg')
      iconoEliminar.onclick = this.pulsarEliminar.bind(this, tarea)
      const enlaceEliminar = document.createElement('a')
      enlaceEliminar.setAttribute('href', '#')
      enlaceEliminar.appendChild(iconoEliminar)
      tdIconoEliminar.appendChild(enlaceEliminar)
      tr1.appendChild(tdIconoEliminar)
    } else {
      const iconoConsultar = document.createElement('img')
      iconoConsultar.classList.add('icono')
      iconoConsultar.setAttribute('title', 'consultar')
      iconoConsultar.setAttribute('src', 'iconos/visibility.svg')
      iconoConsultar.onclick = this.pulsarConsultar.bind(this, tarea)
      const tdIconoConsultar = document.createElement('td')
      tdIconoConsultar.setAttribute('rowspan', '2')
      tdIconoConsultar.appendChild(iconoConsultar)
      tr1.appendChild(tdIconoConsultar)
    }

    // Segundo TR
    const tr2 = document.createElement('tr')
    tbody.appendChild(tr2)

    // Primer TD con la fecha
    const tdFecha = document.createElement('td')
    tdFecha.textContent = tarea.fecha
    tdFecha.title = 'Fecha de inicio'
    tdFecha.classList.add('centrado-horizontal')
    tr2.appendChild(tdFecha)

    // Segundo TD con la calificación de la empresa
    const tdCalificacionEmpresa = document.createElement('td')
    if (tarea.calificacion_empresa) {
      tdCalificacionEmpresa.textContent += tarea.calificacion_empresa
    } else {
      tdCalificacionEmpresa.textContent += 'Sin calificación de empresa'
    }
    tdCalificacionEmpresa.classList.add('centrado-horizontal')
    tr2.appendChild(tdCalificacionEmpresa)

    // Cuarto TD con la cantidad de revisiones
    const tdRevisiones = document.createElement('td')
    tdRevisiones.textContent = `${revisiones}/${tarea.modulos.length}`
    tdRevisiones.classList.add('centrado-horizontal')
    tdRevisiones.title = 'Revisiones de profesores'
    tr2.appendChild(tdRevisiones)

    // Verificar si es profesor y si hay tareas pendientes de revisión (Exclamacion)
    if (this.controlador.getUsuario().rol === 'profesor') {
      if (revisiones < tarea.modulos.length) {
        const spanAviso = document.createElement('span')
        spanAviso.classList.add('tarea_pendiente')
        spanAviso.textContent = '!'
        spanAviso.setAttribute('title', 'pendiente de revisión')
        tdTitulo.insertBefore(spanAviso, tdTitulo.firstChild)
      }
    }

    // Agregar la tabla al contenedor base
    this.base.appendChild(tabla)
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
