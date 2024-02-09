import React from "react";
import Card from "../../componentes/Card/card";
import data from "../../componentes/Card/data.json";
import Paginado from '../../componentes/Paginado/paginado';
import Filter from "../../componentes/Filter/filter"
import "./home.css";

function Home() {
  console.log("Renderizando el componente Home");

  return (
    <div className="homeView">
      <section className="mainContent">
        <div className="title">
          <h2>Home</h2>
          <p>Este es un ejemplo de página de inicio.</p>
        </div>

        <Filter/>

        <div className="containerr">
          <div className="row">
            {data.map((cabaña) => (
              <div className="box" key={cabaña.id}>
                <Card cabaña={cabaña} />
              </div>
            ))}
          </div>
        </div>
        <Paginado/>
      </section>

      <footer>
        <p>Derechos de autor © 2024. Todos los derechos reservadoss.</p>
      </footer>
    </div>
  );
}

export default Home;
