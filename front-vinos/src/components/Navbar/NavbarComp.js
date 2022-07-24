import { NavLink } from "react-router-dom"
import Carro from "../Carro/Carro"
import "./navbar.css"
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { Menu2, Search, Logout } from 'tabler-icons-react'
import { Formik, Form, Field } from "formik"

export default function App ({ carro, sumarProducto, restarProducto })
{
    //Agrega la palabra del bsucador al localStorage
    const busqueda = (dato) => {
        localStorage.setItem('filtroBusqueda', dato)
        window.location.href = "/buscador"
    }
    //Variable para mostrar/ocultar botón de cerrar sesión
    let inicioSesion = localStorage.getItem('inicioSesion')

    //Lógica para cerrar sesión
    const logOut = () => {
        localStorage.removeItem('inicioSesion')
        localStorage.removeItem('token')
        alert("Sesión cerrada")
        window.location.replace('http://localhost:3000/')
    }

    return (
        <Navbar collapseOnSelect expand="lg" className="nav-font">
            <Container>
                <img alt="logo" src="/winelogo.png" width="30" height="30" className="d-inline-block align-top" />
                <Navbar.Brand className="titulo-navbar" href="/">Vinos Francisco Oscura</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"><Menu2 size={32} strokeWidth={1} color={'#fff'} /></Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="me-auto">
                        <NavLink className="texto-navbar" to="/">Inicio</NavLink>
                        <NavLink className="texto-navbar" to="/ofertas">Ofertas</NavLink>
                    </Nav>
                    <Nav>
                        {inicioSesion ? <Button className="logoutBTN" onClick={logOut} > <Logout className="btnLogout" size={32} strokeWidth={1} color={'#fff'} /> </Button> : null }
                        <Formik initialValues={{ search: ''}} onSubmit={ values => busqueda(values.search)}>
                            <Form>
                                <Field name="search" />
                                <Button type="submit" className="btnBuscar"><Search strokeWidth={1.5} size={28} color="white" /></Button>
                            </Form>
                        </Formik>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <Carro carro={carro} sumarProducto={sumarProducto} restarProducto={restarProducto} />
        </Navbar>
    )
}