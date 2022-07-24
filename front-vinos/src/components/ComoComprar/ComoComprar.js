import { Container } from "react-bootstrap"
import './comocomprar.css'

export default function ComoComprarPag () {
    return(
        <Container className="containerComoComprar">
            <p><span className="guionFooter">-</span> Elige el producto quieras comprar y hace clic en agregar ( <span className="textoSubrayadoFooter">debes agregar el producto una sola vez</span> )</p>
            <p><span className="guionFooter">-</span> Cuando hayas terminado de agregar tus productos pincha en el carro que está en la esquina inferior derecha</p>
            <p><span className="guionFooter">-</span> Usa los botones de ' <span className="textoSimboloFooter">-</span> ' y ' <span className="textoSimboloFooter">+</span> ' para modificar la cantidad de productos que deseas comprar</p>
            <p><span className="guionFooter">-</span> Cuando hayas terminado de seleccionar la cantidad de productos, pincha en Proceder al pago</p>
            <p><span className="guionFooter">-</span> En la pantalla de comprobante, revisa que todo esté correcto y has clic en Pagar</p>
            <p><span className="guionFooter">-</span> Luego te pide realizar la transferencia con los datos mostrados. Una vez realizada la transferencia hace clic en confirmar</p>
            <p><span className="guionFooter">-</span> Ingresa los datos solicitados. <span className="textoDestacadoFooter">Es importante que estos datos estén correctos porque es el único medio para contactarnos contigo.</span> Para finalizar hace clic en Enviar datos</p>
            <p><span className="guionFooter">-</span> En la pantalla comprobante hace clic en confirmar pedido. El archivo contiene el ID que debes enviar a nuestro Correo o Whatsapps</p>
            <p><span className="guionFooter">-</span> Cuando tu pedido esté procesado, te enviaremos un Correo y/o mensaje de Whatsapps con el número de seguimiento y valor a pagar por el envío si es el caso</p>
            <p><span className="guionFooter">-</span> Si deseas venir personalmente a retirar el producto, por favor, indicar en el Correo o Whatsapps</p>
        </Container>
    )
}