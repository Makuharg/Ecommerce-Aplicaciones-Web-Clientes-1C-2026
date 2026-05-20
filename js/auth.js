// ================================
// CREDENCIALES ADMIN
// ================================

const ADMIN = {
    email: 'admin@techzone.com',
    password: 'admin123'
};

// ================================
// ESTADO
// ================================

let usuarioActual = null;

// ================================
// ELEMENTOS
// ================================

const formLogin = document.querySelector('#popup-login form');
const btnGestion = document.getElementById('btn-gestion');
const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
const linkIrLogin = document.querySelectorAll('#ir-login');
const linkIrRegistro = document.querySelectorAll('#ir-registro');

// ================================
// FUNCIONES
// ================================

function iniciarSesion(email, password) {
    if (email === ADMIN.email && password === ADMIN.password) {
        usuarioActual = { email, rol: 'admin' };
        btnGestion.classList.remove('oculto');
    } else {
        usuarioActual = { email, rol: 'usuario' };
    }
    btnCerrarSesion.classList.remove('oculto');
    linkIrLogin.forEach(el => el.classList.add('oculto'));
    linkIrRegistro.forEach(el => el.classList.add('oculto'));
    cerrarPopups();
}

function cerrarSesion() {
    usuarioActual = null;
    btnGestion.classList.add('oculto');
    btnCerrarSesion.classList.add('oculto');
    linkIrLogin.forEach(el => el.classList.remove('oculto'));
    linkIrRegistro.forEach(el => el.classList.remove('oculto'));
}

// ================================
// EVENTOS
// ================================

if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        iniciarSesion(email, password);
        formLogin.reset();
    });
}

if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', () => {
        cerrarSesion();
        cerrarMenu();
    });
}