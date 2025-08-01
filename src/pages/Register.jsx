import React from "react";
import RegisterForm from '../components/auth/RegisterForm';
import { FaCoffee, FaBirthdayCake, FaStar, FaHeart, FaUsers, FaClock } from 'react-icons/fa';

export default function Register() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Registration Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-orange-50 to-green-50 py-12 px-8">
        <RegisterForm />
      </div>

      {/* Right Side - 3D Illustration & Cafe Details */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-300 rounded-full blur-3xl"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-12 py-8">
          {/* 3D Cake Illustration */}
          <div className="mb-8 transform hover:scale-105 transition-transform duration-500">
            <div className="relative">
              {/* Cake Base */}
              <div className="cake-layer w-48 h-32 bg-gradient-to-r from-pink-300 to-purple-300 rounded-t-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"></div>
              
              {/* Cake Middle Layer */}
              <div className="cake-layer absolute top-4 left-4 w-40 h-24 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-t-2xl shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-500"></div>
              
              {/* Cake Top Layer */}
              <div className="cake-layer absolute top-8 left-8 w-32 h-16 bg-gradient-to-r from-white to-pink-100 rounded-t-xl shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-500"></div>
              
              {/* Cake Decoration */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-400 rounded-full shadow-md animate-pulse"></div>
              <div className="absolute top-6 left-1/3 w-3 h-3 bg-yellow-400 rounded-full shadow-md animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-6 right-1/3 w-3 h-3 bg-blue-400 rounded-full shadow-md animate-pulse" style={{animationDelay: '1s'}}></div>
              
              {/* Candle */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-yellow-300 rounded-full shadow-md"></div>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Real Cake Images Gallery */}
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-md">
            <div className="transform hover:scale-110 transition-transform duration-300">
              <img 
                src="/cake/cake1.webp" 
                alt="Delicious Cake" 
                className="w-20 h-20 object-cover rounded-lg shadow-lg border-2 border-white"
              />
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <img 
                src="/cake/cake2.jpg" 
                alt="Beautiful Cake" 
                className="w-20 h-20 object-cover rounded-lg shadow-lg border-2 border-white"
              />
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <img 
                src="/cake/cake3.webp" 
                alt="Special Cake" 
                className="w-20 h-20 object-cover rounded-lg shadow-lg border-2 border-white"
              />
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <img 
                src="/cake/cake4.jpg" 
                alt="Vanilla Cake" 
                className="w-20 h-20 object-cover rounded-lg shadow-lg border-2 border-white"
              />
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <img 
                src="/cake/Vanilla-Cake-1.jpg" 
                alt="Vanilla Cake" 
                className="w-20 h-20 object-cover rounded-lg shadow-lg border-2 border-white"
              />
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <img 
                src="/cake/cake 7.webp" 
                alt="Special Cake" 
                className="w-20 h-20 object-cover rounded-lg shadow-lg border-2 border-white"
              />
            </div>
          </div>

          {/* Cafe Title */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Mini Cafe
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 max-w-md">
            Experience the perfect blend of comfort, creativity, and culinary excellence
          </p>

          {/* Cafe Features */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col items-center p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/40 transition-all duration-300 transform hover:scale-105">
              <FaCoffee className="w-8 h-8 text-orange-600 mb-2" />
              <h3 className="font-semibold text-gray-800">Artisan Coffee</h3>
              <p className="text-sm text-gray-600">Handcrafted with love</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/40 transition-all duration-300 transform hover:scale-105">
              <FaBirthdayCake className="w-8 h-8 text-pink-600 mb-2" />
              <h3 className="font-semibold text-gray-800">Fresh Pastries</h3>
              <p className="text-sm text-gray-600">Baked daily</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/40 transition-all duration-300 transform hover:scale-105">
              <FaHeart className="w-8 h-8 text-red-500 mb-2" />
              <h3 className="font-semibold text-gray-800">Cozy Atmosphere</h3>
              <p className="text-sm text-gray-600">Perfect for relaxation</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/40 transition-all duration-300 transform hover:scale-105">
              <FaUsers className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-800">Community</h3>
              <p className="text-sm text-gray-600">Join our family</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-8 text-center">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-orange-600">500+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-pink-600">50+</div>
              <div className="text-sm text-gray-600">Unique Recipes</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-purple-600">4.9</div>
              <div className="flex items-center text-sm text-gray-600">
                <FaStar className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                Rating
              </div>
            </div>
          </div>

          {/* Special Offer */}
          <div className="mt-8 p-4 bg-gradient-to-r from-orange-400 to-pink-400 rounded-xl text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center space-x-2">
              <FaStar className="w-5 h-5" />
              <span className="font-semibold">Get 20% off on your first order!</span>
              <FaStar className="w-5 h-5" />
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 right-20 animate-bounce">
            <div className="w-6 h-6 bg-yellow-400 rounded-full shadow-lg"></div>
          </div>
          <div className="absolute bottom-32 left-16 animate-pulse">
            <div className="w-4 h-4 bg-pink-400 rounded-full shadow-lg"></div>
          </div>
          <div className="absolute top-1/3 right-8 animate-spin-slow">
            <div className="w-8 h-8 bg-purple-400 rounded-full shadow-lg opacity-60"></div>
          </div>
          <div className="absolute top-1/4 left-8 animate-float-gentle">
            <div className="w-5 h-5 bg-orange-400 rounded-full shadow-lg"></div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent"></div>
      </div>
    </div>
  );
} 