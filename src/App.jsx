import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ProtectedRoute, ProtectedLogin } from "./components/ProtectedRoutes/ProtectedRoute";
import { ErrorBoundary } from "./components/common/ErrorBoundary";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import ListingPage from "./features/Products/pages/ListingPage";
import EditProductPage from "./features/Products/pages/EditProductPage";
import LoginPage from "./features/Auth/pages/LoginPage";
import SellPage from "./features/Products/pages/SellPage";
import CartPage from "./features/Cart/pages/CartPage";
import CheckoutPage from "./features/Cart/pages/CheckoutPage";
import NotFoundPage from "./features/Auth/pages/NotFoundPage";

import { onAuthChange } from "./api/auth";
import { setAuthStatus, clearAuth } from "./state/authSlice";


function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        const safeUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        dispatch(setAuthStatus({ isAuthenticated: true, user: safeUser }));
      } else {
        dispatch(clearAuth());
      }
      setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [dispatch]);

  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-white font-bold ">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Header />
      <main className="max-w-6xl mx-auto p-5">
        <Routes>
          <Route path="/" element={<ErrorBoundary><ListingPage /></ErrorBoundary>} />
          <Route path="/login" element={<ProtectedLogin><LoginPage /></ProtectedLogin>} />
          <Route path="/cart" element={<ErrorBoundary> <CartPage /></ErrorBoundary>} />
          <Route path="/products/edit/:id" element={<ErrorBoundary> <EditProductPage /> </ErrorBoundary>} />
          <Route path="/sell" element={<ProtectedRoute> <ErrorBoundary>  <SellPage /> </ErrorBoundary></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute> <ErrorBoundary> <CheckoutPage /> </ErrorBoundary> </ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );

}

export default App;
