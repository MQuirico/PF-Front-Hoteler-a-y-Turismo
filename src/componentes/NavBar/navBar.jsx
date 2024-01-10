
import React from "react";
import { Link } from "react-router-dom";
export default function NavBar(props) {
  return (
    <div>
      <Link to='/'>
      <h1>RunnersParadise</h1>
      </Link>

      <Link to='/home'>
      <h3>Home</h3>
      </Link>

      <Link to=''></Link>
      <h3>¿Quiénes somos?</h3>
      <h3>Registrarse/Iniciar sesión</h3>
    </div>
  );
}

