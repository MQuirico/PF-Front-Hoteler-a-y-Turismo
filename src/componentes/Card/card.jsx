import React from "react";
import { Link } from "react-router-dom"; 
import "./card.css";

const Card = ({ id, name, location, season, pricePerNight, image, highlight }) => {
  const hasValidData = id && name && location && season && pricePerNight && image;

  if (!hasValidData) {
    return null;
  }

  const seasonLabel = season ? JSON.parse(season).label : ""; // Parsea el objeto season y obtiene el valor de label

  return (
    <div className="fondo">
      <Link to={`/detail/${id}`} className={`card ${highlight ? "highlight" : ""}`}>
        <div className="left">
          <h5 className="card-title">{name}</h5>
          <div className="card-img-top">
            <img src={image} alt={name} style={{ maxWidth: "200px", height: "200px", marginLeft: "-5px", position:"absolute", marginTop: "-100px" }} />
          </div>
        </div>
        <div className="card-body">
          <p className="card-text"> <br/> {location}</p>
          <p className="card-text">Temporada: <br/> {seasonLabel} <br/><br/></p>
          <p className="card-text">Precio por noche: {pricePerNight}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;