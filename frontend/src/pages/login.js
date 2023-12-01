import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar que ambos campos estén llenos
    if (username.trim() === '' || password.trim() === '') {
      alert('Por favor, completa ambos campos.');
    } else {
      //alert(`Usuario: ${username}\nContraseña: ${password}`);
      // Después de mostrar la alerta, redirige a Dashboard
      window.location.href = "/Dashboard";
    }
  };

  return (
    <div className='bodylogin'>
      <div className="login-container">
        <h2 className="login-header">LOGIN</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="icon user-icon"></span>
            <input
              type="text"
              name="username"
              placeholder="Usuario"
              value={username}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <span className="icon password-icon"></span>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="acceder-btn">Acceder</button>
          {/* Enlace para navegar a Register */}
          <Link to="/register" className="acceder-btn">Regístrate</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
