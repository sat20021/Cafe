import React from 'react';

export default function VisitUs() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Visit Us</h1>
      <div className="text-center mb-8">
        <img 
          src="/public/images/food-table.jpg" 
          alt="Cafe" 
          className="w-full max-w-lg mx-auto rounded-2xl shadow-lg mb-4" 
        />
        <p className="text-xl text-green-600 font-semibold">Bela – The Eco-Friendly Cake Café</p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Address</h2>
        <p className="text-gray-600 mb-4">123 Green Lane, Eco City, 456789</p>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Hours</h3>
        <p className="text-gray-600">Mon–Sat: 8:00am – 10:00pm<br />Sun: 9:00am – 8:00pm</p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">How to Find Us</h2>
        <iframe
          title="Cafe Location"
          src="https://www.openstreetmap.org/export/embed.html?bbox=77.5946%2C12.9716%2C77.5946%2C12.9716&amp;layer=mapnik"
          className="w-full h-80 border-0 rounded-xl shadow-lg"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Eco Initiatives</h2>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-center space-x-2">
            <span>🌱</span>
            <span>100% biodegradable packaging</span>
          </li>
          <li className="flex items-center space-x-2">
            <span>🚴‍♂️</span>
            <span>Low-emission local delivery</span>
          </li>
          <li className="flex items-center space-x-2">
            <span>♻️</span>
            <span>Zero-waste baking & composting</span>
          </li>
          <li className="flex items-center space-x-2">
            <span>☀️</span>
            <span>Solar-powered kitchen</span>
          </li>
          <li className="flex items-center space-x-2">
            <span>🌳</span>
            <span>We plant a tree for every 100 cakes sold!</span>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Contact</h2>
        <p className="text-gray-600 mb-2">
          Phone: <a href="tel:+91123456789" className="text-orange-600 hover:text-orange-700 transition-colors">(+91) 123 456 789</a>
        </p>
        <p className="text-gray-600">
          Email: <a href="mailto:hello@belacafe.com" className="text-orange-600 hover:text-orange-700 transition-colors">hello@belacafe.com</a>
        </p>
      </div>
    </div>
  );
} 