import { useState, useEffect } from 'react';

const useCookieConsent = () => {
  const [consent, setConsent] = useState(null);
  const [consentDate, setConsentDate] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load consent from localStorage on mount
    const storedConsent = localStorage.getItem('cookieConsent');
    const storedDate = localStorage.getItem('cookieConsentDate');
    
    if (storedConsent) {
      setConsent(storedConsent);
      setConsentDate(storedDate ? new Date(storedDate) : null);
    }
    setIsLoaded(true);
  }, []);

  const acceptCookies = () => {
    const now = new Date().toISOString();
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', now);
    setConsent('accepted');
    setConsentDate(new Date(now));
  };

  const declineCookies = () => {
    const now = new Date().toISOString();
    localStorage.setItem('cookieConsent', 'declined');
    localStorage.setItem('cookieConsentDate', now);
    setConsent('declined');
    setConsentDate(new Date(now));
  };

  const clearConsent = () => {
    localStorage.removeItem('cookieConsent');
    localStorage.removeItem('cookieConsentDate');
    setConsent(null);
    setConsentDate(null);
  };

  // Function to reset consent for testing (only in development)
  const resetForTesting = () => {
    if (process.env.NODE_ENV === 'development') {
      clearConsent();
    }
  };

  const hasConsented = () => consent === 'accepted';
  const hasDeclined = () => consent === 'declined';
  
  // Check localStorage directly to avoid state initialization issues
  const hasMadeChoice = () => {
    const storedConsent = localStorage.getItem('cookieConsent');
    const result = storedConsent !== null;
    return result;
  };

  return {
    consent,
    consentDate,
    isLoaded,
    acceptCookies,
    declineCookies,
    clearConsent,
    resetForTesting,
    hasConsented,
    hasDeclined,
    hasMadeChoice,
  };
};

export default useCookieConsent; 