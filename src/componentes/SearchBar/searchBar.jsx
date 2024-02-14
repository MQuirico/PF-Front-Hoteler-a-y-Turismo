import React, { useState, useEffect } from "react";
import "./searchBar.css";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

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
<IconButton
  type="submit"
  aria-label="search"
  style={{
    backgroundColor: 'black',
    marginTop: '-9px',
    transition: 'background-color 0.3s', 
    '&:hover': {
      backgroundColor: 'blue',
    }
  }}
>
  <SearchIcon />
</IconButton>
    </form>
  );
}

export default SearchBar;