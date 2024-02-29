/* import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import styles from "./register.module.css";
import { useForm } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { registerUser } from "../../redux/Actions/actions";
import {Link} from "react-router-dom"

const Register = () => {
  const dispatch = useDispatch();
  const errorServer = useSelector(state => state.stateA.error)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onChange' }); 
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); 

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const onSubmit = async (data) => {
    console.log("Datos enviados al backend:", data);
    try {
      await dispatch(registerUser(data));
      if (errorServer) {
        setMessage(errorServer);
        setSnackbarOpen(true);
      } else {
        setMessage("¡Te has registrado correctamente! Verifica tu casilla de correo");
        setSnackbarOpen(true);
        reset();
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      
      setMessage("Error al registrar usuario: " + error.message);
      setSnackbarOpen(true);
    }
  };
  

  useEffect(() => {
    setIsFormValid(Object.keys(errors).length === 0); 
  }, [errors]);

  return (
    <div className={styles.container}>
      <div className={styles.borde}>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Ingrese su nombre..."
          {...register("name", {
            required: "*Campo obligatorio*",
            pattern: {
              value: /^[A-Z][a-z]{0,9}( [A-Z][a-z]{0,9})?$/,
              message: "El campo nombre debe comenzar con mayúscula y debe contener no más de 10 caracteres. Ejemplo: Juan"
            }
          })}
          />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}

        <label htmlFor="surName">Apellido:</label>
        <input
          type="text"
          id="surName"
          name="surName"
          placeholder="Ingrese su apellido..."
          {...register("surName", {
            required: "*Campo obligatorio*",
            pattern: {
              value: /^[A-ZÑñ][a-zñ]{0,9}( [A-ZÑñ][a-zñ]{0,9})?$/,
              message: "El campo apellido debe comenzar con mayúscula y debe contener no más de 10 caracteres. Ejemplo: Pérez"
            }
          })}
        />
        {errors.surName && <span className={styles.error}>{errors.surName.message}</span>}

        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Ingrese su dirección de e-mail..."
          {...register("email", {
            required: "*Campo obligatorio*",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Ingrese una dirección de e-mail válida. Ejemplo: user@example.com"
            }
          })}
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}

        <label htmlFor="password">Contraseña:</label>
        <div className={styles.passwordInputContainer}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Ingrese su contraseña..."
            {...register("password", {
              required: true,
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[@.])[a-zA-Z0-9@.]{6,12}$/,
                message: "La contraseña debe contener de 6 a 12 caracteres e incluir: una mayúscula como primer caracter, una minúscula y un caracter especial: Password@"
              }
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.showHideButton}
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>
        {errors?.password?.type === "required" && <span className={styles.error}>{errors.password.message}</span>}

        <button
          type="submit"
          className={`${styles.button}`}
          disabled={isFormValid} 
          >
          -- Registrarse --
        </button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
              ></IconButton>
          </React.Fragment>
        }
        />
        
<p className="text-center mt-3" style={{color: 'black'}} >¿Ya estas registrado? <Link to="/login">Logueate aquí</Link></p>
        </div>
    </div>
  );
};

export default Register; */


import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { registerUser } from '../../redux/Actions/actions';
import styles from './register.module.css';
import { useState } from 'react';
import { useEffect } from 'react';



const defaultTheme = createTheme();

const images = [
 
  'https://source.unsplash.com/random?wallpapers',
  // Agrega más URLs de imágenes aquí si es necesario
];

export default function Register() {
  const dispatch = useDispatch();
  const errorServer = useSelector(state => state.stateA.error);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onChange' }); 
  const [showPassword, setShowPassword] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);

  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 

    return () => clearInterval(intervalId); 
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const onSubmit = async (data) => {
    console.log('Datos enviados al backend:', data);
    try {
      await dispatch(registerUser(data));
      if (errorServer) {
        setMessage(errorServer);
        setSnackbarOpen(true);
      } else {
        setMessage('¡Te has registrado correctamente! Verifica tu casilla de correo');
        setSnackbarOpen(true);
        reset();
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      setMessage('Error al registrar usuario: ' + error.message);
      setSnackbarOpen(true);
    }
  };



  return (
    <div style={{
      backgroundImage: `url("${images[backgroundImageIndex]}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '126vh',
      marginTop: "-50px",
    }}>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xd" style={{backgroundColor: "white", 
      position: "absolute",
       marginLeft: "1090px",
        marginTop: "0px",
        width: "800px",
        height:"1107px"
        }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
       
            <LockOutlinedIcon  style={{ marginLeft: "0px", marginTop: "10px"}}/>
        
          <Typography component="h1" variant="h5" marginLeft="0px" color="black" marginTop="10px">
            Registrate
          </Typography>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              autoComplete="given-name"
              name="name"
              required
              fullWidth
              id="name"
              label="First Name"
              autoFocus
              style={{marginTop: "10px", marginBottom: "20px", marginLeft: "-100px",}}
              {...register('name', {
                required: '*Campo obligatorio*',
                pattern: {
                  value: /^[A-Z][a-z]{0,9}( [A-Z][a-z]{0,9})?$/,
                  message: 'El campo nombre debe comenzar con mayúscula y debe contener no más de 10 caracteres. Ejemplo: Juan'
                }
              })}
            />
            {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            <TextField
              required
              fullWidth
              style={{marginTop: "10px", marginBottom: "20px", marginLeft: "-100px",}}
              id="surName"
              label="Surname"
              name="surName"
              autoComplete="family-name"
              {...register('surName', {
                required: '*Campo obligatorio*',
                pattern: {
                  value: /^[A-ZÑñ][a-zñ]{0,9}( [A-ZÑñ][a-zñ]{0,9})?$/,
                  message: 'El campo apellido debe comenzar con mayúscula y debe contener no más de 10 caracteres. Ejemplo: Pérez'
                }
              })}
            />
            {errors.surName && <span className={styles.error}>{errors.surName.message}</span>}
            <TextField
              required
              fullWidth
              style={{marginTop: "10px", marginBottom: "20px", marginLeft: "-100px",}}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              {...register('email', {
                required: '*Campo obligatorio*',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Ingrese una dirección de e-mail válida. Ejemplo: user@example.com'
                }
              })}
            />
            {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            <div className={styles.passwordInputContainer}>
              <TextField
                required
                fullWidth
                style={{marginTop: "10px", marginBottom: "20px", marginLeft: "-50px",}}
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                {...register('password', {
                  required: true,
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[@.])[a-zA-Z0-9@.]{6,12}$/,
                    message: 'La contraseña debe contener de 6 a 12 caracteres e incluir: una mayúscula como primer caracter, una minúscula y un caracter especial: Password@'
                  }
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.showHideButton}
              
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            {errors.password && <span className={styles.error}>{errors.password.message}</span>}
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
            <Grid container justifyContent="flex-end" style={{marginLeft: "-180px"}}>
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Button
            style={{marginLeft: "-100px"}}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              Sign Up
            </Button>
          </form>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            message={message}
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleSnackbarClose}
                ></IconButton>
              </React.Fragment>
            }
          />
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}