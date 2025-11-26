import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";

const CartPage = () => {
  const cartItems = useSelector((s) => s.products.cartItems);

  return (
    <div className="flex flex-col py-10 px-4">
      <h2 className="text-3xl font-bold text-exza-purple">Your Cart ({cartItems.length})</h2>
      {cartItems.length === 0 ? (
        <div className="glass-card my-12 p-12 text-center rounded-2xl max-w-full">Your cart is empty</div>
      
        
      ) : (
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((it) => <CartItem key={it.id} item={it} />)}
          </div>
          <div>
            <OrderSummary items={cartItems} />
          </div>
        </div>
      )}

      <div className="m-20"></div>
    </div>
  );
};

export default CartPage;
