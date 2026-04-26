// ================================
// ELEMENTOS
// ================================

const btnRestar = document.getElementById('btn-restar');
const btnSumar = document.getElementById('btn-sumar');
const cantidad = document.getElementById('cantidad');

// ================================
// EVENTOS
// ================================

btnRestar.addEventListener('click', () => {
    const valor = parseInt(cantidad.textContent);
    if (valor > 0) {
        cantidad.textContent = valor - 1;
    }
});

btnSumar.addEventListener('click', () => {
    const valor = parseInt(cantidad.textContent);
    cantidad.textContent = valor + 1;
});