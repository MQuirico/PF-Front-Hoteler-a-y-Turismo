import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import "./searchBar.css";
import { useDispatch, useSelector } from 'react-redux';
import { searchBar } from '../../redux/actions/actions';

const SearchBar = () => {
 const [search, setSearch] = useState("");
 const dispatch = useDispatch();
 const searchState = useSelector(state => state.search); // Access the stateSearchBar state

 const handleChange = (event) => {
  setSearch(event.target.value);
 };

 const handleSubmit = (event) => {
  event.preventDefault();
  dispatch(searchBar(search));
 };
  return (
    <div className="main-container">
      <a href="#">Mujer</a>
      <a href="#">Hombre</a>
      <a href="#">Unisex</a>

      <div className="search-bar-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleChange}
            className="search-input"
            placeholder="Busca aquí..."
          />
          <span className="search-icon">
            <ImSearch />
          </span>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;