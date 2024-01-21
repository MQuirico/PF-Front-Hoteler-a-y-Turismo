import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from './perfil.module.css';

const UserProfile = () => {
 const [userData, setUserData] = useState({
    name: "",
    profilePicture: "https://via.placeholder.com/150",
    phone: "",
    address: "",
    country: "",
    banner: ""
 });

 const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

 return (
  <div className={styles.userProfile}>
     <img src={userData.banner} alt="carga tu banner" className={styles.banner} />
     <div className={styles.profileContainer}>
       <img src={userData.profilePicture} alt="Profile" className={styles.profilePicture} />
       <div className={styles.profileInfo}>
         <h2>{userData.name}</h2>
         <p>{userData.phone}</p>
         <p>{userData.address}</p>
         <p>{userData.country}</p>
       </div>
       <div className={styles.formContainer}>
         <div className={styles.previewContainer}>
           <div className={styles.previewWrapper}>
             <div className={styles.preview}>
               <h2>Tus Datos</h2>
               <p>Name: {userData.name}</p>
               <p>Phone: {userData.phone}</p>
               <p>Address: {userData.address}</p>
               <p>Country: {userData.country}</p>
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
                type="text"
                placeholder="URL de la foto de perfil"
                name="profilePicture"
                value={userData.profilePicture}
                onChange={handlePictureChange}
                className={styles.formInput}
            />

            <label htmlFor="formName">Nombre</label>
            <input
                id="formName"
                type="text"
                placeholder="Nombre"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className={styles.formInput}
            />

            <label htmlFor="formPhone">Teléfono</label>
            <input
                id="formPhone"
                type="text"
                placeholder="Teléfono"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className={styles.formInput}
            />

            <label htmlFor="formAddress">Dirección</label>
            <input
                id="formAddress"
                type="text"
                placeholder="Dirección"
                name="address"
                value={userData.address}
                onChange={handleChange}
                className={styles.formInput}
            />

            <label htmlFor="formCountry">País</label>
            <input
                id="formCountry"
                type="text"
                placeholder="País"
                name="country"
                value={userData.country}
                onChange={handleChange}
                className={styles.formInput}
            />

            <label htmlFor="formBanner">Banner</label>
            <input
                id="formBanner"
                type="text"
                placeholder="URL del banner"
                name="banner"
                value={userData.banner}
                onChange={handleBannerChange}
                className={styles.formInput}
            />

            <button type="submit" className={styles.submitButton}>
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