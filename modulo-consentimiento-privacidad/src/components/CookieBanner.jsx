// CookieBanner.jsx
// Componente del banner de cookies que aparece en la parte superior

import { useState, useEffect } from 'react';
import { saveConsent, getConsent } from '../utils/cookieConsent';
import './CookieBanner.css';

const CookieBanner = () => {
  // Estado para controlar si el banner está visible
  const [isVisible, setIsVisible] = useState(false);

  // Al cargar el componente, verificar si ya hay consentimiento
  useEffect(() => {
    const consent = getConsent();
    // Si no hay consentimiento guardado, mostrar el banner
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  // Función cuando el usuario acepta las cookies
  const handleAccept = () => {
    saveConsent(true); // Guarda que aceptó
    setIsVisible(false); // Oculta el banner
  };

  // Función cuando el usuario rechaza las cookies
  const handleReject = () => {
    saveConsent(false); // Guarda que rechazó
    setIsVisible(false); // Oculta el banner
  };

  // Si no es visible, no renderizar nada
  if (!isVisible) {
    return null;
  }

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-content">
        <div className="cookie-banner-text">
          <h3>🍪 Este sitio usa cookies</h3>
          <p>
            Utilizamos cookies propias para mejorar tu experiencia de navegación 
            y analizar el uso del sitio. Al hacer clic en "Aceptar", aceptas el 
            uso de estas cookies. Puedes cambiar tus preferencias en cualquier momento.
          </p>
          <a href="/privacy-policy" className="cookie-banner-link">
            Ver Política de Privacidad
          </a>
        </div>
        
        <div className="cookie-banner-buttons">
          <button 
            onClick={handleReject} 
            className="cookie-btn cookie-btn-reject"
          >
            Rechazar
          </button>
          <button 
            onClick={handleAccept} 
            className="cookie-btn cookie-btn-accept"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;