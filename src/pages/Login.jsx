import React, { useEffect, useState } from "react";
import LoginForm from '../components/auth/LoginForm';
import { FaCoffee, FaBirthdayCake, FaStar, FaHeart, FaUsers, FaClock, FaShieldAlt, FaUserCheck, FaLeaf, FaSmile, FaMusic, FaGem } from 'react-icons/fa';

export default function Login() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [floatingElements, setFloatingElements] = useState([]);

  // Mouse tracking for dynamic effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][Math.floor(Math.random() * 6)]
      }));
      setParticles(newParticles);
    };

    const generateFloatingElements = () => {
      const elements = [
        { icon: FaCoffee, color: '#8B4513', size: 20, delay: 0 },
        { icon: FaBirthdayCake, color: '#FF69B4', size: 18, delay: 1 },
        { icon: FaStar, color: '#FFD700', size: 16, delay: 2 },
        { icon: FaHeart, color: '#FF6B6B', size: 14, delay: 3 },
        { icon: FaLeaf, color: '#32CD32', size: 12, delay: 4 },
        { icon: FaSmile, color: '#FFA500', size: 15, delay: 5 },
        { icon: FaMusic, color: '#9370DB', size: 13, delay: 6 },
        { icon: FaGem, color: '#00CED1', size: 17, delay: 7 }
      ];
      setFloatingElements(elements);
    };

    generateParticles();
    generateFloatingElements();
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.speed,
        x: particle.x + Math.sin(particle.y * 0.01) * 0.5,
        opacity: particle.opacity + Math.sin(Date.now() * 0.001) * 0.1
      })).filter(particle => particle.y > -10));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 animate-gradient">
        {/* Dynamic gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 107, 107, 0.3) 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`
          }}
        />
      ))}

      {/* Floating Icons */}
      {floatingElements.map((element, index) => {
        const Icon = element.icon;
        return (
          <div
            key={index}
            className="absolute pointer-events-none animate-float-gentle"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          >
            <Icon 
              size={element.size} 
              color={element.color}
              className="opacity-20 hover:opacity-40 transition-opacity duration-300"
            />
          </div>
        );
      })}

      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-orange-50 to-green-50 py-12 px-8 relative z-10">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-300 rounded-full blur-3xl animate-pulse opacity-20"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-300 rounded-full blur-3xl animate-pulse opacity-20" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-300 rounded-full blur-3xl animate-pulse opacity-20" style={{animationDelay: '2s'}}></div>
        </div>
        
        <LoginForm />
      </div>

      {/* Right Side - 3D Illustration & Cafe Details */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-300 rounded-full blur-3xl animate-bounce"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-300 rounded-full blur-3xl animate-bounce" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-300 rounded-full blur-3xl animate-bounce" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-12 py-8">
          {/* 3D Coffee Cup Illustration with enhanced animations */}
          <div className="mb-8 transform hover:scale-105 transition-transform duration-500 animate-float-gentle">
            <div className="relative">
              {/* Coffee Cup with steam animation */}
              <div className="w-48 h-40 bg-gradient-to-r from-amber-200 to-amber-300 rounded-t-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 relative animate-pulse">
                {/* Cup Handle */}
                <div className="absolute -right-4 top-8 w-8 h-16 border-4 border-amber-300 rounded-r-full"></div>
                {/* Coffee Liquid with wave effect */}
                <div className="absolute inset-2 bg-gradient-to-r from-amber-600 to-amber-800 rounded-t-2xl animate-wave"></div>
                {/* Enhanced Steam */}
                <div className="absolute -top-4 left-1/4 w-2 h-6 bg-gray-300 rounded-full opacity-60 animate-steam"></div>
                <div className="absolute -top-6 left-1/3 w-1 h-4 bg-gray-300 rounded-full opacity-40 animate-steam" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute -top-5 right-1/3 w-1.5 h-5 bg-gray-300 rounded-full opacity-50 animate-steam" style={{animationDelay: '1s'}}></div>
                <div className="absolute -top-7 left-1/2 w-1 h-3 bg-gray-300 rounded-full opacity-30 animate-steam" style={{animationDelay: '1.5s'}}></div>
              </div>
              
              {/* Saucer with glow effect */}
              <div className="absolute -bottom-2 left-2 w-44 h-6 bg-gradient-to-r from-amber-100 to-amber-200 rounded-full shadow-lg animate-glow"></div>
            </div>
          </div>

          {/* Real Coffee Images Gallery with enhanced animations */}
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-md">
            {[
              { src: "/images/coffee.jpg", alt: "Artisan Coffee", delay: 0 },
              { src: "/images/donut.jpg", alt: "Fresh Donut", delay: 0.1 },
              { src: "/images/cupcake.png", alt: "Delicious Cupcake", delay: 0.2 },
              { src: "/images/food-table.jpg", alt: "Cafe Table", delay: 0.3 },
              { src: "/images/salad-table.jpg", alt: "Fresh Salad", delay: 0.4 },
              { src: "/images/jars.jpg", alt: "Cafe Jars", delay: 0.5 }
            ].map((image, index) => (
              <div 
                key={index}
                className="transform hover:scale-110 transition-transform duration-300 animate-fade-in-up"
                style={{ animationDelay: `${image.delay}s` }}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-20 h-20 object-cover rounded-lg shadow-lg border-2 border-white hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
            ))}
          </div>

          {/* Cafe Title with animated gradient */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-gradient-text">
            Welcome Back to Mini Cafe
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 max-w-md animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            Sign in to access your account and enjoy our delicious offerings
          </p>

          {/* Login Benefits with enhanced animations */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {[
              { icon: FaUserCheck, title: "Quick Access", desc: "Save your preferences", color: "text-green-600", delay: 0.7 },
              { icon: FaShieldAlt, title: "Secure Login", desc: "Your data is protected", color: "text-blue-600", delay: 0.8 },
              { icon: FaHeart, title: "Personalized", desc: "Tailored experience", color: "text-red-500", delay: 0.9 },
              { icon: FaClock, title: "Fast Service", desc: "Quick and easy", color: "text-purple-600", delay: 1.0 }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/40 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${benefit.delay}s` }}
              >
                <benefit.icon className={`w-8 h-8 ${benefit.color} mb-2 animate-bounce`} style={{animationDelay: `${benefit.delay + 0.5}s`}} />
                <h3 className="font-semibold text-gray-800">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats with counting animation */}
          <div className="flex items-center justify-center space-x-8 text-center">
            {[
              { number: "1000+", label: "Active Members", color: "text-orange-600" },
              { number: "24/7", label: "Online Access", color: "text-pink-600" },
              { number: "99.9%", label: "Uptime", color: "text-purple-600" }
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center animate-fade-in-up" style={{animationDelay: `${1.1 + index * 0.1}s`}}>
                <div className={`text-2xl font-bold ${stat.color} animate-count-up`}>{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Special Message with enhanced animation */}
          <div className="mt-8 p-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl text-white shadow-lg transform hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{animationDelay: '1.4s'}}>
            <div className="flex items-center justify-center space-x-2">
              <FaStar className="w-5 h-5 animate-spin" />
              <span className="font-semibold">Welcome back! We missed you!</span>
              <FaStar className="w-5 h-5 animate-spin" style={{animationDirection: 'reverse'}} />
            </div>
          </div>

          {/* Enhanced Floating Elements */}
          <div className="absolute top-20 right-20 animate-bounce">
            <div className="w-6 h-6 bg-yellow-400 rounded-full shadow-lg animate-pulse"></div>
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
          <div className="absolute bottom-1/4 right-1/4 animate-bounce" style={{animationDelay: '1s'}}>
            <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg"></div>
          </div>
          <div className="absolute top-1/2 right-1/4 animate-pulse" style={{animationDelay: '2s'}}>
            <div className="w-7 h-7 bg-blue-400 rounded-full shadow-lg opacity-40"></div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent"></div>
      </div>
    </div>
  );
} 