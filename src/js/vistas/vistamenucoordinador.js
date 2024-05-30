import { Vista } from './vista.js'
/**
 * Clase VistaMenuCoordinador representa la vista del menú para el coordinador.
 * Esta clase gestiona la navegación entre diferentes vistas del sistema.
 */
export class VistaMenuCoordinador extends Vista {
  /**
   * Constructor de la clase.
   * @param {Object} controlador Controlador de la vista.
   * @param {Node} base Nodo al que se añadirá la vista.
   **/
   constructor(controlador, base) {
    super(controlador); // Controlador de la vista
    this.base = base; // Nodo al que se añadirá la vista

    // Cogemos referencias a los elementos del interfaz
    this.btnAlumnos = this.base.getElementsByTagName('button')[0];
    this.btnProfesores = this.base.getElementsByTagName('button')[1];
    this.btnEmpresas = this.base.getElementsByTagName('button')[2];
    this.btnConvenios = this.base.getElementsByTagName('button')[3];

    // Asociamos eventos a los botones
    this.btnAlumnos.onclick = this.irAVistaAlumnos.bind(this);
    this.btnProfesores.onclick = this.irAVistaProfesores.bind(this);
    this.btnEmpresas.onclick = this.irAVistaEmpresas.bind(this);
    this.btnConvenios.onclick = this.irAVistaConvenios.bind(this);
  }

  /**
   * Navega a la vista de alumnos.
   **/
  irAVistaAlumnos() {
    this.controlador.mostrarGestionAlumnos();
  }

  /**
   * Navega a la vista de convenios.
   **/
  irAVistaConvenios() {
    this.controlador.irAVistaConvenios();
  }

  /**
   * Navega a la vista de profesores.
   **/
  irAVistaProfesores() {
    this.controlador.irAVistaProfesores();
  }

  /**
   * Navega a la vista de empresas.
   **/
  irAVistaEmpresas() {
    this.controlador.irAVistaEmpresas();
  }
}
