import { Container, Row, Card } from "react-bootstrap"
import Button from "../Button/Button"
import axios from "axios"
import { useState, useEffect } from "react"


export default function Buscador ({ agregarCarro }) {
    let filtroBusqueda = localStorage.getItem('filtroBusqueda')

    const styles = {
        producto: {
            border: 'solid 1px #eee',
            boxShadow: '0 5px 5px rgba(0, 0, 0, 0.1)',
            width: '18rem',
            padding: '10px 15px',
            borderRadius: '30px',
            margin: '20px',
            minWidth: '120px',
        },
    }

    //Obtener los productos
    let [productos, setProductos] = useState([])
    
    const obtenerProductos = async () => {
        const { data } = await axios.get(`http://localhost:8080/producto/${filtroBusqueda}`)
        return setProductos( [...data] )
    }

    useEffect( () => {
        obtenerProductos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const Img = (srcImg) => {
        return <img src={srcImg.src} height={srcImg.height} variant={srcImg.variant} width={srcImg.width} className={srcImg.className} alt="" />
    }

    return(
        <Container>
            <Row>

            </Row>
            <Row className="justify-content-md-center">
                {productos.map((producto, i) =>
                    <Card style={ styles.producto } key={i}>
                    <Img variant="top" src={`https://firebasestorage.googleapis.com/v0/b/imgswebvinos.appspot.com/o/${producto.imagen}?alt=media`} height="120" width="100" className="rounded mx-auto d-block" />
                    <Card.Body>
                      <Card.Title className="tituloVinoCard">{producto.nombre}</Card.Title>
                      <Card.Text>${producto.precio}</Card.Text>
                      <Card.Text className="textoVinoCard">{producto.descripcion}</Card.Text>
                      <Card.Text className="textoVinoCard">Stock {producto.stock}</Card.Text>
                      <Button onClick={ () => agregarCarro(producto)} />
                    </Card.Body>
                  </Card>
                 )}
            </Row>
        </Container>
    )
}