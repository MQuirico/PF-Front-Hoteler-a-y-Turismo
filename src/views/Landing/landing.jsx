import * as React from 'react';
import { Link } from "react-router-dom";
import "./landing.css";
import logo from '../../assets/Runners Paradise.png'
import StandardImageList from './display img/imgList';
import Slide from '../../componentes/Slide/slide';

const Landing = () => {
  const galleryStyle = {
    position: 'fixed',
    bottom: '0',
    left: '0',
    height: '100vh',
  };

  
  return (
    <div className="land-container">
      
      <img src={logo} className="logo" alt="Runners Paradise" />
      <h3 className="land-sub">Compre con nosotros</h3>
      <StandardImageList style={galleryStyle} />
      <Slide />
      <div className='text'>
        <p className='intro'>¡Bienvenido a Runners Paradise, el destino definitivo para los apasionados del<br />
        deporte y el confort! En Runners Paradise, no solo ofrecemos calzados deportivos <br />
        de las mejores marcas, sino que también proporcionamos una experiencia única para <br />
        aquellos que buscan el equilibrio perfecto entre rendimiento y estilo. Navega por <br />
        nuestra amplia selección de zapatillas diseñadas para potenciar tu carrera y elevar <br />
        tu estilo de vida activo. En cada par, encontrarás la fusión perfecta de tecnología <br />
        avanzada, comodidad insuperable y diseño vanguardista. Descubre la diferencia en<br />
        Runners Paradise, donde la pasión por el deporte se encuentra con la moda atlética.<br />
        ¡Prepárate para elevar tus límites y correr hacia la excelencia en cada paso!</p>
      </div>
      <Link to="/home">
        <button className="land-button">Ingresar</button>
      </Link>
    </div>
  );
};
export default Landing;