import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useEffect} from "react";
import GoogleLogin from "react-google-login";
import {gapi} from "gapi-script";
import {useDispatch} from 'react-redux';
import { saveUserDataSession } from "../../redux/actions/actions";
import style from "./Login.module.css"

export default function LogIn(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [esVálido, setEsVálido] = useState("");

  const dispatch = useDispatch()
  
  const clientID = "1066333447186-qce53lrh37h3ki1ih2o5fnjminct9rn3.apps.googleusercontent.com"

  const userRegex = "^[^s@]+@[^s@]+.[^s@]+$";
  const passwordRegex =
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$";

  const handChangePass = (e) => {
    setPassword(e.target.value);
  };
  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const validarBotonSubmit = () => {
    if (userRegex.test(userName) && passwordRegex.test(password)) {
      setEsVálido(true);
    } else {
      setEsVálido(false);
    }
  };

  useEffect(() =>{
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      })
    }
    gapi.load("client:auth2", start)
  }, [])

  const onSuccess = (response) => {
    console.log('Login Success: currentUser:', response.profileObj);
    dispatch(saveUserDataSession(response.profileObj))
  };

  
  const onFailure = () => {
    console.log("Algo salió mal")
  }


  
  return (
    <>
      <div>
        <div className="row justify-content-center">
          <div className="col-md-4 ml-5 border mt-5 p-5">
            <h2 className="text-center mb-4">Inicie sesión</h2>
            <form className="">
              <div className="mb-3">
                <label className="form-label" style={{color:'black'}}>Email:</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={userName}
                  onChange={handleChange}
                  placeholder="Escriba aquí su email"
                  style={{ height: "50px", fontSize:'16px' }}
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label" style={{color:'black'}}>Contraseña:</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={handChangePass}
                  placeholder="Y aquí su contraseña..."
                  style={{ height: "50px",fontSize:'16px' }}
                ></input>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Log In
              </button>
            </form>
          <div className={style.google} style={{"margin": "20px"}}>
          <GoogleLogin 
            clientId={clientID}
            onSuccess={onSuccess}
            onfailure={onFailure}
            cookiePolicy={"single_host_policy"}
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
}

//CAMBIO
