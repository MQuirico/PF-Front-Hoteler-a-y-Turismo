import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/actions/actions';
import { AuthContext } from '../AuthProvider/authProvider';
import styles from './edditProfile.module.css'; // Asegúrate de importar el archivo de estilos

const UserProfileForm = () => {
    const { auth } = useContext(AuthContext);
    const [formData, setFormData] = useState({
      id: '',
      name: '',
      phone: '',
      address: '',
      country: '',
    });
  
    const [editMode, setEditMode] = useState({
      name: false,
      phone: false,
      address: false,
      country: false,
    });
  
    const dispatch = useDispatch();
    const { loading, error: updateUserError } = useSelector((state) => state.auth);
  
    useEffect(() => {
      // Actualizar formData con los datos de autenticación
      if (auth && auth.token) {
        const { id, name, surName, email, phone, address, country } = auth.token;
        setFormData({
          id: id || '',
          name: name || '',
          phone: phone || '',
          address: address || '',
          country: country || '',
        });
      }
    }, [auth]);
  
    const handleEditClick = (field) => {
      setEditMode((prevEditMode) => ({
        ...prevEditMode,
        [field]: true,
      }));
    };
  
    const handleSaveClick = () => {
      // Obtener el id del usuario desde el contexto de autenticación
      const userId = formData.id;
  
      // Enviar la acción para actualizar el usuario
      dispatch(updateUser(userId, formData));
  
      // Desactivar el modo de edición
      setEditMode({
        name: false,
        phone: false,
        address: false,
        country: false,
      });
    };
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    return (
        <form className={styles.form} onSubmit={handleSaveClick}>
          <div className={styles.inputContainer}>
            <label htmlFor="name" className={styles.label1}>
                <p className={styles.descripcion}>
              Nombre:
                </p>
            </label>
            <input
              className={styles.input}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!editMode.name}
            />
            <button type="button" onClick={() => handleEditClick('name')} className={styles.editButton}>
              Editar
            </button>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="phone" className={styles.label2}>
            <p className={styles.descripcion}>
              Teléfono:
              </p>
            </label>
            <input
              className={styles.input}
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!editMode.phone}
            />
            <button type="button" onClick={() => handleEditClick('phone')} className={styles.editButton}>
              Editar
            </button>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="address" className={styles.label3}>
            <p className={styles.descripcion}>
              Dirección:
              </p>
            </label>
            <input
              className={styles.input}
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!editMode.address}
            />
            <button type="button" onClick={() => handleEditClick('address')} className={styles.editButton}>
              Editar
            </button>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="country" className={styles.label4}>
            <p className={styles.descripcion}>
              Ciudad:
              </p>
            </label>
            <input
              className={styles.input}
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              disabled={!editMode.country}
            />
            <button type="button" onClick={() => handleEditClick('country')} className={styles.editButton}>
              Editar
            </button>
          </div>
          <button type="submit" className={styles.saveButton}>
            Guardar Cambios
          </button>
    
          {updateUserError && <p className={styles.error}>Error al actualizar el usuario: {updateUserError}</p>}
        </form>
      );
    };
    
    export default UserProfileForm;