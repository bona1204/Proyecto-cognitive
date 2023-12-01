import React, { useState } from 'react';
import '../styles/register.css';

function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [isRegistered, setIsRegistered] = useState(false);
    const [isRegisterVisible, setIsRegisterVisible] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verificar si las contraseñas coinciden
        if (formData.password !== formData.confirmPassword) {
            setPasswordsMatch(false);
            return;
        }

        // Lógica para registrar al usuario (puedes implementar esto según tus necesidades)
        // Puedes usar una función fetch, Axios u otra biblioteca para enviar los datos al servidor.

        // Simulando una solicitud exitosa (esto debe ser reemplazado con tu lógica real)
        // Aquí estamos simplemente marcando al usuario como registrado.
        setIsRegistered(true);
        setIsRegisterVisible(false);
        setPasswordsMatch(true);

        // Limpiar el formulario
        setFormData({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (
        <div className='bodyregister'>
            <div className="register-container">
                <div className="register-header">
                    <h2>Bienvenido a KanisTech</h2>
                    {isRegisterVisible && <p>Registro</p>}
                </div>
                {isRegistered ? (
                    <p>¡Se registró con éxito!</p>
                ) : (
                    <form className="register-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Nombre completo"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar contraseña"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {!passwordsMatch && <p className="error-message">Las contraseñas no coinciden</p>}
                        <button type="submit">Registrarse</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Register;
