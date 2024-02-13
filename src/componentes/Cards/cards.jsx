import React from "react";
import Card from "../Card/card";
import style from "./cards.module.css";

const Cards = ({ products }) => {
  return (
    <div className={style.cardscontainer}>
      {Array.isArray(products) && products.length ===   0 ? (
        <p>No hay productos disponibles</p>
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