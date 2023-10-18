import React from 'react';
import Button from './Button';

function MainContent() {
  return (
    <div className="main-content">
      <h2>¡Bienvenido a nuestra plataforma!</h2>
      <p>Una breve descripción o eslogan sobre el producto o servicio.</p>
      <Button text="Más información" />
    </div>
  );
}

export default MainContent;
