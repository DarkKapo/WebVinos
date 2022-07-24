import Productos from "../Productos/Productos"
import './inicio.css'

export default function InicioPag ({ agregarCarro }) {
    return(
        <div>
            <Productos agregarCarro={agregarCarro}/>
        </div>
    )
}