/**
 Vista con el alta de alumno.
 **/
import { Vista } from './vista.js'

export class VistaModificarAlumno extends Vista{
  /**
   Constructor de la clase.
   @param {Object} controlador Controlador de la vista.
   @param {Node} base Nodo al que se añadirá la vista.
   **/
  constructor (controlador, base) {
    super(controlador)
    this.base = base
    this.alumno

    // Cogemos referencias a los elementos del interfaz
    this.divAltaAlumno = document.getElementById('divAltaAlumno')

    this.inputNombre = document.getElementById('nombreAlumnoMod')
    this.inputApellidos = document.getElementById('apellidosAlumnoMod')
    this.inputEmail = document.getElementById('emailAlumnoMod')
    this.selectCurso = document.getElementById('selectCicloModAlumno')

    this.botonModificar = document.getElementById('btnAnadirModAlumno')
    this.botonCancelar = document.getElementById('btnCancelarModAlumno')

    this.errorNombre = document.getElementById('errorNombreAlumnoMod')
    this.errorApellidos = document.getElementById('errorApellidosAlumnoMod')
    this.errorEmail = document.getElementById('errorEmailAlumnoMod')
    this.errorCurso = document.getElementById('errorCursoAlumnoMod')

    // Asociamos eventos
    this.botonModificar.addEventListener("click", this.modificarAlumno.bind(this))
    this.botonCancelar.addEventListener("click", this.cancelar.bind(this))

    // Ejecutar metodos necesarios

  }

  /**
   * Realiza el alta de un alumno.
   */
    modificarAlumno() {
      if (this.comprobacion()) {
        const alumno = {
          nombre: this.inputNombre.value.trim(),
          apellidos: this.inputApellidos.value.trim(),
          email: this.inputEmail.value.trim(),
          curso: this.selectCurso.value,
          id: this.alumno.id
        }
        this.controlador.modificarAlumno(alumno)
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
   * Carga los datos de un alumno en el formulario y los cursos en el select.
   * @param alumno Datos del alumno.
   * @param cursos Lista de cursos.
   */
  cargarDatos(alumno, cursos) {
    this.alumno = alumno

    this.inputNombre.value = alumno.nombre.trim();
    this.inputApellidos.value = alumno.apellidos.trim();
    this.inputEmail.value = alumno.email.trim();

    // Limpiar las opciones existentes del select
    this.selectCurso.innerHTML = '';

    // Recorrer los cursos y agregar opciones al select
    for(let i = 0; i < cursos.length; i++){
      let option = document.createElement('option');
      option.value = cursos[i].id;
      option.textContent = cursos[i].codigo;
      this.selectCurso.appendChild(option);

      // Verificar si esta opción coincide con alumno.codigo
      if (cursos[i].codigo === alumno.codigo.trim()) {
        option.selected = true;
      }
    }
  }



}
