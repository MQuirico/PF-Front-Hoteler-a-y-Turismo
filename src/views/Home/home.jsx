import React from "react";
import Card from "../../componentes/Card/card";
import data from "../../componentes/Card/data.json";
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

        <div className="containerr">
          <div className="row">
            {data.map((cabaña) => (
              <div className="box" key={cabaña.id}>
                <Card cabaña={cabaña} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <p>Derechos de autor © 2024. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;
