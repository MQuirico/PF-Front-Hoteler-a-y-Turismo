import React from "react";
// import image3 from "/images/image3.jpg";

const Card = ({ id, model, size, image, color, brand, gender, price }) => {
  return (
    <div className="card border">
      <img src={image} alt="Zapatilla" />
      <div>
        <h2>
          {brand} {color}
        </h2>
        <h3>{size}: 39</h3>
        <h3>{gender}</h3>
        <h3>{price} 200$</h3>
      </div>
    </div>
  );
};

export default Card;
