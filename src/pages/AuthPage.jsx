import React from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, SafetyOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { authAPI } from '../services/api';

export default function AuthPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [userType, setUserType] = React.useState('user');
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log('🔄 Attempting login with:', { email: data.email, userType });
      
      const response = await authAPI.login({
        email: data.email,
        password: data.password,
        userType: userType
      });

      console.log('📥 Login response:', response);

      // Check for different response formats
      if (response.success || response.status === 'success' || response.message) {
        // Store token and user data
        const token = response.data?.token || response.token;
        const userData = response.data?.user || response.user || {
          id: response.id,
          email: data.email,
          role: userType,
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
          email: data.email,
          role: userType,
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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserOutlined style={{ fontSize: 32, color: '#fa8c16' }} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Cafe Management</h1>
          <p className="text-gray-600">Welcome back! Please sign in to continue</p>
        </div>

        <div className="flex bg-gray-100 rounded-lg p-1 mb-8 shadow-inner">
          <button
            onClick={() => setUserType("user")}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-all duration-300 transform hover:scale-105 toggle-button-hover ${
              userType === "user"
                ? "bg-white text-green-600 shadow-lg scale-105"
                : "text-gray-600 hover:text-green-600 hover:bg-green-50"
            }`}
          >
            <UserOutlined className="w-5 h-5" />
            <span>User</span>
          </button>
          <button
            onClick={() => setUserType("admin")}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-all duration-300 transform hover:scale-105 toggle-button-hover admin ${
              userType === "admin"
                ? "bg-white text-red-600 shadow-lg scale-105"
                : "text-gray-600 hover:text-red-600 hover:bg-red-50"
            }`}
          >
            <SafetyOutlined className="w-5 h-5" />
            <span>Admin</span>
          </button>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In</h2>
        <p className="text-gray-600 mb-6">Choose your account type and enter your credentials</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                {...register('email', { required: 'Email is required', pattern: { value: /.+@.+\..+/, message: 'Invalid email' } })}
                  type="email"
                placeholder={userType === 'admin' ? "admin@cafe.com" : "user@cafe.com"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                  {...register('password', { required: 'Password is required' })}
                    type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                  {showPassword ? <EyeInvisibleOutlined className="w-5 h-5" /> : <EyeTwoTone className="w-5 h-5" />}
                  </button>
              </div>
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                </div>
              </div>
              <button 
                type="submit" 
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg button-hover-effect button-ripple mt-6 flex items-center justify-center space-x-2 relative"
              >
            <LoginOutlined className="w-5 h-5" />
            <span>Sign In</span>
              </button>
            </form>
                            <div className="mt-6 text-center">
                      <span className="text-gray-600">Don't have an account?</span>
                      <button
                        type="button"
                        className="ml-2 text-orange-600 hover:text-orange-700 font-semibold flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:underline cursor-pointer"
                        onClick={() => navigate('/register')}
                      >
                        <UserAddOutlined className="w-4 h-4 mr-1" /> Sign Up
                      </button>
        </div>
      </div>
    </div>
  );
} 