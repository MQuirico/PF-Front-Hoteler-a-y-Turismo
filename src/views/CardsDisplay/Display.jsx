import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../componentes/Cards/cards";
import Paginado from "../../componentes/Paginado/paginado";
import Filter from "../../componentes/Filter/filter";
import SearchBar from "../../componentes/SearchBar/searchBar";
import { fetchProducts, searchProducts } from "../../redux/Actions/actions";
import "./home.css";

function Home() {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchResults);
  const products = useSelector((state) => state.products);
  const totalPages = useSelector((state) => state.totalPages);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6; // Número de tarjetas por página

  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults]);

  useEffect(() => {
    dispatch(fetchProducts({}, currentPage, cardsPerPage));
  }, [dispatch, currentPage, cardsPerPage]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm.trim());
    setCurrentPage(1); // Reiniciar la página a 1 cuando se realiza una búsqueda
    if (searchTerm.trim() !== "") {
      dispatch(searchProducts(searchTerm.trim()))
        .then((response) => {
          if (response.status === 400) {
            setError(true);
          } else {
            setError(false);
          }
        })
        .catch(() => {
          setError(true);
        });
    } else {
      setError(false);
      dispatch(fetchProducts({}, 1, cardsPerPage)); // Asegurarse de que se obtengan los productos de la primera página al limpiar la búsqueda
    }
  };

  useEffect(() => {
    setError(searchResults.length === 0 && searchTerm.trim() !== "");
  }, [searchResults, searchTerm]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    // Aquí deberíamos estar utilizando la acción fetchProducts para obtener los productos de la página actual
    dispatch(fetchProducts({}, page, cardsPerPage));
  };

  return (
    <div className="homeView">
      <section className="mainContent">
        <div className="filter">
          <Filter />
        </div>
        <div className="search">
          <SearchBar onSearch={handleSearch} />
        </div>
        {error ? (
          <p>No se encontraron resultados.</p>
        ) : (
          <div className="cardsRows">
            <Cards products={searchTerm.trim() !== "" ? searchResults : products} />
          </div>
        )}
        <div className="paginado">
          <Paginado currentPage={currentPage} onPageClick={onPageChange} totalPages={totalPages} />
        </div>
      </section>
      <footer>
        <p>Derechos de autor © 2024. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;