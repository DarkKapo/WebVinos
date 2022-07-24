import Clientes from "../components/Clientes/Clientes"
import ProductosAdmin from "../components/ProductosAdmin/ProductosAdmin"
import ComprasPendientesAdmin from "../components/ComprasPendientesAdmin/ComprasPendientesAdmin"
import ComprasCompletasAdmin from "../components/ComprasCompletasAdmin/ComprasCompletasAdmin"
import AgregarProducto from "../components/AgregarProducto/AgregarProducto"
import { Link, Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import InicioSesionPag from "../components/InicioSesion/InicioSesion"
import RegistroDeCompras from "../components/RegistroDeCompras/RegistroDeCompras"

export default function Admin () {
    let inicioSesion = localStorage.getItem('inicioSesion')
    //Muentra los botones del panel del administrador
    const ZonaSuperior = () => {
        return(
            <Container>
                <h1 className="tituloVista">Panel administrador</h1>
                <Link to={'/admin/clientes'}><button className="btnCuentaAdmin">Cuenta</button></Link>
                <Link to={'/admin/productos'}><button className="btnProductosAdmin">Productos</button></Link> 
                <Link to={'/admin/compraspendientesadmin'}><button className="btnComprasPendientesAdmin">Compras pendientes</button></Link>
                <Link to={'/admin/comprascompletasadmin'}><button className="btnComprasCompletadasAdmin">Compras completas</button></Link>
                <Link to={'/admin/registrodecompras'}><button className="btnRegistroDeCompras">Registro de Compras</button></Link>
            </Container>
        )
    }
    //Muestra el botón para agrear un producto
    const ZonaInferior = () => {
        return(
            <Container>
                <Link to={'/admin/agregarproducto'}><button className="btnComprasAgregarProductoAdmin">Agregar Producto</button></Link>
            </Container>
        )
    }

    return(
        <Container>
            {inicioSesion ? <ZonaSuperior /> : null}
            
            {inicioSesion ? null : <InicioSesionPag />}
            
            <section>
                <Routes>
                    <Route path='clientes' element={<Clientes />} />
                    <Route path='productos' element={<ProductosAdmin />} />
                    <Route path='compraspendientesadmin' element={<ComprasPendientesAdmin />} />
                    <Route path='comprascompletasadmin' element={<ComprasCompletasAdmin />} />
                    <Route path='agregarproducto' element={<AgregarProducto />} />
                    <Route path='registrodecompras' element={<RegistroDeCompras />} />
                </Routes>
            </section>

            {inicioSesion ? <ZonaInferior /> : null}
        </Container>
    )
}