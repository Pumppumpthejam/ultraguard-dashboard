// RequireAuth.tsx - Middleware route guard using Outlet + role access

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface RequireAuthProps {
  allowedRoles: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
  const auth = useAuth();             // Access auth context
  const user = auth?.user;            // Get logged-in user

  if (!user) {
    return <Navigate to="/login" replace />; // Not logged in
  }

  if (!allowedRoles?.includes(user.role)) {
    return <Navigate to="/login" replace />; // Not allowed
  }

  return <Outlet />; // ✅ Render nested route
};

export default RequireAuth;
