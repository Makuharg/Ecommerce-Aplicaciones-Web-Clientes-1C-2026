// ================================
// ELEMENTOS
// ================================

const botonesCategoria = document.querySelectorAll('.btn-categoria');
const todasLasCards = document.querySelectorAll('.productos-grid article');

// ================================
// ESTADO
// ================================

let categoriaActiva = 'todos';
let busquedaActiva = '';

// ================================
// FUNCIÓN CENTRAL
// ================================

function aplicarFiltros() {
    todasLasCards.forEach(card => {
        const nombre = card.querySelector('h4').textContent.toLowerCase();
        const categoria = card.dataset.categoria;

        const coincideCategoria = categoriaActiva === 'todos' || categoria === categoriaActiva;
        const coincideBusqueda = nombre.includes(busquedaActiva);

        if (coincideCategoria && coincideBusqueda) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function marcarActivo(botonActivo) {
    botonesCategoria.forEach(boton => boton.classList.remove('activo'));
    botonActivo.classList.add('activo');
}

// ================================
// EVENTOS CATEGORÍAS
// ================================

botonesCategoria.forEach(boton => {
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        categoriaActiva = boton.dataset.categoria;
        marcarActivo(boton);
        aplicarFiltros();
    });
});