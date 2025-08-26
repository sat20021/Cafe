import React, { useState } from 'react';
import { FaTimes, FaGoogle, FaGithub, FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { authAPI } from '../../services/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [validationErrors, setValidationErrors] = useState({});

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};
    
    if (!isLogin && !formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!isLogin && formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      let response;
      
      if (isLogin) {
        response = await authAPI.login({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          userType: 'user'
        });
      } else {
        response = await authAPI.register({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          userType: 'user'
        });
      }

      // Handle successful login/register
      if (response.success || response.status === 'success' || response.message) {
        const token = response.data?.token || response.token;
        const userData = response.data?.user || response.user || {
          id: response.id,
          email: formData.email,
          role: 'user',
          name: response.fullName || response.name || formData.name || 'User'
        };

        if (token) {
          localStorage.setItem('token', token);
        }
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        const successMessage = response.message || `Welcome, ${userData.name}!`;
        
        Swal.fire({ 
          title: successMessage, 
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          position: 'top-end',
          toast: true,
          width: '300px',
          background: '#10b981',
          color: '#ffffff'
        });
        
        onLoginSuccess(userData);
        onClose();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          `${isLogin ? 'Login' : 'Registration'} failed. Please try again.`;
      
      Swal.fire({ 
        title: errorMessage, 
        icon: 'error',
        timer: 4000,
        showConfirmButton: false,
        position: 'top-end',
        toast: true,
        width: '300px',
        background: '#ef4444',
        color: '#ffffff'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    // Mock Google login - in real app, integrate with Google OAuth
    const mockUser = {
      id: Date.now(),
      name: 'Google User',
      email: 'google@example.com',
      photoURL: 'https://via.placeholder.com/150',
      role: 'user'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    onLoginSuccess(mockUser);
    onClose();
    
    toast.success('Logged in with Google!');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-0 relative animate-in zoom-in-95 duration-300">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <FaTimes className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center pt-8 pb-6 px-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaUser className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isLogin ? 'Sign in to your account' : 'Join us for the best experience'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
            {/* Name Field (Register only) */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 ${
                      validationErrors.name ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                </div>
                {validationErrors.name && (
                  <p className="text-red-500 text-sm">{validationErrors.name}</p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                Email Address
              </Label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 ${
                    validationErrors.email ? 'border-red-500' : ''
                  }`}
                  placeholder="user@example.com"
                  autoComplete="email"
                />
              </div>
              {validationErrors.email && (
                <p className="text-red-500 text-sm">{validationErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium">
                Password
              </Label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`pl-10 pr-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 ${
                    validationErrors.password ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter your password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
              {validationErrors.password && (
                <p className="text-red-500 text-sm">{validationErrors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center space-x-2 py-3 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <FaGoogle className="w-4 h-4 text-red-500" />
                <span>Google</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center space-x-2 py-3 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <FaGithub className="w-4 h-4" />
                <span>GitHub</span>
              </Button>
            </div>

            {/* Toggle Login/Register */}
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setFormData({ name: '', email: '', password: '' });
                    setValidationErrors({});
                  }}
                  className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium transition-colors"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default LoginModal;

