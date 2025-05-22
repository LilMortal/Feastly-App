/**
 * NavBar Component
 * The main navigation bar component that appears at the top of the application.
 * Features responsive design with mobile menu, theme toggle, and authentication-aware navigation.
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CoffeeIcon, MenuIcon, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuthStore } from '../stores/authStore';
import { APP_NAME } from '../config';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`fixed left-0 top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white bg-opacity-95 shadow-md dark:bg-secondary-950 dark:bg-opacity-95'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom mx-auto flex h-16 items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-primary-800 dark:text-primary-100"
        >
          <CoffeeIcon className="h-6 w-6 text-primary-700 dark:text-primary-400" />
          <span className="font-serif text-xl font-bold">
            {APP_NAME}
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Link 
            to="/" 
            className="text-sm font-medium text-secondary-900 transition-colors hover:text-primary-700 dark:text-secondary-100 dark:hover:text-primary-400"
          >
            Cafés
          </Link>
          {isAuthenticated && (
            <>
              <Link 
                to="/bookings" 
                className="text-sm font-medium text-secondary-900 transition-colors hover:text-primary-700 dark:text-secondary-100 dark:hover:text-primary-400"
              >
                My Bookings
              </Link>
              <Link 
                to="/profile" 
                className="text-sm font-medium text-secondary-900 transition-colors hover:text-primary-700 dark:text-secondary-100 dark:hover:text-primary-400"
              >
                Profile
              </Link>
            </>
          )}
          
          <div className="mx-2 h-6 w-px bg-secondary-200 dark:bg-secondary-800" />
          
          <ThemeToggle />
          
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium text-secondary-800 dark:text-secondary-200">
                {user?.name.split(' ')[0]}
              </div>
              <button 
                onClick={logout}
                className="btn btn-outline text-xs"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth/login" className="btn btn-primary">
              Sign In
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-secondary-900 dark:text-secondary-100"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute left-0 top-16 z-50 w-full animate-slide-down bg-white px-4 py-6 shadow-lg dark:bg-secondary-900 md:hidden">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="py-2 text-sm font-medium text-secondary-900 dark:text-secondary-100"
            >
              Cafés
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/bookings" 
                  className="py-2 text-sm font-medium text-secondary-900 dark:text-secondary-100"
                >
                  My Bookings
                </Link>
                <Link 
                  to="/profile" 
                  className="py-2 text-sm font-medium text-secondary-900 dark:text-secondary-100"
                >
                  Profile
                </Link>
                <div className="pt-2">
                  <button 
                    onClick={logout}
                    className="w-full rounded-lg bg-primary-100 py-2 text-sm font-medium text-primary-800 dark:bg-secondary-800 dark:text-primary-100"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link 
                to="/auth/login" 
                className="w-full rounded-lg bg-primary-700 py-2 text-center text-sm font-medium text-white dark:bg-primary-600"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;