import { Vista } from './vista'

/**
 Vista del alta de convenios de la aplicación.
 Sirve para dar de alta los convenios.
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
    // Cogemos referencias a los elementos del interfaz
    // Inputs
    this.inputTitulo = document.getElementsByTagName('input')[0]
    this.inputFechaFirma = document.getElementsByTagName('input')[1]
    this.inputDocumento = document.getElementsByTagName('input')[2]
    // Bontones
    this.btnAnadir = document.getElementsByTagName('button')[0]
    this.btnLimpiar = document.getElementsByTagName('button')[1]

    // Asociamos eventos
    this.btnLimpiar.onclick = this.limpiar.bind(this)
    this.btnAnadir.onclick = this.anadirConvenio.bind(this)
    this.inputTitulo.onchange = this.validarTituloUsuario.bind(this)
  }


  limpiar () {
    this.inputTitulo.value = ''
    this.inputFechaFirma.value = ''
    this.inputDocumento.value = ''
  }

  anadirConvenio () {
    console.log('Datos')
    console.log('Titulo: ' + this.inputTitulo.value)
    console.log('Fecha: ' + this.inputFechaFirma.value)
    console.log('Documento: ')
    console.log(this.inputDocumento)


    const formData = new FormData()
    formData.append('titulo', this.inputTitulo.value)
    formData.append('fecha_firma', this.inputFechaFirma.value)
    formData.append('documento_convenio', this.inputDocumento.files[0])

    this.controlador.enviarSolicitudConvenio(formData)
      .then(respuesta => {
        console.log(respuesta)
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
      })
  }

  validarTituloUsuario() {
    const titulo = this.inputTitulo.value.trim()
    const tituloLength = titulo.length

    if (tituloLength >= 1 && tituloLength <= 255) {
      this.inputTitulo.classList.add('valid') // Agregar clase CSS para marcar en verde
      this.inputTitulo.classList.remove('invalid') // Remover clase CSS para marcar en rojo
    } else {
      this.inputTitulo.classList.add('invalid') // Agregar clase CSS para marcar en rojo
      this.inputTitulo.classList.remove('valid') // Remover clase CSS para marcar en verde
    }
  }
}
// // eslint-disable-next-line no-new
// window.onload = () => { new VistaConvenios() }
