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
// AGREGAR Y EDITAR
// ================================

if (gestionForm) {
    gestionForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('g-nombre').value;
        const precio = parseInt(document.getElementById('g-precio').value);
        const categoria = document.getElementById('g-categoria').value;
        const descripcion = document.getElementById('g-descripcion').value;
        const stock = parseInt(document.getElementById('g-stock').value);

        const categoriaMap = {
            'televisores': 1,
            'celulares': 2,
            'computadoras': 3,
            'tablets': 4
        };

        const imagen = document.getElementById('g-imagen').value;

        const resultado = await agregarProducto(
            nombre,
            descripcion,
            precio,
            stock,
            imagen,
            categoriaMap[categoria]
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

        const popupExito = document.getElementById('popup-exito');
        const overlayExito = document.getElementById('overlay-exito');
        popupExito.classList.add('activo');
        overlayExito.classList.add('activo');

        setTimeout(() => {
            popupExito.classList.remove('activo');
            overlayExito.classList.remove('activo');
        }, 3500);

            gestionForm.reset();
            document.querySelector('.gestion-agregar').removeAttribute('open');
            renderizarLista(productos);
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

    document.getElementById('gestion-form-editar').dataset.editando = producto.id;
}

// ================================
// EVENTOS DE LISTA
// ================================

function asignarEventosLista() {
    document.querySelectorAll('.gestion-btn-eliminar').forEach(boton => {
        boton.addEventListener('click', () => {
            const id = parseInt(boton.dataset.id);
            productos = productos.filter(p => p.id !== id);
            renderizarLista(productos);
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
    formEditar.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = parseInt(formEditar.dataset.editando);
        const index = productos.findIndex(p => p.id === id);

        productos[index] = {
            id,
            nombre: document.getElementById('e-nombre').value,
            precio: parseInt(document.getElementById('e-precio').value),
            categoria: document.getElementById('e-categoria').value,
            stock: parseInt(document.getElementById('e-stock').value)
        };

        mostrarLista();
        renderizarLista(productos);
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