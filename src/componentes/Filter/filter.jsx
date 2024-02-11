import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {  getSneakers,resetCurrentPage,brandValue,colorValue,sizeValue,orderPrice} from "../../redux/actions/actions";
import style from "./Filter.module.css";

function Filter({ page, pageSize }) {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  const dispatch = useDispatch();

  const handleFilterBrand = (value) => {
    setSelectedBrand(value);
    dispatch(getSneakers(1, pageSize, value, selectedColor, selectedSize, selectedPrice));
    dispatch(brandValue(value));
    dispatch(resetCurrentPage(1));
  };

  const handleFilterColor = (value) => {
    setSelectedColor(value);
    dispatch(getSneakers(1, pageSize, selectedBrand, value, selectedSize, selectedPrice));
    dispatch(colorValue(value));
    dispatch(resetCurrentPage(1));
  };

  const handleFilterSize = (value) => {
    setSelectedSize(value);
    dispatch(getSneakers(1, pageSize, selectedBrand, selectedColor, value, selectedPrice));
    dispatch(sizeValue(value));
    dispatch(resetCurrentPage(1));
  };

  const handleOrderPrice = (value) => {
    setSelectedPrice(value);
    dispatch(getSneakers(1, pageSize, selectedBrand, selectedColor, selectedSize, value));
    dispatch(orderPrice(value));
    dispatch(resetCurrentPage(1));
  };

  return (
    <div className={style.containerContent}>
      <div className={style.container}>
        <select
          name="FilterBrand"
          value={selectedBrand}
          onChange={(e) => handleFilterBrand(e.target.value)}
        >
          <option value="">Brand</option>
          <option value="adidas">adidas</option>
          <option value="nike">nike</option>
          <option value="newbalance">newbalance</option>
        </select>

        <select
          name="FilterColor"
          value={selectedColor}
          onChange={(e) => handleFilterColor(e.target.value)}
        >
          <option value="">Color</option>
          <option value="black">black</option>
          <option value="red">red</option>
          <option value="blue">blue</option>
          <option value="orange">orange</option>
          <option value="white">white</option>
        </select>

        <select
          name="FilterSize"
          value={selectedSize}
          onChange={(e) => handleFilterSize(e.target.value)}
        >
          <option value="">Size</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
        </select>

        <select
          name="orderPrice"
          value={selectedPrice}
          onChange={(e) => handleOrderPrice(e.target.value)}
        >
          <option value="">Price</option>
          <option value="min">min</option>
          <option value="max">max</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;