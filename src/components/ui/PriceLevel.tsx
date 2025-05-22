/**
 * PriceLevel Component
 * Displays a visual representation of price level using symbols (e.g., $, €).
 * Shows filled and empty symbols based on the price level value.
 * Optionally displays a "Price:" label.
 */

import React from 'react';
import { PRICE_LEVEL_SYMBOL, MAX_PRICE_LEVEL } from '../../config';

interface PriceLevelProps {
  value: number;
  showLabel?: boolean;
}

const PriceLevel: React.FC<PriceLevelProps> = ({ value, showLabel = false }) => {
  const symbols = [];
  
  // Create array of price symbols
  for (let i = 1; i <= MAX_PRICE_LEVEL; i++) {
    symbols.push(
      <span
        key={i}
        className={`${
          i <= value
            ? 'text-secondary-900 dark:text-secondary-100'
            : 'text-secondary-300 dark:text-secondary-700'
        }`}
      >
        {PRICE_LEVEL_SYMBOL}
      </span>
    );
  }
  
  return (
    <div className="flex items-center gap-1 text-sm">
      {showLabel && <span className="text-xs text-secondary-600 dark:text-secondary-400">Price:</span>}
      <div className="flex">{symbols}</div>
    </div>
  );
};

export default PriceLevel;