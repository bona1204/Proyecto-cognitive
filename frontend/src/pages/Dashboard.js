import React from 'react';
import userIcon from '../assets/images/user.png';
// Importa otras imágenes de manera similar

import '../styles/dashboard.css';

function Dashboard() {
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
                <b className="user">ROSARIO QUISPE</b>
            </div>
           </div>

          <div className="cabecera">
            <div className="fondo-cabecera"></div>
            <b className="auto-water">AUTO WATER </b>
          </div>
          {/* aqui embeber el power bi*/}
          <img className="powerbi-icon" alt="" src={require('../assets/images/user.png').default} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
