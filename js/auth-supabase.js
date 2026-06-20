async function registrarUsuario(email, password) {
    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password
    });

    if (error) {
        console.error('Error al registrar:', error.message);
        return null;
    }

    return data;
}

async function iniciarSesionSupabase(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        console.error('Error al iniciar sesión:', error.message);
        return null;
    }

    return data;
}

async function cerrarSesionSupabase() {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        console.error('Error al cerrar sesión:', error.message);
        return false;
    }

    return true;
}

async function obtenerUsuarioActual() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
}