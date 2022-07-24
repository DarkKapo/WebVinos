import { Container } from "react-bootstrap"
import './cambiodevoluciones.css'

export default function CambioDevolucionesPag () {
    return(
        <Container className="containerCambioDevoluciones">
            <p>Pasado los 10 dias, se aceptan devoluciones solo por defectos enológicos (sujeto a previo análisis técnico). Luego se hará el cambio del mismo producto o uno similar</p>
            <p>Para hacer efectivo el cambio o devolución, debes enviar el producto de vuelta a la tienda, el costo del envío lo paga el cliente</p>
            <h5>Devolución del dinero</h5>
            <p>Una vez recibido el producto se le aplicará el control de calidad. Si el producto no pasa el control de calidad el producto será devuelto al comprador.
                Si el producto pasa el control de calidad, nos contactaremos por Correo y/o Whatsapps para gestionar la devolución del dinero vía transferencia bancaria
            </p>
            <p>Te pediremos los siguientes datos para la transferencia:</p>
            <p>- Nombre completo</p>
            <p>- Rut</p>
            <p>- Banco</p>
            <p>- Número de cuenta</p>
            <p>- Tipo de cuenta</p>
            <p>- dirección</p>
            <p>- Teléfono</p>
        </Container>
    )
}