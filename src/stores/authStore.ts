/**
 * Authentication Store
 * A Zustand store that manages user authentication state and operations.
 * Handles login, signup, logout, profile updates, and authentication checks.
 * 
 * Features:
 * - User authentication state management
 * - Login and signup functionality
 * - Profile updates
 * - Authentication persistence
 * - Toast notifications for feedback
 * - Loading states for async operations
 */

import { create } from 'zustand';
import { authService } from '../services/authService';
import { useToastStore } from './toastStore';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const user = await authService.login(email, password);
      
      if (user) {
        set({ user, isAuthenticated: true, isLoading: false });
        useToastStore.getState().addToast({
          type: 'success',
          message: 'Successfully logged in',
        });
        return true;
      }
      return false;
    } catch (error) {
      useToastStore.getState().addToast({
        type: 'error',
        message: 'Failed to login. Please check your credentials',
      });
      set({ isLoading: false });
      return false;
    }
  },

  signup: async (name: string, email: string, password: string) => {
    try {
      set({ isLoading: true });
      const user = await authService.signup(name, email, password);
      
      if (user) {
        set({ user, isAuthenticated: true, isLoading: false });
        useToastStore.getState().addToast({
          type: 'success',
          message: 'Account created successfully',
        });
        return true;
      }
      return false;
    } catch (error) {
      useToastStore.getState().addToast({
        type: 'error',
        message: 'Failed to create account',
      });
      set({ isLoading: false });
      return false;
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
    useToastStore.getState().addToast({
      type: 'info',
      message: 'You have been logged out',
    });
  },

  updateProfile: async (updates: Partial<User>) => {
    try {
      set({ isLoading: true });
      const { user } = get();
      if (!user) return false;

      const updatedUser = await authService.updateProfile(user.id, updates);
      
      if (updatedUser) {
        set({ user: updatedUser, isLoading: false });
        useToastStore.getState().addToast({
          type: 'success',
          message: 'Profile updated successfully',
        });
        return true;
      }
      return false;
    } catch (error) {
      useToastStore.getState().addToast({
        type: 'error',
        message: 'Failed to update profile',
      });
      set({ isLoading: false });
      return false;
    }
  },

  checkAuth: () => {
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      set({ user: storedUser, isAuthenticated: true });
    }
  },
}));