import React from 'react';
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
            <h2>El mejor servicio de riego tecnificado</h2>
            <p>Riega de manera automática...</p>
            <a href="#" className="button">Regístrate</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

