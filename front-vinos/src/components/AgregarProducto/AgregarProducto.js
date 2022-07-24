//Bootstrap y formik
import { Formik, Form } from 'formik'
import { Button, Container } from 'react-bootstrap'
//Importa componente
import Input from '../Input/Input'
//Validar formulario
import * as Yup from 'yup'
//Consulta a la abse de datos
import axios from "axios"
import { useState } from 'react'
//Importa firebase para subir una imagen
import { getStorage, ref, uploadBytes } from "firebase/storage"

export default function AgregarProducto (){
    //Variable para guardar la imagen
    let [file, setFile] = useState(null)
    //Muestra u oculta el input para agregar una imagen al producto
    let [esMostrarInputImagen, setEsMostrarInputImagen] = useState(true)
    //Variables de seguridad que evitan que otras eprsoans vean el contenido
    let inicioSesion = localStorage.getItem('inicioSesion')
    let token = localStorage.getItem('token')

    //Guarda la imagen en la variable file
    const handleSetFile = (event) => {
        setFile(event.target.files[0])
        setEsMostrarInputImagen(!esMostrarInputImagen)
        alert(`${event.target.files[0].name} cargada, continue rellenando los datos`)
    }

    //Se hace la consulta para agregar el producto a la base de datos
    const handleSubmit = async (target) => {
        //Agregar la imagen a FireBase
        const storage = getStorage()
        const storageRef = ref(storage, target.imagen)
        await uploadBytes(storageRef, file)

        //Agrega el producto a la base de datos
        try {
            await axios.post(`http://localhost:8080/producto/${token}`, target)
        } catch (e) {
            return
        }
        setEsMostrarInputImagen(!esMostrarInputImagen)
        alert("Producto agregado")
        window.location.replace('http://localhost:3000/admin/productos')
    }

    const FormularioAgregarProductoAdmin = () => {
        return(
            //initialValues establece los valores iniciales
            //validationSchema valida que los datos ingresados sean correctos
            <Formik initialValues={{ nombre: '', imagen: '', precio: '', stock: '', descripcion: '' }} onSubmit={handleSubmit}
                validationSchema={Yup.object({
                    nombre: Yup.string().required('Obligatorio').typeError('Debe ser texto'),
                    imagen: Yup.string().required('Obligatorio').typeError('Debe ser texto'),
                    precio: Yup.number().required('Obligatorio').typeError('Debe ser un número').min(0, 'Valor mínimo 0'),
                    stock: Yup.number().required('Obligatorio').typeError('Debe ser un número').min(0, 'Valor mínimo 0'),
                    descripcion: Yup.string().required('Obligatorio').typeError('Debe ser texto'),
                })}>
                <Form className='containerFormularioAgregarProducto'>
                    <Container>
                    { esMostrarInputImagen ? <Container><input type="file" name="foto" onChange={ handleSetFile } style={{ color: 'transparent' }} /></Container> : 
                        <Container>
                            <Input name="nombre" label="Nombre Producto" />
                            <Input name="imagen" label="Nombre Imagen" />
                            <Input name="precio" label="Precio" />
                            <Input name="stock" label="Stock" />
                            <Input name="descripcion" label="Descripción" />
                            <Button type="submit">Agregar</Button>
                        </Container>
                    }
                    </Container>
                </Form>
            </Formik>    
        )
    }
    return(
        <Container>
            { inicioSesion ? <FormularioAgregarProductoAdmin /> : null }
        </Container>
    )
}