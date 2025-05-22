/**
 * ProfilePage Component
 * A user profile management page that allows users to view and update their information.
 * Features profile image upload, personal details form, and real-time updates.
 * 
 * Features:
 * - Profile image upload with preview
 * - Editable personal information (name, phone, address)
 * - Form validation and error handling
 * - Loading states during updates
 * - Dark mode support
 * - Responsive design
 * - Mock file upload implementation (to be replaced with actual upload)
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import Spinner from '../components/ui/Spinner';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isAuthenticated, isLoading } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const success = await signup(name, email, password);
    
    if (!success) {
      setError('Failed to create account. Please try again.');
    }
  };
  
  return (
    <div>
      <h2 className="mb-6 text-center text-2xl font-bold text-secondary-900 dark:text-secondary-100">
        Create your account
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="name" 
            className="block text-sm font-medium text-secondary-700 dark:text-secondary-300"
          >
            Full Name
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <User className="h-5 w-5 text-secondary-500" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="input pl-10"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        
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
              autoComplete="new-password"
              required
              className="input pl-10"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <label 
            htmlFor="confirmPassword" 
            className="block text-sm font-medium text-secondary-700 dark:text-secondary-300"
          >
            Confirm Password
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-5 w-5 text-secondary-500" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="input pl-10"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        
        {error && (
          <div className="rounded-md bg-error-50 p-3 text-sm text-error-800 dark:bg-error-900/20 dark:text-error-300">
            {error}
          </div>
        )}
        
        <div className="pt-2">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner size="sm" color="white" />
                <span>Creating account...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span>Create Account</span>
              </div>
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm text-secondary-500 dark:text-secondary-400">
        Already have an account?{' '}
        <Link 
          to="/auth/login" 
          className="font-medium text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;