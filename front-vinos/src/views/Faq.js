import FaqPag from "../components/Faq/Faq"
import { Container } from "react-bootstrap"

export default function Faq () {
    return(
        <Container>
            <h1 className="tituloVista">Preguntas frecuentes</h1>
            <hr className="hrFaq" />
            <FaqPag />
        </Container>
        
    )
}