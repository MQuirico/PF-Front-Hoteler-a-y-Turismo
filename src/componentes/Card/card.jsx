import React from "react";

const Card = ({ id, model, size, image, color, brand, gender, price }) => {
  return (
    <div className="card border text-center">
      <img src={image} alt="Zapatilla" />
      <div className="card-body">
        <h2 className="card-title">
          {brand} {color}
        </h2>
        <h5 className="card-text">
          Talla: {size} {gender}
        </h5>
        <h5 className="card-text ">
          {price}${" "}
          <a href="#" className="btn btn-primary">
            + Info
          </a>
        </h5>
      </div>
    </div>
  );
};

export default Card;
