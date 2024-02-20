import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/authProvider";
import { FaLock, FaEnvelope, FaUser, FaMapMarkerAlt, FaPhone, FaImage } from "react-icons/fa";
import ChangePasswordForm from '../prefilDeUsuario/changePassw'; 
import UserMail from '../prefilDeUsuario/changeMail';
import { updateUserProfileData } from '../../redux/Actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styles from './perfilDeUsuario.module.css';
import { TextField, Button, Typography, Box, Alert } from "@mui/material";


const UserProfileForm = ({ updateUserData }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    address: '',
    country: '',
    profilePicture: null,
    paymentMethods:"",
  });

  const [editMode, setEditMode] = useState({
    name: false,
    phone: false,
    address: false,
    country: false,
  });

  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    profilePicture: '',
    phone: '',
    address: '',
    country: '',
    email: '',
    paymentMethods:"",
  });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (auth && auth.token) {
      const { id, name, phone, address, country, email,paymentMethods } = auth.token;
      setFormData({
        id: id || '',
        name: name || '',
        phone: phone || '',
        address: address || '',
        country: country || '',
        paymentMethods: paymentMethods || "",
      });
      setUserData({
        name: name || '',
        phone: phone || '',
        address: address || '',
        country: country || '',
        email: email || '',
        paymentMethods: paymentMethods || "",
      });
    }
  }, [auth]);

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.stateA.auth);
  const loading = authState ? authState.loading : undefined;
  const error = authState ? authState.error : undefined;

  useEffect(() => {
    if (auth && auth.token) {
      const { id, name, phone, address, country, paymentMethods } = auth.token;
      setFormData({
        id: id || '',
        name: name || '',
        phone: phone || '',
        address: address || '',
        country: country || '',
        paymentMethods: paymentMethods || null,
      });
    }
  }, [auth]);

  const handleEditClick = (field) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [field]: true,
    }));
  };

  const history = useHistory();

  const logOut = () => {
    if (window.gapi && window.gapi.auth2) {
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.disconnect().then(function () {
        console.log('User disconnected.');
      });
    }

    setAuth(null);
    localStorage.removeItem('auth');
    history.push('/home');
  };

  const handleSaveClick = () => {
    const userId = formData.id;
    dispatch(updateUserProfileData(userId, formData));

    const confirmationMessage = "Cambios realizados con éxito. ¿Deseas salir de tu sesión?";
    const shouldLogOut = window.confirm(confirmationMessage);

    if (shouldLogOut) {
      logOut();
    }

    setEditMode({
      name: false,
      phone: false,
      address: false,
      country: false,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Validación p/ nombre
    if (e.target.name === 'name') {
      if (e.target.value.length < 4 || !/^[A-Z]/.test(e.target.value)) {
        setNameError('El nombre debe tener al menos 4 caracteres y empezar con mayúscula.');
      } else {
        setNameError('');
      }
    }

    // Validación p/ fono
    if (e.target.name === 'phone') {
      if (!/^\d+$/.test(e.target.value)) {
        setPhoneError('Ingrese solo números para el teléfono.');
      } else {
        setPhoneError('');
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });

    // Llama a la función de actualización del componente principal
    updateUserData({ profilePicture: file });
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
<div>
      <form className={styles.form} onSubmit={handleSaveClick}>
        <div className={styles.title}>
          <h4>Modifica tus datos</h4>
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="name">
            Nombre:
          </label>
          <input
            className={styles.input}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editMode.name}
            variant="outlined"
            size="small"
          />
          {nameError && <Typography className={styles.error}>{nameError}</Typography>}
          <Button type="button" onClick={() => handleEditClick('name')} className={styles.editButton}>
            Editar
          </Button>
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="phone">
            Teléfono:
          </label>
          <input
            className={styles.input}
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!editMode.phone}
            variant="outlined"
            size="small"
            />
          {phoneError && <Typography className={styles.error}>{phoneError}</Typography>}
          <Button type="button" onClick={() => handleEditClick('phone')} className={styles.editButton}>
            Editar
          </Button>
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="address">
            Dirección:
          </label>
          <input
            className={styles.input}
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!editMode.address}
            variant="outlined"
            size="small"
          />
          <Button type="button" onClick={() => handleEditClick('address')} className={styles.editButton}>
            Editar
          </Button>
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="country">
            Ciudad:
          </label>
          <input
            className={styles.input}
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            disabled={!editMode.country}
            variant="outlined"
            size="small"
          />
          <Button type="button" onClick={() => handleEditClick('country')} className={styles.editButton}>
            Editar
          </Button>
        </div>

        <Button type="submit" className={styles.saveButton}>
          Guardar Cambios
        </Button>

        {loading !== undefined && loading && <div className={styles.loading}>Loading...</div>}
        {error && <Typography className={styles.error}>Error al actualizar el usuario: {error.toString()}</Typography>}
      </form>

      <div className={styles.profileInfo}>
        <div className={styles.previewContainer}>
          <div className={styles.previewWrapper}>
            <div className={styles.preview}>
            <h4>Tus Datos</h4>
              <div className={styles.textopreview}>
                <div className={styles.textoPrev}>
                  <p className={styles.name}><strong><FaUser /> Nombre: </strong>{userData.name}</p>
                  <p className={styles.name}><strong><FaPhone /> Teléfono: </strong>{userData.phone}</p>
                  <p className={styles.name}><strong><FaMapMarkerAlt /> Dirección: </strong>{userData.address}</p>
                  <p className={styles.name}><strong><FaMapMarkerAlt /> Ciudad: </strong>{userData.country}</p>
                  <p className={styles.name}><strong><FaEnvelope /> Email: </strong>{userData.email}</p>
                  <p className={styles.name}><strong><FaLock /> Contraseña: *********</strong></p>
                  <p className={styles.name}><strong><FaImage /> Métodos de pago:</strong></p>
                  {userData.paymentMethods && userData.paymentMethods.length > 0 && (
                    <div>
                      <p className={styles.name}><strong>Número:</strong> {userData.paymentMethods[0].number ?? 'No disponible'}</p>
                      <p className={styles.name}><strong>Marca:</strong> {userData.paymentMethods[0].brand ?? 'No disponible'}</p>
                      <p className={styles.name}><strong>Fecha de vencimiento:</strong> {userData.paymentMethods[0].expirationDate ?? 'No disponible'}</p>
                      <p className={styles.name}><strong>CVV:</strong> {userData.paymentMethods[0].cvv ?? 'No disponible'}</p>
                    </div>
                  )}
               
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    </div>
           
  );
};

export default UserProfileForm;