import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((s) => s.auth);

  if (loading) return null;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

export const ProtectedLogin = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((s) => s.auth);

  if (loading) return null;

  if (isAuthenticated) return <Navigate to="/" replace />;

  return children;
};
