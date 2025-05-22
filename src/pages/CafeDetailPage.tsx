/**
 * CafeDetailPage Component
 * A detailed view of a café with information, menu, and booking functionality.
 * Features image gallery, café details, menu highlights, and a booking system.
 * 
 * Features:
 * - Large header image with café name and rating
 * - Detailed café information and description
 * - Menu highlights section
 * - Date and time slot selection
 * - Party size selection
 * - Booking confirmation modal
 * - Authentication check for bookings
 * - Dark mode support
 * - Responsive design
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, ChevronLeft, Clock, Users, Menu } from 'lucide-react';
import { useCafeStore } from '../stores/cafeStore';
import { useAuthStore } from '../stores/authStore';
import { useBookingStore } from '../stores/bookingStore';
import Rating from '../components/ui/Rating';
import PriceLevel from '../components/ui/PriceLevel';
import Spinner from '../components/ui/Spinner';
import { useToastStore } from '../stores/toastStore';
import { format } from 'date-fns';

const CafeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchCafeById, selectedCafe, isLoading } = useCafeStore();
  const { isAuthenticated } = useAuthStore();
  const { createBooking } = useBookingStore();
  const { addToast } = useToastStore();
  
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [partySize, setPartySize] = useState<number>(2);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  
  useEffect(() => {
    if (id) {
      fetchCafeById(parseInt(id));
    }
  }, [id, fetchCafeById]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleBooking = async () => {
    if (!isAuthenticated) {
      addToast({
        type: 'warning',
        message: 'Please sign in to book a table',
      });
      navigate('/auth/login', { state: { from: `/cafe/${id}` } });
      return;
    }
    
    if (!selectedCafe || !selectedTime) return;
    
    const booking = {
      cafeId: selectedCafe.id,
      cafeName: selectedCafe.name,
      cafeImage: selectedCafe.image,
      date: selectedDate,
      time: selectedTime,
      partySize,
    };
    
    const success = await createBooking(booking);
    
    if (success) {
      setIsBookingModalOpen(false);
      navigate('/bookings');
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (!selectedCafe) {
    return (
      <div className="text-center">
        <p className="text-xl">Café not found</p>
        <button 
          onClick={handleGoBack}
          className="mt-4 text-primary-700 dark:text-primary-400"
        >
          Go back
        </button>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      {/* Header with large image */}
      <div className="relative -mx-4 h-56 overflow-hidden sm:-mx-6 md:h-72 lg:h-80 lg:-mx-8">
        {/* Back button */}
        <button 
          onClick={handleGoBack}
          className="absolute left-4 top-4 z-10 rounded-full bg-white/80 p-2 text-secondary-900 backdrop-blur-sm transition-colors hover:bg-white dark:bg-secondary-900/80 dark:text-secondary-100 dark:hover:bg-secondary-900"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <img 
          src={selectedCafe.coverImage} 
          alt={selectedCafe.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-0 w-full p-4 text-white">
          <h1 className="font-serif text-2xl font-bold md:text-3xl">
            {selectedCafe.name}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Rating value={selectedCafe.rating} />
            <PriceLevel value={selectedCafe.priceLevel} />
          </div>
        </div>
      </div>
      
      {/* Cafe details */}
      <div className="mt-6">
        <div className="flex items-start gap-1 text-sm text-secondary-700 dark:text-secondary-300">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-700 dark:text-primary-400" />
          <span>{selectedCafe.address}</span>
        </div>
        
        <p className="mt-4 text-secondary-800 dark:text-secondary-200">
          {selectedCafe.description}
        </p>
        
        {/* Menu section */}
        <div className="mt-8">
          <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-secondary-900 dark:text-secondary-100">
            <Menu className="h-5 w-5 text-primary-700 dark:text-primary-400" />
            Menu Highlights
          </h2>
          <ul className="mt-3 space-y-2">
            {selectedCafe.menu.map((item, index) => (
              <li 
                key={index}
                className="rounded-lg bg-white p-3 text-sm text-secondary-800 shadow-sm dark:bg-secondary-800 dark:text-secondary-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Booking section */}
        <div className="mt-8">
          <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-secondary-900 dark:text-secondary-100">
            <Calendar className="h-5 w-5 text-primary-700 dark:text-primary-400" />
            Available Time Slots
          </h2>
          
          <div className="mt-3">
            <div className="mb-4">
              <label htmlFor="booking-date" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Select Date
              </label>
              <input
                type="date"
                id="booking-date"
                className="input mt-1"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={format(new Date(), 'yyyy-MM-dd')}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {selectedCafe.timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  className={`flex items-center justify-center rounded-lg py-3 text-sm font-medium transition-colors ${
                    !slot.available
                      ? 'cursor-not-allowed bg-secondary-100 text-secondary-400 dark:bg-secondary-800 dark:text-secondary-600'
                      : selectedTime === slot.time
                      ? 'bg-primary-700 text-white dark:bg-primary-600'
                      : 'bg-white text-secondary-900 hover:bg-secondary-50 dark:bg-secondary-800 dark:text-secondary-100 dark:hover:bg-secondary-700'
                  }`}
                  onClick={() => slot.available && handleTimeSelection(slot.time)}
                  disabled={!slot.available}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Booking button */}
        <div className="mt-8">
          <button
            className="btn btn-primary w-full py-3"
            onClick={() => setIsBookingModalOpen(true)}
            disabled={!selectedTime}
          >
            {selectedTime ? `Book for ${selectedTime}` : 'Select a time'}
          </button>
        </div>
      </div>
      
      {/* Booking modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-secondary-900">
            <h3 className="mb-4 font-serif text-xl font-semibold text-secondary-900 dark:text-secondary-100">
              Confirm your booking
            </h3>
            
            <div className="mb-6 space-y-4 text-sm">
              <div className="flex items-center gap-3 rounded-lg bg-primary-50 p-3 dark:bg-primary-900/20">
                <Calendar className="h-5 w-5 text-primary-700 dark:text-primary-400" />
                <div className="text-secondary-900 dark:text-secondary-100">
                  {format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}
                </div>
              </div>
              
              <div className="flex items-center gap-3 rounded-lg bg-primary-50 p-3 dark:bg-primary-900/20">
                <Clock className="h-5 w-5 text-primary-700 dark:text-primary-400" />
                <div className="text-secondary-900 dark:text-secondary-100">
                  {selectedTime}
                </div>
              </div>
              
              <div className="rounded-lg bg-secondary-50 p-3 dark:bg-secondary-800">
                <label htmlFor="party-size" className="mb-2 block text-sm font-medium text-secondary-900 dark:text-secondary-100">
                  Party Size
                </label>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-secondary-700 dark:text-secondary-400" />
                  <input
                    type="number"
                    id="party-size"
                    min="1"
                    max="10"
                    value={partySize}
                    onChange={(e) => setPartySize(parseInt(e.target.value))}
                    className="input"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                className="btn btn-outline flex-1"
                onClick={() => setIsBookingModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary flex-1"
                onClick={handleBooking}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CafeDetailPage;