import React from 'react';

function Shopping() {
  return (
    <div>
      <header>
        <h1>Bienvenido a nuestra página de Shopping</h1>
        <nav>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Acerca de</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <section className="main-content">
        <h2>¡Hola mundo!</h2>
        <p>Este es un ejemplo de página de inicio.</p>
      </section>

      <footer>
        <p>Derechos de autor © 2024. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Shopping;