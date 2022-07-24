import DetallesCarro from '../DetallesCarro/DetallesCarro'
import './carro.css'
import { useState } from 'react'
//Importa icono desde tabler icon
import { ShoppingCart } from 'tabler-icons-react'

export default function Carro({ carro, sumarProducto, restarProducto }) {
    //Variable que muestra u oculta el carro al hacer clic
    const [esCarrovisible, setEsCarrovisible] = useState(false)

    //Función que muesta u oculta el carro de compras
    const mostrarCarro = () => {
        setEsCarrovisible(!esCarrovisible)
    }

    return(
        <div>  
            <button className="btn-flotante" onClick={mostrarCarro}><ShoppingCart size={32} strokeWidth={1.5} color={'white'} /></button>
            {esCarrovisible ? <DetallesCarro carro={carro} sumarProducto={sumarProducto} restarProducto={restarProducto} /> : null}
        </div>
    )
}