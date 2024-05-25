import { Vista } from './vista.js';

/**
 * VistaConvenios: Vista correspondiente a los convenios de la aplicación DualEx.
 * Sirve para listar y gestionar los convenios.
 */
export class VistaConvenios extends Vista {
  /**
   * Constructor de la clase.
   * @param {Object} controlador - Controlador de la vista principal.
   * @param {Node} base - Nodo al que se añadirá la vista principal.
   */
  constructor(controlador, base) {
    super(controlador);
    this.base = base;
  }
}
