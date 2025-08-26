import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import useCookieConsent from '../../hooks/useCookieConsent';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasBounced, setHasBounced] = useState(false);
  const { hasMadeChoice, acceptCookies, declineCookies, isLoaded, consent } = useCookieConsent();

  useEffect(() => {
    // Show banner logic
    const showBanner = () => {
      setIsVisible(true);
      setIsAnimating(true);
      
      const bounceTimer = setTimeout(() => {
        setHasBounced(true);
      }, 600);
      
      return () => clearTimeout(bounceTimer);
    };
    
    // Only show banner if user hasn't made a choice
    if (isLoaded && !hasMadeChoice()) {
      const timer = setTimeout(() => {
        showBanner();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasMadeChoice, isLoaded]);

  // Additional effect to hide banner when user makes a choice
  useEffect(() => {
    if (isLoaded && hasMadeChoice() && isVisible) {
      hidePopup();
    }
  }, [isLoaded, hasMadeChoice, isVisible, consent]);

  const handleAccept = () => {
    acceptCookies();
    hidePopup();
  };

  const handleDecline = () => {
    declineCookies();
    hidePopup();
  };

  const hidePopup = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const handlePrivacyPolicyClick = (e) => {
    e.preventDefault();
    window.open('/privacy-policy', '_blank');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Backdrop for accessibility and focus management */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        style={{ opacity: isAnimating ? 1 : 0 }}
        aria-hidden="true"
      />
      
      {/* Cookie Consent Popup */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${
          isAnimating ? 'translate-y-0' : 'translate-y-full'
        } ${hasBounced ? 'animate-bounce-subtle' : ''}`}
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
        aria-modal="true"
      >
        <div className="bg-white dark:bg-gray-800 border-t-4 border-green-500 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-4">
                  {/* Cookie Icon */}
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <svg 
                        className="w-5 h-5 text-green-600 dark:text-green-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                        />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1">
                    <h2 
                      id="cookie-consent-title"
                      className="text-xl font-bold text-gray-900 dark:text-white mb-2"
                    >
                      🍪 We use cookies to enhance your experience
                    </h2>
                    <p 
                      id="cookie-consent-description"
                      className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                      We use cookies and similar technologies to help personalize content, 
                      provide a better user experience, and analyze our traffic. 
                      By clicking "Accept", you consent to our use of cookies. 
                      Learn more in our{' '}
                      <button
                        onClick={handlePrivacyPolicyClick}
                        className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 underline font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded"
                      >
                        Privacy Policy
                      </button>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={hidePopup}
                className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Close cookie consent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-4 sm:ml-12">
              <button
                onClick={handleDecline}
                className="px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800 hover:shadow-md"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-8 py-3 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 border border-transparent rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800 hover:shadow-lg transform hover:scale-105"
              >
                Accept All Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent; 