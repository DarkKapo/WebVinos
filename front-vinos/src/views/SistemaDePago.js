import SistemaDePagoPag from "../components/SistemaDePago/SistemaDePago"
import { Container } from "react-bootstrap"

export default function SistemaDePago () {
    return(
        <Container>
            <h1 className="tituloVista">Sistema de Pago</h1>
            <SistemaDePagoPag />
        </Container>
    )
}