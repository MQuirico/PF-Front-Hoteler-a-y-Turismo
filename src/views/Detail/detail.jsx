import React from "react";
import "./detail.css"
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import image4 from "/images/image4.jpg";
import image5 from "/images/image5.png";
import image1 from "/images/image1.jpg";
import image2 from "/images/image2.jpg";

const Detail = () => {
  const { id } = useParams();

  // Mock data similar a la que tienes en Cards
  const zapatillas = [
    {
      id: 1,
      modelo: "Zapatilla A",
      talla: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
      colores: ["Negro", "Blanco", "Rojo"],
      imagen: image2,
      marca: "Nike",
      genero: "Hombre",
      precio: "200",
    },
    {
      id: 2,
      modelo: "Zapatilla B",
      talla: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
      colores: ["Azul", "Blanco", "Gris"],
      imagen: image4,
      marca: "Adidas",
      genero: "Mujer",
      precio: "250",
    },
    {
      id: 3,
      modelo: "Zapatilla C",
      talla: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
      colores: ["Verde", "Blanco", "Negro"],
      imagen: image5,
      marca: "Puma",
      genero: "Unisex",
      precio: "230",
    },
    {
      id: 4,
      modelo: "Zapatilla D",
      talla: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
      colores: ["Verde", "Blanco", "Negro"],
      imagen: image1,
      marca: "Nike",
      genero: "Mujer",
      precio: "300",
    },
  ];

  const zapatilla = zapatillas.find((z) => z.id === parseInt(id));

  if (!zapatilla) {
    return <div>Loading...</div>;
  }

  const colorStyles = {
    Negro: { backgroundColor: 'black', color: 'white' },
    Blanco: { backgroundColor: 'white', color: 'black' },
    Azul: { backgroundColor: 'blue', color: 'white' },
    Verde: { backgroundColor: 'green', color: 'white' },
    Gris: { backgroundColor: 'grey', color: 'white' },
    Rojo: { backgroundColor: 'red', color: 'white' },
  };

  const [selectedColors, setSelectedColors] = useState(zapatilla.colores);

  // Actualizar el fondo del span cuando cambie el color seleccionado
  useEffect(() => {
    setSelectedColors(zapatilla.colores);
  }, [zapatilla.colores]);




  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <h2 className="nombre">{zapatilla.modelo}</h2>
        
        <div className="precio-preview">
        <h5>Precio:  USD${zapatilla.precio}</h5>
        </div>

        <div className="image-preview">
        <img src={zapatilla.imagen} alt={zapatilla.modelo} />
        </div>
        
        <div className="tipos1">
        <p className="titulo"> Marca:</p>
        <div className="selected-sizes-container">
            <span className="selected-size">
        {zapatilla.marca}
        </span>
        </div>
        </div>

        <div className="tipos1">
        <p className="titulo"> Genero:</p>
        <div className="selected-sizes-container">
            <span className="selected-size">
        {zapatilla.genero}
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
                  backgroundColor: colorStyles[selectedColor].backgroundColor,
                  
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
        {zapatilla.talla.join(", ")}
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
  );
};

export default Detail;