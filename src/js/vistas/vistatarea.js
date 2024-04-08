/**
Vista con los datos de una tarea.
**/

import { Vista } from './vista.js'

export class VistaTarea extends Vista{
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
    this.iTitulo = this.base.getElementsByTagName('input')[0]
    this.iFechaInicio = this.base.getElementsByTagName('input')[1]
    this.iFechaFin = this.base.getElementsByTagName('input')[2]
		this.imgAmpliada = this.base.querySelectorAll('img')[0]
    this.iImagenes = this.base.getElementsByTagName('input')[3]
    this.taDescripcion =  this.base.getElementsByTagName('textarea')[0]
    this.divImagenes =  this.base.querySelectorAll('div')[0] //Primer div dentro de divTarea
    this.divActividades =  this.base.querySelectorAll('div')[1] //Segundo div dentro de divTarea
    this.sCalificacion = this.base.getElementsByTagName('select')[0]
    this.taComentarioCalificacionEmpresa =  this.base.getElementsByTagName('textarea')[1]
    this.divEvaluaciones =  this.base.querySelectorAll('div')[2]	//Es el tercer div dentro de divTarea
    this.divBotones = this.base.querySelectorAll('div')[3]	//Cuarto div dentro de divTarea
    this.btnCancelar =  this.base.getElementsByTagName('button')[0]
    this.btnAceptar =  this.base.getElementsByTagName('button')[1]
    this.btnAnterior =  this.base.getElementsByTagName('button')[2]
    this.btnSiguiente =  this.base.getElementsByTagName('button')[3]

    // Asociamos eventos
    this.btnCancelar.onclick = this.cancelar.bind(this)
    this.btnAceptar.onclick = this.aceptar.bind(this, 0)
    this.btnSiguiente.onclick = this.aceptar.bind(this, +1)
    this.btnAnterior.onclick = this.aceptar.bind(this, -1)
    this.iFechaInicio.addEventListener('change',this.cambioFecha.bind(this))
		this.imgAmpliada.onclick = () => this.imgAmpliada.classList.toggle('ampliada')
		
    this.numImagenes = 0
    this.imagenes = []
    this.iImagenes.addEventListener('change',this.anadirImagen.bind(this))

