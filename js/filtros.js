// ================================
// ELEMENTOS
// ================================

const botonesCategoria = document.querySelectorAll('.btn-categoria');
const cards = document.querySelectorAll('.productos-grid article');

// ================================
// FUNCIONES
// ================================

function filtrarProductos(categoria) {
    cards.forEach(card => {
        if (categoria === 'todos') {
            card.style.display = 'flex';
        } else if (card.dataset.categoria === categoria) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function marcarActivo(botonActivo) {
    botonesCategoria.forEach(boton => {
        boton.classList.remove('activo');
    });
    botonActivo.classList.add('activo');
}

// ================================
// EVENTOS
// ================================

botonesCategoria.forEach(boton => {
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        const categoria = boton.dataset.categoria;
        filtrarProductos(categoria);
        marcarActivo(boton);
    });
});