/**
  Vista del menú de contexto de la aplicación.
  Muestra los enlaces de contexto.
**/

export class VistaMenuContexto{
  /**
    Constructor de la clase.
    @param {Object} controlador Controlador de la vista principal.
    @param {Node} base Nodo al que se añadirá la vista principal.
  **/
  constructor (controlador, base) {
    this.controlador = controlador
    this.base = base

    // Asociamos eventos
  }

  /**
    Carga las opciones del menú de contexto.
    @param opciones {Array} Array bidimensional de objetos opciones con título y callback.
  **/
  cargar (opciones) {
    for (const opcion of opciones) {
      const a = document.createElement('a')
      this.base.appendChild(a)
      a.textContent = opcion.titulo
      a.onclick = opcion.callback
      this.base.appendChild(document.createElement('br'))
    }
  }

  /**
    Muestra el menú de contexto en las coordenadas indicadas.
    @param x {Number} Coordenada x.
    @param y {Number} Coordenada y.
  **/
  mostrarEn (x, y) {
    var alumnos=document.getElementById('divAlumnos')
    alumnos.appendChild(this.base)
    this.mostrar(true)
    this.base.style.position = 'absolute'
    this.base.className = 'vistamenucontexto'
    
    this.base.style.left = `${x - 100}px`
    this.base.style.top = `${y}px`
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
