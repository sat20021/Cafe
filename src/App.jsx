import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import coffeeSteam from './assets/lottie/coffee-steam.json';
import coffeeBean from './assets/lottie/coffee-bean.json';
import ContactCTA from './components/common/ContactCTA';
import ThemeToggle from './components/common/ThemeToggle';
import CookieConsent from './components/common/CookieConsent';
import useCookieConsent from './hooks/useCookieConsent';
import UserDropdown from './components/auth/UserDropdown';
import LoginButton from './components/auth/LoginButton';
import LoginModal from './components/auth/LoginModal';
import cartService from './services/cartService';
import { toast } from 'sonner';
import About from './components/home/About';
import Hero from './components/home/Hero';
import TopProducts from './components/home/TopProducts';
import Services from './components/home/Services';
import BigDeal from './components/home/BigDeal';
import LatestNews from './components/home/LatestNews';
import Subscribe from './components/home/Subscribe';
import DemoSection from './components/home/DemoSection';
import OrderOnline from './pages/OrderOnline';
import VisitUs from './pages/VisitUs';
import Sustainability from './pages/Sustainability';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import ContactUs from './pages/ContactUs';
import FAQs from './pages/FAQs';

import testAnimation from './assets/lottie/test-animation.json';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivacyPolicy from './pages/PrivacyPolicy';

import './App.css';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/about', label: 'About Us' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
];

function Placeholder({ title, children }) {
  return (
    <div className="py-12 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">{title}</h1>
      <div className="max-w-4xl mx-auto text-gray-800 text-lg">{children}</div>
    </div>
  );
}

