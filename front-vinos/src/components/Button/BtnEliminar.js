import axios from "axios"
//Import para eliminar una imagen de FireBase
import { getStorage, ref, deleteObject } from "firebase/storage"

export default function BtnEliminar ( { id, ruta, img } ) {

    const eliminarDatos = async() => {
        //Pregunta si desea confirmar la acción
        let deseaEliminar = window.confirm("¿Está seguro que desea eliminar el producto?")
        const storage = getStorage()

        //Consultaa la base de datos para eliminar
        if (deseaEliminar) {
            try {
                const desertRef = ref(storage, img)
                //If que verifica si hay que eliminar la imagen de FireBase
                if (img !== null) {
                    await deleteObject(desertRef)
                }
                await axios.delete(`http://localhost:8080/${ruta}/${id}`)
                window.location.reload()
            } catch ({ response }) {
                alert("Error: ", response.data.error)
            }
        }
    }

    return(
        <button onClick={eliminarDatos} className="btnEliminar">Eliminar</button>
    )
}
