import React, { useState } from "react";
import "./searchBar.css"; 

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm.trim()); // Trim para eliminar espacios en blanco innecesarios
  };

  return (
    <form className="searchBar" onSubmit={handleSubmit}>
      <input
        className="searchInput"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="searchButton" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;