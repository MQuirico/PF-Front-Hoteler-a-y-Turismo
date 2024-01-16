import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getSneakers } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import Card from "../Card/Card";
import style from "./Cards.module.css"


const Cards = ({sneakers,page}) => {
  const dispatch = useDispatch();
  
if (!sneakers || sneakers.length === 0) {
  return <p>No se encontraron sneakers.</p>;
}

  return (
    <div className={style.container}>
      <div className={style.cardContent}>
        {sneakers.map(({id,image,name,colors,brand,size,price}) => (
          <div key={id}>
            <Link 
              to={`/detail/${id}`}
              style={{textDecoration:'none'}} >
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