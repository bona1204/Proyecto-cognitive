import React from 'react';
import { Link } from 'react-router-dom';  // Importa Link desde react-router-dom
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css';

export function Home() {
  return (
    <div className="home">
      <Header />
      <div className="body">
        <div className="main-container">
          <div className="content">
            <h1>Bienvenido a KanisTech</h1>
            <h2>Innovación en Riego Automatizado</h2>
            <p>Optimiza tu cultivo con tecnología avanzada y sostenible...</p>
            <Link to="/register" className="button">Regístrate</Link>  {/* Modifica el <a> a un componente <Link> para dirigir a la página Register */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
