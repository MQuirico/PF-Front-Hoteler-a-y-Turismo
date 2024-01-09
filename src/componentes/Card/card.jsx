import React from "react";

const Card = ({ id, model, size, image, color, brand, gender, price }) => {
  return (
    <div className="card border text-center">
      <img src={image} alt="Zapatilla" />
      <div className="card-body">
        <h2 className="card-title">
          {brand} {color}
        </h2>
        <h3 className="card-text">Talla: {size}</h3>
        <h3>{gender}</h3>
        <h3>{price}$</h3>
      </div>
    </div>
  );
};

export default Card;
