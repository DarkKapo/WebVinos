import InicioPag from "../components/Inicio/Inicio"
import { Container } from "react-bootstrap"

export default function Inicio ({ agregarCarro })
{
    return(
        <Container>
            <h1 className="tituloVista">Catálogo</h1>
            <InicioPag agregarCarro={agregarCarro} />
        </Container>
    )
}