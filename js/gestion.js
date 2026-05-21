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

let productos = [
    { id: 1, nombre: 'Smart TV 55" 4K Ultra HD', precio: 450000, categoria: 'televisores' },
    { id: 2, nombre: 'Smart TV 65" OLED', precio: 890000, categoria: 'televisores' },
    { id: 3, nombre: 'TV 50" QLED', precio: 320000, categoria: 'televisores' },
    { id: 4, nombre: 'TV 32" HD Básico', precio: 120000, categoria: 'televisores' },
    { id: 5, nombre: 'Smartphone Premium 512GB', precio: 980000, categoria: 'celulares' },
    { id: 6, nombre: 'Smartphone Gama Media 256GB', precio: 450000, categoria: 'celulares' },
    { id: 7, nombre: 'Celular Entrada 64GB', precio: 180000, categoria: 'celulares' },
    { id: 8, nombre: 'Laptop Gaming 17"', precio: 2100000, categoria: 'computadoras' },
    { id: 9, nombre: 'Ultrabook 13"', precio: 1200000, categoria: 'computadoras' },
    { id: 10, nombre: 'Computadora de Escritorio', precio: 950000, categoria: 'computadoras' },
    { id: 11, nombre: 'Tablet Pro 12"', precio: 750000, categoria: 'tablets' },
    { id: 12, nombre: 'Tablet 10" WiFi', precio: 350000, categoria: 'tablets' }
];

// ================================
// ABRIR Y CERRAR
// ================================

if (btnGestionModal) {
    btnGestionModal.addEventListener('click', (e) => {
        e.stopPropagation();
        popupGestion.classList.add('activo');
        overlay.classList.add('activo');
        document.body.style.overflow = 'hidden';
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
    gestionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('g-nombre').value;
        const precio = parseInt(document.getElementById('g-precio').value);
        const categoria = document.getElementById('g-categoria').value;
        const stock = parseInt(document.getElementById('g-stock').value);

        const idEditando = gestionForm.dataset.editando;

        if (idEditando) {
            const index = productos.findIndex(p => p.id === parseInt(idEditando));
            productos[index] = { id: parseInt(idEditando), nombre, precio, categoria, stock };
            delete gestionForm.dataset.editando;
        } else {
            const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
            productos.push({ id: nuevoId, nombre, precio, categoria, stock });
        }

        gestionForm.reset();
        document.querySelector('.gestion-agregar').removeAttribute('open');
        renderizarLista(productos);
    });
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

            document.getElementById('g-nombre').value = producto.nombre;
            document.getElementById('g-precio').value = producto.precio;
            document.getElementById('g-categoria').value = producto.categoria;

            gestionForm.dataset.editando = producto.id;

            document.querySelector('.gestion-agregar').setAttribute('open', '');
            document.getElementById('g-nombre').focus();
        });
    });
}