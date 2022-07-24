import CambioDevolucionesPag from "../components/CambioDevoluciones/CambioDevoluciones"
import { Container } from "react-bootstrap"

export default function CambioDevoluciones () {
    return(
        <Container>
            <h1 className="tituloVista">Cambio y Devoluciones</h1>
            <hr className="hrCambioDevoluciones"/>
            <CambioDevolucionesPag />
        </Container>
    )
}