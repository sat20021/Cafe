import React, { useState } from 'react';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="space-y-2 text-gray-700">
          <p><b>Address:</b> 123 Green Lane, Eco City, 456789</p>
          <p><b>Phone:</b> <a href="tel:+916202606830" className="text-orange-600 hover:text-orange-700 transition-colors">(+91) 6202606830</a></p>
          <p><b>WhatsApp:</b> <a href="https://wa.me/6202606830" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 transition-colors">91 6202606830</a></p>
          <p><b>Email:</b> <a href="mailto:hello@belacafe.com" className="text-orange-600 hover:text-orange-700 transition-colors">hello@belacafe.com</a></p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          name="name" 
          placeholder="Your Name" 
          value={form.name} 
          onChange={handleChange} 
          required 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <input 
          name="email" 
          placeholder="Your Email" 
          value={form.email} 
          onChange={handleChange} 
          required 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <textarea 
          name="message" 
          placeholder="Your Message" 
          value={form.message} 
          onChange={handleChange} 
          required 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
          rows="5"
        />
        <button 
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          type="submit"
        >
          Send Message
        </button>
      </form>
      {sent && (
        <div className="text-green-600 text-center mt-6 p-4 bg-green-50 rounded-lg">
          Thank you! We'll get back to you soon.
        </div>
      )}
      
      {/* WhatsApp Contact Button */}
      <div className="mt-8 text-center">
        <a
          href="https://wa.me/6202606830"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white rounded-lg py-3 px-6 text-lg font-semibold shadow-md transition-colors duration-200"
        >
          <span role="img" aria-label="WhatsApp" className="mr-2 text-xl">💬</span>
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
} 