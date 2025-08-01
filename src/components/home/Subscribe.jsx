import React, { useState } from 'react';
import ContactCTA from '../common/ContactCTA';

const Subscribe = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert("Thank you for subscribing to Bela's Green Newsletter!");
      setEmail('');
    }
  };

  return (
    <>
      <section style={{ padding: '64px 0', background: 'linear-gradient(90deg, #fffbe6 0%, #f6ffed 100%)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <img src="/images/rasberry.png" alt="Eco Newsletter" style={{ maxWidth: 350, margin: '0 auto' }} />
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Subscribe to Bela's Green Newsletter</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Get the latest on our eco-friendly cakes, green events, and exclusive offers—delivered right to your inbox. Join our community of cake lovers making a difference!
              </p>
              
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div
                  className="shadow-lg flex gap-2 items-center bg-white p-2 hover:shadow-xl duration-300 hover:border-2 border-gray-400 group delay-200 rounded-md"
                >
                  <svg
                    className="group-hover:rotate-[360deg] duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                  >
                    <path
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    ></path>
                    <path d="M22 6l-10 7L2 6"></path>
                  </svg>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 focus:outline-none"
                    placeholder="Email"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group shadow-lg hover:shadow-xl transition-shadow duration-300 mx-auto block"
                >
                  <div
                    className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1024 1024"
                      height="25px"
                      width="25px"
                    >
                      <path
                        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                        fill="#000000"
                      ></path>
                      <path
                        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                        fill="#000000"
                      ></path>
                    </svg>
                  </div>
                  <p className="translate-x-2">Subscribe</p>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
};

export default Subscribe;