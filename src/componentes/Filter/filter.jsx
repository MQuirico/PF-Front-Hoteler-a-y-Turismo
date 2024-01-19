import { useDispatch, useSelector } from "react-redux";
import {  getSneakers,resetCurrentPage,brandValue,colorValue,sizeValue,orderPrice} from "../../redux/actions/actions";
import Select from "../Select/select.jsx";
import style from "./Filter.module.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min";


function Filter({page,pageSize}) {
    console.log("Page in Filter:", page);
    const brand = useSelector((state) => state?.brandValue);
  const color = useSelector((state)=> state?.colorValue);
  const size = useSelector((state)=> state?.sizeValue);
  const price = useSelector((state)=> state?.orderPrice);
    /* 
  const allSneakers = useSelector((state) => state.allCopySneakers);
  const brands =[ ...new Set(allSneakers.map((sneaker) => sneaker.brand))];
  console.log(brands)
  */
  const dispatch = useDispatch();

    const handleFilterBrand = (value) => {
        dispatch(getSneakers( page=1, pageSize,value,color,size,price));
        dispatch(brandValue(value))
        dispatch(resetCurrentPage(1));
      };

      const handleFilterColor = (value) => {
        dispatch(getSneakers( page=1, pageSize,brand,value,size,price));
        dispatch(colorValue(value))
        dispatch(resetCurrentPage(1));
      };

      const handleFilterSize = (value) => {
        dispatch(getSneakers( page=1, pageSize,brand,color,value,price));
        dispatch(sizeValue(value))
        dispatch(resetCurrentPage(1));
      };

      const handleOrderPrice= (value) => {
        dispatch(getSneakers( page=1, pageSize,brand,color,size,value));
        dispatch(orderPrice(value))
        dispatch(resetCurrentPage(1));
      };

  return (
    <div className={style.containerContent}>
      <div className={style.container}>
        <div className={style.titleContainer}>
        <h3>FILTERS</h3>
        </div>
       <Select
        name="FilterBrand"
        options={[
          { value: '', label: 'Brand' },
          { value: 'ADIDAS', label: 'Adidas' },
          { value: 'NIKE', label: 'Nike' },
          { value: 'NEW BALANCE', label: 'New Balance' },  
        ]}
        onChange={(e) => handleFilterBrand(e.target.value)}
      />

<Select
        name="FilterColor"
        options={[
          { value: '', label: 'Color' },
          { value: 'black', label: 'black' },
          { value: 'red', label: 'red' },
          { value: 'blue', label: 'blue' },
          {value:"orange",label:"orange"},
          {value:"white",label:"white"}    
        ]}
        onChange={(e) => handleFilterColor(e.target.value)}
      />

<Select
        name="FilterSize"
        options={[
          { value: '', label: 'Size' },
          { value: '6', label: '6' },
          { value: '7', label: '7' },
          { value: '8', label: '8' },
          { value: '9', label: '9' },
          { value: '10', label: '10' },
          { value: '11', label: '11' },  
        ]}
        onChange={(e) => handleFilterSize(e.target.value)}
      />

<Select
        name="orderPrice"
        options={[
          { value: '', label: 'Price' },
          { value: 'min', label: 'min' },
          { value: 'max', label: 'max' }   
        ]}
        onChange={(e) => handleOrderPrice(e.target.value)}
      />
      </div>
      <div className={style.createContainer}>
        <Link to="/create" className={style.linkContainer}>
          <button className="submit">Create product</button>
        </Link>
        </div>
    </div>
  );
}
export default Filter;