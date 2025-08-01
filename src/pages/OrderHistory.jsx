import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchOrderHistory = async () => {
  await new Promise(res => setTimeout(res, 200));
  return JSON.parse(localStorage.getItem('orderHistory') || '[]');
};

export default function OrderHistory() {
  const { data: history = [], isLoading, isError, error } = useQuery({
    queryKey: ['orderHistory'],
    queryFn: fetchOrderHistory,
  });

  if (isLoading) {
    return <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>Loading order history...</div>;
  }
  if (isError) {
    return <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center', color: 'red' }}>Error: {error.message}</div>;
  }

  if (!history.length) {
    return <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
      <h1>Order History</h1>
      <p>No previous orders found.</p>
    </div>;
  }

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: 16 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 32 }}>Order History</h1>
      {history.map((order, idx) => (
        <div key={idx} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', marginBottom: 24, padding: 20 }}>
          <div style={{ marginBottom: 8, color: '#888', fontSize: 14 }}>Order Date: {order.date}</div>
          <ul style={{ margin: '0 0 1em 0', padding: 0, listStyle: 'none' }}>
            {order.cart.map(item => (
              <li key={item.id} style={{ marginBottom: 4 }}>
                {item.qty} × <b>{item.name}</b> (${item.price} each)
              </li>
            ))}
          </ul>
          <div><b>Total:</b> ${order.total.toFixed(2)}</div>
          <div><b>Name:</b> {order.form.name}</div>
          <div><b>Phone:</b> {order.form.phone}</div>
          <div><b>Email:</b> {order.form.email}</div>
          {order.form.pickup ? <div><b>Pickup</b></div> : <div><b>Address:</b> {order.form.address}</div>}
          <div><b>Delivery Time:</b> {order.form.deliveryTime}</div>
          <div><b>Payment:</b> {order.form.payment}</div>
          {order.form.instructions && <div><b>Instructions:</b> {order.form.instructions}</div>}
        </div>
      ))}
    </div>
  );
} 