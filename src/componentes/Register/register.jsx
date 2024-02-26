import React, { useState, useEffect } from "react";
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
      // Despacha la acción y espera a que se complete
      await dispatch(registerUser(data));
      // Verifica si hay un error en el estado de Redux
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
      // Manejar el error aquí, por ejemplo, puedes mostrar un mensaje de error al usuario
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
          disabled={isFormValid} // Deshabilitar el botón de registro si el formulario no es válido
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

export default Register;