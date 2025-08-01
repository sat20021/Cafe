import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { FaGithub, FaGoogle, FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { authAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

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
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await authAPI.register({
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (response.success) {
        Swal.fire({ 
          title: response.message || 'Registration successful!', 
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
          navigate('/auth');
        }, 3000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
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
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200 to-blue-200 rounded-full opacity-20 blur-xl"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FaUser className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-muted-foreground mt-2">
            Join thousands of users today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-foreground font-medium">
                First Name
              </Label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`pl-10 bg-secondary/20 border-glass backdrop-blur-glass transition-smooth focus:border-primary/50 ${
                    validationErrors.firstName ? 'border-red-500' : ''
                  }`}
                  placeholder="John"
                  required
                />
              </div>
              {validationErrors.firstName && (
                <p className="text-red-500 text-sm">{validationErrors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-foreground font-medium">
                Last Name
              </Label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`pl-10 bg-secondary/20 border-glass backdrop-blur-glass transition-smooth focus:border-primary/50 ${
                    validationErrors.lastName ? 'border-red-500' : ''
                  }`}
                  placeholder="Doe"
                  required
                />
              </div>
              {validationErrors.lastName && (
                <p className="text-red-500 text-sm">{validationErrors.lastName}</p>
              )}
            </div>
          </div>

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
                placeholder="john.doe@example.com"
                required
              />
            </div>
            {validationErrors.email && (
              <p className="text-red-500 text-sm">{validationErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground font-medium">
              Password
            </Label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`pl-10 bg-secondary/20 border-glass backdrop-blur-glass transition-smooth focus:border-primary/50 ${
                  validationErrors.password ? 'border-red-500' : ''
                }`}
                placeholder="••••••••"
                required
              />
            </div>
            {validationErrors.password && (
              <p className="text-red-500 text-sm">{validationErrors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-foreground font-medium">
              Confirm Password
            </Label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`pl-10 bg-secondary/20 border-glass backdrop-blur-glass transition-smooth focus:border-primary/50 ${
                  validationErrors.confirmPassword ? 'border-red-500' : ''
                }`}
                placeholder="••••••••"
                required
              />
            </div>
            {validationErrors.confirmPassword && (
              <p className="text-red-500 text-sm">{validationErrors.confirmPassword}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg" 
            size="lg"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-glass" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="social" type="button" className="w-full transform hover:scale-105 transition-transform duration-300">
              <FaGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="social" type="button" className="w-full transform hover:scale-105 transition-transform duration-300">
              <FaGithub className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate('/auth')}
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </Card>
  );
};

export default RegisterForm; 