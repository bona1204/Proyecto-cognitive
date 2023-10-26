import React, { useEffect } from 'react'; 
import '../styles/login.css';

function Login() {

  useEffect(() => {
    const loginForm = document.querySelector(".login-form");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = event.target.querySelector('input[type="text"]').value;
        const password = event.target.querySelector('input[type="password"]').value;

        alert(`Usuario: ${username}\nContraseña: ${password}`);
    });

  }, []);

  return (
    <div className='bodylogin'>
      <div className="login-container">
        <h2 className="login-header">LOGIN</h2>
        <form className="login-form">
          <div className="input-group">
            <span className="icon user-icon"></span>
            <input type="text" placeholder="Usuario" />
          </div>
          <div className="input-group">
            <span className="icon password-icon"></span>
            <input type="password" placeholder="Contraseña" />
          </div>
          <button type="submit" className="acceder-btn">Acceder</button>
          <button type="button" className="registrar-btn">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
