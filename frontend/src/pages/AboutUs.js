import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AboutUs.css';

export function AboutUs() {
    return (
        <div className="about-container">
            <Header />
            <div className="body">
                <div className="main-container">
                    <div className="content">
                        <h1>Nosotros</h1>
                        <h2>Kanistech es una plataforma donde...</h2>
                        <p>Nuestra mision es</p>
                        <p>Nuestros valores son</p>
                        <a href="#" className="button">Regístrate</a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
