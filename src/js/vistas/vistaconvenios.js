import { Vista } from './vista.js'

/**
 Vista correspondiente al alta de convenio de la aplicación dualex.
 Sirve para dar de alta los convenio.
 **/
export class VistaConvenios extends Vista {
  /**
   Constructor de la clase.
   @param {Object} controlador Controlador de la vista principal.
   @param {Node} base Nodo al que se añadirá la vista principal.
   **/
  constructor (controlador, base) {
    super(controlador)
    this.base = base
    // Cogemos referencias a los elementos del interfaz
    // Tabla
    this.tablaConvenios = document.getElementById('tablaListaConvenios')

    // Ejecutar metodos necesarios
    this.cargarDatosConvenios()
  }

  cargarDatosConvenios () {
    this.controlador.recibirDatosConvenios()
      .then(convenios => {
        // Limpiar contenido actual de la tabla
        this.tablaConvenios.innerHTML = ''

        // Crear fila de encabezados
        const encabezados = document.createElement('tr');

        // Crear celdas de encabezados
        const thTitulo = document.createElement('th');
        thTitulo.textContent = 'Título'

        const thFechaFirma = document.createElement('th')
        thFechaFirma.textContent = 'Fecha Firma'

        const thEmpresa = document.createElement('th')
        thEmpresa.textContent = 'Empresa'

        const thCiclo = document.createElement('th')
        thCiclo.textContent = 'Ciclo'

        const thVerConvenio = document.createElement('th')
        thVerConvenio.textContent = 'Ver Convenio'

        // Añadir celdas de encabezados a la fila de encabezados
        encabezados.appendChild(thTitulo)
        encabezados.appendChild(thFechaFirma)
        encabezados.appendChild(thEmpresa)
        encabezados.appendChild(thCiclo)
        encabezados.appendChild(thVerConvenio)

        // Añadir fila de encabezados a la sección thead de la tabla
        const cabeceraTabla = this.tablaConvenios.createTHead();
        cabeceraTabla.appendChild(encabezados)

        // Iterar sobre cada convenio y crear una fila en la tabla
        convenios.forEach(convenio => {
          const fila = document.createElement('tr')

          // Crear celdas para cada propiedad del convenio
          const tituloCelda = document.createElement('td')
          tituloCelda.textContent = convenio.titulo

          const fechaFirmaCelda = document.createElement('td')
          fechaFirmaCelda.textContent = convenio.fecha_firma

          const empresaCelda = document.createElement('td')
          empresaCelda.textContent = convenio.nombreEmpresa

          const cicloCelda = document.createElement('td')
          cicloCelda.textContent = convenio.nombreCiclo

          // Crear el botón para ver el convenio
          const verConvenioCelda = document.createElement('td')
          const botonVerConvenio = document.createElement('button')
          botonVerConvenio.textContent = 'Ver Convenio'
          botonVerConvenio.className = 'boton-ver-convenios'
          verConvenioCelda.appendChild(botonVerConvenio)

          // Añadir las celdas a la fila
          fila.appendChild(tituloCelda)
          fila.appendChild(fechaFirmaCelda)
          fila.appendChild(empresaCelda)
          fila.appendChild(cicloCelda)
          fila.appendChild(verConvenioCelda)

          // Añadir la fila a la tabla
          this.tablaConvenios.appendChild(fila)
        })
      })
      .catch(error => {
        console.error('Error al cargar los convenios:', error)
      })
  }
}
