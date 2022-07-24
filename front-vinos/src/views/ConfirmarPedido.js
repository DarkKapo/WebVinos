import ConfirmarPedidoPag from "../components/ConfirmarPedido/ConfirmarPedido"
import { Container } from "react-bootstrap"

export default function ConfirmarPedido({ carro }){
    return(
        <Container>
            <h1 className="tituloVista">Confirmar pedido</h1>
            <hr className="hrConfirmarPedido"/>
            <ConfirmarPedidoPag carro={carro} />
        </Container>
    )
}