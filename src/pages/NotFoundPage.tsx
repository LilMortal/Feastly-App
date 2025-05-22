/**
 * NotFoundPage Component
 * A 404 error page that displays when users navigate to non-existent routes.
 * Features a friendly message, app icon, and a button to return to the home page.
 * 
 * Features:
 * - Centered layout with app branding
 * - Friendly error message with café-themed suggestion
 * - Clear call-to-action to return home
 * - Dark mode support
 * - Responsive design
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { CoffeeIcon, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <CoffeeIcon className="h-16 w-16 text-primary-300 dark:text-primary-700" />
      
      <h1 className="mt-6 font-serif text-4xl font-bold text-secondary-900 dark:text-secondary-100">
        Page Not Found
      </h1>
      
      <p className="mt-4 max-w-md text-secondary-600 dark:text-secondary-400">
        The page you're looking for doesn't exist or has been moved.
        Perhaps you were looking for a delicious café instead?
      </p>
      
      <Link
        to="/"
        className="mt-8 flex items-center gap-2 rounded-lg bg-primary-700 px-6 py-3 text-white transition-colors hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;