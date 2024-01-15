import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSneakers, resetCurrentPage, searchBar } from '../../redux/actions/actions';

const SearchBar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);

    dispatch(getSneakers())
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar los sneakers:', error);
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(search);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  useEffect(() => {
    if (debouncedSearchTerm !== "") {
      onSearch(debouncedSearchTerm);
    } else {
      dispatch(resetCurrentPage(1));
      dispatch(getSneakers(1, 3));
    }
  }, [debouncedSearchTerm, onSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar alguna acción si es necesario
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={search} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;