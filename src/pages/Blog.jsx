import React from 'react';

const fetchPosts = async () => {
  await new Promise(res => setTimeout(res, 200));
  return [
    { title: 'Zero-Waste Baking: Our Journey', date: '2024-06-01', summary: 'How we reduced waste in our kitchen and tips for home bakers.' },
    { title: 'Why We Love Local Ingredients', date: '2024-05-20', summary: 'The benefits of sourcing locally for taste, community, and the planet.' },
    { title: 'Eco-Friendly Packaging: What Works', date: '2024-05-10', summary: 'A look at our packaging choices and how you can reduce plastic at home.' },
  ];
};

export default function Blog() {
  // Remove: const { data: posts = [], isLoading, isError, error } = useQuery({
  // Remove:   queryKey: ['blogPosts'],
  // Remove:   queryFn: fetchPosts,
  // Remove: });

  // Remove: if (isLoading) {
  // Remove:   return <div style={{ maxWidth: 800, margin: '2rem auto', textAlign: 'center' }}>Loading blog posts...</div>;
  // Remove: }
  // Remove: if (isError) {
  // Remove:   return <div style={{ maxWidth: 800, margin: '2rem auto', textAlign: 'center', color: 'red' }}>Error: {error.message}</div>;
  // Remove: }

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '1.5rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Blog</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Remove: posts.map((p, i) => ( */}
        {/* Remove:   <div key={i} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 20 }}> */}
        {/* Remove:     <div style={{ fontWeight: 700, color: '#4CAF50', marginBottom: 6 }}>{p.title}</div> */}
        {/* Remove:     <div style={{ color: '#888', fontSize: 13, marginBottom: 8 }}>{p.date}</div> */}
        {/* Remove:     <div>{p.summary}</div> */}
        {/* Remove:   </div> */}
        {/* Remove: )); */}
      </div>
    </div>
  );
} 