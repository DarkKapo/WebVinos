import BuscadorPagina from '../components/Buscador/Buscador'
import { Container } from 'react-bootstrap'

export default function Buscador ({ agregarCarro }) {
    return(
        <Container>
            <h1 className="tituloVista">Buscador</h1>
            <BuscadorPagina agregarCarro={agregarCarro} />
        </Container>
    )
}