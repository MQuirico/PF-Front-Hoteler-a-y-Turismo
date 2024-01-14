import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react'
import { filterProducts, getSneakers,resetCurrentPage,brandValue} from "../../redux/actions/actions";
import { useEffect } from "react";
import Select from "../Select/select.jsx";

function Filter({page,pageSize}) {
    console.log("Page in Filter:", page);
  const allSneakers = useSelector((state) => state?.allCopySneakers);
  const brands =[ ...new Set(allSneakers.map((sneaker) => sneaker.brand))];
  const dispatch = useDispatch();
  const [selectedBrand, setSelectedBrand] = useState('');

    const handleFilter = (value) => {
        setSelectedBrand(value);
        dispatch(getSneakers( page=1, pageSize,value));
        dispatch(brandValue(value))
        dispatch(resetCurrentPage(1));
      };

  return (
    <div>
       <Select
        name="FilterBrand"
        options={[
          { value: '', label: 'Select Brand' },
          ...brands.map((brand) => ({
            key: brand,
            value: brand,
            label: brand,
          }))
        ]}
        onChange={(e) => handleFilter(e.target.value)}
      />
    </div>
  );
}
export default Filter;