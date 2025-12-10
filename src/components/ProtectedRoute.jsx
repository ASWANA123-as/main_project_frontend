// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ role, children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.usertype && user.usertype !== role) {
    // try user.role or user.userType if your backend uses another key
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
