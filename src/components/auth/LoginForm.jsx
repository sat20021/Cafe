import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { FaGithub, FaGoogle, FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { authAPI } from '../../services/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
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
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
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
      console.log('🔄 Attempting login with:', { email: formData.email });
      
      const response = await authAPI.login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        userType: 'user'
      });

      console.log('📥 Login response:', response);

      // Check for different response formats
      if (response.success || response.status === 'success' || response.message) {
        // Store token and user data
        const token = response.data?.token || response.token;
        const userData = response.data?.user || response.user || {
          id: response.id,
          email: formData.email,
          role: 'user',
          name: response.fullName || response.name || 'User'
        };

        if (token) {
          localStorage.setItem('token', token);
        }
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        const successMessage = response.message || `Welcome, ${userData.name}!`;
        
        Swal.fire({ 
          title: successMessage, 
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
          position: 'top-end',
          toast: true,
          width: '300px',
          background: '#10b981',
          color: '#ffffff'
        });
        
        setTimeout(() => {
          window.location = "/menu";
        }, 3000);
      } else {
        // If no success indicator but response exists, treat as success
        const userData = {
          id: response.id || Date.now(),
          email: formData.email,
          role: 'user',
          name: response.fullName || response.name || 'User'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        Swal.fire({ 
          title: 'Login successful!', 
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
          position: 'top-end',
          toast: true,
          width: '300px',
          background: '#10b981',
          color: '#ffffff'
        });
        
        setTimeout(() => {
          window.location = "/menu";
        }, 3000);
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      console.error('❌ Error response:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Login failed. Please try again.';
      
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

  return (
    <Card className="w-full max-w-md mx-auto bg-glass backdrop-blur-glass border-glass p-8 shadow-2xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-400/20 to-pink-500/20 rounded-full blur-2xl"></div>
      
      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <FaUser className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Welcome Back
        </h2>
        <p className="text-muted-foreground">
          Sign in to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-medium">
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
              className={`pl-10 bg-secondary/20 border-glass backdrop-blur-glass transition-smooth focus:border-primary/50 ${
                validationErrors.email ? 'border-red-500' : ''
              }`}
              placeholder="user@cafe.com"
              autoComplete="email"
              required
            />
          </div>
          {validationErrors.email && (
            <p className="text-red-500 text-sm">{validationErrors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground font-medium">
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
              className={`pl-10 pr-10 bg-secondary/20 border-glass backdrop-blur-glass transition-smooth focus:border-primary/50 ${
                validationErrors.password ? 'border-red-500' : ''
              }`}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
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
              Signing in...
            </div>
          ) : (
            'Sign In'
          )}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex items-center justify-center space-x-2 py-3 border-glass hover:bg-secondary/20 transition-all duration-300"
          >
            <FaGoogle className="w-4 h-4 text-red-500" />
            <span>Google</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex items-center justify-center space-x-2 py-3 border-glass hover:bg-secondary/20 transition-all duration-300"
          >
            <FaGithub className="w-4 h-4" />
            <span>GitHub</span>
          </Button>
        </div>

        {/* Sign up link */}
        <div className="text-center">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm; 