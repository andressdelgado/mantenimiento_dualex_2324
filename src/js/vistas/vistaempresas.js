import { Vista } from './vista.js'

/**
 Vista correspondiente al alta de convenio de la aplicación dualex.
 Sirve para dar de alta los convenio.
 **/
export class VistaEmpresas extends Vista {
  /**
   Constructor de la clase.
   @param {Object} controlador Controlador de la vista principal.
   @param {Node} base Nodo al que se añadirá la vista principal.
   **/
  constructor (controlador, base) {
    super(controlador)
    this.base = base 
  }

  cargarEmpresas() {
    // Eliminar cualquier contenido previo en la base
    this.eliminarHijos(this.base);

    // Llamar a la función del controlador para mostrar las empresas
    this.controlador.mostrarEmpresas()
      .then(empresas => {
        // Si no hay empresas, mostramos un mensaje
        if (!empresas || empresas.length === 0) {
          this.base.appendChild(document.createTextNode('No hay empresas.'));
          return;
        }

        // Crear una lista no ordenada para mostrar el listado de empresas
        const listaEmpresas = document.createElement('ul');
        listaEmpresas.classList.add('lista-empresas');

        // Agregar cada empresa como un elemento de lista
        empresas.forEach(empresa => {
          const itemLista = document.createElement('li');
          itemLista.innerHTML = `
            <strong>ID:</strong> ${empresa.id}, 
            <strong>Siglas:</strong> ${empresa.siglas}, 
            <strong>Nombre:</strong> ${empresa.nombre}, 
            <strong>Notas:</strong> ${empresa.notas}
          `;
          listaEmpresas.appendChild(itemLista);
        });

        // Agregar la lista al nodo base
        this.base.appendChild(listaEmpresas);
      })
      .catch(error => {
        // Manejar errores en caso de que la promesa sea rechazada
        console.error('Error al cargar empresas:', error);
        this.base.appendChild(document.createTextNode('Error al cargar empresas.'));
      });
  }
}