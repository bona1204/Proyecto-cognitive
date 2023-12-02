import React, { useState } from 'react';
import '../styles/Contact.css';
import Header from '../components/Header';

export function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isContactVisible, setIsContactVisible] = useState(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Lógica para enviar el formulario (puedes implementar esto según tus necesidades)
        // Puedes usar una función fetch, Axios u otra biblioteca para enviar los datos al servidor.

        // Simulando una solicitud exitosa (esto debe ser reemplazado con tu lógica real)
        // Aquí estamos simplemente marcando el formulario como enviado.
        setIsFormSubmitted(true);
        setIsContactVisible(false);
    };

    return (
        <div className='bodycontact'>
            
            <div className="conctact-container">
                <div className="contact-header">
                    <h2>KanisTech</h2>
                    {isContactVisible && <p>Contáctanos</p>}
                </div>
                {isFormSubmitted ? (
                    <p>Pronto nos pondremos en contacto contigo</p>
                ) : (
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <br />

                        <button type="submit">Send Message</button>
                    </form>
                )}
            </div>
        </div>
    );
}
