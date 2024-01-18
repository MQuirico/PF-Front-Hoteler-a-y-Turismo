import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSneakers, searchBar, resetSearch } from '../../redux/actions/actions';
import style from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const fetchData = async (term) => {
    try {
      const sneakers = term ? await dispatch(searchBar(term)) : await dispatch(getSneakers(1));
      if (sneakers && sneakers.paginatedResponse) {
        dispatch({
          type: 'GET_ALL_SNEAKERS',
          payload: {
            sneakers: sneakers.paginatedResponse,
            currentPage: sneakers.setCurrentPage,
            totalSneaker: sneakers.totalSneaker,
          },
        });
      }
    } catch (error) {
      console.error("Error al buscar las zapatillas:", error);
    }
  };

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);

    // Llamar a fetchData solo si el término de búsqueda está vacío
    if (!searchTerm) {
      fetchData();
    }
  };

  useEffect(() => {
    // Llamar a fetchData con el término de búsqueda actual
    fetchData(search);
  }, [search, dispatch]);

  const handleReset = () => {
    // Limpiar el input y llamar a fetchData para obtener todas las sneakers
    setSearch("");
    fetchData();
  };

  return (
    <div className={style.container}>
      <form className={style.containerForm} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search"
        />
            <img type="submit" src="src\assets\searchbar-loupe.png" alt="" className={style.buttonImg} />
      </form>
    </div>
  );
};

export default SearchBar;