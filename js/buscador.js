// ================================
// ELEMENTOS
// ================================

const buscador = document.getElementById('buscador');

// ================================
// EVENTOS
// ================================

buscador.addEventListener('input', () => {
    busquedaActiva = buscador.value.toLowerCase().trim();
    aplicarFiltros();
});