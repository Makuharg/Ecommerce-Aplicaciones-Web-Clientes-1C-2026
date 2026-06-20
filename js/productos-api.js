// ================================
// OBTENER PRODUCTOS
// ================================

const categoriaMap = {
    1: 'televisores',
    2: 'celulares',
    3: 'computadoras',
    4: 'tablets'
};

// ================================
// GET PRODUCTOS(VER PRODUCTOS)
// ================================

async function obtenerProductos() {
    try {
        const headers = await getHeaders();
        const response = await fetch(`${SUPABASE_URL}/rest/v1/productos?select=*`, {
            method: 'GET',
            headers
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error al obtener productos:', error);
            return null;
        }

        return await response.json();

    } catch (error) {
        console.error('Error de conexión:', error);
        return null;
    }
}

// ================================
// POST PRODUCTOS(AGREGAR PRODUCTOS)
// ================================

async function agregarProducto(nombre, descripcion, precio, stock, imagen, categoriaId) {
    try {
        const headers = await getHeaders();
        const response = await fetch(`${SUPABASE_URL}/rest/v1/productos`, {
            method: 'POST',
            headers: {
                ...headers,
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                nombre,
                descripcion,
                precio,
                stock,
                imagen,
                categoria_id: categoriaId
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error al agregar producto:', error);
            return null;
        }

        return await response.json();

    } catch (error) {
        console.error('Error de conexión:', error);
        return null;
    }
}
// ================================
// DELETE PRODUCTOS(ELIMINAR PRODUCTO)
// ================================

async function eliminarProducto(id) {
    try {
        const headers = await getHeaders();
        const response = await fetch(`${SUPABASE_URL}/rest/v1/productos?id=eq.${id}`, {
            method: 'DELETE',
            headers
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error al eliminar producto:', error);
            return false;
        }

        return true;

    } catch (error) {
        console.error('Error de conexión:', error);
        return false;
    }
}

// ================================
// PATCH PRODUCTOS(ACTUALIZAR PRODUCTO)
// ================================

async function actualizarProducto(id, nombre, descripcion, precio, stock, imagen, categoriaId) {
    try {
        const headers = await getHeaders();
        const response = await fetch(`${SUPABASE_URL}/rest/v1/productos?id=eq.${id}`, {
            method: 'PATCH',
            headers: {
                ...headers,
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                nombre,
                descripcion,
                precio,
                stock,
                imagen,
                categoria_id: categoriaId
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error al actualizar producto:', error);
            return null;
        }

        return await response.json();

    } catch (error) {
        console.error('Error de conexión:', error);
        return null;
    }
}