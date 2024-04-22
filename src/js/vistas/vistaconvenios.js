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
    this.inputTitulo = this.base.getElementsByTagName('intput')[0]
    this.inputFirma = this.base.getElementsByTagName('intput')[1]
    this.inputDocumento = this.base.getElementsByTagName('intput')[2]
    // Bontones
    this.btnLimpiar = this.base.getElementsByTagName('button')[0]
    this.btnAnadir = this.base.getElementsByTagName('button')[1]

    // Asociamos eventos
    this.btnLimpiar.onclick = this.limpiar.bind(this)
    this.btnAnadir.onclick = this.anadirConvenio.bind(this)
  }

  /**
   Cierra el mensaje.
   **/
  cerrar () {
    this.base.style.display = 'none'
  }

  limpiar () {
    this.inputTitulo.value = ''
    this.inputFirma.value = ''
    this.inputDocumento.value = ''
  }

  anadirConvenio () {
    console.log('añadir convenio')
  }

  // altaConvenio(){
  //   /*
  //   * Aqui se hara la llamada a la petición de alta de convenio
  //   * */
  // }
}
