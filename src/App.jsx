import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ListingPage from "./features/Products/pages/ListingPage";
import EditProductPage from "./features/Products/pages/EditProductPage";
import LoginPage from "./features/Auth/pages/LoginPage";
import SellPage from "./features/Products/pages/SellPage";
import CartPage from "./features/Cart/pages/CartPage";
import CheckoutPage from "./features/Cart/pages/CheckoutPage";
import { ProtectedRoute, ProtectedLogin } from "./components/ProtectedRoutes/ProtectedRoute";
import NotFoundPage from "./features/Auth/pages/NotFoundPage";

import { useAuth } from "./hooks/useAuth";
import { setAuthStatus, clearAuth } from "./state/authSlice";

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (user) {
      dispatch(
        setAuthStatus({
          isAuthenticated: true,
          user: {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          },
        })
      );
    } else {
      dispatch(clearAuth());
    }
  }, [user, loading, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Header />
      <main className="max-w-6xl mx-auto p-5">
        <Routes>
          <Route path="/" element={<ListingPage />} />
          <Route path="/login" element={<ProtectedLogin> <LoginPage /></ProtectedLogin>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/edit/:id" element={<EditProductPage />} />
          <Route path="/sell" element={<ProtectedRoute><SellPage /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
