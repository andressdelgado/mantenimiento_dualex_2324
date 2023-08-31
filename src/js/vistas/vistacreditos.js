/**
Vista de Créditos.
**/
import { Vista } from './vista.js'

export class VistaCreditos extends Vista{
  /**
  Constructor de la clase.
  @param {Object} controlador Controlador de la vista.
  @param {Node} base Nodo al que se añadirá la vista.
  **/
  constructor (controlador, base) {
	super(controlador)
    this.base = base
  }
}
