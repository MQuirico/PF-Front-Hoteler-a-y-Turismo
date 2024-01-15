import React, { useState, useEffect } from "react";
import "./detail.css";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../../redux/actions/actions";
import { clearProductDetail } from "../../redux/actions/actions";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const zapatilla = useSelector((state) => state.product.detail);
  const selectedColors = zapatilla && zapatilla.colors ? zapatilla.colors : [];

  useEffect(() => {
    // Limpiar el estado al desmontar el componente
    return () => {
      dispatch(clearProductDetail());
    };
  }, [dispatch]);

  useEffect(() => {
    // Cargar los detalles del producto al montar el componente
    if (!zapatilla) {
      dispatch(fetchProductDetail(id));
    }
  }, [dispatch, id, zapatilla]);

  if (!zapatilla) {
    return <div>Loading...</div>;
  }

  if (!zapatilla.name) {
    return <div>Datos no disponibles</div>;
  }

  // Verifica el tipo de id
  const isHexadecimalId = /^[0-9a-fA-F]{24}$/.test(id);

  const colorStyles = {
    Negro: { backgroundColor: "black", color: "white" },
    Blanco: { backgroundColor: "white", color: "black" },
    Azul: { backgroundColor: "blue", color: "white" },
    Verde: { backgroundColor: "green", color: "white" },
    Gris: { backgroundColor: "grey", color: "white" },
    Rojo: { backgroundColor: "red", color: "white" },
    Naranja: { backgroundColor: "orange", color: "white" },
  };

  return (
    <div className="imagen">

    <>
      <div className="product-detail-container">
        <div className="product-detail">
          <h2 className="nombre">{zapatilla.name}</h2>

          <div className="precio-preview">
            <h5>Precio: USD${zapatilla.price}</h5>
          </div>

          <div className="image-preview">
            <img src={zapatilla.image[0]} alt={zapatilla.name} />
          </div>

          <div className="tipos1">
            <p className="titulo"> Marca:</p>
            <div className="selected-sizes-container">
              <span className="selected-size">{zapatilla.brand}</span>
            </div>
          </div>

          <div className="tipos1">
            <p className="titulo"> Genero:</p>
            <div className="selected-sizes-container">
              <span className="selected-size">{zapatilla.gender}</span>
            </div>
          </div>

          <div className="tipos1">
            <p className="titulo">Colores</p>
            <div className="selected-sizes-container">
              {selectedColors.map((selectedColor, index) => {
                const colorKey = selectedColor.toLowerCase();
                return (
                  <span
                    key={index}
                    className="selected-size"
                    style={{
                      backgroundColor:
                        colorStyles[colorKey]?.backgroundColor || "black",
                      color: colorStyles[colorKey]?.color || "white",
                    }}
                  >
                    {selectedColor}
                    {index < selectedColors.length - 1 && (
                      <span className="size-separator"></span>
                    )}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="tipos">
            <p className="titulo"> Talles:</p>
            <div className="selected-sizes-container">
              <span className="selected-size">
                {zapatilla.size.join(", ")}
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
    </>
    </div>
  );
};

export default Detail;