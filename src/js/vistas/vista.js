/**
  Clase Vista
  Se utiliza como clase abstracta para derivar de ella las vistas de la aplicación.
**/
export class Vista {
  /**
    Constructor de la clase.
    @param {Object} controlador Controlador de la vista.
  **/
  constructor (controlador, display = 'block') {
    this.controlador = controlador
    this.display = display 
  }

  /**
    Elimina todos los nodos hijos de un nodo.
    @param nodo {Node} Nodo del que se eliminarán los hijos.
  @param desde {Number} Índice del nodo desde el que se eliminarán los hijos. Indicando desde = 1, se salva al primer hijo (nodo 0).
  **/
  eliminarHijos (nodo, desde = 0) {
    while (nodo.childNodes.length > desde) { nodo.removeChild(nodo.childNodes.item(desde)) }
  }

  /**
    Muestra u oculta la vista.
    @param mostrar {boolean} True para mostrar, false para ocultar.
    @param modo {String} Valor del atributo display de CSS para mostrar la vista. Por defecto será el atributo display de la vista o 'block'.
  **/
  mostrar (mostrar = true, modo) {
    if (!modo) {
      if (!this.display) { modo = 'block' } else { modo = this.display }
    }
    if (mostrar) { this.base.style.display = modo } else { this.base.style.display = 'none' }
  }
}
