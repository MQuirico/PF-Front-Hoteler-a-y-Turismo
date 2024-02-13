import React from "react";
import Card from "../Card/card";
import style from "./cards.module.css";

const Cards = ({ products }) => {
  return (
    <div className={style.cardscontainer}>
      {Array.isArray(products) && products.length ===   0 ? (
           <p style={{
            backgroundColor: '#f8d7da', 
            color: '#721c24',
            padding: '10px', 
            border: '1px solid #f5c6cb', 
            borderRadius: '4px',
            marginBottom: '10px', 
            display: 'inline-block' 
          }}>
            No hay ofertas disponibles.
          </p>
      ) : (
        products.map((product) => (
          <div key={product.id} className={style.cardcontainer}>
            <Card
              id={product.id}
              name={product.name}
              location={product.location}
              season={product.season}
              pricePerNight={product.pricePerNight}
              image={product.images && product.images.length >  0 ? product.images[0] : null}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Cards;