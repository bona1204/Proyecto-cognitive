import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { Contact } from './pages/Contact';
import Register from './pages/register';
import Login from './pages/login';
import Login_admi from './pages/login_admi';
import Dashboard from './pages/Dashboard';
import Dashboard_admi from './pages/Dashboard_admi';
import Usuario_crud from './pages/Usuario_crud';
import Usuario_crud_add from './pages/Usuario_crud_add';

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
        <Route path="/login_admi" element={<Login_admi />} />  {/* Ruta añadida para la página Login */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard_admi" element={<Dashboard_admi />} />
        <Route path="/usuario_crud" element={<Usuario_crud/>} />
        <Route path="/usuario_crud_add" element={<Usuario_crud_add/>} />
      </Routes>
    </Router>
  );
}

export default App;
