//Importa el icono desde tabler icon
import { Plus } from "tabler-icons-react"

export default function BtnSumarProducto ({onClick}) {
    return(
        <button className="btnSumarProducto" onClick={onClick} ><Plus size={14} strokeWidth={2} color={'#dc143c'} /></button>
    )
}