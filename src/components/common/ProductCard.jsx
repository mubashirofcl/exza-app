import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../state/productsSlice";

const ShareIcon = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const HeartIcon = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.92 0-3.64.95-4.5 2.42-1.28-1.57-3-2.42-4.5-2.42A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const {
    id,
    title,
    price,
    description = "",
    imageUrl,
    status = "available",
  } = product;

  const [imgSrc, setImgSrc] = useState(imageUrl || "/placeholder.png");
  const [isExpanded, setIsExpanded] = useState(false);

  const cartItems = useSelector((state) => state.products.cartItems);
  const isInCart = cartItems.some((item) => item.id === id);

  const formattedPrice = `₹ ${Number(price || 0).toLocaleString("en-IN")}`;

  const handleAdd = () => {
    if (status === "sold" || isInCart) return;
    dispatch(addToCart({ id, title, price, imageUrl }));
  };

  const handleImgError = () => {
    if (imgSrc !== "/placeholder.png") {
      setImgSrc("/placeholder.png");
    }
  };

  return (
    <div className="bg-exza-light rounded-xl overflow-hidden shadow-card transition hover:shadow-elevated">
      <div className="relative w-full h-48 bg-gray-100">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover"
          onError={handleImgError}
        />

        {status === "sold" && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-lg font-bold">
            SOLD
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h3 className="text-exza-dark text-base font-semibold truncate">
            {title}
          </h3>
          <p className="text-gray-600 text-sm">{formattedPrice}</p>
        </div>

        <p className="text-exza-dark text-sm leading-snug">
          {isExpanded ? description : description.slice(0, 60)}
          {description.length > 60 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 ml-1 underline"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </p>

        <div className="flex items-center justify-between mt-1">
          <div className="flex gap-3 items-center">
            
            <button
              onClick={handleAdd}
              disabled={status === "sold" || isInCart}
              className={`px-3 py-1 rounded-full text-white font-medium transition ${
                status === "sold"
                  ? "bg-gray-400 cursor-not-allowed"
                  : isInCart
                  ? "bg-green-900 cursor-default"
                  : "bg-exza-purple hover:opacity-90"
              }`}
            >
              {status === "sold"
                ? "Sold Out"
                : isInCart
                ? "Added in Cart"
                : "Add to Cart"}
            </button>
          </div>

          <div className="flex items-center gap-3 text-gray-500">
            <ShareIcon className="w-4 h-4 cursor-pointer hover:text-exza-purple" />
            <HeartIcon className="w-4 h-4 cursor-pointer hover:text-exza-purple" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
