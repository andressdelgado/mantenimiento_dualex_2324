import { Vista } from './vista.js'

export class VistaMenuCoordinador extends Vista {
  /**
   Constructor de la clase.
   @param {Object} controlador Controlador de la vista.
   @param {Node} base Nodo al que se añadirá la vista.
   **/
   constructor(controlador, base) {
    super(controlador)
    this.base = base;
    // Cogemos referencias a los elementos del interfaz
    this.btnEmpresas = this.base.getElementsByTagName('button')[2]
    this.btnEmpresas.onclick = this.irAVistaEmpresas.bind(this)
  }
  

  irAVistaEmpresas() {
    // Llamar al método en el controlador para cambiar a la vista de empresas
    console.log('click')
    this.controlador.irAVistaEmpresas();
  }
}
