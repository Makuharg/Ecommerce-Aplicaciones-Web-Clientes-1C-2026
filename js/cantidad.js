// ================================
// ELEMENTOS
// ================================
function inicializarCantidad() {
    const controlesRestar = document.querySelectorAll('.btn-restar');
    const controlesAgregar = document.querySelectorAll('.btn-sumar');

    // ================================
    // FUNCIONES
    // ================================

    function obtenerCantidad(boton) {
        return boton.parentElement.querySelector('.cantidad');
    }

    // ================================
    // EVENTOS
    // ================================

    controlesRestar.forEach(boton => {
        boton.addEventListener('click', () => {
            const cantidad = obtenerCantidad(boton);
            const valor = parseInt(cantidad.textContent);
            if (valor > 1) {
                cantidad.textContent = valor - 1;
            }
        });
    });

    controlesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            const cantidad = obtenerCantidad(boton);
            const valor = parseInt(cantidad.textContent);
            cantidad.textContent = valor + 1;
        });
    });
}