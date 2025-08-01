import React from 'react';

const fetchFaqs = async () => {
  await new Promise(res => setTimeout(res, 200));
  return [
    { q: 'Are your cakes 100% vegetarian or vegan?', a: 'Yes! We offer both vegetarian and vegan cakes. Check the menu for dietary tags.' },
    { q: 'Do you deliver?', a: 'Yes, we offer eco-friendly local delivery and pickup.' },
    { q: 'Can I customize my cake?', a: 'Absolutely! Contact us or visit the café to discuss your custom cake.' },
    { q: 'Do you use plastic packaging?', a: 'No, all our packaging is biodegradable and compostable.' },
    { q: 'How do I place a bulk order?', a: 'Please call us or use the contact form for bulk or event orders.' },
  ];
};

export default function FAQs() {
  // Remove: const { data: faqs = [], isLoading, isError, error } = useQuery({
  // Remove:   queryKey: ['faqs'],
  // Remove:   queryFn: fetchFaqs,
  // Remove: });

  // Remove: if (isLoading) {
  // Remove:   return <div style={{ maxWidth: 700, margin: '2rem auto', textAlign: 'center' }}>Loading FAQs...</div>;
  // Remove: }
  // Remove: if (isError) {
  // Remove:   return <div style={{ maxWidth: 700, margin: '2rem auto', textAlign: 'center', color: 'red' }}>Error: {error.message}</div>;
  // Remove: }

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '1.5rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>FAQs</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Remove: {faqs.map((f, i) => ( */}
        {/* Remove:   <div key={i} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 20 }}> */}
        {/* Remove:     <div style={{ fontWeight: 700, color: '#4CAF50', marginBottom: 6 }}>{f.q}</div> */}
        {/* Remove:     <div>{f.a}</div> */}
        {/* Remove:   </div> */}
        {/* Remove: ))} */}
      </div>
    </div>
  );
} 