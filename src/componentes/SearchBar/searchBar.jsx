import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import "./searchBar.css";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  console.log(search);
  const handleSubmit = (event) => {
    event.preventDefault();
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
