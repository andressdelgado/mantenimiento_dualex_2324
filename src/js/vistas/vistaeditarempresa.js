import { Vista } from './vista.js';

/**
 * VistaEditarEmpresa: Vista correspondiente a la edición de empresas de la aplicación DualEx.
 * Permite editar los datos de una empresa existente.
 */
export class VistaEditarEmpresa extends Vista {
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
    this.id = null;
    this.inputSiglas = document.getElementById('siglasEditar');
    this.inputNombre = document.getElementById('nombreEmpresaEditar');
    this.inputNotas = document.getElementById('notasEditar');
    // Botones
    this.btnEditar = document.getElementById('btnEditar');

    // Asociamos eventos
    this.btnEditar.onclick = this.editarEmpresa.bind(this);
  }

  /**
   * Método mostrarEmpresaEnFormulario: Muestra los datos de la empresa en el formulario de edición.
   * @param {Object} empresa - Datos de la empresa a mostrar.
   */
  mostrarEmpresaEnFormulario(empresa) {
    const datosEmpresa = empresa[0];
    this.id = datosEmpresa.id;
    this.inputSiglas.value = datosEmpresa.siglas;
    this.inputNombre.value = datosEmpresa.nombre;
    this.inputNotas.value = datosEmpresa.notas;
    this.id = datosEmpresa.id;
  }

  /**
   * Método editarEmpresa: Maneja la edición de una empresa.
   */
  editarEmpresa() {
    let id = this.id;
    let siglas = this.inputSiglas.value;
    let nombre = this.inputNombre.value;
    let notas = this.inputNotas.value;
    try{
      if (this.comprobarVacio(siglas, nombre, notas)) {
        const empresaData = { id, siglas, nombre, notas }; // Pasar id como parte del objeto
        this.controlador.editarEmpresa(empresaData);
      }
    }catch (e) {
      this.controlador.gestionarError(e)
    }
  }

  /**
   * Método comprobarVacio: Verifica que los campos del formulario no estén vacíos.
   * @returns {boolean} - Devuelve true si los campos no están vacíos, de lo contrario false.
   */
  comprobarVacio() {
    let camposValidos = true;

    // Comprobar el campo de siglas, nombre y notas
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
    /*
    if (notas === '') {
      this.inputNotas.classList.add('invalid');
      this.inputNotas.classList.remove('valid');
      camposValidos = false;
    }*/

    return camposValidos;
  }
}
