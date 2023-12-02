import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AboutUs.css';

import image1 from '../assets/images/riego_1.png';
import image2 from '../assets/images/riego_2.png';
import image3 from '../assets/images/riego_3.png';
import image4 from '../assets/images/riego_4.png';

export function AboutUs() {
    // Configuración del carrusel
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="about-container">
            <Header />
            <div className="body">
                <div className="main-container">
                    <div className="content">
                        <h1>Nosotros</h1>
                        <p>Mision: Proporcionar a los agricultores una herramienta intuitiva en Kanistech para visualizar con precisión las condiciones clave del cultivo, facilitando decisiones informadas y maximizando la eficiencia agrícola.</p>
                        <p>Vision: Ser la plataforma líder global en la visualización de características agrícolas, optimizando la producción y sostenibilidad para agricultores de todo el mundo.</p>
                        <a href="/register" className="button">Regístrate</a>
                    </div>
                    <div className="image-carousel-container">
                        <Slider {...sliderSettings}>
                            <div>
                                <img src={image1} alt="Imagen 1" />
                            </div>
                            <div>
                                <img src={image2} alt="Imagen 2" />
                            </div>
                            <div>
                                <img src={image3} alt="Imagen 3" />
                            </div>
                            <div>
                                <img src={image4} alt="Imagen 4" />
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
