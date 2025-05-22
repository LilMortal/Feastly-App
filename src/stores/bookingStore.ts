/**
 * Booking Store
 * A Zustand store that manages café booking state and operations.
 * Handles booking creation, fetching user bookings, and booking cancellations.
 * 
 * Features:
 * - Booking state management
 * - Create new bookings
 * - Fetch user's bookings
 * - Cancel existing bookings
 * - Loading states for async operations
 * - Toast notifications for feedback
 */

import { create } from 'zustand';
import { bookingService } from '../services/bookingService';
import { useToastStore } from './toastStore';

export interface Booking {
  id: number;
  cafeId: number;
  cafeName: string;
  cafeImage: string;
  date: string;
  time: string;
  partySize: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

interface BookingState {
  bookings: Booking[];
  isLoading: boolean;
  createBooking: (booking: Omit<Booking, 'id' | 'status'>) => Promise<boolean>;
  fetchUserBookings: () => Promise<void>;
  cancelBooking: (id: number) => Promise<boolean>;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  isLoading: false,
  
  createBooking: async (booking) => {
    try {
      set({ isLoading: true });
      const newBooking = await bookingService.createBooking(booking);
      
      if (newBooking) {
        set((state) => ({
          bookings: [...state.bookings, newBooking],
          isLoading: false,
        }));
        
        useToastStore.getState().addToast({
          type: 'success',
          message: 'Booking created successfully',
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      useToastStore.getState().addToast({
        type: 'error',
        message: 'Failed to create booking',
      });
      set({ isLoading: false });
      return false;
    }
  },
  
  fetchUserBookings: async () => {
    try {
      set({ isLoading: true });
      const bookings = await bookingService.getUserBookings();
      set({ bookings, isLoading: false });
    } catch (error) {
      useToastStore.getState().addToast({
        type: 'error',
        message: 'Failed to fetch bookings',
      });
      set({ isLoading: false });
    }
  },
  
  cancelBooking: async (id: number) => {
    try {
      set({ isLoading: true });
      const success = await bookingService.cancelBooking(id);
      
      if (success) {
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === id
              ? { ...booking, status: 'cancelled' as const }
              : booking
          ),
          isLoading: false,
        }));
        
        useToastStore.getState().addToast({
          type: 'success',
          message: 'Booking cancelled successfully',
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      useToastStore.getState().addToast({
        type: 'error',
        message: 'Failed to cancel booking',
      });
      set({ isLoading: false });
      return false;
    }
  },
}));