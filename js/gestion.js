// ================================
// ELEMENTOS
// ================================

const btnGestionModal = document.getElementById('btn-gestion');
const popupGestion = document.getElementById('popup-gestion');
const cerrarGestion = document.getElementById('cerrar-gestion');
const gestionBuscador = document.getElementById('gestion-buscador');
const gestionLista = document.getElementById('gestion-lista');
const gestionForm = document.querySelector('.gestion-form');

// ================================
// ESTADO
// ================================

let productos = [];

// ================================
// ABRIR Y CERRAR
// ================================

if (btnGestionModal) {
    btnGestionModal.addEventListener('click', async (e) => {
        e.stopPropagation();
        document.getElementById('popup-exito').classList.remove('activo');
        popupGestion.classList.add('activo');
        overlay.classList.add('activo');
        document.body.style.overflow = 'hidden';

        const data = await obtenerProductos();
        if (data) {
            productos = data.map(p => ({
                id: p.id,
                nombre: p.nombre,
                precio: p.precio,
                descripcion: p.descripcion,
                categoria: categoriaMap[p.categoria_id] || 'otros',
                stock: p.stock,
                imagen: p.imagen
            }));
        }

        renderizarLista(productos);
    });
}

if (cerrarGestion) {
    cerrarGestion.addEventListener('click', () => {
        popupGestion.classList.remove('activo');
        overlay.classList.remove('activo');
        document.body.style.overflow = '';
    });
}

// ================================
// RENDERIZAR LISTA
// ================================

function renderizarLista(lista) {
    if (!gestionLista) return;
    gestionLista.innerHTML = '';

    if (lista.length === 0) {
        gestionLista.innerHTML = '<p style="text-align:center; color:#888; font-size:14px;">No se encontraron productos.</p>';
        return;
    }

    lista.forEach(producto => {
        const item = document.createElement('div');
        item.classList.add('gestion-item');
        item.innerHTML = `
            <div class="gestion-item-info">
                <p class="gestion-item-nombre">${producto.nombre}</p>
                <p class="gestion-item-precio">$${producto.precio.toLocaleString('es-AR')}</p>
            </div>
            <div class="gestion-item-acciones">
                <button type="button" class="gestion-btn-editar" data-id="${producto.id}">
                    <i data-lucide="pencil"></i>
                </button>
                <button type="button" class="gestion-btn-eliminar" data-id="${producto.id}">
                    <i data-lucide="trash-2"></i>
                </button>
            </div>
        `;
        gestionLista.appendChild(item);
    });

    lucide.createIcons();
    asignarEventosLista();
}

// ================================
// BUSCADOR
// ================================

if (gestionBuscador) {
    gestionBuscador.addEventListener('input', () => {
        const busqueda = gestionBuscador.value.toLowerCase().trim();
        const filtrados = productos.filter(p =>
            p.nombre.toLowerCase().includes(busqueda)
        );
        renderizarLista(filtrados);
    });
}

// ================================
// AGREGAR PRODUCTO
// ================================

if (gestionForm) {
    gestionForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('g-nombre').value;
        const precio = parseInt(document.getElementById('g-precio').value);
        const categoria = document.getElementById('g-categoria').value;
        const descripcion = document.getElementById('g-descripcion').value;
        const stock = parseInt(document.getElementById('g-stock').value);
        const imagen = document.getElementById('g-imagen').value;

        const categoriaIdMap = {
            'televisores': 1,
            'celulares': 2,
            'computadoras': 3,
            'tablets': 4
        };

        const resultado = await agregarProducto(
            nombre,
            descripcion,
            precio,
            stock,
            imagen,
            categoriaIdMap[categoria]
        );

        if (resultado) {
            const nuevoProducto = resultado[0];
            productos.push({
                id: nuevoProducto.id,
                nombre: nuevoProducto.nombre,
                precio: nuevoProducto.precio,
                categoria,
                stock: nuevoProducto.stock
            });

            gestionForm.reset();
            document.querySelector('.gestion-agregar').removeAttribute('open');
            renderizarLista(productos);
            await cargarCatalogo();

            const popupExito = document.getElementById('popup-exito');
            const overlayInterno = document.getElementById('overlay-gestion-interno');
            popupExito.classList.add('activo');
            overlayInterno.classList.add('activo');

            setTimeout(() => {
                popupExito.classList.remove('activo');
                overlayInterno.classList.remove('activo');
            }, 2500);
        } else {
            alert('Error al guardar el producto. Intentá de nuevo.');
        }
    });
}

// ================================
// VISTAS
// ================================

