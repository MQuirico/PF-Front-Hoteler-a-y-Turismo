import React, { useState, useEffect } from "react";
import "./searchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    // Limpiar el timeout previo
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // tiempo de espera para empezar la busqueda
    const newTimeout = setTimeout(() => {
      onSearch(searchTerm.trim()); 
    }, 500); 
    setTypingTimeout(newTimeout);
  };

  useEffect(() => {
    return () => {
      // Limpiar el timeout 
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <form className="searchBar" onSubmit={(event) => event.preventDefault()}>
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