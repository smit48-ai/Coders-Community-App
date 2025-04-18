import React from "react";
import { Navigate } from "react-router-dom";
import isAuthenticated from "./isAuthenticated";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.User);

  if (
    !isAuthenticated() ||
    (user.userdata && !user?.userdata?.isEmailVerified)
  ) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