function mostrarLista() {
    document.getElementById('gestion-vista-lista').classList.remove('oculto');
    document.getElementById('gestion-vista-edicion').classList.add('oculto');
    document.getElementById('gestion-titulo').textContent = 'Gestión de Productos';
}

function mostrarEdicion(producto) {
    document.getElementById('gestion-vista-lista').classList.add('oculto');
    document.getElementById('gestion-vista-edicion').classList.remove('oculto');
    document.getElementById('gestion-titulo').textContent = 'Editar Producto';

    document.getElementById('e-nombre').value = producto.nombre;
    document.getElementById('e-precio').value = producto.precio;
    document.getElementById('e-categoria').value = producto.categoria;
    document.getElementById('e-stock').value = producto.stock || 0;
    document.getElementById('e-descripcion').value = producto.descripcion || '';

    document.getElementById('gestion-form-editar').dataset.editando = producto.id;
}

// ================================
// EVENTOS DE LISTA
// ================================

function asignarEventosLista() {
        document.querySelectorAll('.gestion-btn-eliminar').forEach(boton => {
            boton.addEventListener('click', () => {
                const id = parseInt(boton.dataset.id);

                const popupConfirmar = document.getElementById('popup-confirmar-eliminar');
                const overlayInterno = document.getElementById('overlay-gestion-interno');
                popupConfirmar.classList.add('activo');
                overlayInterno.classList.add('activo');

        document.getElementById('btn-confirmar-eliminar').onclick = async () => {
            const resultado = await eliminarProducto(id);

            popupConfirmar.classList.remove('activo');
            overlayInterno.classList.remove('activo');

            if (resultado) {
                productos = productos.filter(p => p.id !== id);
                renderizarLista(productos);
                await cargarCatalogo();

                const popupExitoEliminar = document.getElementById('popup-exito-eliminar');
                const overlayInterno2 = document.getElementById('overlay-gestion-interno');
                popupExitoEliminar.classList.add('activo');
                overlayInterno2.classList.add('activo');

                setTimeout(() => {
                    popupExitoEliminar.classList.remove('activo');
                    overlayInterno2.classList.remove('activo');
                }, 2500);
            } else {
                alert('Error al eliminar el producto.');
            }
        };

        document.getElementById('btn-cancelar-eliminar').onclick = () => {
                popupConfirmar.classList.remove('activo');
                overlayInterno.classList.remove('activo');
            };
        });
    });

    document.querySelectorAll('.gestion-btn-editar').forEach(boton => {
        boton.addEventListener('click', () => {
            const id = parseInt(boton.dataset.id);
            const producto = productos.find(p => p.id === id);
            if (!producto) return;
            mostrarEdicion(producto);
        });
    });
}

// ================================
// GUARDAR EDICIÓN
// ================================

const formEditar = document.getElementById('gestion-form-editar');
if (formEditar) {
    formEditar.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = parseInt(formEditar.dataset.editando);
        const nombre = document.getElementById('e-nombre').value;
        const precio = parseInt(document.getElementById('e-precio').value);
        const categoria = document.getElementById('e-categoria').value;
        const stock = parseInt(document.getElementById('e-stock').value);
        const descripcion = document.getElementById('e-descripcion').value;

        const categoriaIdMap = {
            'televisores': 1,
            'celulares': 2,
            'computadoras': 3,
            'tablets': 4
        };

        const resultado = await actualizarProducto(
            id,
            nombre,
            descripcion,
            precio,
            stock,
            productos.find(p => p.id === id)?.imagen || '',
            categoriaIdMap[categoria]
        );

        if (resultado) {
            const index = productos.findIndex(p => p.id === id);
            productos[index] = { id, nombre, precio, categoria, stock };
            mostrarLista();
            renderizarLista(productos);
            await cargarCatalogo();

            const popupExitoEdicion = document.getElementById('popup-exito-edicion');
            const overlayInterno = document.getElementById('overlay-gestion-interno');
            popupExitoEdicion.classList.add('activo');
            overlayInterno.classList.add('activo');

            setTimeout(() => {
                popupExitoEdicion.classList.remove('activo');
                overlayInterno.classList.remove('activo');
            }, 2500);
        } else {
            alert('Error al actualizar el producto.');
        }
    });
}

// ================================
// CANCELAR EDICIÓN
// ================================

const btnCancelarEdicion = document.getElementById('btn-cancelar-edicion');
if (btnCancelarEdicion) {
    btnCancelarEdicion.addEventListener('click', () => {
        mostrarLista();
    });
}