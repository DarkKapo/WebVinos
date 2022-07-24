import './footer.css'
import { BrandFacebook, BrandTwitter, BrandInstagram, BrandWhatsapp, Mail, MapPin } from 'tabler-icons-react'
import { Container } from 'react-bootstrap'

export default function Footer() {
    return(
        <footer id="contacto" className="oscuro">
            <Container>
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" ><BrandFacebook strokeWidth={1.5} size={48} color="white" /></a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" ><BrandTwitter strokeWidth={1.5} size={48} color="white" /></a>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" ><BrandInstagram strokeWidth={1.5} size={48} color="white" /></a>
                <a href="https://wa.me/56965930736" target="_blank" rel="noreferrer" ><BrandWhatsapp strokeWidth={1.5} size={48} color="white" /></a>
                <a href="mailTo:darkkapo@gmail.com?subject=Comprobante%20de%20pago&body=Adjunto%20mi%20comprobante%20con%20el%20ID%20...%20" target="_blank" rel="noreferrer" ><Mail strokeWidth={1.5} size={48} color="white" /></a>
                <p>Todos los derechos reservados.</p>
            </Container>

            <Container className="justify-content-md-center">
                <a href='/'><p className='interesFooter'><MapPin strokeWidth={1} size={24} color="white" />Avenida #1234</p></a>
                <a href='/comocomprar'><p className='interesFooter'>Como Comprar</p></a>
                <a href='/faq'><p className='interesFooter'>Preguntas frecuentes</p></a>
                <a href='/cambiodevolucion'><p className='interesFooter'>Cambio y devoluciones</p></a>
            </Container>
        </footer>
    )
}