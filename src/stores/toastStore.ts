/**
 * Toast Store
 * A Zustand store that manages toast notification state and operations.
 * Handles adding and removing toast notifications with automatic dismissal.
 * 
 * Features:
 * - Toast notification management
 * - Multiple toast types (info, success, warning, error)
 * - Automatic toast dismissal
 * - Customizable duration
 * - Unique toast IDs
 */

import { create } from 'zustand';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id, duration: toast.duration || 3000 };
    
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));
    
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, newToast.duration);
  },
  
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));