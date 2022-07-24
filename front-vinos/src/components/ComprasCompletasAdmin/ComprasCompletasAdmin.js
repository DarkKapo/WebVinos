import { useState, useEffect } from "react"
import { Table, Container } from "react-bootstrap"
import axios from "axios"
import Moment from 'react-moment'
import BtnEliminar from '../Button/BtnEliminar'
import BtnEditarCompra from "../Button/BtnEditarCompra"

export default function ComprasPendientesAdmin () {
    //Obtener las compras
    let [compras, setCompras] = useState([])
    //Variables para agregar seguridad a la página
    let inicioSesion = localStorage.getItem('inicioSesion')
    let token = localStorage.getItem('token')

    //Obtiene de la base de datos los pedidos completos
    const obtenerComprasCompletas = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/pedidoscompletos/${token}`)
            return setCompras( [...data] )
        } catch (e) {
            return
        }
    }

    useEffect( () => {
        obtenerComprasCompletas()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Consulta a la base de datos para cambiar el estado del pedido a pendiente
    const cambiarEstado = async (target, id, completado) => {
        try {
            await axios.put(`http://localhost:8080/pedido/completado/${id}`, {completado})
            alert(completado ? "Pedido pendiente" : "Pedido completado")
            window.location.reload()
        } catch (e) {
            console.log(`Tenemos un error en cambiar el check... ${e}`)
        }
    }

    const TablaComprasCompletadas = () => {
        return(
            <Table striped bordered hover responsive variant="success" className="tablasAdmin">
                <thead>
                    <tr>
                        <th>Codigo Pedido</th>
                        <th>Email Pedido</th>
                        <th>Producto Nombre</th>
                        <th>Cantidad</th>
                        <th>Completado</th>
                        <th>fecha</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {compras.map((compra, i) =>
                        <tr key={i}>
                            <td>{compra.codigo_pedido}</td>
                            <td>{compra.email_pedido}</td>
                            <td>{compra.nombre}</td>
                            <td>{compra.cantidad}</td>
                            <td><input type="checkbox" checked={compra.completado} onChange={ event => cambiarEstado(event, compra.pedido_id, compra.completado)}/></td>
                            <td><Moment format="DD/MM/YYYY">{compra.fecha}</Moment></td>
                            <td><BtnEditarCompra datos={ compra } /></td>
                            <td><BtnEliminar id={ compra.pedido_id } ruta="pedido" img={null} /></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }
    return(
        <Container>
            { inicioSesion ? <TablaComprasCompletadas /> : null }
        </Container>
    )
}