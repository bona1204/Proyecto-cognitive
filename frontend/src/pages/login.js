import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/login.css';

function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    const emailValue = email.trim(); // Elimina espacios en blanco al principio y al final
    const passwordValue = password.trim();

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue, password: passwordValue }),
      });

      const data = await response.json();

      if (response.ok) {
        // Autenticación exitosa, redirige a Dashboard y limpia los campos
        window.location.href = "/dashboard";
        setEmail('');
        setPassword('');
      } else {
        // Muestra un mensaje de error y limpia los campos
        setErrorMessage(data.error);
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <div className='bodylogin'>
      <div className="login-container">
        <h2 className="login-header">LOGIN</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <span className="icon user-icon"></span>
            <input
              type="text"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <span className="icon password-icon"></span>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="acceder-btn">Acceder</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Link to="/register" className="acceder-btn">Regístrate</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
