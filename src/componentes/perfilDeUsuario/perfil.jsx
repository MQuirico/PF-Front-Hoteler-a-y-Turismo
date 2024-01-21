import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from './perfil.module.css';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    profilePicture: "",
    phone: "",
    address: "",
    country: "",
    banner: ""
  });

  const [isFormChanged, setIsFormChanged] = useState(false);

  const [isEditing, setIsEditing] = useState({
    profilePicture: false,
    name: false,
    phone: false,
    address: false,
    country: false,
  });

  const handleEditClick = (fieldName) => {
    setIsEditing((prevIsEditing) => ({
      ...prevIsEditing,
      [fieldName]: true,
    }));
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para guardar los cambios si es necesario.
    setIsEditing({
      profilePicture: false,
      name: false,
      phone: false,
      address: false,
      country: false,
    });
    setIsFormChanged(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsFormChanged(true);
  };

  const handlePictureChange = (e) => {
    const pictureUrl = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      profilePicture: pictureUrl,
    }));
  };

  const handleBannerChange = (e) => {
    const bannerUrl = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      banner: bannerUrl,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos actualizados:", userData);
  };

  const areAnyInputsEditing = Object.values(isEditing).some(Boolean);

 return (
  <div className={styles.userProfile}>
     <div className={styles.banner} />
     <div className={styles.profileContainer}>
       <div className={styles.imageContainer}>
       <div className={styles.profilePicture}>
    <img src={userData.profilePicture} alt="carga tu imagen" />
    <p className={styles.altText}></p>
</div>
</div>  
       <div className={styles.profileInfo}>
       </div>
       <div className={styles.formContainer}>
         <div className={styles.previewContainer}>
           <div className={styles.previewWrapper}>
             <div className={styles.preview}>
              <div clasName={styles.textopreview}>

               <h2 className={styles.titulo}>Tus Datos</h2>
               <div className={styles.textoPrev}><br /><br />

               <p>Name: {userData.name}</p> <br /><br />
               <p>Phone: {userData.phone}</p><br /><br />
               <p>Address: {userData.address}</p><br /><br />
               <p>Country: {userData.country}</p><br /><br />
               </div>

              </div>
             </div>
           </div>
           <div className={styles.formWrapper}>
             <Tabs>
               <TabList>
                 <Tab>Perfil</Tab>
               </TabList>
               <TabPanel>
              <form onSubmit={handleSubmit}>
            <label htmlFor="formProfilePicture">Foto de Perfil</label>
            <input
                id="formProfilePicture"
                type="file"
                placeholder="URL de la foto de perfil"
                name="profilePicture"
                value={userData.profilePicture}
                onChange={handlePictureChange}
                className={styles.formInput}
                disabled={!isEditing.profilePicture}
            />
                          <button
                type="button"
                onClick={() => handleEditClick('profilePicture')}
                className={styles.editButton}
              >
                Editar
              </button>

              <label htmlFor="formName">Nombre</label>
              <input
              id="formName"
              type="text"
              placeholder="Nombre"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className={styles.formInput}
              disabled={!isEditing.name}
              />
              <button type="button" onClick={() => handleEditClick('name')} className={styles.editButton}>
                Editar
              </button> 

              <label htmlFor="formName">Telefono</label>
              <input
             id="formPhone"
              type="text"
              placeholder="Teléfono"
             name="phone"
            value={userData.phone}
            onChange={handleChange}
            className={styles.formInput}
            disabled={!isEditing.phone}
            />
            <button type="button" onClick={() => handleEditClick('phone')} className={styles.editButton}>
             Editar
          </button>

            <label htmlFor="formAddress">Dirección</label>
            <input
                id="formAddress"
                type="text"
                placeholder="Dirección"
                name="address"
                value={userData.address}
                onChange={handleChange}
                className={styles.formInput}
                disabled={!isEditing.address}
            />
            <button type="button" onClick={() => handleEditClick('addres')} className={styles.editButton}>
             Editar
          </button>

          <label htmlFor="formAddress">Dirección</label>
            <input
                id="formAddress"
                type="text"
                placeholder="Ciudad"
                name="address"
                value={userData.country}
                onChange={handleChange}
                className={styles.formInput}
                disabled={!isEditing.country}
            />
            <button type="button" onClick={() => handleEditClick('country')} className={styles.editButton}>
             Editar
          </button>
 



          <button
        type="submit"
        className={styles.submitButton}
        disabled={!areAnyInputsEditing}
      >
        Guardar Cambios
      </button>
          </form>
        </TabPanel>
      </Tabs>
    </div>
    </div>
    </div>
    </div>
    </div>
 );
};

export default UserProfile;