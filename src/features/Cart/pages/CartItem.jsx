import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../state/productsSlice";
import { alertSuccess, alertConfirm } from "../../../utils/alerts";

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const [imgSrc, setImgSrc] = useState(item.imageUrl || "/placeholder.png");

    const handleImgError = () => {
        if (imgSrc !== "/placeholder.png") setImgSrc("/placeholder.png");
    };

    const handleRemove = async () => {
        try {
            const result = await alertConfirm(
                "Remove item?",
                `Remove "${item.title}" from your cart?`
            );

            if (result.isConfirmed) {
                dispatch(removeFromCart(item.id));
                alertSuccess("Removed", `"${item.title}" removed from cart.`);
            }
        } catch (err) {
            console.error("Remove from cart failed:", err);
        }
    };

    return (
        <div className="flex items-center gap-4 p-4 bg-white/40 rounded-lg">
            <img
                src={imgSrc}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
                onError={handleImgError}
            />

            <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{item.title}</h3>

                {item.description && (
                    <h4 className="text-sm text-gray-700 truncate">{item.description}</h4>
                )}

                <p className="text-sm text-gray-600">
                    {Number(item.price).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                    })}
                </p>
            </div>

            <div className="flex items-center gap-3">
                <h3>Qty: {item.quantity}</h3>

                <button
                    onClick={handleRemove}
                    className="text-red-600 hover:opacity-80 font-medium"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;
