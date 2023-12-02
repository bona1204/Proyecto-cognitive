import React from 'react';
import userIcon from '../assets/images/user.png';
import '../styles/dashboard.css';

function Dashboard() {
  // Manejador de clic para cerrar sesión
  const handleLogout = () => {
    // Lógica para cerrar sesión (por ejemplo, eliminar tokens, redireccionar, etc.)
    console.log('Cerrar Sesión');

    // Simulación de redirección a la página de inicio de sesión
    window.location.href = '/'; // Reemplaza con tu lógica real de redirección
  };

  return (
    <div className="bodyDashboard">
      <div className="dashboard">
        <div className="rea-de-clientes-dashboard">
          <div className="rea-de-clientes-dashboard">
            <div className="fondo1"></div>
          </div>
          <div className="index1">
            <div className="fondo-index"></div>
            <b className="kanistech">KANISTECH</b>

            <div className="user-container">
              <b className="user">Usuario</b>
              <a href="#" className="logout-link" onClick={handleLogout}>
                Cerrar Sesión
              </a>
            </div>
          </div>

          <div className="cabecera">
            <div className="fondo-cabecera"></div>
            <b className="auto-water">AUTO WATER </b>
          </div>
          {/* aquí embeber el power bi*/}
          <img className="powerbi-icon" alt="" src={require('../assets/images/user.png').default} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;