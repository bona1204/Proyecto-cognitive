import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { Contact } from './pages/Contact';
import Register from './pages/register';
import Login from './pages/login';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />  {/* Ruta para la página Register */}
        <Route path="/login" element={<Login />} />  {/* Ruta añadida para la página Login */}
      </Routes>
    </Router>
  );
}

export default App;
