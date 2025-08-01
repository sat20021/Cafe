import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { toast } from 'sonner';

const OrderStatus = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Fetch order details from API
  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.get(`/orders/${id}`);
      setOrder(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch order details';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch order status from API
  const fetchOrderStatus = async () => {
    try {
      const response = await axiosInstance.get(`/orders/${id}/status`);
      setStatus(response.data);
    } catch (error) {
      console.error('Failed to fetch order status:', error);
    }
  };

  // Load order on component mount
  useEffect(() => {
    fetchOrder();
    fetchOrderStatus();
  }, [id]);

  // Auto-refresh status every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchOrderStatus();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, id]);

  // Get status step configuration
  const getStatusSteps = () => {
    const steps = [
      { key: 'pending', label: 'Order Placed', icon: '📝', description: 'Your order has been received' },
      { key: 'confirmed', label: 'Order Confirmed', icon: '✅', description: 'We\'ve confirmed your order' },
      { key: 'preparing', label: 'Preparing', icon: '👨‍🍳', description: 'Our team is preparing your order' },
      { key: 'ready', label: 'Ready', icon: '🎉', description: 'Your order is ready for pickup/delivery' },
      { key: 'delivered', label: 'Delivered', icon: '🚚', description: 'Order completed successfully' }
    ];

    return steps;
  };

  // Get current status step
  const getCurrentStep = () => {
    const steps = getStatusSteps();
    const currentStatus = status?.status || order?.status;
    
    if (currentStatus === 'cancelled') {
      return -1; // Special case for cancelled orders
    }
    
    return steps.findIndex(step => step.key === currentStatus);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate total items in order
  const getTotalItems = (order) => {
    return order.items?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="text-gray-600">Loading order status...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-x-4">
            <button
              onClick={fetchOrder}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
            <Link
              to="/orders"
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Order not found
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-4">The order you're looking for doesn't exist.</p>
          <Link
            to="/orders"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const currentStep = getCurrentStep();
  const steps = getStatusSteps();
  const currentStatus = status?.status || order?.status;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Status</h1>
        <p className="text-gray-600">Track the progress of your order #{order.id}</p>
      </div>

      {/* Auto-refresh toggle */}
      <div className="mb-8 flex justify-center">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <span className="text-sm text-gray-700">Auto-refresh status</span>
        </label>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Details</h3>
            <p className="text-gray-600">Order #{order.id}</p>
            <p className="text-gray-600">Placed on {formatDate(order.createdAt)}</p>
            <p className="text-gray-600">{getTotalItems(order)} items</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total</h3>
            <p className="text-2xl font-bold text-green-600">
              ${order.total?.toFixed(2) || 'N/A'}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Delivery Method</h3>
            <p className="text-gray-600 capitalize">
              {order.deliveryMethod || 'Not specified'}
            </p>
            {order.estimatedTime && (
              <p className="text-gray-600">Est. {order.estimatedTime}</p>
            )}
          </div>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Progress</h2>
        
        {currentStatus === 'cancelled' ? (
          <div className="text-center py-8">
            <div className="text-red-500 text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Cancelled</h3>
            <p className="text-gray-600">This order has been cancelled.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {steps.map((step, index) => {
              const isCompleted = index <= currentStep;
              const isCurrent = index === currentStep;
              
              return (
                <div key={step.key} className="flex items-start space-x-4">
                  {/* Status Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                    isCompleted 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step.icon}
                  </div>
                  
                  {/* Status Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className={`text-lg font-semibold ${
                        isCompleted ? 'text-gray-800' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </h3>
                      {isCurrent && (
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Current
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${
                      isCompleted ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                    {isCurrent && status?.estimatedTime && (
                      <p className="text-sm text-blue-600 mt-1">
                        Estimated completion: {status.estimatedTime}
                      </p>
                    )}
                  </div>
                  
                  {/* Status Line */}
                  {index < steps.length - 1 && (
                    <div className={`w-0.5 h-12 ml-6 ${
                      isCompleted ? 'bg-green-200' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order Items */}
      {order.items && order.items.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  {item.notes && (
                    <p className="text-sm text-gray-500">Notes: {item.notes}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                  <p className="font-medium text-gray-800">
                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Link
          to="/orders"
          className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
        >
          Back to Orders
        </Link>
        <button
          onClick={() => {
            fetchOrderStatus();
            toast.success('Status refreshed!');
          }}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
        >
          Refresh Status
        </button>
      </div>
    </div>
  );
};

export default OrderStatus; 