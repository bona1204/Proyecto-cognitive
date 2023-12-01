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
                        <p> Mision: Proporcionar a los agricultores una herramienta intuitiva en Kanistech para visualizar con precisión las condiciones clave del cultivo, facilitando decisiones informadas y maximizando la eficiencia agrícola. </p>
                        <p>Vision: Ser la plataforma líder global en la visualización de características agrícolas, optimizando la producción y sostenibilidad para agricultores de todo el mundo.</p>
                        <a href="/register" className="button">Regístrate</a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
