import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import axios from "axios";
import styles from "./loginForm.module.css";
import { AuthContext } from "../AuthProvider/authProvider";

export default function Login() {
  const { register, handleSubmit, formState: { errors }, setError: setFormError, clearErrors } = useForm();
  const [errorState, setErrorState] = useState(null);
  const history = useHistory();
  const { setAuth } = useContext(AuthContext); // Obtener setAuth del contexto de autenticación

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/users/login', data);
      if (response.data) {
        // Ajustar la respuesta del servidor al formato esperado por NavBar
        const authData = {
          token: response.data,
        };
        // Guardar la respuesta del servidor en el contexto de autenticación
        setAuth(authData);
        localStorage.setItem('auth', JSON.stringify(authData)); // Opcional: guardar la información de autenticación en el almacenamiento local
        history.push("/home");
      } else {
        setErrorState('Error: The response is not valid');
      }
    } catch (error) {
      setErrorState('Error al iniciar sesión: ' + error.message);
    }
  };

  const responseGoogle = (response) => {
    console.log(response);
    // se puede agregar la respuesta de Google ;)
  };

  const handleEmailChange = (e) => {
    clearErrors("email");
    const value = e.target.value;
    if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setFormError("email", {
        type: "manual",
        message: "Ingrese un correo electrónico válido",
      });
    }
  };

  const handlePasswordChange = (e) => {
    clearErrors("password");
    const value = e.target.value;
    if (
      !value.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      setFormError("password", {
        type: "manual",
        message:
          "La contraseña debe contener al menos 8 caracteres, incluyendo al menos una mayúscula, una minúscula, un número y un carácter especial",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.borde}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "El correo electrónico es requerido" })}
              onChange={handleEmailChange}
              className={errors.email ? `${styles.input} ${styles.error}` : styles.input}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>
          <div className={styles.passwordInputContainer}>
            <label htmlFor="password">Contraseña:</label>
            <div className={styles.passwordInput}>
              <input
                type="password"
                id="password"
                {...register("password", { required: "La contraseña es requerida" })}
                onChange={handlePasswordChange}
                className={errors.password ? `${styles.input} ${styles.error}` : styles.input}
              />
            </div>
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>
          <button type="submit" className={styles.button}>
            Ingresar
          </button>
        </form>
        <div className={styles.google}>
          <GoogleLogin
            clientId="TU_CLIENT_ID.apps.googleusercontent.com"
            buttonText="Ingresar con Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <p className="text-center mt-3">¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
        {errorState && <p className={styles.error}>{errorState}</p>} {/* Usar la variable de estado renombrada */}
      </div>
    </div>
  );
}