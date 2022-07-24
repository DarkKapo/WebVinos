export default function BtnPagar ({ carro }) {
    const guardarCarro = () => {
        localStorage.setItem('carrito', JSON.stringify(carro))
    }
    return(
        <button className="btnPagar" onClick={guardarCarro}><p>Proceder al pago</p></button>
    )
}