import { Vista } from './vista.js'

/**
 Vista correspondiente al alta de convenio de la aplicación dualex.
 Sirve para dar de alta a un convenio.
 **/
export class Vistaconvenio extends Vista {
  /**
   Constructor de la clase.
   @param {Object} controlador Controlador de la vista principal.
   @param {Node} base Nodo al que se añadirá la vista principal.
   **/
  constructor (controlador, base) {
    super(controlador)
    this.base = base
    // Cogemos referencias a los elementos del interfaz
    // Inputs
    this.inputTitulo = document.getElementById('tituloConvenio')
    this.inputFechaFirma = document.getElementById('fechaFirma')
    this.inputDocumento = document.getElementById('documento')
    // Bontones
    this.btnAnadir = document.getElementById('btnAnadir')
    this.btnLimpiar = document.getElementById('btnLimpiar')
    // Selects
    this.selectCiclo = document.getElementById('selectCiclo')
    this.selectEmpresa = document.getElementById('selectEmpresa')

    // Ejecutar metodos necesarios
    this.cargarDatos()

    // Asociamos eventos
    this.btnLimpiar.onclick = this.limpiar.bind(this)
    this.btnAnadir.onclick = this.anadirConvenio.bind(this)
    this.inputTitulo.onchange = this.validarTituloUsuario.bind(this)
    this.inputFechaFirma.onchange = this.validarFechaFirma.bind(this)
    this.inputDocumento.onchange = this.validarDocumento.bind(this)
  }

  /**
   * Limpia los campos del formulario.
   */
  limpiar () {
    this.inputTitulo.value = ''
    this.inputFechaFirma.value = ''
    this.inputDocumento.value = ''
  }

  /**
   * Carga los datos de los ciclos y las empresas en sus respectivos select.
   */
  cargarDatos () {
    this.cargarDatosCiclos()
    this.cargarDatosEmpresas()
  }

  /**
   * Carga los ciclos en el select de ciclos.
   */
  cargarDatosCiclos () {
    this.controlador.recibirDatosCiclo()
      .then(ciclos => {
        ciclos.forEach(ciclo => {
          const option = document.createElement('option')
          option.value = ciclo.id
          option.textContent = ciclo.grado
          this.selectCiclo.appendChild(option)
        })
      })
      .catch(error => {
        console.error('Error al cargar los ciclos:', error)
      })
  }

  /**
   * Carga las empresas en el select de empresas.
   */
  cargarDatosEmpresas () {
    this.controlador.recibirDatosEmpresa()
      .then(empresas => {
        empresas.forEach(empresa => {
          const option = document.createElement('option')
          option.value = empresa.id
          option.textContent = empresa.nombre
          this.selectEmpresa.appendChild(option)
        })
      })
      .catch(error => {
        console.error('Error al cargar las empresas:', error)
      })
  }

  /**
   * Añade un convenio a la base de datos.
   */
  anadirConvenio () {
    if (this.comprobarVacio() && this.validarTituloUsuario() && this.validarDocumento() && this.validarFechaFirma()) {
      const file = this.inputDocumento.files[0]
      const reader = new FileReader()

      reader.onload = () => {
        const convenioData = {
          tituloConvenio: this.inputTitulo.value,
          fechaFirma: this.inputFechaFirma.value,
          documento: reader.result, // reader.result es el resultado obtenido de reader.readAsText(file)
          idCiclo: this.selectCiclo.value,
          idEmpresa: this.selectEmpresa.value
        }

        // Se envia al completar la lectura del archivo
        this.controlador.enviarSolicitudConvenio(convenioData)
          .then(respuesta => {
            console.log(respuesta)
          })
          .catch(error => {
            console.error('Error al realizar la solicitud:', error)
          })
      }

      // Lectura del archivo para poder tener en reader.result el resultado. Es un metodo asincrono por eso mismo el .onload
      reader.readAsDataURL(file) // Formato Base64
    } else {
      console.log('Los datos introducidos no tienen un formato valido')
    }
  }

  /**
   * Valida el campo de titulo de usuario.
   * @returns {boolean} Devuelve true si el campo es valido, false en caso contrario.
   */
  validarTituloUsuario () {
    const titulo = this.inputTitulo.value.trim()
    const tituloLength = titulo.length
    const errorTitulo = document.getElementById('errorTitulo')

    if (tituloLength >= 1 && tituloLength <= 255 && titulo !== ' ') {
      this.inputTitulo.classList.add('valid')
      this.inputTitulo.classList.remove('invalid')
      errorTitulo.textContent = ''
      return true
    } else {
      this.inputTitulo.classList.add('invalid')
      this.inputTitulo.classList.remove('valid')
      errorTitulo.textContent = 'El formato no es válido.'
      return false
    }
  }

  /**
   * Valida el campo de documento.
   * @returns {boolean} Devuelve true si el campo es valido, false en caso contrario.
   */
  validarDocumento () {
    const file = this.inputDocumento.files[0]
    const tipoDocumento = file ? file.type : ''
    const errorDocumento = document.getElementById('errorDocumento')
    const maxSizeMB = 10 // Tamaño máximo permitido en megabytes

    if (file && tipoDocumento === 'application/pdf') {
      if (file.size <= maxSizeMB * 1024 * 1024) {
        errorDocumento.textContent = ''
        return true
      } else {
        errorDocumento.textContent = `El tamaño del archivo debe ser menor o igual a ${maxSizeMB} MB.`
        return false
      }
    } else {
      errorDocumento.textContent = 'El documento debe ser un archivo PDF.'
      return false
    }
  }

  /**
   * Valida el campo de fecha de firma.
   * @returns {boolean} Devuelve true si el campo es valido, false en caso contrario.
   */
  validarFechaFirma () {
    // Comprobar el campo de fecha de firma
    const fechaFirma = this.inputFechaFirma.value
    const errorFechaFirma = document.getElementById('errorFechaFirma')
    if (fechaFirma === '') {
      errorFechaFirma.textContent = 'El campo de fecha de firma no puede estar vacío.'
      return false
    } else {
      errorFechaFirma.textContent = ''
      return true
    }
  }

  /**
   * Comprueba si los campos del formulario están vacíos.
   * @returns {boolean} Devuelve true si los campos no están vacíos, false en caso contrario.
   */
  comprobarVacio () {
    let camposValidos = true

    // Comprobar el campo de título
    const titulo = this.inputTitulo.value
    const errorTitulo = document.getElementById('errorTitulo')
    if (titulo === '') {
      this.inputTitulo.classList.add('invalid')
      this.inputTitulo.classList.remove('valid')
      errorTitulo.textContent = 'El campo de título no puede estar vacío.'
      camposValidos = false
    } else {
      errorTitulo.textContent = ''
    }

    camposValidos = this.validarFechaFirma()

    // Comprobar el campo de documento
    const file = this.inputDocumento.files[0]
    const errorDocumento = document.getElementById('errorDocumento')
    if (file === undefined) {
      errorDocumento.textContent = 'Debe seleccionar un documento.'
      camposValidos = false
    } else {
      errorDocumento.textContent = ''
    }

    return camposValidos
  }
}
// // eslint-disable-next-line no-new
// window.onload = () => { new Vistaconvenio() }
