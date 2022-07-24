const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require("jsonwebtoken");
const secretKey = "pruebaelvino";
//importas las funciones de consulta
const { obtenerUsuarios, agregarUsuario, obtenerUsuario, modificarUsuario, borrarUsuario,
    obtenerProductos, agregarProducto, borrarProducto, modificarProducto, updateProductoStock, modificarProductoOferta, obtenerProductosEnOferta, buscarProductoPorNombre, obtenerProductosParaUsuarios,
    agregarRegistroCompra, obtenerRegistroDeCompras, modificarPedido, borrarPedido, modificarRegistroCompra,
    obtenerPedidosPendientes, obtenerPedidosCompletos, agregarPedido, modificarCompletadoPedido, borrarRegistroCompra
} = require('./consultas')

app.listen(8080, console.log("Server UP puerto 8080"))

//Middlewares
app.use(express.json())
app.use(cors())

//Ruta raíz backend
app.get('/', (req, res) => {
    res.status(200).send(`<h1>Hola mundo desde el Backend</h1>`)
})

//Rutas para el CRUD de usuario (Administrador)
//Obtiene 1 usuario
app.get('/usuario', (req, res) => {
    res.status(200).send('Get usuario')
})

//Agrega 1 usuario
app.post('/usuario', async (req, res) => {
    const usuario = req.body
    try {
        const data = await agregarUsuario(usuario)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `El usuario ya está registrado`
        })
    }
})

//Modifica 1 usuario
app.put('/usuario', async(req, res) => {
    const usuario = req.body
    
    try {
        const data = await modificarUsuario(usuario)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `${e}`
        })
    }  
})

//Elimina 1 usuario
app.delete('/usuario/:id', async(req, res) => {
    const id = req.params

    try {
        await borrarUsuario(id)
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `${e}`
        })
    }
    res.status(200).send("Borrar usuario")
})
//Fin CRUD usuario

//Rutas para obtener la lista de cada tabla
//Ruta para obtener todos los usuarios (administrador)
app.get('/usuarios/:token', async (req, res) => {
    //Verificar el token
    const { token } = req.params
    let decode

    if (!token) {
        return res.status(401).end()
    }

    try {
        decode = jwt.verify(token, secretKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).end()
		}
        return res.status(400).end()
    }
    
    if (decode.email === 'admin@root.cl') {
        try {
            const data = await obtenerUsuarios()
            res.status(200).send(data)
        } catch (e) {
            res.status(500).send({
                code: 500,
                error: `Tenemos un error en la ruta al mostrar los usuarios... ${e}`
            })
        }
    }else{
        res.status(401).send({
            code: 401,
            error: `No tienes autorización`
        })
    }
})

//Ruta para obtener todos los productos (para clientes)
app.get('/productos', async(req, res) => {
    try {
        const data = await obtenerProductosParaUsuarios()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `Tenemos un error en la ruta al mostrar los productos... ${e}`
        })
    }
})

//Ruta para obtener todos los productos (para Administrador)
app.get('/productos/:token', async(req, res) => {
    //Verificar el token
    const { token } = req.params
    let decode

    if (!token) {
        return res.status(401).end()
    }

    try {
        decode = jwt.verify(token, secretKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).end()
		}
        return res.status(400).end()
    }

    if(decode.email === 'admin@root.cl'){
        try {
            const data = await obtenerProductos()
            res.status(200).send(data)
        } catch (e) {
            res.status(500).send({
                code: 500,
                error: `Tenemos un error en la ruta al mostrar los productos... ${e}`
            })
        }
    }else{
        res.status(401).send({
            code: 401,
            error: `No tienes autorización`
        })
    }
})

