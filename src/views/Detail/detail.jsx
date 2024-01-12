import React from "react";
import "./detail.css"
import { useState } from "react";
import { useEffect } from "react";
import { useParams, } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../../redux/actions/actions";
import { clearProductDetail } from "../../redux/actions/actions";
import BasicRating from "../../componentes/Reviews/Hacer_Review"


const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const zapatilla = useSelector((state) => state.product.detail);
  const [selectedColors, setSelectedColors] = useState(zapatilla && zapatilla.colors ? zapatilla.colors : []);

  useEffect(() => {
   if (zapatilla && zapatilla.colors) {
    
      setSelectedColors(zapatilla.colors);
     
   }
  }, [zapatilla && zapatilla.colors]);
   

  //para limpiar el estado
  useEffect(() => {
    return () => {
      dispatch(clearProductDetail());
    };
   }, [dispatch]);
 
  
  useEffect(() => {
    console.log("Detalle del producto en useEffect:", zapatilla);
    if (!zapatilla) {
      // Solo hacer la solicitud si zapatilla es nulo
      dispatch(fetchProductDetail(id));
    } else {
      // Si zapatilla está definido, imprimir sus propiedades
      Object.keys(zapatilla).forEach((key) => {
        console.log(`${key}: ${zapatilla[key]}`);
      });
    }
  }, [dispatch, id, zapatilla]);

  if (!zapatilla) {
    return <div>Loading...</div>;
  }

  if (!zapatilla || !zapatilla.name) {
    return <div>Datos no disponibles</div>;
}

  const colorStyles = {
    Negro: { backgroundColor: 'black', color: 'white' },
    Blanco: { backgroundColor: 'white', color: 'black' },
    Azul: { backgroundColor: 'blue', color: 'white' },
    Verde: { backgroundColor: 'green', color: 'white' },
    Gris: { backgroundColor: 'grey', color: 'white' },
    Rojo: { backgroundColor: 'red', color: 'white' },
    Naranja: { backgroundColor: 'orange', color: 'white' },
  };

  // Actualizar el fondo del span cuando cambie el color seleccionado



  return (
    <>
    <div className="product-detail-container">
      <div className="product-detail">
        <h2 className="nombre">{zapatilla && zapatilla.name}</h2>
        
        <div className="precio-preview">
        <h5>Precio:  USD${zapatilla.price}</h5>
        </div>

        <div className="image-preview">
        <img src={zapatilla && zapatilla.image[0]} alt={zapatilla.name} />
        </div>
        
        <div className="tipos1">
        <p className="titulo"> Marca:</p>
        <div className="selected-sizes-container">
            <span className="selected-size">
        {zapatilla && zapatilla.brand}
        </span>
        </div>
        </div>

        <div className="tipos1">
        <p className="titulo"> Genero:</p>
        <div className="selected-sizes-container">
            <span className="selected-size">
        {zapatilla && zapatilla.gender}
        </span>
        </div>
        </div>

        <div className="tipos1">
          <p className="titulo">Colores</p>
          <div className="selected-sizes-container">
          {selectedColors.map((selectedColor, index) => (
  <span
    key={index}
    className="selected-size"
    style={{
      backgroundColor: colorStyles[selectedColor]?.backgroundColor || 'black',
      color: colorStyles[selectedColor]?.colors || 'white', // Ajuste aquí
    }}
  >
    {selectedColor}
    {index < selectedColors.length - 1 && (
      <span className="size-separator"></span>
    )}
  </span>
))}
          
        
</div>
</div>

<div className="tipos">
        <p className="titulo"> Talles:</p>
        <div className="selected-sizes-container">
            <span className="selected-size">
        {zapatilla && zapatilla.size.join(", ")}
        </span>
        </div>
        </div>
        
      <div className="button">
      <Link to="/home">
          <button className="submit">Home</button>
        </Link>
        <Link to="/create">
          <button className="submit">Crear</button>
        </Link>
      </div>
        </div>
    </div>
      <div className="rev">

<BasicRating></BasicRating>
      </div>
    </>
  );
};

export default Detail;