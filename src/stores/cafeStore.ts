/**
 * Café Store
 * A Zustand store that manages café data and filtering operations.
 * Handles fetching café lists, individual café details, and filtering functionality.
 * 
 * Features:
 * - Café data management
 * - Fetch all cafés
 * - Fetch individual café details
 * - Rating-based filtering
 * - Search functionality
 * - Loading states for async operations
 * - Toast notifications for feedback
 */

import { create } from 'zustand';
import { cafeService } from '../services/cafeService';
import { useToastStore } from './toastStore';

export interface TimeSlot {
  id: number;
  time: string;
  available: boolean;
}

export interface Cafe {
  id: number;
  name: string;
  address: string;
  description: string;
  rating: number;
  priceLevel: number;
  image: string;
  coverImage: string;
  menu: string[];
  timeSlots: TimeSlot[];
}

interface CafeState {
  cafes: Cafe[];
  selectedCafe: Cafe | null;
  isLoading: boolean;
  filters: {
    rating: number | null;
    search: string;
  };
  fetchCafes: () => Promise<void>;
  fetchCafeById: (id: number) => Promise<void>;
  setFilter: (key: keyof CafeState['filters'], value: any) => void;
  resetFilters: () => void;
  filteredCafes: () => Cafe[];
}

export const useCafeStore = create<CafeState>((set, get) => ({
  cafes: [],
  selectedCafe: null,
  isLoading: false,
  filters: {
    rating: null,
    search: '',
  },
  
  fetchCafes: async () => {
    try {
      set({ isLoading: true });
      const cafes = await cafeService.getCafes();
      set({ cafes, isLoading: false });
    } catch (error) {
      useToastStore.getState().addToast({
        type: 'error',
        message: 'Failed to fetch cafés',
      });
      set({ isLoading: false });
    }
  },
  
  fetchCafeById: async (id: number) => {
    try {
      set({ isLoading: true });
      const cafe = await cafeService.getCafeById(id);
      set({ selectedCafe: cafe, isLoading: false });
    } catch (error) {
      useToastStore.getState().addToast({
        type: 'error',
        message: 'Failed to fetch café details',
      });
      set({ isLoading: false });
    }
  },
  
  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }));
  },
  
  resetFilters: () => {
    set({
      filters: {
        rating: null,
        search: '',
      },
    });
  },
  
  filteredCafes: () => {
    const { cafes, filters } = get();
    
    return cafes.filter((cafe) => {
      // Filter by rating
      if (filters.rating !== null && cafe.rating < filters.rating) {
        return false;
      }
      
      // Filter by search term
      if (filters.search && !cafe.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  },
}));