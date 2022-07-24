import Input from "../Input/Input"
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { ListGroup, Container } from 'react-bootstrap'
import './sistemadepago.css'
import { useState } from "react"
import axios from "axios"

export default function SistemaDePagoPag(){
    //Variable que confirma si el usuario hizo el depósito
    let [depositoEnviado, setDepositoEnviado] = useState(false)
    //Variable para extrae el email del localStorage
    let emailPedido = ''

    //Función que muestra la alerta si el pedido está confirmado
    const depositoConfirmado = () => {
        if(depositoEnviado)
        {
            setDepositoEnviado(!depositoEnviado)
            alert("Deposito anulado")
        }else{
            setDepositoEnviado(!depositoEnviado)
            alert("Deposito confirmado")
        }
        
        return depositoEnviado
    }

    //Registra la compra en la base de datos
    const handleSubmit = async(evento) => {
        emailPedido = evento.email
        localStorage.setItem('emailPedido', emailPedido)

        if (depositoEnviado) {
            const { data } = await axios.post('http://localhost:8080/registrocompra', evento)
            console.log("Data registro compra = ", data)
            alert("Datos enviados, vuelva para confirmar pedido")
            window.close()
        }else{
            alert("Confirme el deposito")
        }
    }

    return(
        <Container>
            <Container>
                <h3>Datos del banco</h3>
                <h5>Depositar el monto total de la compra a la siguiente cuenta</h5>
                <ListGroup>
                    <ListGroup.Item>Nombre: Tienda de Vinos</ListGroup.Item>
                    <ListGroup.Item>Rut: 90.597.284-k</ListGroup.Item>
                    <ListGroup.Item>Cuenta Corriente Banco Personal</ListGroup.Item>
                    <ListGroup.Item>Número Cuenta 11229584</ListGroup.Item>
                    <ListGroup.Item>Mail: TiendaVinos@gmail.com</ListGroup.Item>
                </ListGroup>
                <p><span className="textoDestacadoFooter">Si ya realizaste la transferencia presiona en confirmar</span></p>
                { depositoEnviado ? <button className="btnDepositoConfirmado" onClick={() => depositoConfirmado()}>Confirmado</button> : <button className="btnConfirmarDeposito" onClick={() => depositoConfirmado()}>Confirmar</button> }
                
            </Container>

            <Container>
                <h3 className="pt-3">Ingrese sus datos</h3>
                <Formik initialValues={{ email: '', telefono: '', region: '', comuna: '', direccion: '' }} onSubmit={handleSubmit}
                    validationSchema={Yup.object({
                        email: Yup.string().email('Email inválido').required('Obligatorio'),
                        telefono: Yup.string().required('Obligatorio').typeError('Debe ser texto'),
                        region: Yup.string().required('Obligatorio').typeError('Debe ser texto'),
                        comuna: Yup.string().required('Obligatorio').typeError('Debe ser texto'),
                        direccion: Yup.string().required('Obligatorio').typeError('Debe ser texto'),
                    })}>
                    <Form className='containerFormularioAgregarProducto'>
                        <Input name="email" label="Email" />
                        <Input name="telefono" label="Telefono" />
                        <Input name="region" label="Region" />
                        <Input name="comuna" label="Comuna" />
                        <Input name="direccion" label="Direccion" />
                        <button className="enviarDatos" type="submit">Enviar datos</button>
                    </Form>
                </Formik>
            </Container>
        </Container>
    )
}