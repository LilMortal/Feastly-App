/**
 * Booking Service
 * Handles café booking operations including creation, retrieval, and cancellation.
 * Currently uses mock data for development purposes.
 * 
 * Features:
 * - Create new bookings
 * - Fetch user's bookings
 * - Cancel existing bookings
 * - Automatic status updates (completed/pending)
 * - Mock data for development
 */

import { Booking } from '../stores/bookingStore';
import { API_URL } from '../config';
import { useAuthStore } from '../stores/authStore';
import { format } from 'date-fns';

// Mock bookings data for development
let mockBookings: Booking[] = [
  {
    id: 1,
    cafeId: 1,
    cafeName: 'The Crumby Café',
    cafeImage: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2025-05-20',
    time: '10:30',
    partySize: 2,
    status: 'confirmed',
  },
  {
    id: 2,
    cafeId: 3,
    cafeName: 'Rustic Bean',
    cafeImage: 'https://images.pexels.com/photos/840696/pexels-photo-840696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2025-05-25',
    time: '12:00',
    partySize: 4,
    status: 'pending',
  },
  {
    id: 3,
    cafeId: 2,
    cafeName: 'Brew & Bloom',
    cafeImage: 'https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2025-04-15',
    time: '09:30',
    partySize: 1,
    status: 'completed',
  },
];

export const bookingService = {
  createBooking: async (booking: Omit<Booking, 'id' | 'status'>): Promise<Booking | null> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBooking: Booking = {
          ...booking,
          id: mockBookings.length + 1,
          status: 'confirmed',
        };
        
        mockBookings.push(newBooking);
        resolve(newBooking);
      }, 800);
    });
  },

  getUserBookings: async (): Promise<Booking[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Get current date to determine completed vs upcoming bookings
        const today = format(new Date(), 'yyyy-MM-dd');
        
        // Mark bookings as completed if date has passed
        mockBookings = mockBookings.map((booking) => {
          if (booking.status !== 'cancelled' && booking.date < today) {
            return { ...booking, status: 'completed' };
          }
          return booking;
        });
        
        resolve(mockBookings);
      }, 600);
    });
  },

  cancelBooking: async (id: number): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const bookingIndex = mockBookings.findIndex((b) => b.id === id);
        
        if (bookingIndex !== -1) {
          mockBookings[bookingIndex].status = 'cancelled';
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  },
};