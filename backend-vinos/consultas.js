const { Pool } = require('pg')

//config
const pool = new Pool({
    user: "rodrigo",
    host: "localhost",
    password: "1q2w3e4r",
    database: "tiendavinos",
    port: 5432,
})

//Funciones sobre la tabla administrador/usuarios
//Función que obtiene los usuarios
const obtenerUsuarios = async () => {
    const result = await pool.query('SELECT * FROM administrador')
    return result.rows
}

//Función obtener un usuario (Login)
const obtenerUsuario = async (correo, password) => {
    //console.log("usuario BD = ", correo, password);
    const result = await pool.query(`SELECT * FROM administrador WHERE email = '${correo}' AND password = '${password}'`)
    return result.rows[0]
}

//Función que agrega 1 usuario
const agregarUsuario = async (usuario) => {
    const values = Object.values(usuario)
    const consulta = {
        text: `INSERT INTO administrador(email, password) VALUES ($1, $2);`,
        values
    }
    const result = await pool.query(consulta)    
    return result.rows[0]
}

//Función para modificar el email del usuario
const modificarUsuario = async(user) => {
    const values = user

    const consulta = {
        text: `UPDATE administrador SET email = $2 WHERE cliente_id = $1;`,
        values
    }

    const result = await pool.query(consulta)
    
    return result
}

//Función borrar usuario
const borrarUsuario = async({ id }) => {
    const result = await pool.query(`DELETE FROM administrador WHERE cliente_id = '${id}'`)
    return result.rows[0]
}

//Funciones sobre la tabla productos
//Función que obtiene los productos (para el admin)
const obtenerProductos = async () => {
    const result = await pool.query('SELECT * FROM productos ORDER BY producto_id ASC')
    return result.rows
}

//Función que obtiene los productos (para el usuario)
const obtenerProductosParaUsuarios = async() => {
    const result = await pool.query('SELECT * FROM productos ORDER BY precio ASC')
    return result.rows
}
//Función para agregar un producto
const agregarProducto = async(producto) => {
    const values = Object.values(producto)

    const consulta = {
        text: `INSERT INTO productos(nombre, imagen, precio, stock, descripcion, oferta) VALUES ($1, $2, $3, $4, $5, false);`,
        values
    }

    const result = await pool.query(consulta)    
    return result.rows[0]
}

//Función para borrar un producto
const borrarProducto = async({ id }) => {
    const result = await pool.query(`DELETE FROM productos WHERE producto_id = ${id}`)
    return result.rows[0]
}

//Función para modificar un producto
const modificarProducto = async(producto) => {
    const values = Object.values(producto)
    
    const consulta = {
        text: 'UPDATE productos SET nombre = $2, imagen = $3, precio = $4, stock = $5, descripcion = $6, oferta = $7 WHERE producto_id = $1;',
        values
    }

    const result = await pool.query(consulta)
    return result.rows[0]
}

//Función para modificar la oferta del producto
const modificarProductoOferta = async(id, oferta) => {
    const result = await pool.query(`UPDATE productos SET oferta = ${oferta} WHERE producto_id = ${id} RETURNING *;`)
    return result.rows[0]
}

//Función para actualizar stock de productos
const updateProductoStock = async([datos]) => {
    const values = Object.values(datos)

    const consulta = {
        text: 'UPDATE productos SET stock = stock - $2 WHERE producto_id = $1 RETURNING *;',
        values
    }

    const result = await pool.query(consulta)
    return result.rows[0]
}

//Función sobre tabla pedidos
//Función para obtener los pedidos pendientes
const obtenerPedidosPendientes = async() => {
    const result = await pool.query('SELECT * FROM pedidos WHERE completado = false ORDER BY fecha DESC')
    return result.rows
}

//Función para obtener los pedidos completados
const obtenerPedidosCompletos = async() => {
    const result = await pool.query('SELECT * FROM pedidos WHERE completado = true ORDER BY fecha DESC')
    return result.rows
}

