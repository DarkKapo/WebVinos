import axios from "axios"

export default function BtnEditar ( { datos } ) {

    const editarCliente = async() => {
        const newEmail = prompt("Ingrese nuevo correo", datos[1])
        //Actualizamos el valor
        datos[1] = newEmail
        
        try {
            await axios.put(`http://localhost:8080/usuario`, datos)
            window.location.reload()
        } catch ({ response }) {
            console.log("Error: ", response.data.error)
        }
    }

    return(
        <button onClick={editarCliente} className="btnEditar">Editar</button>
    )
}