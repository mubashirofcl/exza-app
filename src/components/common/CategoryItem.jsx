import React from "react";

const TagIcon = ({ className = "" }) => (
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
    <path d="M12 2H2v10l10 10 10-10L12 2z" />
    <path d="M7 7h.01" />
  </svg>
);

const CategoryItem = ({ name, iconClass }) => {
  return (
    <div
      className="
        flex flex-col items-center justify-center 
        px-3 py-4 rounded-xl h-[100px]
        cursor-pointer text-center
        bg-white/40 backdrop-blur-hard border border-white/30 
        shadow-category 
        transition duration-200 
        hover:-translate-y-[3px] hover:shadow-elevated
        text-exza-dark
      "
    >
      {iconClass ? (
        <i className={`${iconClass} text-exza-purple text-2xl mb-1`} />
      ) : (
        <TagIcon className="w-7 h-7 text-exza-purple mb-1" />
      )}

      <span className="text-[12px] font-medium">{name}</span>
    </div>
  );
};

export default CategoryItem;
