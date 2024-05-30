import { Vista } from './vista.js'

/**
 * Clase VistaProfesores representa la vista correspondiente a los profesores.
 * Esta clase gestiona la interfaz de usuario relacionada con los profesores.
 */
export class VistaProfesores extends Vista {
    /**
     * Constructor de la clase.
     * @param {Object} controlador Controlador de la vista principal.
     * @param {Node} base Nodo al que se añadirá la vista principal.
     **/
    constructor (controlador, base) {
      super(controlador); // Llama al constructor de la clase padre
      this.base = base; // Nodo al que se añadirá la vista principal
    }
  }