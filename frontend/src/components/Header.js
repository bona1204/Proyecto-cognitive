import React from 'react';
import '../styles/Header.css';
function Header() {
  return (<header>
    <div className="navbar">
      <div className="navbar-brand">KANISTECH</div>
      <div className="nav-links">
        <a href="#" className="active">Inicio</a>
        <a href="#">Nosotros</a>
        <a href="#">Contact</a>
        <a href="#" className="client-area">Área de Clientes</a>
      </div>
    </div>
  </header>
  );
}

export default Header;
