import BtnRestarrProductoProducto from "../Button/BtnRestarProducto"
import BtnSumarProducto from "../Button/BtnSumarProducto"
import { useState } from 'react'
import { SquareX } from 'tabler-icons-react'
import BtnPagar from "../Button/BtnPagar"
import { Link } from "react-router-dom"

export default function DetallesCarro ({ carro, sumarProducto, restarProducto }) {
    //Variable que muestra la cantidad de productos de un producto en el carro
    const [esSpanVisible, setSpanVisible] = useState(false)

    //Estilo del carro (CSS)
    const styles = {
        detallesCarro: {
            backgroundColor: '#fff',
            position: 'absolute',
            marginTop: 30,
            boxShadow: '1px 5px 5px rgb(0, 0, 0, 0.3)',
            borderRadius: '5px',
            width: '300px',
            right: 1,
            zIndex: '99'
        },
        ul: {
            //Alinear a la izquierda
            margin: 0,
            padding: 0
        },
        producto: {
            listStyleType: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '25px 20px',
            //Separador
            borderBottom: 'solid 1px #aaa'
        }
    }

    const Img = (atributos) => {
        return <img src={atributos.src} height={atributos.height} width={atributos.width} alt="" />
    }

    const mostrarSpan = () => {
        setSpanVisible(!esSpanVisible)
    }

    //Función para eliminar un producto del carro
    const eliminarElementoCarro = (i) => {
        carro.splice(i, 1)
        alert("elemento eliminado, cierre y abra el carro para actualizar")
    }

    return(
        <div style={styles.detallesCarro}>
            <ul style={styles.ul}>
                {carro.map( (x, i) => 
                    <li style={styles.producto} key={i}>
                        <Img src={`https://firebasestorage.googleapis.com/v0/b/imgswebvinos.appspot.com/o/${carro[i].imagen}?alt=media`} height="50" width="70" />
                        {carro[i].nombre}
                        <BtnRestarrProductoProducto onClick={ () => {restarProducto(x); mostrarSpan()}} />
                        {esSpanVisible ? <span>{carro[i].cantidad}</span> : <span>{carro[i].cantidad}</span>}
                        <BtnSumarProducto onClick={ () => {sumarProducto(x); mostrarSpan()}} />
                        <SquareX onClick={() => eliminarElementoCarro(i)} size={20} strokeWidth={1.5} color={'red'} />
                    </li>
                )}{(carro.length === 0) ? null : <Link to="/confirmarpedido"><BtnPagar carro={carro} /></Link> }
            </ul>
        </div>
    )
}