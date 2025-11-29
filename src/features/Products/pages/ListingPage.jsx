import React from 'react';
import { useSelector } from 'react-redux';
import HeroSection from '../components/HeroSection';
import ProductCard from '../../../components/common/ProductCard';
import CategoryItem from '../../../components/common/CategoryItem';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Car' }, { name: 'Motorcycle' }, { name: 'Property' }, { name: 'Gadget' },
  { name: 'Tickets' }, { name: 'Electronics' }, { name: 'Health' }, { name: 'Fashion' },
  { name: 'Food & Drink' }, { name: 'Baby Equipment' }, { name: 'Office' }, { name: 'Home' },
];

const ListingPage = () => {
  const listings = useSelector((s) => s.products.listings || []);

  const sorted = [...listings].sort((a, b) => {
    const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return tb - ta;
  });

  return (
    <div className="space-y-10 pb-12">
      <HeroSection />

      <section className="mt-20">
        <h2 className="text-2xl font-semibold mb-6 text-exza-dark">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5">
          {categories.map((cat) => <CategoryItem key={cat.name} name={cat.name} />)}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-exza-dark">Recommendations</h2>
          <Link to="/listings" className="flex items-center space-x-2 text-exza-dark glass-button px-4 py-2 rounded-full hover:bg-white/70 transition duration-300">
            <span>View More</span>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="9 18 15 12 9 6" /></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sorted.length === 0 ? (
            <div className="col-span-3 text-center text-gray-600 py-12 bg-white/40 rounded-xl">No listings yet. Be the first to post!</div>
          ) : (
            sorted.map((product) => <ProductCard key={product.id} product={product} />)
          )}
        </div>
      </section>
    </div>
  );
};

export default ListingPage;
