import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import HomeIcon from '@mui/icons-material/Home';
import logo from '../../assets/hp2.jpg'
import { FaShopify } from "react-icons/fa";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthContext } from "../AuthProvider/authProvider";

export default function NavBar(props) {
  const { auth, setAuth } = useContext(AuthContext);
  const history = useHistory();
  const [loading, setLoading] = useState(true); 

  const logOut = () => {
    if (window.gapi && window.gapi.auth2) {
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.disconnect().then(function () {
        console.log("User disconnected.");
      });
    }

    setAuth(null);
    localStorage.removeItem("auth");
    history.push("/home");
  };

  const imgDefault =
    "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

  useEffect(() => {
    const savedAuth = JSON.parse(localStorage.getItem("auth"));
    if (savedAuth) {
      setAuth(savedAuth);
    }
    setLoading(false);
  }, [setAuth]);

  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Navbar bg="light" expand="lg" fixed="top">
    <Link to="/home">
    <img src={logo} style={{ marginLeft: "20px", height: '60px', width: '160px' }}/>
    </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ marginLeft: "-100px" }} />
      <Navbar.Collapse id="basic-navbar-nav" style={{ justifyContent: "flex-end" }}>
        <Nav style={{ marginRight: "100px" }}>
          {auth && <p style={{color: 'black', fontWeight: 'bold', marginTop: '8px' }} >¡Bienvenido, {auth?.token?.name} {auth?.token?.surName}!</p>}
          <Nav.Link as={Link} to="/search" style={{ marginLeft: "-20px" }}>Explora destinos</Nav.Link>
          <Nav.Link as={Link} to="/about" style={{ marginLeft: "20px" }}>¿Quiénes somos?</Nav.Link>
          {/* <Nav.Link as={Link} to="/Shopping"><FaShopify style={{ fontSize: "24px", marginLeft: "20px", marginRight: "15px" }} /></Nav.Link> */}
         { console.log(auth)}
          {auth && auth.token ? (
            <>
              <NavDropdown title={<img src={auth.token.imageUrl || imgDefault} style={{ borderRadius: "50%", height: "32px", width: "32px", marginLeft: "-10px", marginRight: "5px" }} alt="User Avatar" />} id="basic-nav-dropdown">
                {auth.token.rol === "buyer" && (
                  <NavDropdown.Item as={Link} to="/configUser" style={{ marginLeft: "0px" }}>Ajustes</NavDropdown.Item>
                )}
                {auth.token.rol === "admin" && (
                  <NavDropdown.Item as={Link} to="/configAdmin">Ajustes</NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOut}>Cerrar Sesión</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <NavDropdown title={<IoPersonSharp style={{  marginLeft: "20px", marginRight: "1rem", position: "absolute" }} />} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/register">Regístrate</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/create">Agregar hospedaje</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/login">Inicia Sesión</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
          }