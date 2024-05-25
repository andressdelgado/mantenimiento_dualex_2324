import { Vista } from './vista.js';

/**
 * VistaEmpresas: Vista correspondiente al listado de empresas de la aplicación DualEx.
 * Permite listar las empresas, añadir una nueva empresa, editar y borrar empresas existentes.
 */
export class VistaEmpresas extends Vista {
  /**
   * Constructor de la clase.
   * @param {Object} controlador - Controlador de la vista principal.
   * @param {Node} base - Nodo al que se añadirá la vista principal.
   */
  constructor(controlador, base) {
    super(controlador);
    this.base = base;
  }

  /**
   * Método cargarEmpresas: Carga y muestra la lista de empresas en la interfaz de usuario.
   */
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

        // Crear un contenedor para las empresas
        const divEmpresas = document.createElement('div');
        divEmpresas.id = 'divEmpresas2';

        // Agregar cada empresa como un elemento de div
        empresas.forEach(empresa => {
          const itemEmpresa = document.createElement('div');
          itemEmpresa.classList.add('empresa-item');

          itemEmpresa.innerHTML = `
            <div class="empresa-info">
              <span><strong>ID:</strong> ${empresa.id}</span>
              <span><strong>Siglas:</strong> ${empresa.siglas}</span>
              <span><strong>Nombre:</strong> ${empresa.nombre}</span>
              <span><strong>Notas:</strong> ${empresa.notas}</span>
            </div>
            <div class="iconos">
              <img src="./iconos/edit.svg" class="icono editar" alt="Editar">
              <img src="./iconos/delete.svg" class="icono borrar" alt="Borrar">
            </div>
          `;

          itemEmpresa.querySelector('.editar').addEventListener('click', () => {
            this.handleClickEditar(empresa.id);
          });

          itemEmpresa.querySelector('.borrar').addEventListener('click', () => {
            this.handleClickBorrar(empresa.id);
          });

          divEmpresas.appendChild(itemEmpresa);
        });

        // Agregar el contenedor de empresas
        this.base.appendChild(divEmpresas);
      })
      .catch(error => {
        // Manejar errores en caso de que la promesa sea rechazada
        console.error('Error al cargar empresas:', error);
        this.base.appendChild(document.createTextNode('Error al cargar empresas.'));
      });
  }

  /**
   * Método handleClickEditar: Maneja el evento de clic en el botón de editar una empresa.
   * @param {string} id - ID de la empresa a editar.
   */
  handleClickEditar(id) {
    // Lógica para editar la empresa asociada a este botón
    this.controlador.ocultarVistas();
    this.controlador.mostrarDatosEmpresa(id).then(empresa => {
      // Mostrar los datos de la empresa en el formulario de edición
      this.controlador.vistaEditarEmpresa.mostrarEmpresaEnFormulario(empresa);
      // Mostrar la vista de edición de empresa
      this.controlador.vistaEditarEmpresa.mostrar(true);
    })
    .catch(error => {
      console.error('Error al obtener datos de empresa:', error);
    });
  }

  /**
   * Método handleClickBorrar: Maneja el evento de clic en el botón de borrar una empresa.
   * @param {string} id - ID de la empresa a borrar.
   */
  handleClickBorrar(id) {
    // Mostrar un cuadro de confirmación
    const titulo = 'Confirmar borrado';
    const mensaje = '¿Realmente desea borrar esta empresa?';              
    // Si el usuario confirma, proceder con las acciones de borrado
    this.controlador.vistaDialogo.abrir(titulo, mensaje, (confirmacion) => {
      if (confirmacion) {
        // Si el usuario confirma, proceder con las acciones de borrado
        this.controlador.borrarEmpresa(id).then(() => {
          this.controlador.ocultarVistas();
          this.controlador.vistaEmpresas.mostrar(true)
        });
      }
    });
  }
}
