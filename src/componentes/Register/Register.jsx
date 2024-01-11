import React, { useState } from "react";

export default function Registro(props) {
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [esVálido, setEsVálido] = useState("");

  const userRegex = "^[^s@]+@[^s@]+.[^s@]+$";
  //formato email

  const passwordRegex =
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$";
  //debe contener al menos una mayúscula, una minúscula, un caracter especial, y un numero

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleSnChange = (e) => {
    setSurName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validarBotonSubmit = () => {
    if (
      userRegex.test(email) &&
      passwordRegex.test(password) &&
      typeof name === "string" &&
      typeof surName === "string"
    ) {
      setEsVálido(true);
    } else {
      setEsVálido(false);
    }
  };

  return (
    <>
      <div>
        <div className="row justify-content-center">
          <div className="col-md-4 ml-5 border mt-5 p-5">
            <h2 className="text-center mb-4">
              Complete los datos solicitados para registrarse:
            </h2>
            <form>
              <div className="mb-3">
                <label className="form-label">Nombre:</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Ingrese aquí su nombre de pila..."
                  style={{ height: "50px" }}
                ></input>
                <label className="form-label">Apellido:</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={surName}
                  onChange={handleSnChange}
                  placeholder="Ingrese aquí su apellido..."
                  style={{ height: "50px" }}
                ></input>
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  value={email}
                  className="form-control form-control-lg"
                  onChange={handleEmailChange}
                  placeholder="Ingrese aquí su email..."
                  style={{ height: "50px" }}
                ></input>
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  value={password}
                  className="form-control form-control-lg"
                  onChange={handlePasswordChange}
                  placeholder="Ingrese aquí su contraseña..."
                  style={{ height: "50px" }}
                ></input>
                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-3"
                  disabled={!esVálido}
                >
                  Registrarme
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

//CAMBIO
