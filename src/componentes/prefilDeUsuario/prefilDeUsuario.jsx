import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfileData } from '../../redux/Actions/actions';
import { AuthContext } from '../AuthProvider/authProvider';
import { TextField, Button, Typography } from '@mui/material';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useForm } from 'react-hook-form';
import styles from './perfilDeUsuario.module.css';
import { style } from '@material-ui/system';

const UserProfileForm = ({ updateUserData }) => {
    const { auth ,setAuth } = useContext(AuthContext);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [editMode, setEditMode] = useState({
        name: false,
        phone: false,
        surName:false,
        address: false,
        country: false,
    });
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        surName: "",
        phone: '',
        address: '',
        country: '',
        profilePicture: null,
    });
    const [originalFormData, setOriginalFormData] = useState({});

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        if (auth && auth.token) {
            const { id, name, phone, address, country, profilePicture,surName } = auth.token;
            setFormData({
                id: id || '',
                name: name || '',
                surName:surName || "",
                phone: phone || '',
                address: address || '',
                country: country || '',
                profilePicture: profilePicture || "",
            });
            setOriginalFormData({
                id: id || '',
                name: name || '',
                phone: phone || '',
                address: address || '',
                country: country || '',
                profilePicture: profilePicture || "",
            });
        }
    }, [auth]);

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

    const onSubmit = async (data) => {
        const userId = auth.token.id;
        try {
            await dispatch(updateUserProfileData(userId, data));
            const confirmationMessage = "Cambios realizados con éxito. ¿Deseas salir de tu sesión?";
            const shouldLogOut = window.confirm(confirmationMessage);
            if (shouldLogOut) {
                logOut();
            }
        } catch (error) {
            setUpdateUserError(error.message);
        }
    };

    const handleEditClick = (field) => {
        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [field]: true,
        }));
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
        <div className={styles.detailContainers}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className={styles.titles}>
                <h4>Modifica tus datos</h4>
              </div>
      
              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="name">
                  Nombre:
                </label>
                <TextField
                  className={styles.input}
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!editMode.name}
                  variant="outlined"
                  size="small"
                />
                {!editMode.name && (
                  <Button type="button" onClick={() => handleEditClick('name')} className={styles.editButton}>
                    Editar
                  </Button>
                )}
                {editMode.name && (
                  <React.Fragment>
                    <Button type="button" onClick={() => handleCancelClick('name')} className={styles.cancelButton}>
                      Cancelar
                    </Button>
                  </React.Fragment>
                )}
              </div>
      
              {/* Repetir para los otros campos del formulario */}
      
              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="phone">
                  Teléfono:
                </label>
                <TextField
                  className={styles.input}
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!editMode.phone}
                  variant="outlined"
                  size="small"
                />
                {!editMode.phone && (
                  <Button type="button" onClick={() => handleEditClick('phone')} className={styles.editButton}>
                    Editar
                  </Button>
                )}
                {editMode.phone && (
                  <React.Fragment>
                    <Button type="button" onClick={() => handleCancelClick('phone')} className={styles.cancelButton}>
                      Cancelar
                    </Button>
                  </React.Fragment>
                )}
              </div>
      
              {/* Repetir para los otros campos del formulario */}
      
              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="address">
                  Dirección:
                </label>
                <TextField
                  className={styles.input}
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!editMode.address}
                  variant="outlined"
                  size="small"
                />
                {!editMode.address && (
                  <Button type="button" onClick={() => handleEditClick('address')} className={styles.editButton}>
                    Editar
                  </Button>
                )}
                {editMode.address && (
                  <React.Fragment>
                    <Button type="button" onClick={() => handleCancelClick('address')} className={styles.cancelButton}>
                      Cancelar
                    </Button>
                  </React.Fragment>
                )}
              </div>
      
              {/* Repetir para los otros campos del formulario */}
      
              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="country">
                  Ciudad:
                </label>
                <TextField
                  className={styles.input}
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  disabled={!editMode.country}
                  variant="outlined"
                  size="small"
                />
                {!editMode.country && (
                  <Button type="button" onClick={() => handleEditClick('country')} className={styles.editButton}>
                    Editar
                  </Button>
                )}
                {editMode.country && (
                  <React.Fragment>
                    <Button type="button" onClick={() => handleCancelClick('country')} className={styles.cancelButton}>
                      Cancelar
                    </Button>
                  </React.Fragment>
                )}
              </div>
      
              <Button type="submit" className={styles.saveButton}>
                Guardar
              </Button>
              {updateUserError && <Typography className={styles.error}>Error al actualizar el usuario: {updateUserError.toString()}</Typography>}
              <div clasname={style.chabgepass}></div>
            </div>
          </form>
        </div>
      );
};

export default UserProfileForm;