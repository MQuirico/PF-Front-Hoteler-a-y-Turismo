import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.css'; // Asegúrate de tener este archivo CSS para los estilos personalizados
import '@fortawesome/fontawesome-free/css/all.min.css';



export default function About(props) {
  return (

    <div className='fondo'>
    <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-xrRac0c5/3Ma9HN6T5Q/T1uHuL5oav5eaP3QQPyCv/Z3MWJ1HpuHrkQIH/FuRx3Ib8xvjQHyLx7O5vjRh2x/WWg==" crossorigin="anonymous" />
  </head>
<div className='blanco'>
</div>
    <div className="container mt-5 about mb-5">
      
      <div className='cuadrante1'>
      <div className='title'>
        <h3>Sobre Nosotros</h3>
      </div>
      <p>
        <div className='text'>
          ¡Bienvenido a Runners Paradise!<br />
          En Runners Paradise, no solo vendemos zapatillas deportivas,
          sino que también compartimos una pasión por la actividad física
          y el bienestar. Somos más que una tienda; somos un destino para
          todos los amantes del deporte y la moda atlética.
        </div>
      </p>
      </div>


      <div className='cuadrante2'>
      <div className='title'>
        <h3>Nuestra Misión</h3>
      </div>
      
        <div className='text'>
          En el corazón de Runners Paradise está nuestra misión de inspirar
          y equipar a todos, desde los corredores dedicados hasta aquellos que
          dan sus primeros pasos en el mundo del deporte. Queremos ser tu compañero
          de confianza en cada paso de tu viaje, brindándote solo las mejores
          zapatillas
        </div>
      
      </div>


      <div className='cuadrante3'>
      <div className='title'>
        <h3>Variedad para Todos</h3>
      </div>
    
        <div className='text'>
          Sabemos que cada corredor es único, al igual que sus necesidades.
          Es por eso que ofrecemos una amplia variedad de zapatillas deportivas
          para todos los géneros y edades. Desde los últimos modelos de las
          mejores marcas hasta opciones especializadas para diferentes tipos de
          actividades.
        </div>
      
      </div>


      <div className='cuadrante4'>
      <div className='title'>
        <h3>Experiencia Personalizada</h3>
      </div>
        <div className='text'>
          En Runners Paradise, nos enorgullece ofrecer más que solo productos
          excepcionales. Nuestro equipo está aquí para brindarte una experiencia
          de compra personalizada. Ya seas un corredor apasionado, un entusiasta
          del fitness o alguien que busca el par perfecto para el día a día,
          estamos aquí para ayudarte a encontrar lo que necesitas.
        </div>
      </div>

      <div className='agradecimientos'>
      <div className='title1'>
        <h5>Equipo</h5>
      </div>
        <div className='text'>
          <h6>Front</h6>
          Andres Vera,
          Abril,
          Matias Quirico.<br />

          <h6 className='back'> Back</h6>
          <p className='back1'>
            Tomas,
          Sam, 
          Jaime. <br /> <br /> <br/> <br/><br/>
            </p>

          
        
        <div className="social-icons">
          <a href="https://www.instagram.com/tu_usuario_instagram" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com/tu_usuario_facebook" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://github.com/tu_usuario_github" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </div>
        
          <h6 className='equipo'>El equipo de Runners Paradise</h6>
        </div>
    </div>
      </div>
    </div>
  );
}
