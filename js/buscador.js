// ================================
// ELEMENTOS
// ================================

const buscador = document.getElementById('buscador');
const todasLasCards = document.querySelectorAll('.productos-grid article');

// ================================
// EVENTOS
// ================================

buscador.addEventListener('input', () => {
    const busqueda = buscador.value.toLowerCase().trim();

    todasLasCards.forEach(card => {
        const nombre = card.querySelector('h4').textContent.toLowerCase();

        if (busqueda === '') {
            card.style.display = 'flex';
        } else if (nombre.includes(busqueda)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});