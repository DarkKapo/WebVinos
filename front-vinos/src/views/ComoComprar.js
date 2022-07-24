import ComoComprarPag from "../components/ComoComprar/ComoComprar"
import { Container } from "react-bootstrap"

export default function ComoComprar () {
    return(
        <Container>
            <h1 className="tituloVista">¿Como Comprar?</h1>
            <hr className="hrComoComprar" />
            <ComoComprarPag />
        </Container>
    )
}