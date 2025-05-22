/**
 * CafeCard Component
 * A card component that displays cafe information including image, name, rating,
 * price level, address, and available time slots.
 * Links to the cafe's detailed page when clicked.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import { Cafe } from '../../stores/cafeStore';
import Rating from './Rating';
import PriceLevel from './PriceLevel';

interface CafeCardProps {
  cafe: Cafe;
}

const CafeCard: React.FC<CafeCardProps> = ({ cafe }) => {
  const availableSlots = cafe.timeSlots.filter((slot) => slot.available).length;
  
  return (
    <Link to={`/cafe/${cafe.id}`} className="block">
      <div className="h-full overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-secondary-900">
        <div 
          className="h-44 w-full overflow-hidden bg-secondary-100 dark:bg-secondary-800"
          style={{
            backgroundImage: `url(${cafe.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="p-4">
          <h3 className="mb-1 font-serif text-lg font-semibold text-secondary-900 dark:text-secondary-100">
            {cafe.name}
          </h3>
          
          <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <Rating value={cafe.rating} size="sm" />
            <PriceLevel value={cafe.priceLevel} />
          </div>
          
          <div className="mb-3 flex items-start gap-1 text-xs text-secondary-600 dark:text-secondary-400">
            <MapPin className="mt-0.5 h-3 w-3 flex-shrink-0" />
            <span>{cafe.address}</span>
          </div>
          
          <div className="flex items-center gap-1 text-xs font-medium">
            <Clock className="h-3 w-3 text-primary-600 dark:text-primary-400" />
            <span className="text-primary-700 dark:text-primary-300">
              {availableSlots} available time slots today
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CafeCard;