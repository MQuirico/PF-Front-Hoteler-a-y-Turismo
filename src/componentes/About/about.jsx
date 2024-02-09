import React from 'react';
import { Link } from 'react-router-dom'; 
import style from './About.module.css' 

const About = () => {
  return (
    <div className={style.container}>
      
      <nav className={style.nav}>
        <p>Conoce mas de nosotros</p>
       
        <Link to="/"><button className={style.bot}>Home</button></Link>
      </nav>

      <section>
        
        <h2>Qué hacemos</h2>
        <p className={style.parrafo}>En nuestro servicio, ofrecemos reservas de cabañas para unas vacaciones inolvidables. Nos especializamos en brindar experiencias únicas y acogedoras para nuestros clientes.</p>
        <img src="https://fondosmil.com/fondo/8004.jpg"/>
      </section>

     

      <section>
        <h2>Regístrate y descubre</h2>
        <p className={style.parrafo}>Nos enorgullecemos de ofrecer a nuestros clientes la oportunidad de registrarse y descubrir los mejores lugares para vacacionar. Cuidamos cada detalle para garantizar una experiencia única y sorprendente en cada visita.</p>
      </section>

      <section className={style.contimg}>
      <img src="https://tse1.mm.bing.net/th?id=OIP.r4vFzafZC43K3VpIn6zQQQHaFj&pid=Api&P=0&h=180"/>
      <img src="https://www.misabogados.com.co/hubfs/Imported_Blog_Media/descanso-laboral-1.jpg#keepProtocol"/>
      <img src="https://piscinasmalaga.com/wp-content/uploads/2016/08/piscinas-de-hormigon-en-malaga-1024x768.jpg"/>
      <img src="https://www.edenpopopark.com/s/cc_images/cache_11092022.jpg?t=1445531619"/>
      <img src="https://i.pinimg.com/originals/54/5a/74/545a742c9b9fba708e893a82c73e9e2a.jpg"/>
      <img src="https://www.pineca.com/wp/wp-content/uploads/2017/11/log-cabin-bathroom.jpg"/>
      </section>

      <section>
        <h2>Nuestros puntos fuertes</h2>
        <p className={style.parrafo}>Nuestra principal prioridad es proporcionar una estancia excepcional para nuestros huéspedes. Nos esforzamos por la excelencia en cada aspecto, desde la comodidad de nuestras cabañas hasta la eficiencia de nuestro servicio.</p>
      </section>

     <section>
      <h4>Conoce nuestros servicios</h4>
      
      <div className={style.servicios}>
       <h5>Desayuno incluido.</h5>
       <h5>Canales de television satelital</h5>
       <h5>Posibilidad de estacionar vehiculos</h5>
       <h5>Cocina con refrigerador</h5>
       <h5>Cama y ropa de cama incluida</h5>
      </div>
     
     </section>
    <div className={style.info}>

 <p>Ponte en contacto con nosotros:</p>
        <div className="contact-info">
          <p>Teléfono: 123-456-789</p>
          <p>Facebook: @cabañascbv</p>
          <p>Instagram: @cabañassvd</p>
        </div>
        <p>¡Agréganos para mantenerte actualizado con nuestras últimas ofertas y novedades!</p>
    </div >
    

     
    </div>
  );
}

export default About;