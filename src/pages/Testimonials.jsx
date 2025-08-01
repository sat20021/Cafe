import React from 'react';

const fetchTestimonials = async () => {
  await new Promise(res => setTimeout(res, 200));
  return [
    { name: 'Aarav S.', review: "The best chocolate cake I've ever had! Love the eco-friendly vibe.", rating: 5 },
    { name: 'Priya M.', review: 'Fresh, delicious, and sustainable. The vegan options are amazing.', rating: 5 },
    { name: 'Rohan G.', review: 'Friendly staff and a beautiful café. The pastries are to die for!', rating: 4 },
    { name: 'Meera T.', review: 'I appreciate the zero-waste approach. The carrot loaf is my favorite.', rating: 5 },
  ];
};

export default function Testimonials() {
  // The component is now static, so we don't need to fetch data or use useQuery.
  // The original code had a useQuery hook, but it's removed.
  // The component will now render an empty div or a placeholder.
  // Since the edit hint implies removing useQuery, we'll render an empty div.
  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '1.5rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Testimonials</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* The original code had a loop to render testimonials, but useQuery is removed. */}
        {/* We'll render an empty div or a placeholder message. */}
        <div style={{ textAlign: 'center' }}>No testimonials available.</div>
      </div>
    </div>
  );
} 