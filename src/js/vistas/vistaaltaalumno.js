/**
 Vista con el alta de alumno.
 **/
import { Vista } from './vista.js'

export class VistaAltaAlumno extends Vista{
  /**
   Constructor de la clase.
   @param {Object} controlador Controlador de la vista.
   @param {Node} base Nodo al que se añadirá la vista.
   **/
  constructor (controlador, base) {
    super(controlador)
    this.base = base

    // Cogemos referencias a los elementos del interfaz
    this.inputNombre = document.getElementById('nombreAlumno')
    this.inputApellidos = document.getElementById('apellidosAlumno')
    this.inputEmail = document.getElementById('emailAlumno')
    this.selectCurso = document.getElementById('selectCicloAltaAlumno')

    this.botonAlta = document.getElementById('btnAnadirAltaAlumno')
    this.botonLimpiar = document.getElementById('btnLimpiarAltaAlumno')
    this.botonCancelar = document.getElementById('btnCancelarAltaAlumno')

    this.errorNombre = document.getElementById('errorNombreAlumno')
    this.errorApellidos = document.getElementById('errorApellidosAlumno')
    this.errorEmail = document.getElementById('errorEmailAlumno')
    this.errorCurso = document.getElementById('errorCursoAlumno')

    // Asociamos eventos
    this.botonAlta.addEventListener("click", this.altaAlumno.bind(this))
    this.botonLimpiar.addEventListener("click", this.limpiarCampos.bind(this))
    this.botonCancelar.addEventListener("click", this.cancelar.bind(this))

    // Ejecutar metodos necesarios

  }

  /**
   * Realiza el alta de un alumno.
   */
    altaAlumno() {
      if (this.comprobacion()) {
        const alumno = {
          nombre: this.inputNombre.value.trim(),
          apellidos: this.inputApellidos.value.trim(),
          email: this.inputEmail.value.trim(),
          curso: this.selectCurso.value
        }
        this.controlador.altaAlumno(alumno)
        this.limpiarCampos()
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

      if (this.selectCurso.value === '' || this.selectCurso.value === null) {
          this.errorCurso.style.display = 'block'
        isValid = false;
      } else {
          this.errorCurso.style.display = 'none'
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
      this.selectCurso.value = ''
      this.ocultarErrores()
    }

    /**
     * Vuelve a la vista de gestión de alumnos.
     */
    cancelar() {
      this.controlador.mostrarGestionAlumnos()
    }

  /**
   * Oculta los errores de los campos del formulario.
   */
    ocultarErrores() {
      this.errorNombre.style.display = 'none'
      this.errorApellidos.style.display = 'none'
      this.errorEmail.style.display = 'none'
      this.errorCurso.style.display = 'none'
    }

  /**
   * Carga los datos de los cursos en el select.
   * @param cursos Lista de cursos.
   */
  cargarDatos(cursos) {
    // Limpiar las opciones existentes del select
    this.selectCurso.innerHTML = '';

    // Recorrer los cursos y agregar opciones al select
    for(let i = 0; i < cursos.length; i++){
      let option = document.createElement('option');
      option.value = cursos[i].id;
      option.textContent = cursos[i].codigo;
      this.selectCurso.appendChild(option);
    }
  }
}
