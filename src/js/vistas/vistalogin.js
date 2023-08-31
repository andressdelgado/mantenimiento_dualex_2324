/**
  Vista de Login
**/
import { Vista } from './vista.js'

export class VistaLogin extends Vista{
  /**
    Constructor de la clase.
    @param {Object} controlador Controlador de la vista principal.
    @param {Node} base Nodo al que se añadirá la vista principal.
  **/
  constructor (controlador, base) {
	super(controlador)
    this.base = base

    // Cogemos referencias a los elementos del interfaz
    this.pError = this.base.getElementsByTagName('p')[1]
    this.sTest = this.base.getElementsByTagName('select')[0]

    // Capturamos los eventos
    if (this.sTest)
      this.sTest.onchange = this.test.bind(this)

    this.habilitarLogin()
  }

  habilitarLogin () {
    // Login con Google
    // La variable global google es cargada por el script de index.html */
    /* eslint-disable no-undef */
    google.accounts.id.initialize({
      client_id: '756573648994-cn4uk8gsic003hnotjb9mpt1mjtnqvgm.apps.googleusercontent.com',
      callback: this.controlador.login.bind(this.controlador)
    })
    google.accounts.id.renderButton(
      document.getElementById('divGoogleLogin'),
      { theme: 'outline', size: 'large' } // customization attributes
    )
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }

  /**
    Muestra el error en la vista.
    @param error {Error} Texto del error.
  **/
  mostrarError (error) {
    console.error(error)
    this.pError.textContent = error.message
    this.pError.style.display = 'block'
  }

  test () {
    const token = {}
    token.credential = this.sTest.value
    this.controlador.login(token)
  }
}
