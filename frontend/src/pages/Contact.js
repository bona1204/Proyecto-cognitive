import React from 'react';
import '../styles/Contact.css';

export function Contact() {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <p>If you have any questions, please feel free to contact us using the form below:</p>

            <form className="contact-form">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" required />

                <label htmlFor="message">Message:</label>
                <textarea id="message" rows="5" required></textarea>

                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}
