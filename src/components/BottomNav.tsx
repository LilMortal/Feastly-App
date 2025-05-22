/**
 * BottomNav Component
 * A mobile-only bottom navigation bar that provides quick access to main app features.
 * Shows different navigation options based on user authentication status.
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Coffee, Calendar, User } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 z-40 w-full border-t border-secondary-200 bg-white dark:border-secondary-800 dark:bg-secondary-900 md:hidden">
      <div className="grid h-16 grid-cols-3">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center ${
            isActive('/') 
              ? 'text-primary-700 dark:text-primary-400' 
              : 'text-secondary-600 dark:text-secondary-400'
          }`}
        >
          <Coffee className="h-5 w-5" />
          <span className="mt-1 text-xs">Cafés</span>
        </Link>
        
        {isAuthenticated ? (
          <>
            <Link
              to="/bookings"
              className={`flex flex-col items-center justify-center ${
                isActive('/bookings') 
                  ? 'text-primary-700 dark:text-primary-400' 
                  : 'text-secondary-600 dark:text-secondary-400'
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span className="mt-1 text-xs">Bookings</span>
            </Link>
            
            <Link
              to="/profile"
              className={`flex flex-col items-center justify-center ${
                isActive('/profile') 
                  ? 'text-primary-700 dark:text-primary-400' 
                  : 'text-secondary-600 dark:text-secondary-400'
              }`}
            >
              <User className="h-5 w-5" />
              <span className="mt-1 text-xs">Profile</span>
            </Link>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center text-secondary-500 opacity-50">
              <Calendar className="h-5 w-5" />
              <span className="mt-1 text-xs">Bookings</span>
            </div>
            
            <Link
              to="/auth/login"
              className={`flex flex-col items-center justify-center ${
                location.pathname.includes('/auth')
                  ? 'text-primary-700 dark:text-primary-400' 
                  : 'text-secondary-600 dark:text-secondary-400'
              }`}
            >
              <User className="h-5 w-5" />
              <span className="mt-1 text-xs">Sign In</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default BottomNav;