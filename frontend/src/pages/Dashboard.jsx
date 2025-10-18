import React, { useState, useEffect } from 'react';
import './Page.css';
import apiService from '../services/apiService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    advertisers: 0,
    campaigns: 0,
    ads: 0,
    websites: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Cargar datos de todas las APIs en paralelo
      const [advertisersRes, campaignsRes, adsRes, websitesRes] = await Promise.all([
        apiService.getAdvertisers(),
        apiService.getCampaigns(),
        apiService.getAds(),
        apiService.getWebsites()
      ]);

      setStats({
        advertisers: advertisersRes.count,
        campaigns: campaignsRes.count,
        ads: adsRes.count,
        websites: websitesRes.count
      });
    } catch (error) {
      setError('Error cargando datos del dashboard');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Panel principal del sistema DoubleClick</p>
        </div>
        <div className="page-content">
          <div className="blank-content">
            <h2>Cargando datos...</h2>
            <p>Conectando con la base de datos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Panel principal del sistema DoubleClick</p>
      </div>
      <div className="page-content">
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>📢 Anunciantes</h3>
            <div className="stat-number">{stats.advertisers}</div>
          </div>
          <div className="stat-card">
            <h3>🎯 Campañas</h3>
            <div className="stat-number">{stats.campaigns}</div>
          </div>
          <div className="stat-card">
            <h3>📱 Anuncios</h3>
            <div className="stat-number">{stats.ads}</div>
          </div>
          <div className="stat-card">
            <h3>🌐 Sitios Web</h3>
            <div className="stat-number">{stats.websites}</div>
          </div>
        </div>
        
        {error && (
          <div className="error-message">
            <h3>⚠️ Error</h3>
            <p>{error}</p>
            <button onClick={loadDashboardData} className="retry-btn">
              🔄 Reintentar
            </button>
          </div>
        )}
        
        <div className="blank-content">
          <h2>¡Sistema Conectado!</h2>
          <p>El frontend está conectado con el backend y la base de datos MySQL.</p>
          <p>Puedes navegar por los módulos para gestionar anuncios, campañas y más.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
