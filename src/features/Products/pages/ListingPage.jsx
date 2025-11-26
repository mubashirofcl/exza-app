// src/features/Products/pages/ListingPage.jsx
import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../../components/common/ProductCard";
import CategoryItem from "../../../components/common/CategoryItem";
import HeroSection from "../components/HeroSection";

const ListingPage = () => {

  const listings = useSelector((s) => s.products.listings);

  const categories = [
    "Car",
    "Motorcycle",
    "Property",
    "Gadget",
    "Electronics",
    "Furniture",
    "Fashion",
    "Health",
    "Food & Drinks",
    "Baby Care",
    "Office",
    "Sports",
  ];




  return (
    <div className="space-y-10 pb-12">
      <HeroSection />

      <section className="mt-20">
        <h2 className="text-2xl font-semibold mb-6 text-exza-dark">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5">
          {categories.map((name) => (
            <CategoryItem key={name} name={name} />
          ))}
        </div>

      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-exza-dark">Recommendations</h2>
          <a className="flex items-center space-x-2 text-exza-dark glass-button px-4 py-2 rounded-full">View More</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

      </section>


    </div>
  );
};

export default ListingPage;
