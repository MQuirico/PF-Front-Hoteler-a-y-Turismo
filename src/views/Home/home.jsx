import React, { useEffect, useState } from "react"; // Agrega useEffect aquí
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../componentes/Cards/cards";
import Paginado from "../../componentes/Paginado/paginado";
import Filter from "../../componentes/Filter/filter";
import SearchBar from "../../componentes/SearchBar/searchBar";
import { getAllProducts, searchProducts } from "../../redux/Actions/actions";
import "./home.module.css";

function Home() {
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const products = useSelector((state) => state.products || []);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() !== "") {
      dispatch(searchProducts(searchTerm.trim()));
    } else {
      setFilteredProducts(null); // Establecer a null en lugar de []
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
            <Cards products={filteredProducts.length > 0 ? filteredProducts : products} />
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