import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { logoutUser } from "../../api/auth";
import { useSelector } from "react-redux";
import { alertConfirm, alertSuccess, alertError } from "../../utils/alerts";

const Header = () => {
  const { user, loading } = useAuth();
  const avatarSrc = (user && user.photoURL) || "/avatar.png";

  const cartItems = useSelector((state) => state.products.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = async () => {
    try {
      const result = await alertConfirm(
        "Sign Out?",
        "Are you sure you want to log out?"
      );

      if (!result.isConfirmed) return;

      await logoutUser();
      alertSuccess("Signed Out", "You have been logged out successfully.");
    } catch (err) {
      console.error("Logout error:", err);
      alertError("Logout Failed", err?.message || "Unknown error");
    }
  };

  return (
    <header className="w-[85%] sticky top-4 z-50 flex justify-center mx-auto bg-white/40 border border-white/30 rounded-2xl shadow-elevated backdrop-blur-soft py-4">
      <div className="flex items-center justify-between w-full max-w-7xl px-6">
        <Link to="/" className="font-extrabold text-3xl text-exza-purple">EXZA</Link>

        <nav className="flex items-center gap-3">

          <Link to="/sell" className="rounded-full px-4 py-2 bg-exza-purple text-white">
            Sell Now
          </Link>

          <Link to="/cart" className="flex relative glass-button rounded-full px-4 py-2 text-exza-purple">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-exza-purple text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {!user && !loading && (
            <Link to="/login" className="text-exza-dark text-sm">Sign In</Link>
          )}

          {user && !loading && (
            <>
              <button onClick={handleLogout} className="text-exza-dark">Sign Out</button>
              <img
                src={avatarSrc}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/avatar.png";
                }}
              />
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
