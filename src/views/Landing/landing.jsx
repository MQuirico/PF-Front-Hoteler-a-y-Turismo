import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";


const Landing = () => {
  return (
    <div className="land-container">
      
      <h1 className="land-title">RUNNERS PARADISE</h1>
      <h3 className="land-sub">Compre con nosotros</h3>
      <Link to="/home">
        <button className="land-button">Ingresar</button>
      </Link>
    </div>
  );
};
export default Landing;