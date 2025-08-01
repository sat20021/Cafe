import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { toast } from 'sonner';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch user orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.get('/orders');
      setOrders(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch orders';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Load orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on status
  const filteredOrders = orders.filter(order => {
    return statusFilter === 'all' || order.status === statusFilter;
  });

  // Get unique statuses for filter
  const statuses = ['all', ...new Set(orders.map(order => order.status))];

  // Handle status filter change
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      'confirmed': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Confirmed' },
      'preparing': { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Preparing' },
      'ready': { bg: 'bg-green-100', text: 'text-green-800', label: 'Ready' },
      'delivered': { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Delivered' },
      'cancelled': { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' }
    };

    const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };
    
    return (
      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
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
          <p className="text-gray-600">Loading your orders...</p>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchOrders}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">My Orders</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track your orders and see their current status. 
          We'll keep you updated on the progress of your delicious café items.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="mb-8 flex justify-center">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter by status:</label>
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {orders.length === 0 ? 'No orders yet' : 'No orders match your filter'}
          </h3>
          <p className="text-gray-600 mb-6">
            {orders.length === 0 
              ? "You haven't placed any orders yet. Start by exploring our menu!"
              : "Try adjusting your status filter to see more orders."
            }
          </p>
          {orders.length === 0 && (
            <Link
              to="/products"
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
            >
              Browse Menu
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map(order => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Order #{order.id}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">
                      ${order.total?.toFixed(2) || 'N/A'}
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{getTotalItems(order)} items</span>
                    <span>Click to view details</span>
                  </div>
                  {order.items && order.items.length > 0 && (
                    <div className="mt-2 text-sm text-gray-500">
                      {order.items.slice(0, 3).map((item, index) => (
                        <span key={index}>
                          {item.quantity}x {item.name}
                          {index < Math.min(3, order.items.length - 1) && ', '}
                        </span>
                      ))}
                      {order.items.length > 3 && ` and ${order.items.length - 3} more...`}
                    </div>
                  )}
                </div>

                {/* Order Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    {order.deliveryMethod === 'pickup' ? 'Pickup' : 'Delivery'}
                    {order.estimatedTime && (
                      <span className="ml-2">
                        • Est. {order.estimatedTime}
                      </span>
                    )}
                  </div>
                  <div className="text-green-600 text-sm font-medium">
                    View Details →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Results Count */}
      {filteredOrders.length > 0 && (
        <div className="mt-8 text-center text-gray-600">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
      )}
    </div>
  );
};

export default OrderList; 