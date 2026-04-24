// ================================
// ELEMENTOS
// ================================

const btnUsuario = document.getElementById('btn-usuario');
const menuUsuario = document.querySelector('.usuario');
const overlay = document.getElementById('overlay');

const popupLogin = document.getElementById('popup-login');
const popupRegistro = document.getElementById('popup-registro');

const cerrarLogin = document.getElementById('cerrar-login');
const cerrarRegistro = document.getElementById('cerrar-registro');

const irRegistro = document.querySelectorAll('#ir-registro');
const irLogin = document.querySelectorAll('#ir-login');

// ================================
// FUNCIONES
// ================================

function abrirPopup(popup) {
    popup.classList.add('activo');
    overlay.classList.add('activo');
    document.body.style.overflow = 'hidden';
}

function cerrarPopups() {
    popupLogin.classList.remove('activo');
    popupRegistro.classList.remove('activo');
    overlay.classList.remove('activo');
    document.body.style.overflow = '';
}

function toggleMenu() {
    menuUsuario.classList.toggle('abierto');
}

function cerrarMenu() {
    menuUsuario.classList.remove('abierto');
}

// ================================
// EVENTOS
// ================================

btnUsuario.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

document.addEventListener('click', () => {
    cerrarMenu();
});

irRegistro.forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        cerrarMenu();
        cerrarPopups();
        abrirPopup(popupRegistro);
    });
});

irLogin.forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        cerrarMenu();
        cerrarPopups();
        abrirPopup(popupLogin);
    });
});

cerrarLogin.addEventListener('click', cerrarPopups);
cerrarRegistro.addEventListener('click', cerrarPopups);
overlay.addEventListener('click', cerrarPopups);