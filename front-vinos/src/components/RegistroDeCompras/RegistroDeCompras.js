import { useState, useEffect } from "react"
import { Table, Container } from "react-bootstrap"
import axios from "axios"
import BtnEliminar from "../Button/BtnEliminar"
import BtnEditarRegistro from "../Button/BtnEditarRegistro"

export default function RegistroDeCompras () {
    //obtener los clientes de la base de datos
    let [registrosCompras, setRegistrosCompras] = useState([])
    //Variables para dar seguridad a la página
    let inicioSesion = localStorage.getItem('inicioSesion')
    let token = localStorage.getItem('token')

    //Obtiene los registro de compras desde la base de datos
    const obtenerRegistroCompras = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/registrocompra/${token}`)
            return setRegistrosCompras( [...data] )
        } catch (e) {
            return
        }
    }

    useEffect( () => {
        obtenerRegistroCompras()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const TablaClientesAdmin = () => {
        return(
            <Table striped bordered hover responsive variant="secondary" className="tablasAdmin">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Region</th>
                        <th>Comuna</th>
                        <th>Dirección</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {registrosCompras.map((registro, i) =>
                        <tr key={i}>
                            <td>{registro.registro_id}</td>
                            <td>{registro.email}</td>
                            <td>{registro.telefono}</td>
                            <td>{registro.region}</td>
                            <td>{registro.comuna}</td>
                            <td>{registro.direccion}</td>
                            <td><BtnEditarRegistro datos={ registro } /></td>
                            <td><BtnEliminar id={ registro.registro_id } ruta="registrocompra" img={null} /></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }

    return(
        <Container>
            { inicioSesion ? <TablaClientesAdmin /> : null }
        </Container>
    )
}