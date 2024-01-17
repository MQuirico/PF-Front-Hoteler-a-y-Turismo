import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../../redux/actions/actions";
import { clearProductDetail } from "../../redux/actions/actions";
import style from "./Detail.module.css"


const Detail = ( brand ) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const zapatilla = useSelector((state) => state?.product?.detail);
  const selectedColors = zapatilla && zapatilla.colors ? zapatilla.colors : [];

  useEffect(() => {
   if (zapatilla && zapatilla.colors) {
    
      setSelectedColors(zapatilla.colors);
     
   }
  }, [zapatilla && zapatilla.colors]);
   
  let logoUrl;
  switch (brand) {
    case "NIKE":
      logoUrl = "https://d3sxshmncs10te.cloudfront.net/icon/free/svg/761696.svg?token=eyJhbGciOiJoczI1NiIsImtpZCI6ImRlZmF1bHQifQ__.eyJpc3MiOiJkM3N4c2htbmNzMTB0ZS5jbG91ZGZyb250Lm5ldCIsImV4cCI6MTcwNTcyNTA3OSwicSI6bnVsbCwiaWF0IjoxNzA1NDY1ODc5fQ__.08bf3f226aa8bf7c7b8e2048315c96f30e1f6b565f88fe4b7f3af9cf32bb12c5";
      break;
    case "ADIDAS":
      logoUrl = "https://d3sxshmncs10te.cloudfront.net/icon/free/svg/7581614.svg?token=eyJhbGciOiJoczI1NiIsImtpZCI6ImRlZmF1bHQifQ__.eyJpc3MiOiJkM3N4c2htbmNzMTB0ZS5jbG91ZGZyb250Lm5ldCIsImV4cCI6MTcwNTcyNTc2NiwicSI6bnVsbCwiaWF0IjoxNzA1NDY2NTY2fQ__.d77a53351cd89f5328123bec559ccfd67b3c778629d10bf40891b514f166c3d7";
      break;
    case "NEW BALANCE":
      logoUrl = "https://logos-world.net/wp-content/uploads/2020/09/New-Balance-Emblem.png";
      break;
    default:
      logoUrl = null;
  }

  //para limpiar el estado
  useEffect(() => {
    return () => {
      dispatch(clearProductDetail());
    };
   }, [dispatch]);
 
  

  useEffect(() => {
    // Cargar los detalles del producto al montar el componente
    if (!zapatilla) {
      dispatch(fetchProductDetail(id));
    }
  }, [dispatch, id, zapatilla]);

  if (!zapatilla) {
    return <div>Loading...</div>;
  }

  if (!zapatilla.name) {
    return <div>Datos no disponibles</div>;
  }

  // Verifica el tipo de id
  const isHexadecimalId = /^[0-9a-fA-F]{24}$/.test(id);

  const colorStyles = {
    Negro: { backgroundColor: "black", color: "white" },
    Blanco: { backgroundColor: "white", color: "black" },
    Azul: { backgroundColor: "blue", color: "white" },
    Verde: { backgroundColor: "green", color: "white" },
    Gris: { backgroundColor: "grey", color: "white" },
    Rojo: { backgroundColor: "red", color: "white" },
    Naranja: { backgroundColor: "orange", color: "white" },
  };

  return (
    <div className={style.container}>
        <div className={style.detailContainer}>
        <div className={style.imagePreview}>
        <img src={zapatilla && zapatilla.image[0]} alt={zapatilla.name} />
        </div>
        <div className={style.detailContent}>
          <br />
            <h2>
        {zapatilla && zapatilla.brand}
        </h2>
       <h4>{zapatilla && zapatilla.name}</h4>
       <div className={style.logoContainer}>
        {logoUrl && <img src={logoUrl} alt={`${brand} Logo`} />}
        </div>
        <br />
        <div className={style.price}>
        <h4>${zapatilla.price} USD</h4>
          </div>
          <br/>
        <h4>Gender:</h4>
        <div>
            <h4>
        {zapatilla && zapatilla.gender}
        </h4>
        </div>
        <br />
        <h4>Colors:</h4>
        <div className={style.containerColors}>
    {selectedColors.map((selectedColor, index) => {
      const colorKey = selectedColor.toLowerCase(); 
      console.log(`Color: ${selectedColor}, Key: ${colorKey}`);
      console.log(`Styles: `, colorStyles[colorKey]);
      
      return (
        <span
        key={index}
        >
          {selectedColor}
          {index < selectedColors.length - 1 && (
            <span></span>
            )}
        </span>

      );
    })}
    </div>
        <h4>Sizes:</h4>
        <div className={style.sizesContainer}>
            <span>
        {zapatilla && zapatilla.size.join(", ")}
        </span>
        </div>
        <br />
      <div>
      </div>
        </div>
    </div>
    </div>
  );
};

export default Detail;