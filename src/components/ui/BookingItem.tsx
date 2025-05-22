/**
 * BookingItem Component
 * Displays a booking card with cafe details, booking information, and status.
 * Shows booking date, time, party size, and provides cancellation option for active bookings.
 * Includes visual status indicators and time-relative information.
 */

import React from 'react';
import { formatDistanceToNow, parseISO, format } from 'date-fns';
import { Calendar, Users, Clock, X } from 'lucide-react';
import { Booking } from '../../stores/bookingStore';

interface BookingItemProps {
  booking: Booking;
  onCancel: (id: number) => void;
}

const BookingItem: React.FC<BookingItemProps> = ({ booking, onCancel }) => {
  const bookingDate = parseISO(booking.date);
  const formattedDate = format(bookingDate, 'EEEE, MMMM d, yyyy');
  const timeDistance = formatDistanceToNow(bookingDate, { addSuffix: true });
  
  const statusColors = {
    confirmed: 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-300',
    pending: 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-300',
    cancelled: 'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-300',
    completed: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/40 dark:text-secondary-300',
  };
  
  const isPast = booking.status === 'completed' || booking.status === 'cancelled';
  
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md dark:bg-secondary-900">
      <div className="relative h-32 w-full">
        <img 
          src={booking.cafeImage} 
          alt={booking.cafeName}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <h3 className="font-serif text-lg font-semibold text-white">
            {booking.cafeName}
          </h3>
        </div>
        <div className="absolute right-3 top-3">
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[booking.status]}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-3 flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            <span className="text-secondary-800 dark:text-secondary-200">{formattedDate}</span>
            <span className="text-xs text-secondary-600 dark:text-secondary-400">({timeDistance})</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            <span className="text-secondary-800 dark:text-secondary-200">{booking.time}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            <span className="text-secondary-800 dark:text-secondary-200">
              {booking.partySize} {booking.partySize === 1 ? 'person' : 'people'}
            </span>
          </div>
        </div>
        
        {!isPast && booking.status !== 'cancelled' && (
          <button
            onClick={() => onCancel(booking.id)}
            className="flex w-full items-center justify-center gap-1 rounded-lg border border-error-300 py-2 text-sm font-medium text-error-700 transition-colors hover:bg-error-50 dark:border-error-800 dark:text-error-400 dark:hover:bg-error-900/20"
          >
            <X className="h-4 w-4" />
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingItem;