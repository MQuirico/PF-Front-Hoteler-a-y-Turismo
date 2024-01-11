import React from "react";
import {Link} from "react-router-dom";



const Landing = () => {

  return (
    <div>
      <h1>RUNNERS PARADISE</h1>
      <h3>Compre con nosotros</h3>
      <Link to='/home'>
      <button>Ingresar</button>
      </Link>
    </div>
  );
};
//UN CAMBIO SIMPLE EN CUALQUIER LADO
export default Landing; 