//Función para agregar un pedido
const agregarPedido = async( carro, email, { id } ) => {
    const values = Object.values(carro)
    let result = []
    try {
        for (let i = 0; i < carro.length; i++) {
            carro[i].codigo_pedido = id
            carro[i].email_pedido = email
            const consulta = {
                text: `INSERT INTO pedidos(codigo_pedido, email_pedido, producto_id, nombre, cantidad, completado) VALUES($4, $5, $1, $2, $3, false) RETURNING *`,
                values: [carro[i].producto_id, carro[i].nombre, carro[i].cantidad, carro[i].codigo_pedido, carro[i].email_pedido]
            }
    
            result.push(await pool.query(consulta))
        }
    } catch (e) {
        console.log("Error en Base de Datos = ", e);
    }
    
    return result
}

//Modifica el estado del pedido
const modificarCompletadoPedido = async(id, completado) => {
    const result = await pool.query(`UPDATE pedidos SET completado = ${completado} WHERE pedido_id = ${id} RETURNING *;`)
    return result.rows[0]
}

//Función para modificar 1 pedido
const modificarPedido = async(datos) => {
    let values = Object.values(datos)
    for (let i = 0; i < values.length; i++) {
        if( i == 3 || i == 5) values[i] = parseInt(values[i])
    }

    const consulta = {
        text: 'UPDATE pedidos SET codigo_pedido = $2, email_pedido = $3, producto_id = $4, nombre = $5, cantidad = $6, completado = $7, fecha = $8 WHERE pedido_id = $1 RETURNING *;',
        values
    }

    const result = await pool.query(consulta)
    return result.rows[0]
}

//Función para borrar 1 pedido
const borrarPedido = async({ id }) => {
    const result = await pool.query(`DELETE FROM pedidos WHERE pedido_id = ${id}`)
    return result.rows[0]
}

//Funciones de oferta y filtro del buscador en el navbar
//Obtiene los productos en oferta
const obtenerProductosEnOferta = async() => {
    const result = await pool.query('SELECT * FROM productos WHERE oferta = true')
    return result.rows
}

//Obtener un producto por nombre
const buscarProductoPorNombre = async(filtroBusqueda) => {
    const value = Object.values(filtroBusqueda)
    console.log("Filtro en BD = ", value[0])
    const result = await pool.query(`SELECT * FROM productos WHERE nombre = '${value[0]}'`)
    return result.rows
}

//Funciones sobre la tabla registro de compras
//Funcion para agregar un registro de compra
const agregarRegistroCompra = async(values) => {
    const consulta = {
        text: 'INSERT INTO registro_compras(email, telefono, region, comuna, direccion) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
        values
    }

    const result = await pool.query(consulta)
    return result.rows[0]
}

//Función para mostrar todos los registros de compras
const obtenerRegistroDeCompras = async() => {
    const result = await pool.query('SELECT * FROM registro_compras ORDER BY registro_id DESC;')
    return result.rows
}

//Función que modifica un registro
const modificarRegistroCompra = async(datos) => {
    const values = datos
    const consulta = {
        text: 'UPDATE registro_compras SET email = $2, telefono = $3, region = $4, comuna = $5, direccion = $6 WHERE registro_id = $1 RETURNING *;',
        values
    }

    const result = await pool.query(consulta)
    return result.rows[0]
}

//Función para eliminar un registro de compra
const borrarRegistroCompra = async({ id }) => {
    const result = await pool.query(`DELETE FROM registro_compras WHERE registro_id = ${id}`)
    return result.rows[0]
}

module.exports = { obtenerUsuarios, obtenerUsuario, agregarUsuario, modificarUsuario, borrarUsuario, 
    obtenerProductos, agregarProducto, borrarProducto, modificarProducto, updateProductoStock, modificarProductoOferta, obtenerProductosEnOferta, buscarProductoPorNombre, obtenerProductosParaUsuarios,
    obtenerPedidosPendientes, obtenerPedidosCompletos, agregarPedido, modificarCompletadoPedido, borrarPedido, modificarPedido,
    agregarRegistroCompra, obtenerRegistroDeCompras, modificarRegistroCompra, borrarRegistroCompra
}