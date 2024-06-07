/**
 Vista con el alta de profesor.
 **/
import { Vista } from './vista.js'

export class VistaAltaProfesor extends Vista{
  /**
   Constructor de la clase.
   @param {Object} controlador Controlador de la vista.
   @param {Node} base Nodo al que se añadirá la vista.
   **/
  constructor (controlador, base) {
    super(controlador)
    this.base = base

    // Cogemos referencias a los elementos del interfaz
    this.inputNombre = document.getElementById('nombreProfesor')
    this.inputApellidos = document.getElementById('apellidosProfesor')
    this.inputEmail = document.getElementById('emailProfesor')
    this.selectCurso = document.getElementById('selectCicloAltaProfesor')

    this.botonAlta = document.getElementById('btnAnadirAltaProfesor')
    this.botonLimpiar = document.getElementById('btnLimpiarAltaProfesor')
    this.botonCancelar = document.getElementById('btnCancelarAltaProfesor')

    this.errorNombre = document.getElementById('errorNombreProfesor')
    this.errorApellidos = document.getElementById('errorApellidosProfesor')
    this.errorEmail = document.getElementById('errorEmailProfesor')
    this.errorCurso = document.getElementById('errorCursoProfesor')

    // Asociamos eventos
    this.botonAlta.addEventListener("click", this.altaProfesor.bind(this))
    this.botonLimpiar.addEventListener("click", this.limpiarCampos.bind(this))
    this.botonCancelar.addEventListener("click", this.cancelar.bind(this))

    // Ejecutar metodos necesarios

  }

  /**
   * Realiza el alta de un profesor.
   */
    altaProfesor() {
      if (this.comprobacion()) {
        const profesor = {
          nombre: this.inputNombre.value.trim(),
          apellidos: this.inputApellidos.value.trim(),
          email: this.inputEmail.value.trim()
        }
        this.controlador.altaProfesor(profesor)
        this.limpiarCampos()
      }
    }

  /**
   * Comprueba que los campos del formulario estén rellenos correctamente.
   */
    comprobacion() {
      let isValid = true
      const regex = /^[a-zA-Z\s]+$/
      const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

      if (this.inputNombre.value === '' || this.inputNombre.value === null ||
          !regex.test(this.inputNombre.value)){
          this.errorNombre.style.display = 'block'
          isValid = false;
      } else {
          this.errorNombre.style.display = 'none'
      }

      if (this.inputApellidos.value === '' || this.inputApellidos.value === null ||
        !regex.test(this.inputApellidos.value)) {
          this.errorApellidos.style.display = 'block'
        isValid = false;
      } else {
          this.errorApellidos.style.display = 'none'
      }

      if (this.inputEmail.value === '' || this.inputEmail.value === null ||
          !regexEmail.test(this.inputEmail.value)) {
          this.errorEmail.style.display = 'block'
        isValid = false;
      } else {
          this.errorEmail.style.display = 'none'
      }

      if (isValid === false) {return false;}
      return true;
    }

    /**
     * Limpiar los campos del formulario.
     */
    limpiarCampos() {
      this.inputNombre.value = ''
      this.inputApellidos.value = ''
      this.inputEmail.value = ''
      this.ocultarErrores()
    }

    /**
     * Vuelve a la vista de gestión de profesores.
     */
    cancelar() {
      this.controlador.mostrarGestionProfesores()
    }

  /**
   * Oculta los errores de los campos del formulario.
   */
    ocultarErrores() {
      this.errorNombre.style.display = 'none'
      this.errorApellidos.style.display = 'none'
      this.errorEmail.style.display = 'none'
    }

}
