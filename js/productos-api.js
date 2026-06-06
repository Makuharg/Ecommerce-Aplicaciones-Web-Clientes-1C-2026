// ================================
// AGREGAR PRODUCTO
// ================================

async function agregarProducto(nombre, descripcion, precio, stock, imagen, categoriaId) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/productos`, {
            method: 'POST',
            headers: {
                ...HEADERS,
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

        const data = await response.json();
        console.log('Producto agregado:', data);
        return data;

    } catch (error) {
        console.error('Error de conexión:', error);
        return null;
    }
}