import React from "react";
import { Link } from "react-router-dom"; 
import "./card.css";

const Card = ({ id, name, location, season, pricePerNight, image, highlight }) => {
  const hasValidData = id && name && location && season && pricePerNight && image;

  if (!hasValidData) {
    return null;
  }

  return (
    <div className="fondo">


    <Link to={`/detail/${id}`} className={`card ${highlight ? "highlight" : ""}`}>
      <div className="left">
        <h5 className="card-title">{name}</h5>
        
<div className="card-img-top">

        <img src={image} alt={name}  />

</div>
        
      </div>
      <div className="card-body">
        <p className="card-text"> <br/> {location}</p>
        <p className="card-text">Temporada: <br/> {season} </p>
        <p className="card-text">Precio por noche: {pricePerNight}</p>
      </div>
    </Link>
    </div>
    
  );
};

export default Card;