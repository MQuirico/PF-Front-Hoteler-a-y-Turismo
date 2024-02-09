import React from "react";
import "./card.css";

const Card = ({ id, name, location, season, pricePerNight, image, highlight }) => {
  const hasValidData = id && name && location && season && pricePerNight && image;

  if (!hasValidData) {
    return null;
  }

  return (
    <div className={`card ${highlight ? "highlight" : ""}`}>
      <div className="left">
        <h5 className="card-title">{name}</h5>
        <img src={image} alt={name} className="card-img-top" />
        <button>Ver detalles</button>
      </div>
      <div className="card-body">
        <p className="card-text">Localidad: {location}</p>
        <p className="card-text">Habitaciones: {season}</p>
        <p className="card-text">Precio: {pricePerNight}</p>
      </div>
    </div>
  );
};

export default Card;