import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"



export default function NavBar(props) {
  return (
    <div className="navbarr">
      <Link to='/' className="landing">
      RunnersParadise
      </Link>

      <Link to='/home' className = "button-home">
      Home
      </Link>

      <Link to='/create' className ="button-create">
      Create
      </Link>

      <Link to='/abaut' className ="button-abaut">
      ¿Quiénes somos?
      </Link>

      <Link to= "/login" className ="button-login">
      Registrarse/Iniciar sesión
      </Link>
    </div>
  );
}

