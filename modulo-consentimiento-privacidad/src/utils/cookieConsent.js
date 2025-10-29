// cookieConsent.js
// Utilidades para gestionar el consentimiento de cookies

/**
 * Establece una cookie en el navegador
 * @param {string} name - Nombre de la cookie
 * @param {string} value - Valor de la cookie
 * @param {number} days - Días de expiración
 */
export const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

/**
 * Obtiene el valor de una cookie por su nombre
 * @param {string} name - Nombre de la cookie a buscar
 * @returns {string|null} - Valor de la cookie o null si no existe
 */
export const getCookie = (name) => {
  const cookieName = name + "=";
  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
};

/**
 * Elimina una cookie específica
 * @param {string} name - Nombre de la cookie a eliminar
 */
export const deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

/**
 * Guarda el consentimiento del usuario
 * @param {boolean} accepted - true si acepta, false si rechaza
 */
export const saveConsent = (accepted) => {
  const consentValue = accepted ? 'accepted' : 'rejected';
  setCookie('user_cookie_consent', consentValue, 365); // Guarda por 1 año
};

/**
 * Verifica si el usuario ya dio su consentimiento
 * @returns {string|null} - 'accepted', 'rejected' o null si no ha decidido
 */
export const getConsent = () => {
  return getCookie('user_cookie_consent');
};

/**
 * Verifica si las cookies están aceptadas
 * @returns {boolean} - true si están aceptadas
 */
export const areCookiesAccepted = () => {
  return getConsent() === 'accepted';
};

/**
 * Elimina el consentimiento guardado (útil para opt-out)
 */
export const clearConsent = () => {
  deleteCookie('user_cookie_consent');
};