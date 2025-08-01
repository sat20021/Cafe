import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch product details from API
  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch product details';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Load product on component mount
  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Handle quantity changes
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  // Handle quantity increment
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  // Handle quantity decrement
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Add to cart (placeholder function)
  const handleAddToCart = () => {
    // This would integrate with your cart system
    toast.success(`${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart!`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="text-gray-600">Loading product details...</p>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-x-4">
            <button
              onClick={fetchProduct}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/products')}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🍽️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link to="/" className="hover:text-green-600">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/products" className="hover:text-green-600">Products</Link>
          </li>
          <li>/</li>
          <li className="text-gray-800">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center bg-gray-100">
                <span className="text-gray-400 text-8xl">☕</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Product Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-2xl font-bold text-green-600">
                ${product.price?.toFixed(2) || 'N/A'}
              </span>
              <span className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                {product.category}
              </span>
              {product.available !== false ? (
                <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                  Available
                </span>
              ) : (
                <span className="inline-block bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Product Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description || 'No description available for this product.'}
            </p>
          </div>

          {/* Product Details */}
          {product.details && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Details</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  {Object.entries(product.details).map(([key, value]) => (
                    <li key={key} className="flex justify-between">
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          {product.available !== false && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-20 text-center border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={handleIncrement}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              >
                Add to Cart - ${((product.price || 0) * quantity).toFixed(2)}
              </button>
            </div>
          )}

          {/* Additional Actions */}
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/products')}
              className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
            >
              Back to Products
            </button>
            <button
              onClick={() => window.history.back()}
              className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section (placeholder) */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">You might also like</h2>
        <div className="text-center py-8 text-gray-600">
          <p>Related products feature coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 