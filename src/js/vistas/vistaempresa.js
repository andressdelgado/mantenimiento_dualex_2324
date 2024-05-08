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
        const empresaData = {
          siglas: this.inputSiglas.value,
          nombre: this.inputNombre.value,
          notas: this.inputNotas.value,
        }
        console.log(empresaData)
        // Se envia al completar la lectura del formulario
        this.controlador.crearEmpresa(empresaData)
          .then(respuesta => {
            console.log(respuesta)
          })
          .catch(error => {
            console.error('Error al realizar la solicitud:', error)
          })
    } else {
      console.log('Los datos introducidos no tienen un formato valido')
    }
  }

  mostrar (ver) {
    if (ver) 
    super.mostrar(ver)
  }


  comprobarVacio () {
    let camposValidos = true

    // Comprobar el campo de título
    const siglas = this.inputSiglas.value
    const nombre = this.inputNombre.value
    const notas = this.inputNotas.value
    if (siglas === '') {
      this.inputSiglas.classList.add('invalid')
      this.inputSiglas.classList.remove('valid')
      camposValidos = false
    }
    if (nombre === '') {
        this.inputNombre.classList.add('invalid')
        this.inputNombre.classList.remove('valid')
        camposValidos = false
      }
      if (notas === '') {
        this.inputNotas.classList.add('invalid')
        this.inputNotas.classList.remove('valid')
        camposValidos = false
      }
    return camposValidos
  }
}
// // eslint-disable-next-line no-new
// window.onload = () => { new VistaEmpresa() }
