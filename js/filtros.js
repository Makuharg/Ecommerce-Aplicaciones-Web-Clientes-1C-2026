// ================================
// ESTADO
// ================================

let categoriaActiva = 'todos';
let busquedaActiva = '';

// ================================
// FUNCIÓN CENTRAL
// ================================

function aplicarFiltros() {
    const cards = document.querySelectorAll('.productos-grid article');
    cards.forEach(card => {
        const nombre = card.querySelector('h4').textContent.toLowerCase();
        const categoria = card.dataset.categoria;

        const coincideCategoria = categoriaActiva === 'todos' || categoria === categoriaActiva;
        const coincideBusqueda = nombre.includes(busquedaActiva);

        card.style.display = (coincideCategoria && coincideBusqueda) ? 'flex' : 'none';
    });
}

function marcarActivo(botonActivo) {
    document.querySelectorAll('.btn-categoria').forEach(boton => boton.classList.remove('activo'));
    botonActivo.classList.add('activo');
}

// ================================
// INICIALIZAR FILTROS
// ================================

function inicializarFiltros() {
    document.querySelectorAll('.btn-categoria').forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            categoriaActiva = boton.dataset.categoria;
            marcarActivo(boton);
            aplicarFiltros();
        });
    });
}