import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import UserProfileForm from "./prefilDeUsuario";
import UserMail from "./changeMail";
import PaymentMethodsForm from "../prefilDeUsuario/metodosDePago"
import Reservas from "./historialReservas"
import ReviewsHistory from "./historialReviews"
import { createTheme } from "@mui/material/styles";
import styles from "./dashBoard.module.css";
import { AuthContext } from "../AuthProvider/authProvider";
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios'

const theme = createTheme();//paSubir

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  sidebar: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderBottom: "1px solid #ddd",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    cursor: "pointer",
  },
  divider: {
    borderTop: "1px solid #ddd",
    marginBottom: "20px", 
  },

  divider1: {
    borderTop: "1px solid #ddd",
    marginBottom: "10px",
    marginTop: "190px"
  },
}));

const DashboardUsuario = () => {
  const classes = useStyles();
  const [showProfileForm, setShowProfileForm] = useState(true);
  const [showChangeMail, setShowChangeMail] = useState(false);
  const [showreservas, setReservas] = useState(false);
  const [showpagos, setpagos] = useState(false);
  const [showreviews, setReviews] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const history = useHistory();

  const refreshInfo = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3003/users/user/${userId}`);
      if (response.data) {
        
        const authData = {
          token: response.data,
        };
        console.log("se refresco el token ==>", authData)
        setAuth(authData);
        localStorage.setItem('auth', JSON.stringify(authData)); 
      } else {
        setErrorState('Error: The response is not valid');
      }
    } catch (error) {
      setErrorState('Error al iniciar sesión: ' + error.message);
    }
  }

  const handleShowProfileForm = () => {
    setShowProfileForm(true);
    setShowChangeMail(false);
    setpagos(false);
    setReservas(false);
    setReviews(false);
  };

  const handleShowChangeMail = () => {
    setShowChangeMail(true);
    setShowProfileForm(false);
    setpagos(false);
    setReservas(false);
    setReviews(false);
  };

  const handleShowpagos = () => {
    setShowChangeMail(false);
    setShowProfileForm(false);
    setpagos(true); 
    setReservas(false);
    setReviews(false);
  };

  const handleReservas = () => {
    setShowChangeMail(false);
    setShowProfileForm(false);
    setpagos(false);
    setReservas(true);
    setReviews(false);
  };

  const handleReviews = () => {
    setShowChangeMail(false);
    setShowProfileForm(false);
    setpagos(false);
    setReservas(false);
    setReviews(true);
  };

  const logOut = () => {
    if (window.gapi && window.gapi.auth2) {
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.disconnect().then(function () {
        console.log("User disconnected.");
      });
    }

    setAuth(null);
    localStorage.removeItem("auth");
    history.push("/home"); // Redirigir a /home después de cerrar sesión
  };

  const handleGoToHome = () => {
    history.push("/home");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Drawer
          className={`${classes.sidebar} ${styles.content}`}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.header}>
            <div className={classes.button} onClick={handleGoToHome}>
              <HomeIcon />
              <ListItemText primary="Volver a Home" style={{ marginLeft: "10px" }} />
            </div>
          </div>
          <div className={classes.divider}></div>
          <List>
            <ListItem button onClick={handleShowProfileForm}>
              <SettingsIcon style={{marginLeft: "30px",marginTop: "20px"}} />
              <ListItemText primary="Editar Perfil de usuario" style={{ marginLeft: "10px",marginTop: "30px" }} />
            </ListItem>
            <ListItem button onClick={handleShowChangeMail}>
              <SettingsIcon style={{marginLeft: "30px",marginTop: "20px"}} />
              <ListItemText primary="Cambiar de Email y contraseña" style={{ marginLeft: "10px",marginTop: "30px" }} />
            </ListItem>
            <ListItem button onClick={handleShowpagos}>
              <SettingsIcon style={{marginLeft: "30px",marginTop: "20px"}} />
              <ListItemText primary="Metodos de pagos" style={{ marginLeft: "10px",marginTop: "30px" }} />
            </ListItem>
            <ListItem button onClick={handleReservas}>
              <SettingsIcon style={{marginLeft: "30px",marginTop: "20px"}} />
              <ListItemText primary="Historial de reservas" style={{ marginLeft: "10px",marginTop: "30px" }} />
            </ListItem>
            <ListItem button onClick={handleReviews}>
              <SettingsIcon style={{marginLeft: "30px",marginTop: "20px"}} />
              <ListItemText primary="⭐ Tus hospedajes de interés ⭐" style={{ marginLeft: "10px",marginTop: "30px" }} />
            </ListItem>
            <div className={classes.divider1}></div>
            <ListItem button onClick={logOut}>
              <ExitToAppIcon style={{marginLeft: "30px",marginTop: "10px",}} />
              <ListItemText primary="Cerrar sesión" style={{ marginLeft: "20px",marginTop: "10px", }} />
            </ListItem>
          </List>
        </Drawer>
        <main className={`${styles.content}`}>
          {showProfileForm && <UserProfileForm props={{refreshInfo}} />}
          {showChangeMail && <UserMail props={{refreshInfo}}/>}
          {showpagos && <PaymentMethodsForm />}
          {showreservas && <Reservas />}
          {showreviews && <ReviewsHistory />}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default DashboardUsuario;