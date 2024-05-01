import { Vista } from './vista.js'

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
    this.inputTitulo = document.getElementById('tituloConvenio')
    this.inputFechaFirma = document.getElementById('fechaFirma')
    this.inputDocumento = document.getElementById('documento')
    // Bontones
    this.btnAnadir = document.getElementById('btnAnadir')
    this.btnLimpiar = document.getElementById('btnLimpiar')

    // Asociamos eventos
    this.btnLimpiar.onclick = this.limpiar.bind(this)
    this.btnAnadir.onclick = this.anadirConvenio.bind(this)
    this.inputTitulo.onchange = this.validarTituloUsuario.bind(this)
    this.inputDocumento.onchange = this.validarDocumento.bind(this)
  }

  limpiar () {
    this.inputTitulo.value = ''
    this.inputFechaFirma.value = ''
    this.inputDocumento.value = ''
  }

  anadirConvenio () {
    if (this.validarTituloUsuario() && this.validarDocumento()) {
      const file = this.inputDocumento.files[0]
      const reader = new FileReader()

      reader.onload = () => {
        const convenioData = {
          tituloConvenio: this.inputTitulo.value,
          fechaFirma: this.inputFechaFirma.value,
          documento: reader.result // reader.result es el resultado obtenido de reader.readAsText(file)
        }

        // Se envia al completar la lectura del archivo
        this.controlador.enviarSolicitudConvenio(convenioData)
          .then(respuesta => {
            console.log(respuesta)
          })
          .catch(error => {
            console.error('Error al realizar la solicitud:', error)
          })
      }

      // Lectura del archivo para poder tener en reader.result el resultado. Es un metodo asincrono por eso mismo el .onload
      reader.readAsText(file)
    } else {
      console.log('Los datos introducidos no tienen un formato valido')
    }
  }

  validarTituloUsuario () {
    const titulo = this.inputTitulo.value.trim()
    const tituloLength = titulo.length
    const errorTitulo = document.getElementById('errorTitulo')

    if (tituloLength >= 1 && tituloLength <= 255 && titulo !== ' ') {
      this.inputTitulo.classList.add('valid')
      this.inputTitulo.classList.remove('invalid')
      errorTitulo.textContent = ''
      return true
    } else {
      this.inputTitulo.classList.add('invalid')
      this.inputTitulo.classList.remove('valid')
      errorTitulo.textContent = 'El formato no es válido.'
      return false
    }
  }

  validarDocumento () {
    const file = this.inputDocumento.files[0]
    const tipoDocumento = file ? file.type : ''
    const errorDocumento = document.getElementById('errorDocumento')
    const maxSizeMB = 10 // Tamaño máximo permitido en megabytes

    if (file && tipoDocumento === 'application/pdf') {
      if (file.size <= maxSizeMB * 1024 * 1024) {
        errorDocumento.textContent = ''
        return true
      } else {
        errorDocumento.textContent = `El tamaño del archivo debe ser menor o igual a ${maxSizeMB} MB.`
        return false
      }
    } else {
      errorDocumento.textContent = 'El documento debe ser un archivo PDF.'
      return false
    }
  }
}
// // eslint-disable-next-line no-new
// window.onload = () => { new VistaConvenios() }
