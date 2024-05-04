import { Vista } from './vista'

/**
 Vista correspondiente al alta de convenio de la aplicación dualex.
 Sirve para dar de alta los convenio.
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
  }

}
