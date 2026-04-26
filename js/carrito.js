// ================================
// ELEMENTOS
// ================================

const btnCarrito = document.getElementById('btn-carrito');
const carritoPanel = document.getElementById('carrito-panel');
const cerrarCarrito = document.getElementById('cerrar-carrito');
const carritoItems = document.getElementById('carrito-items');
const carritoTotal = document.getElementById('carrito-total');
const cartCount = document.getElementById('cart-count');
const botonesAgregarCarrito = document.querySelectorAll('.btn-agregar-carrito');

// ================================
// ESTADO DEL CARRITO
// ================================

let carrito = [];

// ================================
// ABRIR Y CERRAR
// ================================

btnCarrito.addEventListener('click', (e) => {
    e.stopPropagation();
    carritoPanel.classList.toggle('abierto');
    overlay.classList.toggle('activo');
});

cerrarCarrito.addEventListener('click', () => {
    carritoPanel.classList.remove('abierto');
    overlay.classList.remove('activo');
});

overlay.addEventListener('click', () => {
    carritoPanel.classList.remove('abierto');
});

// ================================
// AGREGAR PRODUCTO AL CARRITO
// ================================

botonesAgregarCarrito.forEach(boton => {
    boton.addEventListener('click', () => {
        const card = boton.closest('article');
        const nombre = card.querySelector('h4').textContent;
        const precio = card.querySelector('strong').textContent;
        const cantidadSpan = card.querySelector('.cantidad');
        const cantidad = parseInt(cantidadSpan.textContent);

        if (cantidad === 0) return;

        const precioNumero = parseInt(precio.replace(/\$|\.|\./g, ''));

        const productoExistente = carrito.find(p => p.nombre === nombre);

        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            carrito.push({
                nombre,
                precio: precioNumero,
                cantidad
            });
        }

        cantidadSpan.textContent = '0';
        renderizarCarrito();
    });
});

// ================================
// RENDERIZAR CARRITO
// ================================

function renderizarCarrito() {
    carritoItems.innerHTML = '';

    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío.</p>';
        actualizarTotal();
        actualizarContador();
        return;
    }

    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        const item = document.createElement('div');
        item.classList.add('carrito-item');
        item.innerHTML = `
            <img src="img/placeholder.jpg" alt="${producto.nombre}">
            <div class="carrito-item-info">
                <p class="carrito-item-nombre">${producto.nombre}</p>
                <p class="carrito-item-precio">$${producto.precio.toLocaleString('es-AR')}</p>
                <div class="carrito-item-cantidad">
                    <button type="button" class="carrito-restar" data-index="${index}">-</button>
                    <span>${producto.cantidad}</span>
                    <button type="button" class="carrito-sumar" data-index="${index}">+</button>
                </div>
                <p class="carrito-item-subtotal">$${subtotal.toLocaleString('es-AR')}</p>
            </div>
        `;
        carritoItems.appendChild(item);
    });

    asignarEventosCantidad();
    actualizarTotal();
    actualizarContador();
}

// ================================
// CANTIDAD DENTRO DEL CARRITO
// ================================

function asignarEventosCantidad() {
    document.querySelectorAll('.carrito-restar').forEach(boton => {
        boton.addEventListener('click', () => {
            const index = parseInt(boton.dataset.index);
            carrito[index].cantidad -= 1;
            if (carrito[index].cantidad === 0) {
                carrito.splice(index, 1);
            }
            renderizarCarrito();
        });
    });

    document.querySelectorAll('.carrito-sumar').forEach(boton => {
        boton.addEventListener('click', () => {
            const index = parseInt(boton.dataset.index);
            carrito[index].cantidad += 1;
            renderizarCarrito();
        });
    });
}

// ================================
// TOTAL Y CONTADOR
// ================================

function actualizarTotal() {
    const total = carrito.reduce((acum, producto) => {
        return acum + (producto.precio * producto.cantidad);
    }, 0);
    carritoTotal.textContent = '$' + total.toLocaleString('es-AR');
}

function actualizarContador() {
    const totalItems = carrito.reduce((acum, producto) => {
        return acum + producto.cantidad;
    }, 0);
    cartCount.textContent = totalItems;
}