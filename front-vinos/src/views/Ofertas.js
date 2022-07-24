import OfertasPag from "../components/Ofertas/Ofertas"
import { Container } from "react-bootstrap"

export default function Ofertas ({ agregarCarro })
{
    return(
        <Container>
            <h1 className="tituloVista">Vinos en oferta</h1>
            <OfertasPag agregarCarro={agregarCarro} />
        </Container>
    )
}