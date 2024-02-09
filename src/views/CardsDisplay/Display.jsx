import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../componentes/Cards/cards";
import Paginado from "../../componentes/Paginado/paginado";
import Filter from "../../componentes/Filter/filter";
import SearchBar from "../../componentes/SearchBar/searchBar";
import { Link } from "react-router-dom";
import { getAllProducts, searchProducts, fetchProductDetail } from "../../redux/Actions/actions";
import "./home.module.css";

function Home() {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchResults);
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductDetail());
  }, [dispatch]);


  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() !== "") {
      dispatch(searchProducts(searchTerm.trim()));
    } else {
      dispatch(getAllProducts()); // Obtener todos los productos si la búsqueda está vacía
    }
  };

  return (
    <div className="homeView">
      <section className="mainContent">
        <div className="title">
          <h2>Home</h2>
          <p>Este es un ejemplo de página de inicio.</p>
        </div>

        <Filter />
        <SearchBar onSearch={handleSearch} />

        <div className="container">
          <div className="row">
            {/* Usar searchResults en lugar de products */}
            <Link to={`/detail/${products.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Cards products={searchResults === null ? searchResults : products} />
            </Link>
          </div>
        </div>
        <Paginado />
      </section>

      <footer>
        <p>Derechos de autor © 2024. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;