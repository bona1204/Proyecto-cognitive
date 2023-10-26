import React from 'react';
import '../styles/register.css';

function Register() {
    return (
        <div className="register-container">
            <div className="register-header">
                <h2>Bienvenido a KanisTech</h2>
                <p>Registro</p>
            </div>
            <form className="register-form">
                <input type="text" placeholder="Nombre completo" required />
                <input type="email" placeholder="Correo electrónico" required />
                <input type="password" placeholder="Contraseña" required />
                <input type="password" placeholder="Confirmar contraseña" required />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default Register;