		this.tareas = null	//Lista de tareas
    this.tarea = null		// Referencia a la tarea que se está mostrando
		this.indiceTareaActual = null //Índice de la tarea actual en la lista de tareas.
		this.deshabilitado = null //Indica si la edición de tareas está habilitada
		this.idImagenesBorrar = []	//Array con los ids de las imágenes que hay que borrar
  }

  /**
    Carga en la vista la información de una tarea.
    @param tarea {Tarea} Información de la tarea.
  **/
  setTarea (tarea) {
    this.iImagenes.disabled = false
    this.tarea = tarea
    this.iTitulo.value = tarea.titulo
    this.iFechaInicio.value = tarea.fecha
    this.iFechaFin.value = tarea.fecha_fin
    this.taDescripcion.value = tarea.descripcion
    this.taComentarioCalificacionEmpresa.value = tarea.comentario_calificacion_empresa
    
    // Seleccionamos la calificación de la empresa
    this.cargarCalificaciones()
      .then(respuesta => {
        this.sCalificacion.value = tarea.id_calificacion_empresa
        if (this.controlador.getUsuario().rol === 'alumno') {
          if (tarea.id_calificacion_empresa || tarea.calificacion) { this.deshabilitar(true) }
          for (const modulo of tarea.modulos) {
            if (modulo.calificacion) { this.deshabilitar(true) }
          }
        } else {
          for (const modulo of tarea.modulos) {
            if (modulo.revisado) { this.deshabilitarActividades(true) }
          }
        }
      })
    // Creamos el interfaz para mostrar las revisiones de los módulos
    while (this.divEvaluaciones.firstChild) { this.divEvaluaciones.firstChild.remove() }
    for (const modulo of tarea.modulos) {
      const div = document.createElement('div')
      this.divEvaluaciones.appendChild(div)
      div.classList.add('alto')
      this.crearSpanModulo(div, modulo)
      if (this.controlador.getUsuario().rol === 'alumno') {
        let revision = ' Sin revisar'
        if (modulo.revisado) { revision = ` Revisado. ${modulo.comentario}` }
        div.appendChild(document.createTextNode(revision))
      }
      if (this.controlador.getUsuario().rol === 'profesor') {
        const iCalificacion = document.createElement('input')
        div.appendChild(iCalificacion)
        iCalificacion.value = modulo.revisado
        iCalificacion.setAttribute('type', 'checkbox')
        if(iCalificacion.value== 1){
          iCalificacion.checked = true
        }
        else{
          iCalificacion.checked = false
        }
        this.sCalificacion.value = iCalificacion.value
        const revisado = document.createElement('label')
        div.appendChild(revisado)
        revisado.textContent = 'Revisado'
        revisado.style.fontWeight = 'lighter'
        div.modulo = modulo
        div.appendChild(document.createElement('br'))
        const taEvaluacion = document.createElement('textarea')
        div.appendChild(taEvaluacion)
        taEvaluacion.value = modulo.comentario
        taEvaluacion.setAttribute('placeholder', 'Comentario de evaluación de ' + modulo.titulo)
      }
    }
    // Marcamos las actividades de la tarea
    for (const actividad of tarea.actividades) { this.divActividades.querySelector('input[data-idActividad="' + actividad.id + '"').checked = true }

		// Cargamos las imágenes
		for (const imagen of tarea.imagenes)
			this.crearImagen(imagen.imagen, imagen.id)

		this.tareas = this.controlador.getTareas()
		this.indiceTareaActual = this.tareas.findIndex( (tarea) => tarea.id === this.tarea.id)
		if (this.indiceTareaActual === 0)
			this.btnAnterior.style.display = 'none'
		if (this.indiceTareaActual === this.tareas.length - 1)
			this.btnSiguiente.style.display = 'none'
  }

  /**
    Crea el span asociado a un módulo y lo añade al div.
    @param div {DivElement} Elemento div al que se añadirá el span.
    @param alumno {Modulo} Datos del módulo.
    @param index {Number} Índice del alumno en el array.
    @param array {Array} Array de alumnos.
    TODO: Refactorizar con vistatareas.js
  **/
  crearSpanModulo (div, modulo, index, array) {
    this.array = array
    const span = document.createElement('span')
    div.appendChild(span)
    span.classList.add('modulo')
    span.textContent = modulo.codigo
    span.setAttribute('title', modulo.titulo)
    span.style.backgroundColor = modulo.color_fondo
    span.style.color = modulo.color_letra
  }

  /**
    Cambia la capacidad de editar los campos de la vista (para el alumno).
    @param deshabilitar {Boolean} True para deshabilitar los campos.
  **/
  deshabilitar (deshabilitar) {
		this.deshabilitado = deshabilitar
    this.iTitulo.disabled = deshabilitar
    this.iFechaInicio.disabled = deshabilitar
    this.iFechaFin.disabled = deshabilitar
    this.iImagenes.disabled = deshabilitar
    this.taDescripcion.disabled = deshabilitar
    this.taComentarioCalificacionEmpresa.disabled = deshabilitar
    this.sCalificacion.disabled = deshabilitar
    this.deshabilitarActividades(deshabilitar)
    if (deshabilitar) { 
			this.btnAceptar.style.display = 'none'
			this.btnAnterior.textContent = 'Ver Tarea Anterior'
			this.btnSiguiente.textContent = 'Ver Tarea Siguiente'
		} else { 
			this.btnAceptar.style.display = 'inline'
			this.btnAnterior.textContent = 'Tarea Anterior (sin guardar)'
			this.btnSiguiente.textContent = 'Aceptar y Siguiente'
		}
		//Quitamos los iconos para eliminar imágenes
		this.divImagenes.querySelectorAll('img[title="eliminar la imagen"]').forEach( icono => {icono.style.display = 'none'})
  }

  /**
    Deshabilita la modificación de actividades
    @param deshabilitar {Boolean} True para deshabilitar los campos.
  **/
  deshabilitarActividades (deshabilitar) {
    for (const input of this.divActividades.getElementsByTagName('input')) { input.disabled = deshabilitar }
  }

  /**
    Muestra u oculta.
    Al mostrar la vista carga las actividades.
    @param ver {Boolean} True para mostrar, false para ocultar
    @param tarea {Tarea} Información de la tarea que se quiere mostrar (solo en edición).
  **/
  mostrar (ver, tarea = null) {
    if (ver) {
      this.limpiar()
      this.deshabilitar(false)
      for (const input of this.divActividades.getElementsByTagName('input')) { input.checked = false }
      this.iTitulo.focus()

      if (tarea) {
				//Mostramos los botones de Anterior y Siguiente
				this.btnAnterior.style.display = 'inline'
				this.btnSiguiente.style.display = 'inline'
        this.cargarActividades(tarea.id_curso)
          .then(() => this.setTarea(tarea))
      } else {
        this.cargarActividades(this.controlador.getUsuario().idCurso)
        this.tarea = null
        const hoy = new Date()
        this.iFechaInicio.value = hoy.toLocaleDateString('en-CA')
        this.cargarCalificaciones()
      }
    }
    super.mostrar(ver)
  }

  /**
    Borra los datos del interfaz.
  **/
  limpiar () {
    this.iTitulo.value = ''
    this.iFechaInicio.value = ''
    this.iFechaFin.value = ''
    this.taDescripcion.value = ''
    this.sCalificacion.selectedIndex = 0
    this.taComentarioCalificacionEmpresa.value = ''
    while (this.divImagenes.firstChild) { this.divImagenes.firstChild.remove() }
    while (this.divEvaluaciones.firstChild) { this.divEvaluaciones.firstChild.remove() }
		//Ocultamos los botones de Anterior y Siguiente
    this.btnAnterior.style.display = 'none'
    this.btnSiguiente.style.display = 'none'

		this.idImagenesBorrar = []	//Vaciamos la lista de imágenes a borrar
  }

  /**
    Carga la lista de Actividades de un curso.
    @param idCurso {Number} Identificador del curso.
    @return Promise
  **/
  cargarActividades (idCurso) {
    return this.controlador.verActividades(idCurso)
      .then(actividades => {
        this.eliminarHijos(this.divActividades)
        for (const actividad of actividades) {
          const div = document.createElement('div')
          this.divActividades.appendChild(div)
          const input = document.createElement('input')
          div.appendChild(input)
          input.setAttribute('type', 'checkbox')
          input.setAttribute('data-idActividad', actividad.id)
          const label = document.createElement('label')
          div.appendChild(label)
          label.textContent = actividad.orden + '. ' + actividad.titulo
          label.setAttribute('title', actividad.descripcion)
        }
      })
  }

  /**
    Carga la lista de Calificaciones.
    @param calificaciones {Calificaciones[]} Array de Calificaciones definidas.
    @return Promise de la petición.
  **/
  cargarCalificaciones (calificaciones) {
    return this.controlador.verCalificaciones()
      .then(calificaciones => {
        this.eliminarHijos(this.sCalificacion, 2)
        for (const calificacion of calificaciones) {
          const option = document.createElement('option')
          this.sCalificacion.appendChild(option)
          option.setAttribute('value', calificacion.id)
          option.setAttribute('title', calificacion.descripcion)
          if (this.controlador.getUsuario().rol === 'profesor') { option.textContent = calificacion.titulo} else { option.textContent = calificacion.titulo }
        }
      })
  }

  /**
    Vuelve a la vista de tareas del alumno.
  **/
  volver () {
    this.controlador.mostrarTareasAlumno(this.controlador.getUsuario())
  }

  /**
    Recoge los datos de la Tarea y la envía al controlador.
		@param siguiente {Numnber} 0 - Volver al menú de Tareas, -1 - Ir a la tarea anterior, +1 - Ir a la siguiente tarea
  **/
  aceptar (siguiente = 0) {
		let siguienteTarea = null
		if (siguiente != 0)
			siguienteTarea = this.tareas[this.indiceTareaActual + siguiente]

		if (this.deshabilitado){
        this.controlador.mostrarTarea(siguienteTarea)
				window.scroll(0,0)
				return
			}
    try {
      // Validación de datos.
      if (this.iTitulo.value.length < 5) { throw Error('Debes especificar un título para la tarea que sea descriptivo.') }
      if (this.iFechaInicio.value === '') { throw Error('Debes especificar una fecha válida para la tarea.') }
      if (this.iFechaFin.value === '') { throw Error('Debes especificar una fecha de fin válida para la tarea.') }
      if (new Date(this.iFechaFin.value) < new Date(this.iFechaInicio.value)) { throw Error('La fecha de fin no puede ser anterior a la de inicio.') }
      if (new Date(this.iFechaInicio.value) > new Date()) { throw Error('No registres tareas que no hayas hecho todavía.') }
      if (this.taDescripcion.length < 10) { throw Error('Debes describir detalladamente la tarea.') }

      const tarea = {}
      tarea.titulo = this.iTitulo.value
      tarea.fecha = this.iFechaInicio.value
      tarea.fecha_fin = this.iFechaFin.value
      tarea.descripcion = this.taDescripcion.value
			tarea.imagenes = []
			this.divImagenes.querySelectorAll('.imgTarea').forEach( 
				img => tarea.imagenes.push({'id': img.getAttribute('data-idImagen'), 'src': img.src})
			)
      tarea.actividades = []
      for (const iActividad of document.querySelectorAll('input[data-idActividad]')) {
        if (iActividad.checked) { tarea.actividades.push(iActividad.getAttribute('data-idActividad')) }
      }
      tarea.idCalificacionEmpresa = this.sCalificacion.value
      tarea.comentarioCalificacionEmpresa = this.taComentarioCalificacionEmpresa.value
      tarea.evaluaciones = []
      if (this.controlador.getUsuario().rol === 'profesor') {
        for (const divEvaluacion of this.divEvaluaciones.getElementsByTagName('div')) {
          if(divEvaluacion.getElementsByTagName('input')[0].checked == true){
            divEvaluacion.getElementsByTagName('input')[0].value = 1
          }
          else{
            divEvaluacion.getElementsByTagName('input')[0].value = 0
          }
          const revisado = divEvaluacion.getElementsByTagName('input')[0].value
          const comentario = divEvaluacion.getElementsByTagName('textarea')[0].value
          const evaluacion = {
            id: divEvaluacion.modulo.id,
            revisado,
            comentario
          }
          tarea.evaluaciones.push(evaluacion)
        }
      }

      if (this.tarea) {
        tarea.id = this.tarea.id
				tarea.idImagenesBorrar = this.idImagenesBorrar
        this.controlador.modificarTarea(tarea, siguienteTarea)
      } else { this.controlador.crearTarea(tarea, siguienteTarea) }
    } catch (e) {
      this.controlador.gestionarError(e)
      window.scroll(0,0)
    }
		window.scroll(0,0)
  }

  /**
    Cancela la acción y vuelve a la vista anterior.
  **/
  cancelar () {
    this.controlador.mostrarTareasAlumno()
  }

    /*
    Cambia la fecha fin si se cambia la fecha de inicio
    */
    cambioFecha(){
      this.iFechaFin.value = this.iFechaInicio.value
    }

    /**
     * Añadir imagen al array
     */
    async anadirImagen(){
        let valorimagen = null
        const archivo = this.iImagenes.files[0]
        const lector = new FileReader()
        lector.addEventListener('load',() => {
          valorimagen = lector.result
          if (valorimagen.length > 8000000){
          	this.controlador.gestionarError('La imagen no puede exceder de 8MB.') 
          	return
          }
		  this.crearImagen(valorimagen)
          this.iImagenes.value = ''
        })
        lector.readAsDataURL(archivo)
    }

		/**
			Crea un div con la imagen y el icono de borrado y los añade al divImagenes.
			@param base64Imagen {String} Texto con la imagen codificada en Base64.
		**/
		crearImagen(base64Imagen, idImagen = null){
			let img = document.createElement('img')
			this.divImagenes.appendChild(img)
			img.src = base64Imagen
			img.setAttribute('data-idImagen', idImagen)
			img.classList.add('imgTarea')
    	img.onclick = () => {
				this.imgAmpliada.src = img.src
				this.imgAmpliada.classList.toggle('ampliada')
			}

			let iconoEliminar = document.createElement('img')
			iconoEliminar.src = './iconos/delete.svg'
			iconoEliminar.title = 'eliminar la imagen'
    	iconoEliminar.onclick = () => {
				img.remove()
				iconoEliminar.remove()
				if (idImagen)
					this.idImagenesBorrar.push(idImagen)
			}

			this.divImagenes.appendChild(img)
			this.divImagenes.appendChild(iconoEliminar)
		}
}
