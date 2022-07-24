import { useState, useEffect } from "react"
import { Table, Container } from "react-bootstrap"
import axios from "axios"
import BtnEliminar from "../Button/BtnEliminar"
import BtnEditarUsuario from "../Button/BtnEditarUsuario"

export default function AdminPag() {
    //obtener los clientes de la base de datos
    let [usuarios, setUsuarios] = useState([])
    //Variables para agregar seguridad a la página
    let inicioSesion = localStorage.getItem('inicioSesion')
    let token = localStorage.getItem('token')

    //Obtiene de la base de datos los usuarios
    const obtenerUsuarios = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/usuarios/${token}`)
            return setUsuarios( [...data] )
        } catch (e) {
            return 
        }
    }

    useEffect( () => {
        obtenerUsuarios()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const TablaClientesAdmin = () => {
        return(
            <Table striped bordered hover responsive variant="light" className="tablasAdmin">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Correo</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((user, i) =>
                        <tr key={i}>
                            <td>{user.administrador_id}</td>
                            <td>{user.email}</td>
                            <td><BtnEditarUsuario datos={ [user.administrador_id, user.email] } /></td>
                            <td><BtnEliminar id={ user.administrador_id } ruta="usuario" /></td>
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