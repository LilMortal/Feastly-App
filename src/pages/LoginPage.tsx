/**
 * LoginPage Component
 * A form-based page for user authentication that handles login functionality.
 * Features email/password input, form validation, error handling, and loading states.
 * 
 * Features:
 * - Email and password form inputs with icons
 * - Form validation and error messages
 * - Loading state during authentication
 * - Automatic redirection after successful login
 * - Demo mode with sample email addresses
 * - Dark mode support
 * - Link to signup page for new users
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import Spinner from '../components/ui/Spinner';

interface LocationState {
  from?: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const from = (location.state as LocationState)?.from || '/';
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    // Use any password for demo purposes
    const success = await login(email, password);
    
    if (!success) {
      setError('Invalid email or password');
    }
  };
  
  return (
    <div>
      <h2 className="mb-6 text-center text-2xl font-bold text-secondary-900 dark:text-secondary-100">
        Sign in to your account
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-secondary-700 dark:text-secondary-300"
          >
            Email address
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-5 w-5 text-secondary-500" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="input pl-10"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
            Demo emails: jordsmith93@gmail.com, aaliyah_t@outlook.com
          </p>
        </div>
        
        <div>
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-secondary-700 dark:text-secondary-300"
          >
            Password
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-5 w-5 text-secondary-500" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="input pl-10"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
            Any password will work for the demo
          </p>
        </div>
        
        {error && (
          <div className="rounded-md bg-error-50 p-3 text-sm text-error-800 dark:bg-error-900/20 dark:text-error-300">
            {error}
          </div>
        )}
        
        <div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner size="sm" color="white" />
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <LogIn className="h-4 w-4" />
                <span>Sign in</span>
              </div>
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm text-secondary-500 dark:text-secondary-400">
        Don't have an account?{' '}
        <Link 
          to="/auth/signup" 
          className="font-medium text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;