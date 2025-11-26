import React from "react";
import heroBanner from "../../../assets/banner.png";


const SearchIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const HeroSection = () => {
    return (
        <section className="relative top-8 pb-10 mb-8">

            <div className="relative w-[100%] h-[250px] md:h-72 lg:h-60 rounded-2xl overflow-hidden shadow-elevated">

                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroBanner})` }}
                />

                <div className="absolute p-6 md:p-8 ">


                </div>
            </div>
            <div
                className="
          absolute bottom-10 left-1/2 
          -translate-x-1/2 translate-y-1/2 
          flex w-[85%] md:w-3/4 max-w-3xl h-10 md:h-16 
          rounded-full overflow-hidden 
          bg-white shadow-elevated z-1
        "
            >
                <input
                    type="text"
                    placeholder="Search everything here..."
                    className="flex-grow px-6 text-sm md:text-base text-gray-600 outline-none"
                />
                <button className="px-6 flex items-center justify-center text-exza-dark hover:text-exza-purple transition">
                    <SearchIcon className="w-5 h-5 md:w-6 md:h-6" />
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
