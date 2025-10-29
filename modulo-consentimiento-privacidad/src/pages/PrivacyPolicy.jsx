// PrivacyPolicy.jsx
// Página de Política de Privacidad con opción de Opt-out

import { useState, useEffect } from 'react';
import { getConsent, clearConsent, saveConsent } from '../utils/cookieConsent';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const [currentConsent, setCurrentConsent] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  // Verificar el estado actual del consentimiento al cargar
  useEffect(() => {
    const consent = getConsent();
    setCurrentConsent(consent);
  }, []);

  // Función para cambiar las preferencias (Opt-out / Opt-in)
  const handleChangePreferences = (accept) => {
    if (accept) {
      saveConsent(true);
      setCurrentConsent('accepted');
    } else {
      clearConsent();
      setCurrentConsent(null);
    }
    setShowMessage(true);
    
    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div className="privacy-policy-page">
      <div className="privacy-policy-container">
        <header className="privacy-header">
          <h1>📋 Política de Privacidad</h1>
          <p className="privacy-date">Última actualización: Octubre 2025</p>
        </header>

        {showMessage && (
          <div className="privacy-message" style={{position: 'sticky', top: '20px', zIndex: 100}}>
            ✅ Tus preferencias han sido actualizadas correctamente
          </div>
        )}

        <section className="privacy-section">
          <h2>1. Introducción</h2>
          <p>
            En nuestra plataforma de gestión de anuncios, nos tomamos muy en serio 
            la privacidad de nuestros usuarios. Esta política describe cómo 
            recopilamos, utilizamos y protegemos tu información personal.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Información que Recopilamos</h2>
          <p>Recopilamos los siguientes tipos de información:</p>
          <ul>
            <li><strong>Cookies propias:</strong> Utilizamos cookies para identificar usuarios de manera anónima.</li>
            <li><strong>Datos de navegación:</strong> Registramos impresiones y clics en anuncios.</li>
            <li><strong>Información técnica:</strong> Dirección IP, tipo de navegador, y sistema operativo.</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>3. Uso de Cookies</h2>
          <p>
            Utilizamos cookies propias (first-party cookies) para mejorar tu experiencia 
            y analizar el rendimiento de nuestros anuncios. Estas cookies no se comparten 
            con terceros y son exclusivamente para uso interno de nuestra plataforma.
          </p>
          <div className="cookie-types">
            <div className="cookie-type">
              <h4>🔧 Cookies Técnicas</h4>
              <p>Necesarias para el funcionamiento básico del sitio.</p>
            </div>
            <div className="cookie-type">
              <h4>📊 Cookies Analíticas</h4>
              <p>Para medir el rendimiento y mejorar nuestros servicios.</p>
            </div>
          </div>
        </section>

        <section className="privacy-section">
          <h2>4. Tus Derechos</h2>
          <p>Tienes derecho a:</p>
          <ul>
            <li>Aceptar o rechazar el uso de cookies en cualquier momento</li>
            <li>Acceder a la información que tenemos sobre ti</li>
            <li>Solicitar la eliminación de tus datos</li>
            <li>Cambiar tus preferencias de consentimiento</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>5. Gestión de Preferencias</h2>
          <p>
            Estado actual de tus cookies: 
            <strong className={`consent-status ${currentConsent === 'accepted' ? 'accepted' : 'rejected'}`}>
              {currentConsent === 'accepted' ? ' ✅ Aceptadas' : 
               currentConsent === 'rejected' ? ' ❌ Rechazadas' : 
               ' ⚠️ Sin definir'}
            </strong>
          </p>
          <div className="preference-buttons">
            <button 
              onClick={() => handleChangePreferences(true)}
              className="preference-btn accept-btn"
              disabled={currentConsent === 'accepted'}
            >
              Aceptar Cookies
            </button>
            <button 
              onClick={() => handleChangePreferences(false)}
              className="preference-btn reject-btn"
              disabled={!currentConsent}
            >
              Rechazar Cookies (Opt-out)
            </button>
          </div>
        </section>

        <section className="privacy-section">
          <h2>6. Contacto</h2>
          <p>
            Si tienes preguntas sobre esta política de privacidad, puedes contactarnos en:
          </p>
          <p><strong>Email:</strong> privacidad@plataformaanuncios.com</p>
        </section>

        <footer className="privacy-footer">
          <a href="/" className="back-link">← Volver al inicio</a>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;