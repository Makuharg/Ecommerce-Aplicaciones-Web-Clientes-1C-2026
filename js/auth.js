// ================================
// ELEMENTOS
// ================================

const formLogin = document.querySelector('#popup-login form');
const btnGestion = document.getElementById('btn-gestion');
const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
const linkIrLogin = document.querySelectorAll('#ir-login');
const linkIrRegistro = document.querySelectorAll('#ir-registro');

// ================================
// ESTADO
// ================================

let usuarioActual = null;

// ================================
// FUNCIONES UI
// ================================

function mostrarSesionIniciada(esAdmin) {
    btnCerrarSesion.classList.remove('oculto');
    linkIrLogin.forEach(el => el.classList.add('oculto'));
    linkIrRegistro.forEach(el => el.classList.add('oculto'));

    if (esAdmin) {
        btnGestion.classList.remove('oculto');
    }
}

function mostrarSesionCerrada() {
    btnCerrarSesion.classList.add('oculto');
    linkIrLogin.forEach(el => el.classList.remove('oculto'));
    linkIrRegistro.forEach(el => el.classList.remove('oculto'));
    btnGestion.classList.add('oculto');
}

// ================================
// VERIFICAR ROL
// ================================

async function verificarRol(userId) {
    const { data, error } = await supabaseClient
        .from('perfiles')
        .select('rol')
        .eq('id', userId)
        .single();

    if (error) return 'usuario';
    return data.rol;
}

// ================================
// VERIFICAR SESIÓN AL CARGAR
// ================================

async function verificarSesion() {
    const usuario = await obtenerUsuarioActual();

    if (usuario) {
        usuarioActual = usuario;
        const rol = await verificarRol(usuario.id);
        mostrarSesionIniciada(rol === 'admin');
    }
}

verificarSesion();

// ================================
// LOGIN
// ================================

if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const resultado = await iniciarSesionSupabase(email, password);

        if (resultado) {
            usuarioActual = resultado.user;
            const rol = await verificarRol(resultado.user.id);
            mostrarSesionIniciada(rol === 'admin');
            cerrarPopups();
            formLogin.reset();
        } else {
            alert('Email o contraseña incorrectos.');
        }
    });
}

// ================================
// REGISTRO
// ================================

const formRegistro = document.getElementById('form-registro');
if (formRegistro) {
    formRegistro.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('registro-email').value;
        const password = document.getElementById('registro-password').value;

        const resultado = await registrarUsuario(email, password);

        if (resultado) {
            alert('¡Cuenta creada! Ya podés iniciar sesión.');
            cerrarPopups();
            formRegistro.reset();
        } else {
            alert('Error al crear la cuenta. El email puede estar en uso.');
        }
    });
}

// ================================
// LOGOUT
// ================================

if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', async () => {
        await cerrarSesionSupabase();
        usuarioActual = null;
        mostrarSesionCerrada();
        cerrarMenu();
    });
}