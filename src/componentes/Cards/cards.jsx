import React from "react";
import Card from "../Card/card";
import style from "./cards.module.css";

const Cards = ({ products, searchTerm }) => {
  let filteredProducts = [];
  if (Array.isArray(products)) {
    filteredProducts = searchTerm
      ? products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : products;
  }

  return (
    <div className={style.cardscontainer}>
      {Array.isArray(filteredProducts) && filteredProducts.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        filteredProducts.map((product) => (
          <div key={product.id} className={style.cardcontainer}>
            <Card
              id={product.id}
              name={product.name}
              location={product.location}
              season={product.season}
              pricePerNight={product.pricePerNight}
              image={product.image}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Cards;