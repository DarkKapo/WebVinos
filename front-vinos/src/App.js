import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
//Importando Componentes
import NavbarComp from "./components/Navbar/NavbarComp"
import Footer from "./components/Footer/Footer"
//Importanto Vistas
import Inicio from "./views/Inicio"
import Ofertas from "./views/Ofertas"
import InicioSesion from "./views/InicioSesion"
import Buscador from "./views/Buscador"
import Admin from "./views/Admin"
import ConfirmarPedido from "./views/ConfirmarPedido"
import SistemaDePago from "./views/SistemaDePago"
import ComoComprar from "./views/ComoComprar"
import Faq from "./views/Faq"
import CambioDevoluciones from "./views/CambioDevoluciones"

export default function App (){
  let carro = []
  //Función que agrega un producto al carro
  const agregarCarro = (producto) => {
        //Si ya existe un producto con el nombre, no lo agrega
        let encuentra = carro.find( atributo => {
          if(atributo.nombre === producto.nombre)
          {
            return true
          }
        })
        
        if(encuentra === undefined)
        {
          producto.cantidad = 1
          carro.push(producto)
          alert("Producto agregado")
        }
        
        return carro
  }
  //Quita un producto del carro
  const restarProducto = (onClick) => {
    if(onClick.cantidad > 1) onClick.cantidad -= 1
  }
  //Suma un producto al carro
  const sumarProducto = (onClick) => {
    onClick.cantidad += 1
  }
  

  return(
    <Router>
      <NavbarComp carro={carro} sumarProducto={sumarProducto} restarProducto={restarProducto} />
      <Routes>
        <Route path="/" element={<Inicio agregarCarro={agregarCarro} />} />
        <Route path="/ofertas" element={<Ofertas agregarCarro={agregarCarro} />} />
        <Route path="/iniciosesion" element={<InicioSesion />} />
        <Route path="/buscador" element={<Buscador agregarCarro={agregarCarro} />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/confirmarpedido" element={<ConfirmarPedido carro={carro} />} />
        <Route path="/sistemadepago" element={<SistemaDePago />} />
        <Route path="/comocomprar" element={<ComoComprar /> } />
        <Route path="/faq" element={<Faq /> } />
        <Route path="/cambiodevolucion" element={<CambioDevoluciones /> } />
      </Routes>
      <Footer />   
    </Router>
  )
}