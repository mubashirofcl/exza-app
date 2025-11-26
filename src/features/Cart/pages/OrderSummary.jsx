import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({
    items,
    buttonText = "Proceed to Checkout",
    buttonLink = "/checkout",
}) => {
    const navigate = useNavigate();
    const subtotal = items.reduce((s, it) => s + it.price * (it.quantity || 1), 0);

    const handleClick = () => {
        navigate(buttonLink);
    };

    return (
        <div className="bg-white/40 p-5 rounded-lg shadow-card">
            <h3 className="font-semibold mb-3">Order Summary</h3>

            <div className="mb-4 text-exza-dark font-medium">
                Subtotal:  {subtotal.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                })}
            </div>

            <button
                onClick={handleClick}
                className="w-full bg-exza-purple text-white p-3 rounded-full hover:bg-exza-dark transition"
            >
                {buttonText}
            </button>
        </div>
    );
};

export default OrderSummary;