//Ruta para obtener todos los registros de compras
app.get('/registrocompra/:token', async(req, res) => {
    //Verificar el token
    const { token } = req.params
    let decode
    
    if (!token) {
        return res.status(401).end()
    }

    try {
        decode = jwt.verify(token, secretKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).end()
		}
        return res.status(400).end()
    }

    if(decode.email === 'admin@root.cl'){
        try {
            const data = await obtenerRegistroDeCompras()
            res.status(200).send(data)
        } catch (e) {
            res.status(500).send({
                code: 500,
                error: `Tenemos un error en la ruta al mostrar los registros de compras... ${e}`
            })
        }
    }else{
        res.status(401).send({
            code: 401,
            error: `No tienes autorización`
        })
    }
})

//Ruta de login
app.post('/login', async(req, res) =>{
    const {emailInicioSesion, passwordInicioSesion } = req.body
    
    try {
        const data = await obtenerUsuario(emailInicioSesion, passwordInicioSesion)
        delete data.administrador_id
        delete data.password
        const token = jwt.sign(data, secretKey)

        if(data == undefined)
        {
            throw new Error("Usuario o contraseña incorrecto")
        }

        res.status(201).send(token)
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `${e}`
        })
    }
})

//CRUD Producto
//Ruta para buscar un producto por nombre
app.get('/producto/:filtro', async(req, res) => {
    const filtroBusqueda = req.params
    console.log("Buscando en ruta a ", filtroBusqueda)
    try {
        const data = await buscarProductoPorNombre(filtroBusqueda)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `Error al buscar un producto: ${e}`
        })
    }
})

//Ruta para agregar un producto
app.post('/producto/:token', async (req, res) => {
    const producto = req.body
    //Verificar el token
    const { token } = req.params
    let decode
    
    if (!token) {
        return res.status(401).end()
    }

    try {
        decode = jwt.verify(token, secretKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).end()
		}
        return res.status(400).end()
    }

    if(decode.email === 'admin@root.cl')
    {
        try {
            const data = await agregarProducto(producto)
            res.status(200).send(data)
        } catch (e) {
            res.status(500).send({
                code: 500,
                error: `${e}`
            })
        }
    }else{
        res.status(401).send({
            code: 401,
            error: `No tienes autorización`
        })
    }
})

//Ruta para modificar un producto
app.put('/producto', async(req, res) => {
    const producto = req.body
    
    try {
        const data = await modificarProducto(producto)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `Algún dato es del tipo equivocado, Vuelva a intentarlo`
        })
    }
})

//Ruta que modifica la oferta del profucto
app.put('/producto/oferta/:id', async(req, res) => {
    const { id } = req.params
    let { oferta } = req.body

    //Cambiar el valoir del checkbox
    oferta ? oferta = false : oferta = true

    try {
        await modificarProductoOferta(id, oferta)
        res.status(200).send({ status: 200, message: "Oferta cambiado con éxito"})
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `Tenemos un error al cambiar el estado en la base de datos ... ${e}`
        })
    }
})

//Ruta para eliminar un producto
app.delete('/producto/:id', async (req, res) => {
    const id = req.params

    try {
        const data = await borrarProducto(id)
        res.status(200).send(data)
    } catch (e) {
        console.log(e)
    }
})
//Fin CRUD producto

//Funcion para upgradear el stock de un producto
app.put('/updateProductoStock', async(req, res) => {
    const values = req.body
    
    //Eliminar valores innecesarios para actualizar el stock
    for (let i = 0; i < values.length; i++) {
        delete values[i].nombre
        delete values[i].imagen
        delete values[i].precio
        delete values[i].stock
        delete values[i].descripcion
        delete values[i].oferta
    }
    
    try {
        const data = await updateProductoStock(values)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send(e)
    }
})

