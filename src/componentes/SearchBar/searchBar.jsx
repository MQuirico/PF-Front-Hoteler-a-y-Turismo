import React from "react";
import { ImSearch } from "react-icons/im";
import "./searchBar.css";

const SearchBar = () => {
  return (
    <div className="main-container">
      <a href="#">Mujer</a>
      <a href="#">Hombre</a>
      <a href="#">Unisex</a>

      <div className="search-bar-container">
        <input
          type="text"
          className="search-input"
          placeholder="Busca aquí..."
        />
        <span className="search-icon">
          <ImSearch />
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
