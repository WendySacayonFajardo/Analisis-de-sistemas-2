import React from 'react';
import './Page.css';

const Dashboard = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Panel principal del sistema DoubleClick</p>
      </div>
      <div className="page-content">
        <div className="blank-content">
          <h2>Bienvenido al Dashboard</h2>
          <p>Esta es la página principal del sistema.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
