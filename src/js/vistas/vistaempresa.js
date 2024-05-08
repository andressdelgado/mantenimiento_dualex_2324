import { Vista } from './vista.js'

/**
 Vista correspondiente al alta de convenio de la aplicación dualex.
 Sirve para dar de alta los convenio.
 **/
export class VistaEmpresa extends Vista {
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
    this.inputSiglas = document.getElementById('siglas')
    this.inputNombre = document.getElementById('nombreEmpresa')
    this.inputNotas = document.getElementById('notas')
    // Bontones
    this.btnAnadir = document.getElementById('btnAnadir')

    // Asociamos eventos
    this.btnAnadir.onclick = this.anadirEmpresa.bind(this)
    /*this.inputTitulo.onchange = this.validarTituloUsuario.bind(this)
    this.inputFechaFirma.onchange = this.validarFechaFirma.bind(this)
    this.inputDocumento.onchange = this.validarDocumento.bind(this)*/
  }

  anadirEmpresa () {
    console.log('siglas')
    console.log(this.inputSiglas.value)
    console.log('nombreEmpresa')
    console.log(this.inputNombre.value)
    console.log('notas')
    console.log(this.inputNotas.value)
    if (this.comprobarVacio()) {

      reader.onload = () => {
        const empresaData = {
          siglas: this.inputSiglas.value,
          nombre: this.inputNombre.value,
          notas: this.inputNotas.value,
        }

        // Se envia al completar la lectura del archivo
        this.controlador.enviarSolicitudEmpresa(empresaData)
          .then(respuesta => {
            console.log(respuesta)
          })
          .catch(error => {
            console.error('Error al realizar la solicitud:', error)
          })
      }
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

  validarFechaFirma () {
    // Comprobar el campo de fecha de firma
    const fechaFirma = this.inputFechaFirma.value
    const errorFechaFirma = document.getElementById('errorFechaFirma')
    if (fechaFirma === '') {
      errorFechaFirma.textContent = 'El campo de fecha de firma no puede estar vacío.'
      return false
    } else {
      errorFechaFirma.textContent = ''
      return true
    }
  }

  comprobarVacio () {
    let camposValidos = true

    // Comprobar el campo de título
    const titulo = this.inputTitulo.value
    const errorTitulo = document.getElementById('errorTitulo')
    if (titulo === '') {
      this.inputTitulo.classList.add('invalid')
      this.inputTitulo.classList.remove('valid')
      errorTitulo.textContent = 'El campo de título no puede estar vacío.'
      camposValidos = false
    } else {
      errorTitulo.textContent = ''
    }

    camposValidos = this.validarFechaFirma()

    // Comprobar el campo de documento
    const file = this.inputDocumento.files[0]
    const errorDocumento = document.getElementById('errorDocumento')
    if (file === undefined) {
      errorDocumento.textContent = 'Debe seleccionar un documento.'
      camposValidos = false
    } else {
      errorDocumento.textContent = ''
    }

    return camposValidos
  }
}
// // eslint-disable-next-line no-new
// window.onload = () => { new Vistaconvenio() }
