import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./bottomBar.css";
import { useDispatch } from "react-redux";
import { setSelectedSneakerIndex } from "../../redux/actions/actions";

const BottomBar = ({ allSneakers, onClickPrev, onClickNext }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [selectedSneakerId, setSelectedSneakerId] = useState(null);
  
    const handleClick = (sneaker) => {
      // Despacha la acción para resetear el índice de la imagen seleccionada a 0
      dispatch(setSelectedSneakerIndex(0));
  
      // Actualiza el ID de la tarjeta seleccionada
      setSelectedSneakerId(sneaker.id);
  
      // Redirige a la página de detalles
      history.push(`/detail/${sneaker.id}`);
    };
  
    return (
      <div className="bottom-bar-container">
        {Array.isArray(allSneakers) &&
          allSneakers.slice(0, 10).map((sneaker) => (
            <div
              key={sneaker.id}
              className="pokemon-button"
              onClick={() => handleClick(sneaker)}
            >
              {sneaker.image && sneaker.image.length > 0 ? (
                <img src={sneaker.image[0]} alt={sneaker.name} />
              ) : (
                <div>No hay imagen disponible</div>
              )}
            </div>
          ))}
      
     
      </div>
    );
  };
  
  export default BottomBar;