function ProtectedRoute({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginMode, setLoginMode] = useState('login');
  const [user, setUser] = useState(null); // null = not logged in
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const beanRef = useRef();
  const { resetForTesting } = useCookieConsent();

  // On app load, read user from localStorage and load cart
  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      const userData = JSON.parse(stored);
      setUser(userData);
      // Load user's cart
      const userCart = cartService.getUserCart(userData.id);
      setCartCount(cartService.getCartCount(userData.id));
    } else {
      // Load guest cart
      setCartCount(cartService.getCartCount());
    }
  }, []);

  // Handle login success
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    // Merge guest cart with user cart
    const mergedCart = cartService.mergeCartOnLogin(userData.id);
    setCartCount(cartService.getCartCount(userData.id));
    
    // Show success message
    toast.success(`Welcome back, ${userData.name}! Your cart has been synced.`);
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    // Clear cart count
    setCartCount(0);
  };

  // Handle opening login modal
  const handleOpenLoginModal = (mode) => {
    setLoginMode(mode);
    setLoginModalOpen(true);
  };

  // Handle cart updates
  const handleCartUpdate = () => {
    if (user) {
      setCartCount(cartService.getCartCount(user.id));
    } else {
      setCartCount(cartService.getCartCount());
    }
  };

  // Listen for cart changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'miniCafeCart' || e.key?.startsWith('miniCafeUserCart')) {
        handleCartUpdate();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user]);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        document.body.classList.add('scrolled');
        setIsScrolled(true);
      } else {
        document.body.classList.remove('scrolled');
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleLinkClick = (e) => {
    // Ripple effect
    const link = e.currentTarget;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = link.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    link.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
    setMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav 
        className={`bg-white shadow-lg fixed top-0 left-0 right-0 z-1000 transition-all duration-300 ${isScrolled ? 'py-2 scrolled' : 'py-4'}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          width: '100%'
        }}
      >
        <div className={`container mx-auto px-4 flex items-center justify-between ${isScrolled ? 'py-2' : 'py-4'}`}>
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}> 
            <img src="/icons/bela-logo.svg" alt="Bela Logo" className="h-8" />
            <div style={{ width: 32, height: 32 }}>
              <Lottie animationData={testAnimation} loop autoplay style={{ width: '100%', height: '100%' }} />
            </div>
            <span className="text-2xl font-bold text-green-600">Bela</span>
          </div>
          {/* Desktop nav */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="flex space-x-2 border-[3px] border-amber-300 rounded-xl select-none">
              {navItems.map((item) => (
                <label
                  key={item.path}
                  className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="nav-radio"
                    value={item.path}
                    className="peer hidden"
                    checked={location.pathname === item.path}
                    readOnly
                  />
                  <Link
                    to={item.path}
                    className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-amber-600 peer-checked:to-orange-700 peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out block w-full text-center"
                  >
                    {item.label}
                  </Link>
                </label>
              ))}
            </div>
          </div>
          {/* Right side: search, lang, social, login, cart */}
          <div className="flex items-center space-x-2">
            {/* Search bar (hidden on mobile) */}
            <input type="text" placeholder="Search..." className="hidden lg:block border rounded px-2 py-1 text-sm mr-2" style={{ minWidth: 120 }} />
            {/* Theme toggle */}
            <ThemeToggle className="hidden lg:block" />
            {/* Language switcher (placeholder) */}
            <button className="hidden lg:block px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200">EN</button>
            {/* Auth Section */}
            {user ? (
              <UserDropdown user={user} onLogout={handleLogout} />
            ) : (
              <LoginButton onOpenModal={handleOpenLoginModal} />
            )}
            {/* Cart icon */}
            <button className="ml-2 relative p-2 rounded-full hover:bg-green-100 transition-colors" onClick={() => navigate('/cart')}>
              <span role="img" aria-label="cart" className="text-2xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs rounded-full px-1" style={{ fontSize: 10 }}>{cartCount}</span>
              )}
            </button>
            {/* Hamburger for mobile */}
            <button className="flex flex-col space-y-1 p-2 z-50 lg:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle navigation">
              <span className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </div>
        {/* Mobile nav dropdown */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setMenuOpen(false)}>
            <div className="absolute top-20 left-0 right-0 bg-white shadow-lg flex flex-col items-center space-y-2 py-4 z-50" onClick={e => e.stopPropagation()}>
              <div className="flex flex-col space-y-2 border-[3px] border-amber-300 rounded-xl select-none w-full max-w-xs mx-4">
                {navItems.map((item) => (
                  <label
                    key={item.path}
                    className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="nav-radio-mobile"
                      value={item.path}
                      className="peer hidden"
                      checked={location.pathname === item.path}
                      readOnly
                    />
                    <Link
                      to={item.path}
                      className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-amber-600 peer-checked:to-orange-700 peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out block w-full text-center"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </label>
                ))}
              </div>
              {user ? (
                <div className="w-full px-4 py-2">
                  <div className="flex items-center">
                    <span className="mr-2">👤</span>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <button className="w-full text-left px-2 py-1 text-sm hover:bg-green-50 rounded" onClick={() => { setMenuOpen(false); navigate('/orders'); }}>
                      🛒 My Orders
                    </button>
                    <button className="w-full text-left px-2 py-1 text-sm hover:bg-green-50 rounded" onClick={() => { setMenuOpen(false); navigate('/profile'); }}>
                      👤 Profile
                    </button>
                    <button className="w-full text-left px-2 py-1 text-sm hover:bg-red-50 text-red-600 rounded" onClick={() => { handleLogout(); setMenuOpen(false); }}>
                      🚪 Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button className="w-full text-left px-4 py-2 hover:bg-green-50" onClick={() => { handleOpenLoginModal('login'); setMenuOpen(false); }}>
                  Login / Register
                </button>
              )}
              <button className="w-full text-left px-4 py-2 hover:bg-green-50 flex items-center" onClick={() => { setMenuOpen(false); navigate('/cart'); }}>
                <span role="img" aria-label="cart" className="text-2xl">🛒</span>
                <span className="ml-2">Cart</span>
                {cartCount > 0 && (
                  <span className="ml-2 bg-orange-500 text-white text-xs rounded-full px-1" style={{ fontSize: 10 }}>{cartCount}</span>
                )}
              </button>
              {/* Social icons, language, search (optional for mobile) */}
              <div className="flex space-x-2 mt-2">
                <ThemeToggle className="lg:hidden" />
                <button className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200">EN</button>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Routes and rest of the app remain unchanged */}
      <Routes>
        <Route path="/" element={<><Hero /><About /><TopProducts /><Services /><BigDeal /><LatestNews /><Subscribe /></>} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<TopProducts />} />
        <Route path="/order" element={<OrderOnline />} />
        <Route path="/visit" element={<VisitUs />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<FAQs />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<ProtectedRoute user={user}><Orders /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute user={user}><Profile /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <footer className="bg-gray-800 text-white py-8 text-center mt-12">
        <div className="mb-2">
          Bela – The Eco-Friendly Cake Café &copy; {new Date().getFullYear()} | 
          <a href="mailto:hello@belacafe.com" className="text-orange-400 hover:text-orange-300 transition-colors ml-1">hello@belacafe.com</a>
        </div>
        <div className="mb-4">
          <a href="https://wa.me/6202606830" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors">
            💬 WhatsApp: 91 6202606830
          </a>
        </div>
        {/* Social Media Icons */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
              <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5"></path>
            </clipPath>
          </defs>
        </svg>

        <div className="relative flex justify-center">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
          ></div>

          <div className="relative flex items-end gap-x-2 p-2">
            <div className="relative">
              <div
                style={{ clipPath: 'url(#squircleClip)' }}
                className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg border border-gray-600/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="relative">
              <div
                style={{ clipPath: 'url(#squircleClip)' }}
                className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg border border-blue-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="relative">
              <div
                style={{ clipPath: 'url(#squircleClip)' }}
                className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg border border-red-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="relative">
              <div
                style={{ clipPath: 'url(#squircleClip)' }}
                className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center shadow-lg border border-indigo-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      
      {/* Cookie Consent Popup */}
      <CookieConsent />
      
      {/* Development Test Button - Only visible in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
          <button
            onClick={resetForTesting}
            className="px-3 py-2 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
            title="Reset cookie consent for testing"
          >
            🍪 Reset Cookie Consent
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('cookieConsent');
              localStorage.removeItem('cookieConsentDate');
              window.location.reload();
            }}
            className="px-3 py-2 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
            title="Force show cookie banner"
          >
            🍪 Force Show Banner
          </button>
        </div>
      )}
    </>
  );
}