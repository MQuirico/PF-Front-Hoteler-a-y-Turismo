import React from "react";
import { Link } from "react-router-dom";
import "./navBar.css";
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
                <a
                  className="nav-link active text-white"
                  aria-current="page"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  ¿Quiénes somos?
                </a>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link text-white" href="#">
                  Create
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link text-white dropdown-toogle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Regístrate
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Inicia Sesión
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#"></a>
                    </li>
                  </ul>
                  <IoPersonSharp
                    className=""
                    style={{
                      fontSize: "24px",
                      marginLeft: "10px",
                      marginRight: "1rem",
                    }}
                  />
                  <FaShopify
                    className=""
                    style={{
                      fontSize: "24px",
                      marginLeft: "1rem",
                      marginRight: "3rem",
                    }}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
>>>>>>> 2dbd04de19dad277276c2977b36ac9d49a1e417e
  );
}
