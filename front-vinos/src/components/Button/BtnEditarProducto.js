import axios from "axios"

export default function BtnEditarProducto( {producto} ) {
    const editarProducto = async() => {
        //variableTemporal guarda el dato que se está recorriendo
        let variableTemporal = ''
        //Variable que decide si se ejecuta el update
        let confirmarUpdate = true
        
        //Se recorre cada atributo del producto para modificar su valor
        for (let atributo in producto)
        {
            if(atributo === "producto_id" || atributo === "imagen" || atributo === "oferta") continue

            //Se asigna la variable del atributo a la variable temporal
            variableTemporal = producto[atributo]
            //Se guarda el nuevo valor para el atributo
            producto[atributo] = prompt(`Ingrese nuevo valor para ${atributo} (escriba null para cancelar u ok para terminar y actualizar)`, producto[atributo])
            
            //Ejecuta la lógica cuando el usuario coloca ok o null
            if( producto[atributo] === "null") 
            {
                confirmarUpdate = false
                producto[atributo] = variableTemporal
                break
            }else if(producto[atributo] === "ok")
            {
                producto[atributo] = variableTemporal
                break
            }
        }
        
        //Se ejecuta la lógica para actualizar o cancelar la compra
        if(confirmarUpdate === true)
        {
            try {
                await axios.put('http://localhost:8080/producto', producto)
                window.location.reload()
            } catch ({ response }) {
                alert(response.data.error)
            }
        }else if(confirmarUpdate === false)
        {
            alert("Acción cancelada")
        }
    }

    return(
        <button onClick={editarProducto} className="btnEditar">Editar</button>
    )
}