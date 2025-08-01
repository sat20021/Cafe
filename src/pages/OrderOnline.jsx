import React, { useState } from 'react';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  address: '',
  deliveryTime: 'ASAP',
  instructions: '',
  pickup: false,
  payment: 'Card'
};

// Simulate API fetch
const fetchProducts = async () => {
  const { products } = await import('../data/products.js');
  await new Promise(res => setTimeout(res, 300));
  return products;
};

export default function OrderOnline() {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState('order'); // 'order' | 'pay' | 'confirm' | 'fail'
  const [loading, setLoading] = useState(false);

  // Use TanStack Query to fetch products
  // const { data: products = [], isLoading, isError, error } = useQuery({
  //   queryKey: ['products'],
  //   queryFn: fetchProducts,
  // });

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, qty) } : item));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleFormChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || (!form.pickup && !form.address)) return;
    setStep('pay');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulate payment: 80% success, 20% fail
      if (Math.random() < 0.8) {
        // Save order to localStorage
        const order = {
          cart,
          form,
          total,
          date: new Date().toLocaleString()
        };
        const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        localStorage.setItem('orderHistory', JSON.stringify([order, ...history]));
        setStep('confirm');
      } else {
        setStep('fail');
      }
    }, 1800);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // if (isLoading) {
  //   return <div className="text-center py-16 text-xl text-gray-500">Loading menu...</div>;
  // }
  // if (isError) {
  //   return <div className="text-center py-16 text-xl text-red-500">Error: {error.message}</div>;
  // }

  if (step === 'pay') {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Processing Payment...</h2>
        <p className="text-gray-600 mb-8">Please wait while we process your payment.</p>
        <div className="text-5xl animate-pulse">💳</div>
      </div>
    );
  }

  if (step === 'fail') {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h2>
        <p className="text-gray-600 mb-8">Sorry, your payment could not be processed. Please try again.</p>
        <button 
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          onClick={() => setStep('order')}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Thank you for your order!</h1>
        <p className="text-gray-600 mb-8">We've received your order and will contact you soon.</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
        <ul className="text-left max-w-md mx-auto mb-6 space-y-2">
          {cart.map(item => (
            <li key={item.id} className="text-gray-700">{item.qty} × {item.name} (${item.price} each)</li>
          ))}
        </ul>
        <div className="space-y-2 text-gray-700 mb-8">
        <p><b>Total:</b> ${total.toFixed(2)}</p>
        <p><b>Name:</b> {form.name}</p>
        <p><b>Phone:</b> {form.phone}</p>
        <p><b>Email:</b> {form.email}</p>
        {!form.pickup && <p><b>Address:</b> {form.address}</p>}
        <p><b>Delivery Time:</b> {form.deliveryTime}</p>
        <p><b>Payment:</b> {form.payment}</p>
        {form.instructions && <p><b>Instructions:</b> {form.instructions}</p>}
        </div>
        <button 
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          onClick={() => { setStep('order'); setCart([]); setForm(initialForm); }}
        >
          Place Another Order
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Order Online</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product List */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {products.map(product => ( */}
            {/*   <div key={product.id} className="bg-white rounded-xl shadow-lg p-6 text-center"> */}
            {/*     <img  */}
            {/*       src={product.image}  */}
            {/*       alt={product.name}  */}
            {/*       className="w-full max-w-32 h-24 object-contain mx-auto mb-4"  */}
            {/*     /> */}
            {/*     <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3> */}
            {/*     <div className="text-green-600 font-bold mb-2">${product.price}</div> */}
            {/*     <div className="text-sm text-gray-500 mb-2">{product.category}</div> */}
            {/*     <div className="text-sm text-gray-500 mb-4"> */}
            {/*       {product.dietary.map(d => ( */}
            {/*         <span key={d} className="mr-2">{d}</span> */}
            {/*       ))} */}
            {/*     </div> */}
            {/*     <button  */}
            {/*       className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200" */}
            {/*       onClick={() => addToCart(product)} */}
            {/*     > */}
            {/*       Add to Cart */}
            {/*     </button> */}
            {/*   </div> */}
            {/* ))} */}
          </div>
        </div>
        {/* Cart & Form */}
        <div className="lg:w-96 bg-gray-50 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">No items in cart.</p>
          ) : (
            <ul className="space-y-4 mb-6">
              {cart.map(item => (
                <li key={item.id} className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <b className="text-gray-800">{item.name}</b>
                    <span className="text-green-600 font-semibold">${item.price}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="number" 
                      min={1} 
                      value={item.qty} 
                      onChange={e => updateQty(item.id, +e.target.value)} 
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                    />
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="text-xl font-bold text-gray-800 mb-6">Total: ${total.toFixed(2)}</div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              name="name" 
              placeholder="Your Name" 
              value={form.name} 
              onChange={handleFormChange} 
              required 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <input 
              name="phone" 
              placeholder="Phone" 
              value={form.phone} 
              onChange={handleFormChange} 
              required 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <input 
              name="email" 
              placeholder="Email" 
              value={form.email} 
              onChange={handleFormChange} 
              required 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <label className="flex items-center space-x-2 text-sm">
              <input 
                type="checkbox" 
                name="pickup" 
                checked={form.pickup} 
                onChange={handleFormChange} 
                className="rounded"
              />
              <span>Pickup instead of delivery</span>
            </label>
            {!form.pickup && (
              <input 
                name="address" 
                placeholder="Delivery Address" 
                value={form.address} 
                onChange={handleFormChange} 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            )}
            <select 
              name="deliveryTime" 
              value={form.deliveryTime} 
              onChange={handleFormChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="ASAP">ASAP</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
            <select 
              name="payment" 
              value={form.payment} 
              onChange={handleFormChange} 
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
            <textarea 
              name="instructions" 
              placeholder="Special Instructions" 
              value={form.instructions} 
              onChange={handleFormChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              rows="3"
            />
            <button 
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit" 
              disabled={cart.length === 0 || loading}
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 