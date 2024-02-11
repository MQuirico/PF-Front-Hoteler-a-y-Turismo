import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Detail() {
  const { id } = useParams();
  console.log(id);

  const [products, setProducts] = useState({}); // Estado local -> products

  useEffect(() => {
      axios.get(`http://localhost:3000/products/detail/${id}`)
      .then(({ data }) => {
          if(data.name) {
             setProducts(data)
          } else {
              throw new Error(`Product with ID ${id} not found`)
          }
      })
      .catch ((error) => {
          throw new Error(error.message);
      })

      return setProducts({});  // se limpia el estado cuando se desmonta el componente.
      
  }, [id]);

  return (
      <div className="detailContainer" >
          <div className="productDetail" >
              <h2 className="title" >Discover a little more about { products?.name }</h2>
              <img className="img" src={products?.image} alt={products?.image} />
              <h4>Price per night: {products?.pricePerNight} </h4>
              <h4>Total rooms: {products?.totalRooms} </h4>
              <h4>Location: {products?.location} </h4>
              <h4>Season: {products?.season} </h4>
              <h4>Pool: {products?.pool} </h4>
          </div>
      </div>
  )
}

export default Detail;