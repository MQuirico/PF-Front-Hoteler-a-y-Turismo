import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import style from './Login.module.css';
import { AuthContext } from '../AuthProvider/authProvider';
import { loginUser } from '../../redux/actions/actions';

const LogIn = (props) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [isValid, setIsValid] = useState(true);
  const { auth, setAuth } = useContext(AuthContext);
  const error = useSelector((state) => state.loginError);
  const userRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%#?&]{8,}$/;

  const dispatch = useDispatch();
  const history = useHistory();

  const validarBotonSubmit = () => {
    setIsValid(!(userRegex.test(userData.email) && passwordRegex.test(userData.password)));
  };

  const clientID = '1066333447186-qce53lrh37h3ki1ih2o5fnjminct9rn3.apps.googleusercontent.com';

  const handChangePass = (e) => {
    setUserData({
      ...userData,
      password: e.target.value,
    });
    validarBotonSubmit();
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      email: e.target.value,
    });
    validarBotonSubmit();
  };

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load('client:auth2', start);
  }, []);

  const onFailure = () => {
    console.log('Algo salió mal');
  };

  const onSuccess = async (response) => {
    console.log('Login Success: currentUser:', response);
  
    const { id, name, surName, email } = response;
    const serverResponse = { id, name, surName, email };
  
    localStorage.setItem('token', JSON.stringify(serverResponse));
    
    setAuth({ token: serverResponse });
    
    alert('¡Inicio de sesión exitoso!');
    
    history.push('/home');
  };
  

  console.log('Contenido del localStorage:', localStorage.getItem('token'));

  const storedToken = localStorage.getItem('token');
  console.log('Contenido del localStorage:', storedToken);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await dispatch(loginUser(userData));
      console.log('Respuesta del servidor en el cliente:', response);
  
      if (response && response.id && response.name && response.surName && response.email) {
        // Almacena la respuesta del servidor en el localStorage
        localStorage.setItem('token', JSON.stringify(response));
  
        // Resto del código para manejar la respuesta
        alert('¡Inicio de sesión exitoso!');
        history.push('/home');
      } else if (response && response.message) {
        // Si la respuesta tiene un mensaje, muestra el mensaje de error
        alert(`Error: ${response.message}`);
      } else {
        console.error('La respuesta del servidor no tiene las propiedades esperadas.', response);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
  };

  return (
    <>
      <div>
        <div className="row justify-content-center">
          <div className="col-md-4 ml-5 border mt-5 p-5">
            <h2 className="text-center mb-4">Inicie sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" style={{ color: 'black' }}>
                  Email:
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Escriba aquí su email"
                  style={{ height: '50px', fontSize: '16px' }}
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ color: 'black' }}>
                  Contraseña:
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  value={userData.password}
                  onChange={handChangePass}
                  placeholder="Y aquí su contraseña..."
                  style={{ height: '50px', fontSize: '16px' }}
                ></input>
                {isValid ? (
                  <p>La contraseña debe tener al menos 1 minúscula, 1 mayúscula, 1 dígito y 8 caracteres de longitud como mínimo</p>
                ) : (
                  <p></p>
                )}
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Log In
              </button>
            </form>
            <div className={style.google} style={{ margin: '20px' }}>
              <GoogleLogin
                clientId={clientID}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_policy'}
                redirectUri={'http://localhost:5173/home'}
              />
            </div>
            <p className="text-center mt-3">¿No estás registrado aún?</p>
            <Link to="/register">
              <p className="text-center">
                <u>Regístrate aquí</u>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;