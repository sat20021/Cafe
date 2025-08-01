import React from 'react';
import { Link } from 'react-router-dom';

export default function ContactCTA() {
  return (
    <div className="bg-gray-50 border-t-2 border-orange-500 py-8 mt-12 text-center">
      <h2 className="text-orange-600 mb-2 text-2xl font-semibold">
        Questions? We're here to help!
      </h2>
      <div className="text-gray-800 text-lg mb-5">
        Contact us at <a href="mailto:hello@belacafe.com" className="text-orange-600 hover:text-orange-700 transition-colors">hello@belacafe.com</a> or <a href="tel:+916202606830" className="text-orange-600 hover:text-orange-700 transition-colors">(+91) 6202606830</a>
      </div>
      <div className="mb-5">
        <a
          href="https://wa.me/6202606830"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 hover:bg-green-600 text-white rounded-lg py-3 px-8 text-lg mr-4 font-semibold shadow-md transition-colors duration-200"
        >
          <span role="img" aria-label="WhatsApp" className="mr-2">💬</span>
          Chat on WhatsApp
        </a>
        <Link to="/contact">
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-md">
            Contact Page
          </button>
        </Link>
      </div>
    </div>
  );
} 