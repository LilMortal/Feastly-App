/**
 * Rating Component
 * Displays a star rating with optional numerical value.
 * Supports different sizes and can show/hide the numerical rating.
 * Uses filled and empty stars to represent the rating value.
 */

import React from 'react';
import { Star } from 'lucide-react';
import { MAX_RATING } from '../../config';

interface RatingProps {
  value: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Rating: React.FC<RatingProps> = ({ value, showValue = true, size = 'md' }) => {
  const stars = [];
  
  // Determine star size based on prop
  const starSize = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }[size];
  
  // Create array of stars
  for (let i = 1; i <= MAX_RATING; i++) {
    if (i <= Math.floor(value)) {
      // Full star
      stars.push(
        <Star key={i} className={`${starSize} fill-warning-400 text-warning-400`} />
      );
    } else if (i - 0.5 <= value) {
      // Half star (we approximate with a full star for simplicity)
      stars.push(
        <Star key={i} className={`${starSize} fill-warning-400 text-warning-400`} />
      );
    } else {
      // Empty star
      stars.push(
        <Star key={i} className={`${starSize} text-secondary-300 dark:text-secondary-700`} />
      );
    }
  }
  
  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars}</div>
      {showValue && (
        <span className="ml-1 text-xs font-medium text-secondary-700 dark:text-secondary-400">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;