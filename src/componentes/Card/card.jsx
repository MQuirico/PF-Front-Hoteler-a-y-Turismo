import React from "react";
import "./card.css";

const Card = ({ cabaña }) => {
  const {
    nombre,
    localidad,
    temporada,
    estadia,
    habitaciones,
    pileta,
    dias,
    noches,
    precio,
    imagen,
  } = cabaña;

  return (
    <div className="card">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMid meet"
        version={1.0}
        viewBox="-0.9 -0.7 54.0 45.2"
        zoomAndPan="magnify"
        original_string_length={848}
      >
        <g data-name="Layer 2">
          <g data-name="Layer 1" id="__id111_sifzo4c68n">
            <path
              d="M26.1,44.53l-1.17-.86A153.87,153.87,0,0,1,3.49,24,13.09,13.09,0,0,1,.73,10.74,15.94,15.94,0,0,1,12.6.25c4.81-.92,9.54.68,13.5,4.52C30.05.93,34.78-.67,39.59.25A15.94,15.94,0,0,1,51.46,10.74,13.06,13.06,0,0,1,48.7,24a154.13,154.13,0,0,1-21.43,19.7ZM15.25,4a10.22,10.22,0,0,0-1.9.18A12,12,0,0,0,4.5,12a9.12,9.12,0,0,0,2,9.31A156.12,156.12,0,0,0,26.1,39.57,156.83,156.83,0,0,0,45.75,21.32,9.13,9.13,0,0,0,47.69,12a12,12,0,0,0-8.85-7.85C36,3.62,31.8,4,27.61,9L26.1,10.75,24.58,9C21.25,5,17.9,4,15.25,4Z"

            />
          </g>
        </g>
      </svg>

      <div className="left">
        <h5 className="card-title">{nombre}</h5>
        <img src={imagen} alt={nombre} className="card-img-top" />

        <button>Ver detalles</button>
      </div>
      <div className="card-body">
        <p className="card-text">Localidad: {localidad}</p>
        <p className="card-text">Habitaciones: {habitaciones}</p>
        <p className="card-text">Precio: {precio}</p>
      </div>
    </div>
  );
};

export default Card;