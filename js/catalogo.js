// ================================
// RENDERIZAR CARDS
// ================================

function crearCard(producto) {
    const article = document.createElement('article');
    article.dataset.categoria = categoriaMap[producto.categoria_id] || 'otros';
    article.innerHTML = `
        <img src="${producto.imagen || 'img/placeholder.jpg'}" alt="${producto.nombre}">
        <h4>${producto.nombre}</h4>
        <p>${producto.descripcion}</p>
        <p><strong>$${producto.precio.toLocaleString('es-AR')}</strong></p>
        <div class="cantidad-control">
            <button type="button" class="btn-restar">-</button>
            <span class="cantidad">0</span>
            <button type="button" class="btn-sumar">+</button>
        </div>
        <button type="button" class="btn-agregar-carrito">Agregar al carrito</button>
        <a href="product-detail.html" class="detalle-link">Ver detalle</a>
    `;
    return article;
}

async function cargarCatalogo() {
    const grid = document.querySelector('.productos-grid');
    if (!grid) return;

    grid.innerHTML = '<p class="catalogo-mensaje">Cargando productos...</p>';

    const productos = await obtenerProductos();

    if (!productos) {
        grid.innerHTML = '<p class="catalogo-mensaje">Error al cargar productos.</p>';
        return;
    }

    grid.innerHTML = '';

    productos.forEach(producto => {
        const card = crearCard(producto);
        grid.appendChild(card);
    });

    lucide.createIcons();
    inicializarFiltros();
    inicializarCantidad();
    inicializarCarrito();
}

// ================================
// INICIALIZAR
// ================================

cargarCatalogo();