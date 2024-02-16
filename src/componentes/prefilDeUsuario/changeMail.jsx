import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
 import { updateUser } from "../../redux/Actions/actions";
import { AuthContext } from "../AuthProvider/authProvider";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import styles from "./changeMail.module.css";
import ChangePasswordForm from "./changePassw";

const UserMail = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    id: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [editMode, setEditMode] = useState({
    email: false,
    password: false,
  });

  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();
  const { loading = false, error: updateUserError = null } = useSelector(
    (state) => state.userDataSession || {}
  );

  useEffect(() => {
    if (auth && auth.token) {
      const { id, email } = auth.token;
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: id || "",
        email: email || "",
      }));
    }
  }, [auth]);

  const handleEditClick = (field) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [field]: true,
    }));
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
    history.push("/home");
  };

  const handleSaveClick = async () => {
    if (
      editMode.password &&
      formData.password !== formData.passwordConfirmation
    ) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (editMode.email && emailError) {
      setError("Por favor, ingresa un correo electrónico válido");
      return;
    }

    setError(null);

    const userId = formData.id;
    const currentPassword = formData.password;

    dispatch(updateUser(userId, { newEmail: formData.email, currentPassword }))
      .then(() => {
        const confirmationMessage =
          "Se cambió correctamente su correo. Por favor, vuelve a loguearte!";

        if (window.confirm(confirmationMessage)) {
          logOut();
        }
      })
      .catch((error) => {
        console.error("Error al cambiar el correo:", error);
      });

    setEditMode({
      email: false,
      password: false,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      validateEmail(value);
    }

    setFormData({ ...formData, [name]: value });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateEmail = (email) => {
    if (!isValidEmail(email)) {
      setEmailError("Por favor, ingresa un correo electrónico válido");
    } else {
      setEmailError("");
    }
  };

  const handleCancelClick = (field) => {
    setEditMode((prevEditMode) => ({
        ...prevEditMode,
        [field]: false,
    }));
    setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: originalFormData[field],
    }));
};

  return (
    <div style={{
      border: "1px solid black",
      marginTop: "100px",
      height: "720px",
      width: "850px",
      marginLeft: "300px",
      borderRadius: "10px",
      backgroundColor: "#ffffff4f", 
      boxShadow: "0 0 9px rgba(0, 0, 0, 0.7)", 
      marginBottom: "50px"
    }}>
    <div className={styles.detailContainers1}>
    <form className={styles.form1} onSubmit={handleSaveClick}>
      <div className={styles.title1}>
        <h4>Modifica tu Email</h4>
      </div>
      <div className={styles.inputContainer1}>
        <label className={styles.label1} htmlFor="email">
          Nuevo Email:
        </label>
        <input
          className={styles.input1}
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => validateEmail(formData.email)}
          disabled={!editMode.email}
          variant="outlined"
          size="small"
        />
        {editMode.email && emailError && (
          <Alert severity="error">{emailError}</Alert>
        )}
        <Button
          type="button"
          onClick={() => handleEditClick("email")}
          className={styles.editButton1}
        >
          Editar
        </Button>
      </div>

      <div className={styles.inputContainer1}>
        <label className={styles.label1} htmlFor="password">
          Contraseña:
        </label>
        <input
          className={styles.input1}
          id="password"
          name="password"
          type="password" // ahora se ve como "password"
          value={formData.password}
          onChange={handleChange}
          disabled={!editMode.password}
          variant="outlined"
          size="small"
        />
        <Button
          type="button"
          onClick={() => handleEditClick("password")}
          className={styles.editButton1}
        >
          Editar
        </Button>
      </div>

      {editMode.password && (
        <div className={styles.inputContainer1}>
          <label className={styles.labe1} htmlFor="passwordConfirmation">
            Confirmar Contraseña:
          </label>
          <input
            className={styles.input1}
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </div>
      )}

      <Button
        type="button"
        onClick={handleSaveClick}
        className={styles.saveButton1}
      >
        Guardar Cambios
      </Button>

      {error && <Alert severity="error">{error}</Alert>}
      {updateUserError && (
        <Typography className={styles.error1}>
          Error al actualizar el usuario: {updateUserError}
        </Typography>
      )}
    </form>
    <ChangePasswordForm/>
    </div>
    </div>
  );
};

export default UserMail;