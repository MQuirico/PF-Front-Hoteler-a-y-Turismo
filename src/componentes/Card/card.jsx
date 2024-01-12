import React from "react";
import BasicRating from "../Reviews/Hacer_Review"

const Card = ({ id, model, size, image, color, brand, price }) => {
  return (
    
    <div className="card border text-center ">
      <img
        src={image}
        alt="Zapatilla"
        className="card-img-top img-fluid"
        style={{ height: "300px", width: "300px" }}
      />
      <div className="card-body">
        <h3 className="card-title">{brand}</h3>
        <div className="d-flex justify-content-evenly m-2">
          <h5 className="card-text">Talla: {size}</h5>
          <h5 className="card-text text-body-primary">
            Precio: <span className="text-body-primary">{price}</span> $
          </h5>
        </div>
        
        <button type="button" className="btn btn-primary col-12">
          + Info
        </button>
      </div>
    </div>
  );
};

export default Card;