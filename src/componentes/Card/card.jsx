import React from "react";
import BasicRating from "../Reviews/Hacer_Review";
import style from "../Card/Card.module.css"; // Asegúrate de tener un archivo Card.css en tu proyecto

const Card = ({ id, model, size, image, color, brand, price }) => {
  return (
    <div className={style.container}>
      <div className={style.cardContent}>
        <img
          src={image}
          alt="Zapatilla"
        />
        <div className={style.brand}>
        <h3>{model}</h3>
        
        <div className={style.details}>
          <h4>
            ${price} USD
        </h4>
        <button type="button">
          <h5>
          BUY
          </h5>
        </button>
      </div>
      </div>
    </div>
  </div>
  );
};

export default Card;