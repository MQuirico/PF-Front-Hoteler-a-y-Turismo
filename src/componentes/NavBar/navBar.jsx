import React from "react";
import { Link } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { FaShopify } from "react-icons/fa";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "../../assets/Runners Paradise.png";
import style from "./navBar.module.css";
import SearchBar from "../SearchBar/searchBar.jsx";

export default function NavBar(props) {
  return (
    <>
      <div className={style.navContainer}>
        <nav className="navbar navbar-expand-lg bg-white"> {/* Cambia bg-primary a bg-white */}
          <div className="container-fluid">
            <Link to="/home" className="nav-link active text-primary" aria-current="page">
              <img className={style.logoRunners} src={logo} alt="Runners Paradise Logo" />
            </Link>
            <div className={style.searchBarContainer}>
              <SearchBar />
            </div>
            <div>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item"></li>
                  <li className="nav-item">
                    <Link to="/about" className="nav-link text-black"> ¿Quiénes somos? </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/create" className="nav-link text-black"> Create </Link>
                  </li>
                  <Link to="#" className="nav-link text-black">
                    <FaShopify style={{ fontSize: "24px", marginLeft: "1rem" }} />
                  </Link>
                  <li className="nav-item dropdown" style={{ marginRight: "5rem" }}>
                    <Link
                      className="nav-link text-black dropdown-toggle"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <IoPersonSharp
                        style={{
                          fontSize: "24px",
                          marginLeft: "10px",
                          marginRight: "0.5rem",
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
      </div>
    </>
  );
}

