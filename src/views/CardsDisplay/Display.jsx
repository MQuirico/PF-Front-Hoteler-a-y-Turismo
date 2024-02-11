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
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllCards, setShowAllCards] = useState(true);

  const cardsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm.trim());
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
      dispatch(fetchProducts());
    }
  };

  useEffect(() => {
    setError(searchResults.length === 0 && searchTerm.trim() !== "");
  }, [searchResults, searchTerm]);

  const totalCards = showAllCards ? products.length : searchResults.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const currentCards = searchTerm.trim() !== "" ? searchResults : products.slice(indexOfFirstCard, indexOfLastCard);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="homeView">
      <section className="mainContent">

        <div className="fileter">
        <Filter />
        </div>
        
        <div className="search">
        <SearchBar onSearch={handleSearch} />
        </div>

        {error ? (
        <p>No se encontraron resultados.</p>
      ) : (
        <div className="cardsRows">
          {currentCards.map((card, index) => (
            <Cards key={index} products={[card]} />
          ))}
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