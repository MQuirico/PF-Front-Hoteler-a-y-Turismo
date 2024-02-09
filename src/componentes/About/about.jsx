import React from 'react';
import './About.css'; 

const About = () => {
  return (
    <div className="about-container">
      <section className="section-1">
        <h2>Qué hacemos</h2>
        <p>En nuestro servicio, ofrecemos reservas de cabañas para unas vacaciones inolvidables. Nos especializamos en brindar experiencias únicas y acogedoras para nuestros clientes.</p>
      </section>

      <section className="image-gallery">
        {/* Aquí van las 12 imágenes */}
        {/* Por cuestiones de espacio, asumiremos que hay un componente Image que toma la URL de la imagen como prop */}
        {Array.from({ length: 12 }).map((_, index) => (
          <Image key={index} src={`imagen-${index + 1}.jpg`} alt={`Imagen ${index + 1}`} />
        ))}
      </section>

      <section className="section-2">
        <h2>Regístrate y descubre</h2>
        <p>Nos enorgullecemos de ofrecer a nuestros clientes la oportunidad de registrarse y descubrir los mejores lugares para vacacionar. Cuidamos cada detalle para garantizar una experiencia única y sorprendente en cada visita.</p>
      </section>

      <section className="image-gallery">
        {/* Otras cuatro imágenes */}
        {Array.from({ length: 4 }).map((_, index) => (
          <Image key={index} src={`imagen-${index + 13}.jpg`} alt={`Imagen ${index + 13}`} />
        ))}
      </section>

      <section className="section-3">
        <h2>Nuestros puntos fuertes</h2>
        <p>Nuestra principal prioridad es proporcionar una estancia excepcional para nuestros huéspedes. Nos esforzamos por la excelencia en cada aspecto, desde la comodidad de nuestras cabañas hasta la eficiencia de nuestro servicio.</p>
      </section>

      <div className="image-container">
        {/* Dos imágenes adicionales */}
        <Image src="punto-fuerte-1.jpg" alt="Punto Fuerte 1" />
        <Image src="punto-fuerte-2.jpg" alt="Punto Fuerte 2" />
      </div>

      <footer>
        <p>Ponte en contacto con nosotros:</p>
        <div className="contact-info">
          <p>Teléfono: 123-456-789</p>
          <p>Facebook: @nombredetuempresa</p>
          <p>Instagram: @nombredetuempresa</p>
        </div>
        <p>¡Agréganos para mantenerte actualizado con nuestras últimas ofertas y novedades!</p>
      </footer>
    </div>
  );
}

export default About;