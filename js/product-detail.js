// ================================
// ELEMENTOS
// ================================

const btnRestar = document.getElementById('btn-restar');
const btnSumar = document.getElementById('btn-sumar');
const cantidad = document.getElementById('cantidad');

// ================================
// LEER ID DE LA URL
// ================================

const params = new URLSearchParams(window.location.search);
const productoId = params.get('id');

// ================================
// CARGAR PRODUCTO
// ================================

async function cargarProducto() {
    if (!productoId) {
        document.querySelector('.detalle-section').innerHTML = '<p class="catalogo-mensaje">Producto no encontrado.</p>';
        return;
    }

    const producto = await obtenerProductoPorId(productoId);

    if (!producto) {
        document.querySelector('.detalle-section').innerHTML = '<p class="catalogo-mensaje">Producto no encontrado.</p>';
        return;
    }

    const categoriaMap = {
        1: 'Televisores',
        2: 'Celulares',
        3: 'Computadoras',
        4: 'Tablets'
    };

    document.getElementById('producto-imagen').src = producto.imagen || 'img/placeholder.jpg';
    document.getElementById('producto-imagen').alt = producto.nombre;
    document.getElementById('producto-categoria').textContent = categoriaMap[producto.categoria_id] || 'Producto';
    document.getElementById('producto-nombre').textContent = producto.nombre;
    document.getElementById('producto-precio').textContent = '$' + producto.precio.toLocaleString('es-AR');
    document.getElementById('producto-descripcion').textContent = producto.descripcion;

    const specs = document.getElementById('producto-specs');
    specs.innerHTML = `
        <li><span>Categoría</span><span>${categoriaMap[producto.categoria_id] || '-'}</span></li>
        <li><span>Stock</span><span>${producto.stock} unidades</span></li>
        <li><span>Precio</span><span>$${producto.precio.toLocaleString('es-AR')}</span></li>
    `;
}

cargarProducto();

// ================================
// SELECTOR DE CANTIDAD
// ================================

btnRestar.addEventListener('click', () => {
    const valor = parseInt(cantidad.textContent);
    if (valor > 0) cantidad.textContent = valor - 1;
});

btnSumar.addEventListener('click', () => {
    const valor = parseInt(cantidad.textContent);
    cantidad.textContent = valor + 1;
});