//Importa el icono desde tabler icon
import { Minus } from "tabler-icons-react"

export default function BtnRestarrProductoProducto ({ onClick }) {
    return(
        <button className="btnRestarProducto" onClick={ onClick }><Minus size={14} strokeWidth={2} color={'#dc143c'} /></button>
    )
}