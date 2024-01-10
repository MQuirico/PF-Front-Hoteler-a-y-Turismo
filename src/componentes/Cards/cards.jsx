import React from "react";
import Card from "../Card/card";
import image4 from "/images/image4.jpg";
import image5 from "/images/image5.png";
import image1 from "/images/image1.jpg";
import image2 from "/images/image2.jpg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Cards = () => {
  let zapatillas = [
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
      colores: ["Naranja", "Blanco", "Negro"],
      imagen: image1,
      marca: "Nike",
      genero: "Mujer",
      precio: "300",
    },
    {
      id: 5,
      modelo: "Zapatilla A",
      talla: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
      colores: ["Negro", "Blanco", "Rojo"],
      imagen: image2,
      marca: "Nike",
      genero: "Hombre",
      precio: "200",
    },
    {
      id: 6,
      modelo: "Zapatilla B",
      talla: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
      colores: ["Azul", "Blanco", "Gris"],
      imagen: image4,
      marca: "Adidas",
      genero: "Mujer",
      precio: "250",
    },
    {
      id: 7,
      modelo: "Zapatilla C",
      talla: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
      colores: ["Verde", "Blanco", "Negro"],
      imagen: image5,
      marca: "Puma",
      genero: "Unisex",
      precio: "230",
    },
    {
      id: 8,
      modelo: "Zapatilla D",
      talla: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
      colores: ["Naranja", "Blanco", "Negro"],
      imagen: image1,
      marca: "Nike",
      genero: "Mujer",
      precio: "300",
    },
  ];

  return (
    <div className="container d-flex justify-content-center align-items-center bg-">
      <div className="row">
        {zapatillas.map((zapatilla) => (
          <div key={zapatilla.id} className="col-md-3 mb-3 ml-8 mr-8">
            <Link to={`/detail/${zapatilla.id}`} className="card-link">
              <Card
                id={zapatilla.id}
                image={zapatilla.imagen}
                model={zapatilla.modelo}
                color={zapatilla.colores[0]}
                brand={zapatilla.marca}
                gender={zapatilla.genero}
                size={zapatilla.talla[0]}
                price={zapatilla.precio}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;