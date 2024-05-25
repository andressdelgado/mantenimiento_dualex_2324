import { Vista } from './vista.js';

/**
 * VistaEmpresa: Vista correspondiente al alta de empresas de la aplicación DualEx.
 * Permite dar de alta nuevas empresas.
 */
export class VistaEmpresa extends Vista {
  /**
   * Constructor de la clase.
   * @param {Object} controlador - Controlador de la vista principal.
   * @param {Node} base - Nodo al que se añadirá la vista principal.
   */
  constructor(controlador, base) {
    super(controlador);
    this.base = base;

    // Cogemos referencias a los elementos del interfaz
    // Inputs
    this.inputSiglas = document.getElementById('siglas');
    this.inputNombre = document.getElementById('nombreEmpresa');
    this.inputNotas = document.getElementById('notas');
    // Botones
    this.btnAnadir = document.getElementById('btnAnadir');
    this.btnVolver = document.getElementById('volver-editar');
    this.btnVolver2 = document.getElementById('volver-aniadir');

    // Asociamos eventos
    this.btnAnadir.onclick = this.anadirEmpresa.bind(this);
    this.btnVolver.onclick = this.volverListado.bind(this);
    this.btnVolver2.onclick = this.volverListado.bind(this);
  }

  /**
   * Método volverListado: Navega de vuelta al listado de empresas.
   */
  volverListado() {
    this.controlador.ocultarVistas();
    this.controlador.irAVistaEmpresas();
  }

  /**
   * Método anadirEmpresa: Maneja la creación de una nueva empresa.
   */
  anadirEmpresa() {
    console.log('siglas:', this.inputSiglas.value);
    console.log('nombreEmpresa:', this.inputNombre.value);
    console.log('notas:', this.inputNotas.value);

    if (this.comprobarVacio()) {
      const empresaData = {
        siglas: this.inputSiglas.value,
        nombre: this.inputNombre.value,
        notas: this.inputNotas.value,
      };

      console.log(empresaData);
      // Se envía al completar la lectura del formulario
      this.controlador.crearEmpresa(empresaData);
    } else {
      console.log('Los datos introducidos no tienen un formato válido');
    }
  }

  /**
   * Método comprobarVacio: Verifica que los campos del formulario no estén vacíos.
   * @returns {boolean} - Devuelve true si los campos no están vacíos, de lo contrario false.
   */
  comprobarVacio() {
    let camposValidos = true;

    // Comprobar el campo de siglas
    const siglas = this.inputSiglas.value;
    const nombre = this.inputNombre.value;
    const notas = this.inputNotas.value;

    if (siglas === '') {
      this.inputSiglas.classList.add('invalid');
      this.inputSiglas.classList.remove('valid');
      camposValidos = false;
    }
    if (nombre === '') {
      this.inputNombre.classList.add('invalid');
      this.inputNombre.classList.remove('valid');
      camposValidos = false;
    }
    if (notas === '') {
      this.inputNotas.classList.add('invalid');
      this.inputNotas.classList.remove('valid');
      camposValidos = false;
    }

    return camposValidos;
  }
}
