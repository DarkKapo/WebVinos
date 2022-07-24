import { useState, useEffect } from "react"
import { Table, Container } from "react-bootstrap"
import axios from "axios"
import BtnEliminar from "../Button/BtnEliminar"
import BtnEditarProducto from "../Button/BtnEditarProducto"

export default function ProductosAdmin () {
    //Obtener los productos
    let [productos, setProductos] = useState([])
    //Agrega seguridad a la página
    let inicioSesion = localStorage.getItem('inicioSesion')
    let token = localStorage.getItem('token')
    
    //Obtiene los productos en el panel de admin
    const obtenerProductos = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/productos/${token}`)
            return setProductos( [...data] )            
        } catch (e) {
            return 
        }
    }

    useEffect( () => {
        obtenerProductos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const Img = (srcImg) => {
        return <img src={srcImg.src} height={srcImg.height} alt="" />
    }

    //Activa o desactiva un producto en oferta
    const cambiarEstado = async(event, producto_id, oferta) => {
        try {
            await axios.put(`http://localhost:8080/producto/oferta/${producto_id}`, {oferta})
            window.location.reload()
        } catch (e) {
            console.log(`Tenemos un error en cambiar el check... ${e}`)
        }
    }

    const TableProductosAdmin = () => {
        return(
            <Table striped bordered hover responsive variant="info" className="tablasAdmin">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>nombre</th>
                        <th>Imagen</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Descripción</th>
                        <th>Oferta</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto, i) =>
                        <tr key={i}>
                            <td>{producto.producto_id}</td>
                            <td>{producto.nombre}</td>
                            <td> <Img src={`https://firebasestorage.googleapis.com/v0/b/imgswebvinos.appspot.com/o/${producto.imagen}?alt=media`} height="30" /> </td>
                            <td>{producto.precio}</td>
                            <td>{producto.stock}</td>
                            <td>{producto.descripcion}</td>
                            <td><input type="checkbox" checked={producto.oferta} onChange={ event => cambiarEstado(event, producto.producto_id, producto.oferta)}/></td>
                            <td><BtnEditarProducto producto={ producto } /></td>
                            <td><BtnEliminar id={ producto.producto_id } ruta="producto" img={producto.imagen} /></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }

    return(
        <Container>
            { inicioSesion ? <TableProductosAdmin /> : null }
        </Container>
    )
}