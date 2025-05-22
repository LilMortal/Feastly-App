/**
 * HomePage Component
 * The main landing page of the application that displays a list of cafés.
 * Features search functionality, rating filters, and a responsive grid layout.
 * 
 * Features:
 * - Real-time search filtering
 * - Rating-based filtering (5+, 4+, 3+, Any rating)
 * - Responsive grid layout for café cards
 * - Loading state with spinner
 * - Empty state handling
 * - Dark mode support
 */

import React, { useEffect, useState } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import { useCafeStore } from '../stores/cafeStore';
import CafeCard from '../components/ui/CafeCard';
import Spinner from '../components/ui/Spinner';
import { LOCATION } from '../config';

const HomePage: React.FC = () => {
  const { fetchCafes, filters, setFilter, resetFilters, filteredCafes, isLoading } = useCafeStore();
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  useEffect(() => {
    fetchCafes();
  }, [fetchCafes]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter('search', e.target.value);
  };

  const handleRatingFilter = (rating: number | null) => {
    setFilter('rating', rating);
    setIsFilterMenuOpen(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-secondary-900 dark:text-secondary-50 md:text-3xl">
          Discover Cafés
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Find and book the best cafés in {LOCATION}
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-secondary-500" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Search cafés..."
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>

        <div className="relative">
          <button
            className="btn btn-secondary flex items-center gap-2"
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {filters.rating !== null && (
              <span className="ml-1 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                {filters.rating}+
              </span>
            )}
          </button>

          {isFilterMenuOpen && (
            <div className="absolute right-0 top-12 z-10 w-48 rounded-lg bg-white p-4 shadow-lg dark:bg-secondary-800">
              <div className="mb-2 text-sm font-medium text-secondary-900 dark:text-secondary-200">
                Rating
              </div>
              {[5, 4, 3, 0].map((rating) => (
                <button
                  key={rating}
                  className={`mb-2 flex w-full items-center justify-between rounded-md px-3 py-2 text-sm ${
                    filters.rating === rating
                      ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-200'
                      : 'text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-700'
                  }`}
                  onClick={() => handleRatingFilter(rating === 0 ? null : rating)}
                >
                  <span className="flex items-center">
                    {rating > 0 ? (
                      <>
                        <Star className="mr-1 h-4 w-4 fill-warning-400 text-warning-400" />
                        {rating}+
                      </>
                    ) : (
                      'Any rating'
                    )}
                  </span>
                </button>
              ))}

              <button
                className="mt-2 w-full rounded-md border border-secondary-300 px-3 py-1.5 text-xs text-secondary-800 dark:border-secondary-700 dark:text-secondary-300"
                onClick={resetFilters}
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cafe List */}
      {isLoading ? (
        <div className="mt-12 flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {filteredCafes().length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCafes().map((cafe) => (
                <CafeCard key={cafe.id} cafe={cafe} />
              ))}
            </div>
          ) : (
            <div className="mt-8 text-center">
              <p className="text-lg font-medium text-secondary-900 dark:text-secondary-100">
                No cafés found
              </p>
              <p className="mt-2 text-secondary-600 dark:text-secondary-400">
                Try adjusting your filters or search term
              </p>
              <button
                className="mt-4 rounded-md bg-primary-100 px-4 py-2 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                onClick={resetFilters}
              >
                Reset all filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;