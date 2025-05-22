/**
 * AuthLayout Component
 * A specialized layout for authentication-related pages (login, register, etc.).
 * Features a centered card design with the app logo, theme toggle, and copyright notice.
 * Uses React Router's Outlet for rendering authentication forms.
 */

import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { CoffeeIcon } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-primary-50 dark:bg-secondary-950">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      
      <div className="container-custom flex flex-1 items-center justify-center py-12">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg dark:bg-secondary-900">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center justify-center gap-2">
              <CoffeeIcon className="h-8 w-8 text-primary-700 dark:text-primary-400" />
              <h1 className="text-3xl font-bold text-primary-800 dark:text-primary-100">Feastly</h1>
            </Link>
            <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-400">
              Find and book the best cafés in Leicester
            </p>
          </div>
          
          <Outlet />
          
          <p className="pt-6 text-center text-xs text-secondary-500 dark:text-secondary-400">
            &copy; {new Date().getFullYear()} Feastly. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;