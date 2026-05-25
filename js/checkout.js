// ================================
// ELEMENTOS
// ================================

const checkoutLista = document.getElementById('checkout-lista');
const checkoutTotal = document.getElementById('checkout-total');
const btnConfirmar = document.getElementById('btn-confirmar');

// ================================
// RENDERIZAR CHECKOUT
// ================================

function renderizarCheckout() {
    checkoutLista.innerHTML = '';

    if (carrito.length === 0) {
        checkoutLista.innerHTML = '<p class="checkout-vacio">Tu carrito está vacío.</p>';
        checkoutTotal.textContent = '$0';
        return;
    }

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        const item = document.createElement('div');
        item.classList.add('checkout-item');
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="checkout-item-info">
                <p class="checkout-item-nombre">${producto.nombre}</p>
                <p class="checkout-item-cantidad">Cantidad: ${producto.cantidad}</p>
                <p class="checkout-item-subtotal">$${subtotal.toLocaleString('es-AR')}</p>
            </div>
        `;
        checkoutLista.appendChild(item);
    });

    const total = carrito.reduce((acum, producto) => {
        return acum + (producto.precio * producto.cantidad);
    }, 0);

    checkoutTotal.textContent = '$' + total.toLocaleString('es-AR');
}

// ================================
// CONFIRMAR COMPRA
// ================================

btnConfirmar.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }

    localStorage.removeItem('carrito');
    carrito.length = 0;
    renderizarCarrito();
    renderizarCheckout();
    document.getElementById('cart-count').textContent = '0';

    document.getElementById('popup-confirmacion').classList.add('activo');
    overlay.classList.add('activo');
    document.body.style.overflow = 'hidden';
});

document.getElementById('btn-ir-inicio').addEventListener('click', () => {
    window.location.href = 'index.html';
});

// ================================
// INICIALIZAR
// ================================

renderizarCheckout();