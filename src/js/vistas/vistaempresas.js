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

        

        // Agregar cada empresa como un elemento de div
        empresas.forEach(empresa => {
          const itemEmpresa = document.createElement('div');
          itemEmpresa.classList.add('empresa-item');
          
          const empresaInfo = document.createElement('div');
          empresaInfo.classList.add('empresa-info');
          empresaInfo.addEventListener('click', () => {
            this.handleClickEditar(empresa.id);
          });
          /*const idSpan = document.createElement('span');
          const idStrong = document.createElement('strong');
          idStrong.textContent = 'ID: ';
          idSpan.appendChild(idStrong);
          idSpan.appendChild(document.createTextNode(empresa.id));
          empresaInfo.appendChild(idSpan);*/
        
          const siglasSpan = document.createElement('span');
          //const siglasStrong = document.createElement('strong');
          //siglasStrong.textContent = 'Siglas: ';
          //siglasSpan.appendChild(siglasStrong);
          siglasSpan.appendChild(document.createTextNode(empresa.siglas));
          empresaInfo.appendChild(siglasSpan);
        
          const nombreSpan = document.createElement('span');
          //const nombreStrong = document.createElement('strong');
          //nombreStrong.textContent = 'Nombre: ';
          //nombreSpan.appendChild(nombreStrong);
          nombreSpan.appendChild(document.createTextNode(empresa.nombre));
          empresaInfo.appendChild(nombreSpan);
        
          const notasSpan = document.createElement('span');
          //const notasStrong = document.createElement('strong');
          //notasStrong.textContent = 'Notas: ';
          //notasSpan.appendChild(notasStrong);
          empresaInfo.appendChild(document.createElement('br'))
          notasSpan.appendChild(document.createTextNode(empresa.notas));
          empresaInfo.appendChild(notasSpan);
        
          itemEmpresa.appendChild(empresaInfo);
        
          const iconosDiv = document.createElement('div');
          iconosDiv.classList.add('iconos');
        
          const editarImg = document.createElement('img');
          editarImg.src = "./iconos/edit.svg";
          editarImg.classList.add('icono', 'editar');
          editarImg.alt = "Editar";
          editarImg.addEventListener('click', () => {
            this.handleClickEditar(empresa.id);
          });
          iconosDiv.appendChild(editarImg);
        
          const borrarImg = document.createElement('img');
          borrarImg.src = "./iconos/delete.svg";
          borrarImg.classList.add('icono', 'borrar');
          borrarImg.alt = "Borrar";
          borrarImg.addEventListener('click', () => {
            this.handleClickBorrar(empresa.id);
          });
          iconosDiv.appendChild(borrarImg);
        
          itemEmpresa.appendChild(iconosDiv);
        
          divEmpresas.appendChild(itemEmpresa);
        });
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
