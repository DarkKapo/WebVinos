import './inicioSesion.css'
import { Container, Button } from 'react-bootstrap'
import { useState } from "react"
import axios from "axios"
import { Registered, Login } from 'tabler-icons-react'

export default function InicioSesionPag () {
    //Guarda los datos del usuario del formulario
    let [ usuario, setUsuario ] = useState({})
    //Cambia el botón de registraro a iniciar sesión
    let [ textoBoton, setTextoBoton ] = useState('Registrarme')
    
    //Asigna los datos del usuario a la variable
    const handleSetUsuario = ( { target }) => {
        const { name: property, value } = target
        usuario[property] = value
        setUsuario({...usuario})
    }

    //Registra al usuario (administrador) en la base de datos
    const registro = async() => {
        try {
            const { data } = await axios.post('http://localhost:8080/usuario', usuario)
            alert("Te has registrado con éxito")
            window.location.reload()
            return data
        } catch ({ response }) {
            alert(response.data.error)
        }
    }

    //Lógica para iniciar sesión
    const logIn = async() => {
        try {
            const { data } = await axios.post('http://localhost:8080/login', usuario)
            alert("Inicio de sesión correcto")
            //Agrega el token a localStorage
            localStorage.setItem('token', data)
            //Activa el botón en el navbar para cerrar sesión y lo guarda en localStorage
            let inicioSesion = true
            localStorage.setItem('inicioSesion', inicioSesion)
            window.location.reload()
        } catch (e) {
            alert("No puedes ver esta sección")
        }
    }

    //Función que cambia el botón entre registro e iniciar sesión
    const cambiarVista = () => {
        if(textoBoton === 'Registrarme')
        {
            setTextoBoton('Iniciar Sesion')
        }else if(textoBoton === 'Iniciar Sesion')
        {
            setTextoBoton('Registrarme')
        }
    }
    
    return(
        <Container>
            { (textoBoton === 'Registrarme') ? 
                <div className="form-group">
                    <h3>Iniciar sesión</h3>
                    <div className="form-group">
                        <label>Email</label>
                        <input name="emailInicioSesion" className="form-control w-50 m-auto" value={usuario.emailInicioSesion || ""} onChange={handleSetUsuario} />
                    </div>
                    <div className="form-group py-3">
                        <label>Password</label>
                        <input name="passwordInicioSesion" type="password" className="form-control w-50 m-auto" value={usuario.passwordInicioSesion || ""} onChange={handleSetUsuario} />
                    </div>
                    <div>
                        <button className="btnInicarSesion mt-3" onClick={logIn} >Ingresar</button>
                    </div>
                </div>
                :
                <div className="form-group">
                    <h3>Registro</h3>
                    <div className="form-group">
                        <label>Email</label>
                        <input name="emailRegistro" className="form-control w-50 m-auto" value={usuario.emailRegistro || ""} onChange={handleSetUsuario} />
                    </div>
                    <div className="form-group py-3">
                        <label>Password</label>
                        <input name="passwordRegistro" type="password" className="form-control w-50 m-auto" value={usuario.passwordRegistro || ""} onChange={handleSetUsuario} />
                    </div>
                    <div>
                        <button className="btnInicarSesion mt-3" onClick={registro} >Registrarse</button>
                    </div>
                </div> 
            }
            
            { textoBoton === 'Registrarme' ? <Button onClick={cambiarVista} className="btnRegistro" ><Registered className="registered" size={48} strokeWidth={1.5} color={'#992385'} /></Button> : <Button onClick={cambiarVista} className="btnIniciarSesion" ><Login size={48} strokeWidth={1.5} color={'#992385'} /></Button> }
        </Container>
    )
}