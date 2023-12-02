import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importar Link para la redirección
import '../styles/register.css';

function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [isRegistered, setIsRegistered] = useState(false);
    const [isRegisterVisible, setIsRegisterVisible] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [emailExists, setEmailExists] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar si las contraseñas coinciden
        if (formData.password !== formData.confirmPassword) {
            setPasswordsMatch(false);
            clearPasswordFields();
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Registro exitoso
                setIsRegistered(true);
                setIsRegisterVisible(false);
                setPasswordsMatch(true);
            } else {
                // Manejar errores de registro
                console.error(data.error);

                // Verificar si el error es debido a que el correo ya está registrado
                if (data.error.includes('correo electrónico ya está registrado')) {
                    setEmailExists(true);
                    clearForm();
                }
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    const clearForm = () => {
        setFormData({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
    };

    const clearPasswordFields = () => {
        setFormData({
            ...formData,
            password: '',
            confirmPassword: '',
        });
    };

    useEffect(() => {
        if (emailExists || !passwordsMatch) {
            setTimeout(() => {
                setEmailExists(false);
                setPasswordsMatch(true);
            }, 5000); // Ocultar la alerta después de 5 segundos
        }
    }, [emailExists, passwordsMatch]);

    return (
        <div className='bodyregister'>
            <div className="register-container">
                <div className="register-header">
                    <h2>Bienvenido a KanisTech</h2>
                    {isRegisterVisible && <p>Registro</p>}
                </div>
                {isRegistered ? (
                    <div className="register-exito">
                        <p>¡Se registró con éxito!</p>
                        <Link to="/login" className="centered-link">Ir a Iniciar Sesión</Link>
                    </div>
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
                        {emailExists && <p className="error-message">Este correo electrónico ya está registrado</p>}
                        <button type="submit">Registrarse</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Register;
