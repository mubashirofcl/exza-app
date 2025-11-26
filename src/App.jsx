import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ListingPage from "./features/Products/pages/ListingPage";
import LoginPage from "./features/Auth/pages/LoginPage";
import SellPage from "./features/Products/pages/SellPage";
import CartPage from "./features/Cart/pages/CartPage";
import CheckoutPage from "./features/Cart/pages/CheckoutPage";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import NotFoundPage from "./features/Auth/pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="max-w-6xl mx-auto p-5">
        <Routes>
          <Route path="/" element={<ListingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
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
