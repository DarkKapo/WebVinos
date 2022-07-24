import axios from "axios"

export default function BtnEditarCompra ( { datos } ) {
    const editarCompra = async() => {
        //Variable temporal para evitar que al escribir ok o null este quede asignado a la variable
        let variableTemporal = ''
        //Variable que decide si se ejecuta el update
        let confirmarUpdate = true

        //Se recorre cada atributo de la compra para modificar su valor
        for (let atributo in datos)
        {
            if(atributo === "pedido_id" || atributo === "completado") continue

            //Se asigna la variable del atributo a la variable temporal
            variableTemporal = datos[atributo]
            if (atributo === "fecha" ) {
                datos[atributo] = variableTemporal.slice(0, 10)
            }
            //Se guarda el nuevo valor para el atributo
            datos[atributo] = prompt(`Ingrese nuevo valor para ${atributo} (escriba null para cancelar u ok para terminar y actualizar)`, datos[atributo])

            //Ejecuta la lógica cuando el usuario coloca ok o null
            if( datos[atributo] === "null") 
            {
                confirmarUpdate = false
                datos[atributo] = variableTemporal
                break
            }else if(datos[atributo] === "ok")
            {
                datos[atributo] = variableTemporal
                break
            }
        }

        //Se ejecuta la lógica para actualizar o cancelar la compra
        if(confirmarUpdate === true)
        {
            try {
                await axios.put(`http://localhost:8080/pedido`, datos)
                window.location.reload()
            } catch (e) {
                console.log("E = ", e);
                alert(`usuario con id ${e} no existe`)
            }
        }else if(confirmarUpdate === false)
        {
            alert("Acción cancelada")
        }
    }

    return(
        <button onClick={editarCompra} className="btnEditar">Editar</button>
    )
}