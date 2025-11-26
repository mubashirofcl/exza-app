import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { markAsSold, clearCart } from "../../../state/productsSlice";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.products.cartItems);

  const subtotal = cartItems.reduce(
    (s, it) => s + it.price * (it.quantity || 1),
    0
  );

  const handleConfirm = () => {
    cartItems.forEach((item) => dispatch(markAsSold(item.id)));
    dispatch(clearCart());
    navigate("/", { replace: true });
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-10 text-center text-xl">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="py-10 max-w-3xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-exza-dark mb-6">
        Checkout
      </h2>

      <div className="bg-white/40 p-6 rounded-xl shadow-card">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-3">
            <span className="font-medium">{item.title}</span>
            <span>{item.price.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                })}</span>
          </div>
        ))}

        <hr className="my-4" />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>{subtotal.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                })}</span>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full bg-exza-purple mt-6 text-white p-3 rounded-full hover:bg-exza-dark transition"
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
