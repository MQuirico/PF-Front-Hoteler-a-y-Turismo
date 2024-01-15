import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import "./searchBar.css";
import { useDispatch, useSelector } from 'react-redux';
import { searchBar } from '../../redux/actions/actions';
import { useEffect } from "react";
import { getSneakers } from "../../redux/actions/actions";



const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const dispatch = useDispatch();
  const searchState = useSelector(state => state.searchData);

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
    }, 500); // Espera 400ms para mostrar los resultados a tiempo real pa ;)

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  useEffect(() => {
    if (debouncedSearchTerm !== "") {
      dispatch(searchBar(debouncedSearchTerm));
    } else {
      //se muestran todas las cards de nuevo una vez borrado el input
      dispatch(getSneakers());
    }
  }, [debouncedSearchTerm, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="main-container">
      <div className="search-bar-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={search}
            onChange={handleChange}
            className="search-input"
            placeholder="Busca aquí..."
          />
          <span className="search-icon">
            <ImSearch />
          </span>
        </form>
      </div>

      {searchState && searchState.length > 0 && (
        <div>
          <h2>Resultados de la búsqueda:</h2>
          <ul>
            {searchState.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}

      {searchState && searchState.length === 0 && (
        <div>No se encontraron resultados.</div>
      )}
    </div>
  );
};

export default SearchBar;