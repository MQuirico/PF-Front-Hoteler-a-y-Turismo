import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '../../redux/Actions/actions';
import './detail.css';

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [products, setProducts] = useState({});
  const productsState = useSelector((state) => state.products);
  const location = useLocation(); // Obtener la ubicación del estado
  const selectedImage = location.state && location.state.selectedImage; // Obtener la imagen del estado
/// DETAIL RECIBE DE CARD POR STATE LA PROP IMAGE CON LA CONST SELECTEDIMAGE ///

/// LA CONST PRODUCTSSTATE TRAE TODA LA INFO COMPLETA DEL PRODUCTO DESDE PRODUCTS, REDUCER ////
  useEffect(() => {
    axios.get(`http://localhost:3000/products/detail/${id}`)
      .then(({ data }) => {
        if (data.name) {
          setProducts(data);
        } else {
          throw new Error(`Product with ID ${id} not found`);
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });

    // Limpiar el estado cuando se desmonta el componente.
    return () => setProducts({});
  }, [id]);

  useEffect(() => {
    if (!productsState) {
      dispatch(fetchProducts(id));
    }
  }, [dispatch, id, productsState]);

  if (!products || !products.name) {
    return <div>Loading...</div>;
  }

  const renderPool = (poolValue) => {
    return poolValue ? 'Yes' : 'No';
  };

  return (
    <div className="container">
      <div className="detailContainer">
        <div className="imagePreview">
          {/* Utiliza la imagen obtenida de la ubicación del estado */}
          <img
            src={selectedImage || 'URL_POR_DEFECTO_PARA_IMAGEN'}
            alt={products.name}
          />
        </div>
        <div className="detailContent">
          <h2>{products.name}</h2>
          <div className="locationContainer">
            <h4>{products.location}</h4>
          </div>
          <div className="price">
            <h4>${products.pricePerNight} ARG</h4>
          </div>
          <div className="containerRooms">
            <h4>Total rooms: {products.totalRooms}</h4>
          </div>
          <div className="seasonContainer">
            <h4>Season: {products.season.join(", ")}</h4>
          </div>
          <div>
            <h4>Pool: {renderPool(products.pool)}</h4>
          </div>
        </div>
      </div>
      <div className="reviewContainer">
        {/* Agrega el componente de revisión aquí */}
      </div>
    </div>
  );
}

export default Detail;