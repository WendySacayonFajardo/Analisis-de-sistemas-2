// App.jsx
// Componente principal de la aplicación

import { useState } from 'react';
import CookieBanner from './Components/CookieBanner';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './App.css';

function App() {
  // Estado para controlar qué página mostrar
  const [currentPage, setCurrentPage] = useState('home');

  // Función para navegar entre páginas
  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll al inicio
  };

  // Renderizar la página según el estado
  const renderPage = () => {
    if (currentPage === 'privacy') {
      return <PrivacyPolicy />;
    }

    // Página de inicio (home)
    return (
      <div className="home-page">
        <div className="home-container">
          <header className="home-header">
            <h1>🎯 Plataforma de Gestión de Anuncios</h1>
            <p className="home-subtitle">Sistema de publicidad con respeto a la privacidad</p>
          </header>

          <section className="home-content">
            <div className="feature-card">
              <div className="feature-icon">📢</div>
              <h2>Gestión de Anuncios</h2>
              <p>Crea, edita y gestiona tus campañas publicitarias de manera eficiente.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h2>Reportes Detallados</h2>
              <p>Analiza el rendimiento con métricas de impresiones, clics y CTR.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h2>Privacidad Garantizada</h2>
              <p>Respetamos tu privacidad con cookies propias y control total.</p>
            </div>
          </section>

          <section className="demo-section">
            <h2>Módulo de Consentimiento y Privacidad</h2>
            <p>
              Este es el módulo de gestión de consentimiento de cookies. 
              El banner aparece automáticamente cuando no hay preferencias guardadas.
            </p>
            <button 
              onClick={() => navigateTo('privacy')}
              className="privacy-button"
            >
              Ver Política de Privacidad
            </button>
          </section>

          <footer className="home-footer">
            <p>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('privacy'); }}>
                Política de Privacidad
              </a>
              {' '} | {' '}
              <a href="#" onClick={(e) => e.preventDefault()}>
                Términos de Uso
              </a>
            </p>
            <p className="copyright">© 2025 Plataforma de Anuncios - Proyecto Análisis II</p>
          </footer>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      {/* El banner de cookies se muestra en todas las páginas */}
      <CookieBanner />
      
      {/* Navegación simple */}
      {currentPage === 'privacy' && (
        <button 
          onClick={() => navigateTo('home')}
          className="back-button"
        >
          ← Volver al inicio
        </button>
      )}
      
      {/* Renderizar la página actual */}
      {renderPage()}
    </div>
  );
}

export default App;