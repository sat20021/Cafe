import React from 'react';

const fetchImages = async () => {
  await new Promise(res => setTimeout(res, 200));
  return [
    '/images/food-table.jpg',
    '/images/plate-1.png',
    '/images/plate-2.png',
    '/images/plate-3.png',
    '/images/cupcake.png',
    '/images/donut.jpg',
    '/images/jars.jpg',
    '/images/salad-table.jpg',
    '/images/hero.png',
    '/images/vegies.png',
  ];
};

export default function Gallery() {
  // The useQuery hook and its dependencies are removed.
  // The component will now render a placeholder or be empty.
  // For now, we'll return a simple placeholder.
  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Gallery</h1>
      <p className="text-lg text-gray-600 text-center mb-8">A glimpse of our cakes, café, and eco-friendly treats!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {/* The images are no longer fetched, so this loop will be empty or render a placeholder. */}
        {/* For now, we'll just show a message indicating no images are available. */}
        <p className="text-center py-16 text-xl text-gray-500">No images available in the gallery.</p>
      </div>
    </div>
  );
} 