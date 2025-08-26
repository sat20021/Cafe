/**
 * Cookie utility functions for GDPR compliance
 */

// Check if cookies are accepted
export const areCookiesAccepted = () => {
  return localStorage.getItem('cookieConsent') === 'accepted';
};

// Check if user has made a choice about cookies
export const hasCookieConsent = () => {
  return localStorage.getItem('cookieConsent') !== null;
};

// Get consent date
export const getConsentDate = () => {
  const date = localStorage.getItem('cookieConsentDate');
  return date ? new Date(date) : null;
};

// Set a cookie with consent check
export const setCookie = (name, value, days = 365) => {
  if (!areCookiesAccepted()) {
    console.warn('Cookies not accepted, cannot set cookie:', name);
    return false;
  }

  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  return true;
};

// Get a cookie value
export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  
  return null;
};

// Delete a cookie
export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Clear all cookies (except essential ones)
export const clearAllCookies = () => {
  const cookies = document.cookie.split(";");
  
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    
    // Don't delete essential cookies like session cookies
    if (name && !name.startsWith('session') && !name.startsWith('auth')) {
      deleteCookie(name);
    }
  }
};

// Analytics consent check
export const canTrackAnalytics = () => {
  return areCookiesAccepted();
};

// Marketing consent check
export const canTrackMarketing = () => {
  return areCookiesAccepted();
};

// Functional cookies consent check
export const canUseFunctionalCookies = () => {
  return areCookiesAccepted();
};

// Essential cookies are always allowed
export const canUseEssentialCookies = () => {
  return true;
}; 