//importar formik, bootstrap
import { Formik, Form } from 'formik'
import { Button, Container } from 'react-bootstrap'
import Input from '../Input/Input'
//Yup para las validaciones del formulario
import * as Yup from 'yup'
//Axios para hacer consultas a la base de datos
import axios from "axios"

export default function AgregarCompra () {
    const handleSubmit = async(target) => {
        //Agrega la compra a la base de datos
        try {
            const  data  = await axios.post('http://localhost:8080/compra', target)

            if(data.data.name === "error")
            {
                throw target.cliente_id
            }
            
            alert('Compra agregada')
            window.location.reload()
        } catch (e) {
            alert(`El usuario con id ${e} no existe`)
        }
    }

    return(
        <Container>
            <Formik initialValues={{ cliente_id: '', fecha: '' }} onSubmit={handleSubmit}
                validationSchema={Yup.object({
                    cliente_id: Yup.number().required('Obligatorio').typeError('Debe ser un número'),
                    fecha: Yup.string().required('Obligatorio').typeError('Debe ser un texto'),
            })}>
                <Form>
                    <Input name="cliente_id" label="Cliente id" />
                    <Input name="fecha" label="Fecha" />
                    <Button type="submit">Agregar</Button>
                </Form>
            </Formik>
        </Container>
    )
}