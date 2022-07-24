import { Container } from "react-bootstrap"
import './faq.css'

export default function FaqPag () {
    return(
        <Container className="containerFaq">
            <h5>¿Cuál es el horario de atención de la tienda?</h5>
            <p>Puedes comprar en la tienda en línea los 7 días de la semana. Los pedidos comprados el día sábado o domingo, serán procesados el día lunes siguiente</p>
            <h5>No me llega la boleta al correo</h5>
            <p>Revisa tu carpeta de spam, de todas formas, recuerda que enviamos tu boleta física en el envío. Escribe a nuestro correo para volver a emitir la boleta electrónica</p>
            <h5>¿Dónde queda la tienda?</h5>
            <p>Estamos ubicados en Avenida cerca de la estación de metro</p>
            <h5>¿Cuánto demora el envío?</h5>
            <p>Desde que realizas tu compra, el proceso puede tardar entre 1 a 4 días hábiles hasta que te enviemos tu número de seguimiento del envío</p>
            <h5>¿Realizan cambios?</h5>
            <p>revisar la sección Cambio y devoluciones</p>
            <h5>¿Cuánto tiempo tengo de plazo para retirar mi envío?</h5>
            <p>El tiempo para poder retirar tu encomienda está estipulado por las distintas empresas de envío. Si este no es retirado a tiempo, la empresa lo devuelve a la sucursal, La tienda no se responsabiliza por el pago del envío, ni la devolución del dinero de la compra. 
               Si optaste por venir a retirar personalmente, tienes 5 días hábiles para venir antes que el producto vuelva al stock de la tienda
            </p>
            <h5>¿Puede ir otra persona a retirar la compra en la tienda?</h5>
            <p>Si, solo debe indicar el coreo y el ID de la compra</p>
        </Container>
    )
}