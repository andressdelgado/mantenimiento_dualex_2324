/**
 Vista con el alta de profesor.
 **/
import { Vista } from './vista.js'

export class VistaModificarProfesor extends Vista{
  /**
   Constructor de la clase.
   @param {Object} controlador Controlador de la vista.
   @param {Node} base Nodo al que se añadirá la vista.
   **/
  constructor (controlador, base) {
    super(controlador)
    this.base = base
    this.profesor

    // Cogemos referencias a los elementos del interfaz
    this.divAltaProfesor = document.getElementById('divAltaProfesor')

    this.inputNombre = document.getElementById('nombreProfesorMod')
    this.inputApellidos = document.getElementById('apellidosProfesorMod')
    this.inputEmail = document.getElementById('emailProfesorMod')

    this.botonModificar = document.getElementById('btnAnadirModProfesor')
    this.botonCancelar = document.getElementById('btnCancelarModProfesor')

    this.errorNombre = document.getElementById('errorNombreProfesorMod')
    this.errorApellidos = document.getElementById('errorApellidosProfesorMod')
    this.errorEmail = document.getElementById('errorEmailProfesorMod')

    // Asociamos eventos
    this.botonModificar.addEventListener("click", this.modificarProfesor.bind(this))
    this.botonCancelar.addEventListener("click", this.cancelar.bind(this))

    // Ejecutar metodos necesarios

  }

  /**
   * Realiza el alta de un profesor.
   */
    modificarProfesor() {
      if (this.comprobacion()) {
        const profesor = {
          nombre: this.inputNombre.value.trim(),
          apellidos: this.inputApellidos.value.trim(),
          email: this.inputEmail.value.trim(),
          id: this.profesor.id
        }
        this.controlador.modificarProfesor(profesor)
        this.cancelar()
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

  /**
   * Carga los datos de un profesor en el formulario y los cursos en el select.
   * @param profesor Datos del profesor.
   * @param cursos Lista de cursos.
   */
  cargarDatos(profesor, cursos) {
    this.profesor = profesor

    this.inputNombre.value = profesor.nombre.trim();
    this.inputApellidos.value = profesor.apellidos.trim();
    this.inputEmail.value = profesor.email.trim();

  }



}
