/**
 * Authentication Service
 * Handles user authentication operations including login, signup, logout, and profile management.
 * Currently uses mock data and localStorage for development purposes.
 * 
 * Features:
 * - User authentication (login/signup)
 * - Session management
 * - Profile updates
 * - Mock data for development
 * - Local storage persistence
 */

import { User } from '../stores/authStore';
import { API_URL } from '../config';

// Mock user data for development
const mockUsers: User[] = [
  {
    id: 1,
    name: 'Jordan Smith',
    email: 'jordsmith93@gmail.com',
    phone: '07700 900001',
    address: '12 Clarendon Park Road, Leicester, LE2 3AJ',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    name: 'Aaliyah Thompson',
    email: 'aaliyah_t@outlook.com',
    phone: '07700 900002',
    address: '89 Evington Road, Leicester, LE5 5PB',
  },
  {
    id: 3,
    name: 'Marcus Patel',
    email: 'marcpatel@yahoo.com',
    phone: '07700 900003',
    address: '45 Narborough Road, Leicester, LE3 0LE',
  },
];

// In the future, this would be replaced with actual API calls
export const authService = {
  login: async (email: string, _password: string): Promise<User | null> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find((u) => u.email === email);
        if (user) {
          localStorage.setItem('feastly-user', JSON.stringify(user));
        }
        resolve(user || null);
      }, 800);
    });
  },

  signup: async (name: string, email: string, _password: string): Promise<User | null> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: mockUsers.length + 1,
          name,
          email,
          phone: '',
          address: '',
        };
        
        localStorage.setItem('feastly-user', JSON.stringify(newUser));
        resolve(newUser);
      }, 800);
    });
  },

  logout: (): void => {
    localStorage.removeItem('feastly-user');
  },

  updateProfile: async (id: number, updates: Partial<User>): Promise<User | null> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedUser = localStorage.getItem('feastly-user');
        if (!storedUser) return resolve(null);
        
        const user = JSON.parse(storedUser) as User;
        const updatedUser = { ...user, ...updates };
        
        localStorage.setItem('feastly-user', JSON.stringify(updatedUser));
        resolve(updatedUser);
      }, 600);
    });
  },

  getCurrentUser: (): User | null => {
    const storedUser = localStorage.getItem('feastly-user');
    return storedUser ? JSON.parse(storedUser) : null;
  },
};