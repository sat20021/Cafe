// Validation helpers
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return !phone || phoneRegex.test(phone);
};

// Formatting helpers
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount || 0);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatRelativeTime = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return formatDate(dateString);
};

// API error handling
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`;
  } else if (error.request) {
    // Network error
    return 'Network error. Please check your connection and try again.';
  } else {
    // Other error
    return error.message || 'An unexpected error occurred.';
  }
};

// Local storage helpers
export const getStoredToken = () => {
  try {
    return localStorage.getItem('token');
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

export const setStoredToken = (token) => {
  try {
    localStorage.setItem('token', token);
  } catch (error) {
    console.error('Error setting localStorage:', error);
  }
};

export const removeStoredToken = () => {
  try {
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

export const getStoredUser = () => {
  try {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

export const setStoredUser = (user) => {
  try {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } catch (error) {
    console.error('Error setting localStorage:', error);
  }
};

export const removeStoredUser = () => {
  try {
    localStorage.removeItem('currentUser');
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// Cart helpers
export const calculateCartTotal = (items) => {
  return items.reduce((total, item) => {
    return total + ((item.price || 0) * (item.quantity || 1));
  }, 0);
};

export const calculateCartItems = (items) => {
  return items.reduce((total, item) => {
    return total + (item.quantity || 1);
  }, 0);
};

// Status helpers
export const getStatusConfig = (status) => {
  const statusConfig = {
    'pending': { 
      bg: 'bg-yellow-100', 
      text: 'text-yellow-800', 
      label: 'Pending',
      icon: '⏳'
    },
    'confirmed': { 
      bg: 'bg-blue-100', 
      text: 'text-blue-800', 
      label: 'Confirmed',
      icon: '✅'
    },
    'preparing': { 
      bg: 'bg-orange-100', 
      text: 'text-orange-800', 
      label: 'Preparing',
      icon: '👨‍🍳'
    },
    'ready': { 
      bg: 'bg-green-100', 
      text: 'text-green-800', 
      label: 'Ready',
      icon: '🎉'
    },
    'delivered': { 
      bg: 'bg-gray-100', 
      text: 'text-gray-800', 
      label: 'Delivered',
      icon: '🚚'
    },
    'cancelled': { 
      bg: 'bg-red-100', 
      text: 'text-red-800', 
      label: 'Cancelled',
      icon: '❌'
    }
  };

  return statusConfig[status] || { 
    bg: 'bg-gray-100', 
    text: 'text-gray-800', 
    label: status,
    icon: '❓'
  };
};

// Debounce helper
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle helper
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Capitalize first letter
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Slugify text
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}; 