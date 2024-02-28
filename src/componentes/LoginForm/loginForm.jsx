import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleLogin } from 'react-google-login';
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./loginForm.module.css";
import { AuthContext } from "../AuthProvider/authProvider";
import * as ReactRedux from 'react-redux';
import { checkGoogleId, registerUser } from "../../redux/Actions/actions"; // Importa ambas acciones desde el mismo archivo
import { useForm } from "react-hook-form";
import { style } from '@mui/system';

const defaultTheme = createTheme();

export default function Login() {
  const history = useHistory();
  const { setAuth } = React.useContext(AuthContext); 
  const dispatch = ReactRedux.useDispatch();
  const googlecheck = ReactRedux.useSelector(state => state.stateA.checkGoogle);
  const clientID = '1066333447186-evqflps97jn0k7585c92i4ve45g64hoj.apps.googleusercontent.com';

  // Estado para los mensajes de error
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await axios.post('http://localhost:3002/users/login', {
        email: data.get('email'),
        password: data.get('password')
      });
      if (response.data) {
        const authData = {
          token: response.data,
        };
        setAuth(authData);
        localStorage.setItem('auth', JSON.stringify(authData)); 
        history.push("/home");
      } else {
        console.error('Error: The response is not valid');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
  };

  useEffect(() => {
    const start = () => {
      auth2.init({
        clientId: clientID,
      });
    };
    ("client:auth2", start);
  }, []);

  const handleGoogleSuccess = async (response) => {
    try {
      await dispatch(checkGoogleId(response.profileObj.googleId));
      if (googlecheck.data) {
        const toLogIn = {
          email: googlecheck.data.email,
          password: googlecheck.data.password
        };
        handleSubmit(toLogIn);
        console.log("GoogleUser ya registrado", googlecheck.data);
        history.push("/home");
      } else {
        const toSend = {
          name: response.profileObj.givenName,
          surName: response.profileObj.familyName,
          email: response.profileObj.email,
          password: "Google10.",
          googleId: response.profileObj.googleId
        };
        dispatch(registerUser(toSend));
        const LogIn = {
          email: response.profileObj.email,
          password: "Google10."
        };
        handleSubmit(LogIn);
        console.log("Es tu primera vez con logIn de Google, te hemos registrado");        
      }
    } catch (error) {
      console.error('Error en checkGoogleId:', error);
    }
    history.push("/home");
  };

  const handleGoogleFailure = () => {
    console.error("Algo salió mal");
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setFormErrors(prevErrors => ({ ...prevErrors, email: 'Ingrese un correo electrónico válido' }));
    } else {
      setFormErrors(prevErrors => ({ ...prevErrors, email: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      setFormErrors(prevErrors => ({ ...prevErrors, password: 'La contraseña debe contener al menos 8 caracteres, incluyendo al menos una mayúscula, una minúscula, un número y un carácter especial' }));
    } else {
      setFormErrors(prevErrors => ({ ...prevErrors, password: '' }));
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Typography component="h1" variant="h5" marginTop="50px" color="black" borderBottom="2px solid red" padding="10px">
              Sign in
            </Typography>
            <form onSubmit={handleSubmit} className={styles.form}>
              <TextField
              style={{width: "500px"}}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleEmailChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
              <TextField
              style={{width: "500px"}}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePasswordChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </form>
            <div className={styles.google}>

              <GoogleLogin
              
              clientId={clientID}
              buttonText="Sign in with Google"
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              cookiePolicy={"single_host_origin"}
              redirectUri='http://localhost:5173/home'
              />
              </div>
            <Grid container>
              <Grid item xs>

              </Grid>
              <Grid item>
                <Link style={{marginTop: "30px", position: "absolute", marginLeft: "-430px"}} href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}