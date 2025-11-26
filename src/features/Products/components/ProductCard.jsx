import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../state/productsSlice";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { id, title, price, imageUrl, status } = product;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <Link to="#" className="block">
      <div className="bg-exza-light rounded-lg overflow-hidden shadow-card transition hover:-translate-y-[5px]">
        <div className="w-full h-[200px] overflow-hidden bg-gray-200">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>

        <div className="p-4">
          <h3 className="text-exza-dark text-base font-semibold mb-1 truncate">{title}</h3>
          <p className="text-gray-600 text-sm mb-3">Rp. {new Intl.NumberFormat("id-ID").format(price)}</p>

          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="px-3 py-1 rounded-md bg-exza-purple text-white text-sm"
                aria-label="Add to cart"
              >
                Add to Cart
              </button>
            </div>

            <div className="text-gray-400 flex gap-3">
              {/* icons can remain */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
