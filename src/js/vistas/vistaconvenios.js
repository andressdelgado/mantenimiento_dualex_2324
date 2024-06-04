import { Vista } from './vista.js'

/**
 Vista correspondiente al listado de convenios de la aplicación dualex.
 Sirve para dar de listar todos los convenios.
 **/
export class VistaConvenios extends Vista {
  /**
   Constructor de la clase.
   @param {Object} controlador Controlador de la vista principal.
   @param {Node} base Nodo al que se añadirá la vista principal.
   **/
  constructor (controlador, base) {
    super(controlador)
    this.base = base
    // Cogemos la referencia de la tabla de la interfaz
    this.tablaConvenios = this.base.getElementsByTagName('table')[0]
  }

  /**
   * Carga los convenios en la tabla del listado.
   */
  cargarDatosConvenios () {
    this.controlador.recibirDatosConvenios()
      .then(convenios => {
        // Limpiar contenido actual de la tabla
        this.tablaConvenios.innerHTML = ''

        if (!convenios || convenios.length === 0)
          throw new Error('No hay convenios registrados')

        // Crear encabezados
        const encabezados = document.createElement('tr')

        // Crear th
        const thTitulo = document.createElement('th')
        thTitulo.textContent = 'Título'

        const thFechaFirma = document.createElement('th')
        thFechaFirma.textContent = 'Fecha Firma'

        const thEmpresa = document.createElement('th')
        thEmpresa.textContent = 'Empresa'

        const thCiclo = document.createElement('th')
        thCiclo.textContent = 'Ciclo'

        const thVerConvenio = document.createElement('th')
        thVerConvenio.textContent = 'Ver Convenio'

        const thModificar = document.createElement('th')
        thModificar.textContent = 'Editar'

        const thBorrar = document.createElement('th')
        thBorrar.textContent = 'Borrar'

        // Añadir celdas de th a la fila de encabezados
        encabezados.appendChild(thTitulo)
        encabezados.appendChild(thFechaFirma)
        encabezados.appendChild(thEmpresa)
        encabezados.appendChild(thCiclo)
        encabezados.appendChild(thVerConvenio)
        encabezados.appendChild(thModificar)
        encabezados.appendChild(thBorrar)

        // Añadir fila de encabezados al thead de la tabla
        const cabeceraTabla = this.tablaConvenios.createTHead()
        cabeceraTabla.appendChild(encabezados)

        // Sobre cada convenio crear fila de la tabla
        convenios.forEach(convenio => {
          const fila = document.createElement('tr')

          // Creacion de celdas
          const tituloCelda = document.createElement('td')
          tituloCelda.textContent = convenio.titulo

          const fechaFirmaCelda = document.createElement('td')
          fechaFirmaCelda.textContent = convenio.fecha_firma

          const empresaCelda = document.createElement('td')
          empresaCelda.textContent = convenio.nombreEmpresa

          const cicloCelda = document.createElement('td')
          cicloCelda.textContent = convenio.nombreCiclo

          // Crear el botón para ver el convenio
          const verConvenioCelda = document.createElement('td')
          const botonVerConvenio = document.createElement('button')
          botonVerConvenio.textContent = 'Ver Convenio'
          botonVerConvenio.className = 'boton-ver-convenios'
          // Asociar evento para visualizar el documento
          botonVerConvenio.onclick = () => this.mostrarConvenio(convenio.documento, convenio.titulo)
          verConvenioCelda.appendChild(botonVerConvenio)

          // Crear el icono para modificar el convenio
          const modificarCelda = document.createElement('td')
          const editarImg = document.createElement('img')
          editarImg.src = './iconos/edit.svg'
          editarImg.classList.add('icono', 'editar')
          editarImg.alt = 'Editar'
          editarImg.onclick = () => this.clickEditarConvenio(convenio.id) // Asociar evento para editar
          modificarCelda.appendChild(editarImg)

          // Crear el icono para borrar el convenio
          const borrarCelda = document.createElement('td')
          const borrarImg = document.createElement('img')
          borrarImg.src = './iconos/delete.svg'
          borrarImg.classList.add('icono', 'borrar')
          borrarImg.alt = 'Borrar'
          borrarImg.onclick = () => this.clickBorrarConvenio(convenio.id) // Asociar evento para borrar
          borrarCelda.appendChild(borrarImg)

          // Añadir las celdas a la fila
          fila.appendChild(tituloCelda)
          fila.appendChild(fechaFirmaCelda)
          fila.appendChild(empresaCelda)
          fila.appendChild(cicloCelda)
          fila.appendChild(verConvenioCelda)
          fila.appendChild(modificarCelda)
          fila.appendChild(borrarCelda)

          // Añadir la fila a la tabla
          this.tablaConvenios.appendChild(fila)
        })
      })
      .catch(error => {
        this.controlador.gestionarError(error)
      })
  }

  /**
   * Muestra el convenio en una nueva ventana.
   * @param documento codigo del documento almacenado en la base de datos.
   * @param titulo titulo del convenio.
   */
  mostrarConvenio (documento, titulo) {
    // El encabezado en B64 empieza con eso y hay que reemplzarlo
    const base64Data = documento.replace(/^data:application\/pdf;base64,/, '')

    // Crear un Blob a partir de los datos de documento
    const byteCharacters = atob(base64Data) // Decodificar los datos Base64
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: 'application/pdf' })

    // URL para el Blob
    const url = URL.createObjectURL(blob)

    // Abrir una nueva ventana y cargar el PDF en un iframe
    const newWindow = window.open()
    newWindow.document.write('<iframe src="' + url + '" width="100%" height="100%"></iframe>')
    newWindow.document.title = titulo // Titulo de la pestaña
  }

  /**
   * Maneja el evento de clic en el botón de editar un convenio.
   * @param id - {Nuber} ID del convenio a editar.
   */
  clickEditarConvenio (id) {
    this.controlador.ocultarVistas()
    this.controlador.obtenerDatosConvenioById(id)
      .catch(error => {
        console.error('Error al obtener datos de empresa:', error)
      })
  }

  /**
   * Maneja el evento de clic en el botón de borrar un convenio.
   * @param id - {Number} ID del convenio a borrar.
   */
  clickBorrarConvenio (id) {
    // Cuadro de confirmación
    const titulo = 'Confirmar borrado'
    const mensaje = '¿Realmente desea borrar este convenio?'

    this.controlador.vistaDialogo.abrir(titulo, mensaje, (confirmacion) => {
      if (confirmacion) {
        // Si el usuario confirma, proceder con las acciones de borrado
        this.controlador.borrarConvenio(id)
      }
    })
  }
}
