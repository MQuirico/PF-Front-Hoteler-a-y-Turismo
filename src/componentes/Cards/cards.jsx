import React from "react";
import Card from "../Card/card";
import "./cards.css";

const Cards = ({ products, searchTerm }) => {
    const filteredProducts = searchTerm ? products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : products;
  
    return (
      <div className="cards-container">
        <div className="cards-content">
          {filteredProducts.length === 0 ? (
            <p>No hay productos disponibles</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="card-container">
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
      </div>
    );
  };

export default Cards;