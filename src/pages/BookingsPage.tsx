/**
 * BookingsPage Component
 * A page that displays and manages user's café bookings.
 * Features tabs for upcoming and past bookings, booking cancellation, and a confirmation modal.
 * 
 * Features:
 * - Tabbed interface for upcoming and past bookings
 * - Booking cancellation with confirmation modal
 * - Loading states with spinner
 * - Empty state messages
 * - Responsive grid layout
 * - Dark mode support
 */

import React, { useEffect, useState } from 'react';
import { useBookingStore, Booking } from '../stores/bookingStore';
import BookingItem from '../components/ui/BookingItem';
import Spinner from '../components/ui/Spinner';

const BookingsPage: React.FC = () => {
  const { bookings, fetchUserBookings, cancelBooking, isLoading } = useBookingStore();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [cancelModalOpen, setCancelModalOpen] = useState<boolean>(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  
  useEffect(() => {
    fetchUserBookings();
  }, [fetchUserBookings]);
  
  const upcomingBookings = bookings.filter(
    (booking) => booking.status === 'confirmed' || booking.status === 'pending'
  );
  
  const pastBookings = bookings.filter(
    (booking) => booking.status === 'completed' || booking.status === 'cancelled'
  );
  
  const handleCancelClick = (id: number) => {
    setSelectedBookingId(id);
    setCancelModalOpen(true);
  };
  
  const confirmCancel = async () => {
    if (selectedBookingId) {
      await cancelBooking(selectedBookingId);
      setCancelModalOpen(false);
      setSelectedBookingId(null);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <h1 className="mb-6 font-serif text-2xl font-bold text-secondary-900 dark:text-secondary-50 md:text-3xl">
        My Bookings
      </h1>
      
      {/* Tabs */}
      <div className="mb-6 flex space-x-2 border-b border-secondary-200 dark:border-secondary-800">
        <button
          className={`pb-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'upcoming'
              ? 'border-b-2 border-primary-700 text-primary-800 dark:border-primary-500 dark:text-primary-300'
              : 'text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-secondary-200'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming ({upcomingBookings.length})
        </button>
        <button
          className={`pb-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'past'
              ? 'border-b-2 border-primary-700 text-primary-800 dark:border-primary-500 dark:text-primary-300'
              : 'text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-secondary-200'
          }`}
          onClick={() => setActiveTab('past')}
        >
          Past ({pastBookings.length})
        </button>
      </div>
      
      {/* Bookings List */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {activeTab === 'upcoming' ? (
          upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking) => (
              <BookingItem 
                key={booking.id} 
                booking={booking} 
                onCancel={handleCancelClick} 
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-lg font-medium text-secondary-900 dark:text-secondary-100">
                No upcoming bookings
              </p>
              <p className="mt-2 text-secondary-600 dark:text-secondary-400">
                Visit the home page to discover and book cafés
              </p>
            </div>
          )
        ) : (
          pastBookings.length > 0 ? (
            pastBookings.map((booking) => (
              <BookingItem 
                key={booking.id} 
                booking={booking} 
                onCancel={handleCancelClick} 
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-lg font-medium text-secondary-900 dark:text-secondary-100">
                No past bookings
              </p>
            </div>
          )
        )}
      </div>
      
      {/* Cancel confirmation modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-secondary-900">
            <h3 className="mb-4 font-serif text-xl font-semibold text-secondary-900 dark:text-secondary-100">
              Cancel booking
            </h3>
            <p className="mb-6 text-secondary-600 dark:text-secondary-400">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                className="btn btn-outline flex-1"
                onClick={() => setCancelModalOpen(false)}
              >
                No, keep it
              </button>
              <button
                className="btn flex-1 bg-error-600 text-white hover:bg-error-700 dark:bg-error-700 dark:hover:bg-error-800"
                onClick={confirmCancel}
              >
                Yes, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;