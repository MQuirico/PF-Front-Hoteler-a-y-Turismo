import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSneakers, resetCurrentPage, searchBar } from '../../redux/actions/actions';
import style from "./SearchBar.module.css"

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
      <div className={style.container}>
        <form onSubmit={handleSubmit} className={style.containerForm}>
          <input type="text" value={search} onChange={handleChange} placeholder="Search"/>
            <img type="submit" src="src\assets\searchbar-loupe.png" alt="" className={style.buttonImg} />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;