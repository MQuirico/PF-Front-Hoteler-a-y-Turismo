import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSneakers } from "../../redux/actions/actions";
import Card from "../Card/card";

const Cards = () => {
  const dispatch = useDispatch();
  const sneakers = useSelector((state) => state.sneakers);

  useEffect(() => {
    dispatch(getSneakers());
  }, [dispatch]);

  if (!sneakers) {
    return console.log({sneakers},"not Found");
  }

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row ">
        {sneakers.map((zapatilla) => (
          <div key={zapatilla.id} className="col-md-3 mb-3 ml-8 mr-8">
            <Link
              to={`/detail/${zapatilla.id}`}
              className="card-link text-decoration-none"
            >
            <Card
              id={zapatilla.id}
              image={zapatilla.image && zapatilla.image.length > 0 ? zapatilla.image[0] : 'defaultImagePath'}
              model={zapatilla.name}
              color={zapatilla.colors[0] || "DefaultColor"}
              brand={zapatilla.brand}
              gender=""
              size={zapatilla.size[0] || "DefaultSize"}
              price={zapatilla.price}
/>
            
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;