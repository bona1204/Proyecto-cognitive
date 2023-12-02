import React, { useState, useEffect } from 'react';
import userIcon from '../assets/images/user.png';
import { Link } from 'react-router-dom'; 
import '../styles/Usuario_crud.css';

function Usuario_crud() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Realizar la solicitud al servidor para obtener la lista de usuarios
    fetch('http://localhost:3001/api/getUsers')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUsers(data.users);
        } else {
          console.error('Error al obtener la lista de usuarios');
        }
      })
      .catch(error => {
        console.error('Error de red:', error);
      });
  }, []); // El segundo parámetro es un array de dependencias, en este caso, vacío para que se ejecute solo una vez al montar el componente

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

            <Link to="/Dashboard_admi" className="Lista_Usuarios">Dashboard</Link>

            <div className="user-container">
              <b className="user">Rosario Quispe</b>
              <span className="logout-link" onClick={handleLogout}>
                Cerrar Sesión
              </span>
            </div>
          </div>

          <div className="cabecera">
            <div className="fondo-cabecera"></div>
            <b className="auto-water"> Lista de Usuarios</b>
          </div>

          {/* Agregar la sección para mostrar la lista de usuarios */}
          <div className="user-list-container">
            <h2>Lista de Usuarios</h2>
  

            <Link to="/usuario_crud_add" className="add_user"> Nuevo Usuario</Link>


            <table className="table">
              <thead align="center">
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.nombre}</td>
                    <td>{user.email}</td>
                    <td align="center">
                      <Link to={`/usuario/update/${user.id}`}>
                        <button className="btn btn-warning btn-flat" title="Actualizar">
                          Actualizar
                        </button>
                      </Link>
                      <Link to={`/usuario/delete/${user.id}`}>
                        <button className="btn btn-danger btn-flat" title="Eliminar">
                          Eliminar
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Fin de la sección de la lista de usuarios */}
        </div>
      </div>
    </div>
  );
}

export default Usuario_crud;
