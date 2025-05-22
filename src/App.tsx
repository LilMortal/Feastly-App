/**
 * Main Application Component
 * Serves as the root component of the application, handling routing and global state.
 * 
 * Features:
 * - Theme management (light/dark mode)
 * - Authentication state management
 * - Route protection for authenticated routes
 * - Toast notification system
 * - Responsive layout structure
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useThemeStore } from './stores/themeStore';
import { useAuthStore } from './stores/authStore';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import HomePage from './pages/HomePage';
import CafeDetailPage from './pages/CafeDetailPage';
import BookingsPage from './pages/BookingsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/ui/Toast';
import { useToastStore } from './stores/toastStore';

function App() {
  const { theme, initTheme } = useThemeStore();
  const { checkAuth } = useAuthStore();
  const { toasts } = useToastStore();

  // Initialize theme from localStorage
  useEffect(() => {
    initTheme();
  }, [initTheme]);

  // Check if user is already logged in
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className={theme}>
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="" element={<Navigate to="/auth/login" replace />} />
          </Route>

          {/* Main app routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="cafe/:id" element={<CafeDetailPage />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Toast container */}
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;