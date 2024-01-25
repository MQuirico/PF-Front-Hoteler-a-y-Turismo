import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/authProvider";
import styles from './perfil.module.css';

const UserProfile = () => {
  const { auth } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    name: '',
    profilePicture: '',
    phone: '',
    address: '',
    country: '',
  });

  useEffect(() => {
    // Actualizar userData con los datos de autenticación
    if (auth && auth.token) {
      const { name, surName, email, phone, address, country } = auth.token;
      setUserData({
        name: name || '',
        profilePicture: '', // Puedes agregar la lógica para obtener la imagen de perfil si es necesario
        phone: phone || '',
        address: address || '',
        country: country || '',
      });
    }
  }, [auth]);


  return (
    <div className={styles.userProfile}>
      <div className={styles.banner} />
      <div className={styles.profileContainer}>
        <div className={styles.imageContainer}>
          <div className={styles.profilePicture}>
            {userData.profilePicture ? (
              <img src={userData.profilePicture} alt="Perfil" />
            ) : (
              <p className={styles.altText}>Carga tu imagen</p>
            )}
          </div>
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.previewContainer}>
            <div className={styles.previewWrapper}>
              <div className={styles.preview}>
                <div className={styles.textopreview}>
                  <h2 className={styles.titulo}>Tus Datos</h2>
                  {console.log('Datos de usuario para renderizar:', userData)}
                  <div className={styles.textoPrev}>
                    <p>Name: {userData.name}</p>
                    <p>Phone: {userData.phone}</p>
                    <p>Address: {userData.address}</p>
                    <p>Country: {userData.country}</p>
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

export default UserProfile;