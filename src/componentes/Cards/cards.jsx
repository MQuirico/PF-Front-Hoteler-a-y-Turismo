import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getSneakers } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/card";

const Cards = ({sneakers}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSneakers());
}, [dispatch]);
  if (!sneakers) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row ">
        {sneakers.map(({id,image,name,colors,brand,size,price}) => (
          <div key={id} className="col-md-3 mb-3 ml-8 mr-8">
            <Link
              to={`/detail/${id}`}
              className="card-link text-decoration-none"
            >

<Card
 id={id}
 image={image && image.length > 0 ? image[0] : 'defaultImagePath'}
 model={name}
 color={colors[0] || "DefaultColor"}
 brand={brand}
 size={size[0] || "DefaultSize"}
 price={price}
/>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;