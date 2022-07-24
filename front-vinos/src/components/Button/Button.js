import './button.css'

export default function Button ( { onClick } ) {
    return(
        <button className='btnAgregar' onClick={ onClick }>Agregar</button>
    )
}