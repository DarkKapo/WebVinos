import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import jsPDF from "jspdf"
import axios from "axios"
import { v4 as uuidv4 } from 'uuid'
import './confirmarpedido.css'

export default function ConfirmarPedidoPag({ carro }) {
    //Variable que cambia el estado del botón confirmar pedido
    let [confirmarPedido, setConfirmarPedido] = useState(false)
    //Variables que suman el precio total y productos totales del comprobante
    let acumuladorPrecio = 0, cantidad = 0
    //Cinfiguración para crear el PDF
    const pdfRef = useRef(null)
    let doc = new jsPDF("p", "mm", [250,300])
    //Extraer el carro del localStorage para generar el comprobante
    carro = localStorage.getItem('carrito')
    carro = JSON.parse(carro)
    //emailPedido se usa para agregar el email del comprador a la compra
    let emailPedido = ''
    //Variable para generar el id del comprobante
    let idPedido = uuidv4()
    idPedido = idPedido.slice(25)

    //Sumatoria del total de la compra y del total de productos 
    for (let atributo in carro) {
        acumuladorPrecio += carro[atributo].precio * carro[atributo].cantidad
        cantidad += carro[atributo].cantidad
    }
    useEffect(() => {
        confirmarStock()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Diseño de la boleta
    let Boleta = () => {
        return(
            <Container ref={pdfRef}>
                <Row>
                    <Col><h1>Comprobante</h1></Col>
                </Row>

                <Row>
                    <Col style={{color: "#FF0000"}} >ID = {idPedido}</Col>
                </Row>

                <Row>
                    <Col>Recuerde enviar el ID en el Correo o WhatsApps</Col>
                </Row>

                <Row>
                    <Col>Nombre</Col>
                    <Col>Precio</Col>
                    <Col>Cantidad</Col>
                </Row>
                
                {carro.map((producto, i) =>
                <Row key={i}>
                    <Col>{producto.nombre}</Col>
                    <Col>${producto.precio}</Col>
                    <Col>{producto.cantidad}</Col>
                </Row>
                )}

                <Row className='pt-3 pb-4'>
                    <Col>Total</Col>
                    <Col style={{color: "#FF0000"}}>${acumuladorPrecio}</Col>
                    <Col>{cantidad}</Col>
                </Row>
            </Container>
        )
    }

    //Acción del botón confirmar pago que actualiza el stock de productos
    const confirmarPago = async() => {
        try {
            await axios.put(`http://localhost:8080/updateProductoStock`, carro)
        } catch (e) {
            alert("No tenemos esa cantidad de productos en stock")
        }
        setConfirmarPedido(!confirmarPedido)
    }

    //Acción del botón confirmar pedido que verifica si hay stock 
    const confirmarStock = async() => {
        try {
            for (let atributo in carro) {
                if(carro[atributo].cantidad > carro[atributo].stock) throw carro[atributo].nombre
            }
        } catch (e) {
            alert(`No tenemos esa cantidad de ${e} en stock `)
            window.location.href = "/"
        }
    }

    //Acción que agrega el pedido a la base de datos
    const agregarPedido = async(carro, idPedido) => {
        try {
            emailPedido = localStorage.getItem('emailPedido')
            await axios.post(`http://localhost:8080/pedido/${idPedido}`, {carro: carro, email: emailPedido} )
        } catch (e) {
            console.log("Error front ", e)
        }
    }

    //Función para descargar el comprobante de pago
    const pedidoConfirmado = () => {
        const string1 = pdfRef.current
        doc.html(string1, {
            callback: function(doc) {
                doc.setFontSize(10)
                doc.save("BoletaVino.pdf")
            },
            autoPaging: 'text',
            width: 250, 
            windowWidth: 250 
        })

        agregarPedido(carro, idPedido)
        
        alert("Pedido confirmado, enviar comprobante (Email o Whatsapps) del depósito y el ID que está en el archivo descargado")
        //Elimina todas las variables del localStorage
        setTimeout(() => {
            localStorage.removeItem('carrito')
            localStorage.removeItem('emailPedido')
            localStorage.removeItem('filtroBusqueda')
            window.location.replace('http://localhost:3000/')
        }, 1000);
    }

    return(
        <div>
            <Boleta />
            {confirmarPedido ? <button className='confirmarPedido' onClick={pedidoConfirmado}>Confirmar pedido</button> : <Link to="/sistemadepago" target="_blank" ><button className='confirmarPago' onClick={confirmarPago}>Pagar ${acumuladorPrecio}</button></Link> }
        </div>
    )
}