import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react'
import { filterProducts } from "../../redux/actions/actions";
import { useEffect } from "react";
import Select from "../Select/select.jsx";

function Filter({page,pageSize}) {
    console.log("Page in Filter:", page);
  const allSneakers = useSelector((state) => state?.allCopySneakers);
  const brands = [...new Set(allSneakers.map(sneaker=> sneaker.brand))];
  const dispatch = useDispatch();
  const [brand, setBrand] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColors, setSelectedColors] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  useEffect((page) => {
    if (page !== undefined) {
        dispatch(filterProducts(brand, page ,pageSize ));
      }
    }, [dispatch, page]);


  const handleFilter = (value,page,pageSize) => {
    dispatch(filterProducts(value,page,pageSize));
  };
  
  return (
    <div>
       <Select
        name="FilterBrand"
        options={[
          { value: '', label: 'Select Brand' },
          ...brands.map((brand) => ({
            key: brand,
            value:brand,
            label: brand,
          }))
        ]}
        onChange={(e) => handleFilter(e.target.value, page,pageSize)}
      />
    </div>
  );
}
export default Filter;