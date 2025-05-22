/**
 * ProtectedRoute Component
 * A wrapper component that protects routes requiring authentication.
 * Redirects unauthenticated users to the login page while preserving the intended destination.
 * 
 * Features:
 * - Checks user authentication status
 * - Preserves the attempted URL for post-login redirect
 * - Uses React Router's Outlet for nested route rendering
 */

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page but save the attempted URL to redirect back after login
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;