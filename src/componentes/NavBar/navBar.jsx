import React from "react";
import { Link } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { FaShopify } from "react-icons/fa";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function NavBar(props) {
  return (
<<<<<<< HEAD
    <div>
      <Link to='/'>
      <h1>RunnersParadise</h1>
      </Link>

      <Link to='/home'>
      <h3>Home</h3>
      </Link>

      <Link to=''>
      <h3>¿Quiénes somos?</h3>
      </Link>

      <Link to='/register'>
      <h3>Registrarse/Iniciar sesión</h3>
      </Link>
    </div>
=======
    <nav className="navbar navbar-expand-lg bg-primary data-bs-theme=dark">
      <div className="container-fluid">
        <h1
          className="logo"
          style={{ fontFamily: "Zantiqa4F", marginLeft: "3rem" }}
        >
          RunnersParadise
        </h1>
        <div>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link active text-white" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link text-white">
                  ¿Quiénes somos?
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link text-white">
                  Create
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link text-white dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <IoPersonSharp
                    style={{
                      fontSize: "24px",
                      marginLeft: "10px",
                      marginRight: "1rem",
                    }}
                  />
                  <FaShopify
                    style={{
                      fontSize: "24px",
                      marginLeft: "1rem",
                      marginRight: "3rem",
                    }}
                  />
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/register" className="dropdown-item">
                      Regístrate
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="dropdown-item">
                      Inicia Sesión
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
>>>>>>> 2dbd04de19dad277276c2977b36ac9d49a1e417e
  );
}