//CRUD para pedido
//Ruta para obtener todos los pedidos pendientes
app.get('/pedidospendientes/:token', async(req, res) => {
    //Verificar el token
    const { token } = req.params
    let decode
    
    if (!token) {
        return res.status(401).end()
    }

    try {
        decode = jwt.verify(token, secretKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).end()
		}
        return res.status(400).end()
    }

    try {
        if (decode.email === 'admin@root.cl') {
            try {
                const data = await obtenerPedidosPendientes()
                res.status(200).send(data)
            } catch (e) {
                res.status(500).send({
                    code: 500,
                    error: `Tenemos un error en la ruta al mostrar los usuarios... ${e}`
                })
            }
        }else{
            res.status(401).send({
                code: 401,
                error: `No tienes autorización`
            })
        }
    } catch (e) {
        res.status(401).send({
            code: 401,
            error: `No tienes autorización`
        })
    }
})

//Ruta para obtener todos los pedidos completados
app.get('/pedidoscompletos/:token', async(req, res) => {
    //Verificar el token
    const { token } = req.params
    let decode
    
    if (!token) {
        return res.status(401).end()
    }

    try {
        decode = jwt.verify(token, secretKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).end()
		}
        return res.status(400).end()
    }
    
    if (decode.email === 'admin@root.cl')
    {
        try {
            const data = await obtenerPedidosCompletos()
            res.status(200).send(data)
        } catch (e) {
            res.status(500).send({
                code: 500,
                error: `Tenemos un error en la ruta al mostrar los usuarios... ${e}`
            })
        }
    }else{
        res.status(401).send({
            code: 401,
            error: `No tienes autorización`
        })
    }
    
})

//Ruta post para agregar 1 pedido
app.post('/pedido/:id', async(req, res) => {
    const { carro, email } = req.body
    const idPedido = req.params
    for (let i = 0; i < carro.length; i++) {
        delete carro[i].imagen
        delete carro[i].precio
        delete carro[i].stock
        delete carro[i].descripcion
        delete carro[i].oferta
    }

    try {
        const data = await agregarPedido(carro, email, idPedido)
        res.status(200).send(data)
    } catch (e) {
        res.status(400).send("Error en ruta post pedido ", e)
    }
})

//Ruta para modificar 1 pedido
app.put('/pedido', async(req, res) => {
    const datos = req.body
    
    try {
        const data = await modificarPedido(datos)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            code: 500,
            message: `Error en ruta modificar pedido ... ${e}`
        })
    }
})

//Ruta que cambia el checkbox del pedido
app.put('/pedido/completado/:id', async(req, res) => {
    const { id } = req.params
    let { completado } = req.body

    //Cambiar el valor del checkbox
    completado ? completado = false : completado = true

    try {
        await modificarCompletadoPedido(id, completado)
        res.status(200).send({ status: 200, message: "Estado cambiado con éxito"})
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `Tenemos un error al cambiar el estado en la base de datos ... ${e}`
        })
    }
})

//Ruta para eliminar 1 pedido
app.delete('/pedido/:id', async(req, res) => {
    const id = req.params
    
    try {
        const data = await borrarPedido(id)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `Tenemos un error en la ruta al borrar un pedido ... ${e}`
        })
    }
})
//Fin CRUD para pedido

//Ruta para mostrar las ofertas
app.get('/ofertas', async(req, res) => {
    try {
        const data = await obtenerProductosEnOferta()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `Tenemos un error en la ruta al mostrar los productos... ${e}`
        })
    }
})

//CRUD para Registro de compras
//Ruta que agregar un registro
app.post('/registrocompra', async(req, res) => {
    const values = Object.values(req.body)

    try {
        const data = await agregarRegistroCompra(values)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `Tenemos un error en la ruta al agregar un registro ... ${e}`
        })
    }
})

//Ruta para modificar un registro
app.put('/registrocompra', async(req, res) => {
    const values = Object.values(req.body)

    try {
        const data = await modificarRegistroCompra(values)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `Tenemos un error en la ruta al modificar un registro ... ${e}`
        })
    }
})

//Ruta para eliminar un registro
app.delete('/registrocompra/:id', async(req, res) => {
    const id = req.params
    
    try {
        const data = await borrarRegistroCompra(id)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `Tenemos un error en la ruta al borrar un registro de compra ... ${e}`
        })
    }
})