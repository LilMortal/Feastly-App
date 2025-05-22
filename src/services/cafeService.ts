/**
 * Café Service
 * Handles café data operations including fetching café lists and individual café details.
 * Currently uses mock data for development purposes.
 * 
 * Features:
 * - Fetch all cafés
 * - Fetch individual café details
 * - Mock data with realistic café information
 * - Detailed menu and time slot management
 * - Rich café descriptions and images
 */

import { Cafe } from '../stores/cafeStore';
import { API_URL } from '../config';

// Mock cafe data for development
const mockCafes: Cafe[] = [
  {
    id: 1,
    name: 'The Crumby Café',
    address: '12 Silver Street, Leicester LE1 5ET',
    description: 'A cozy café nestled in the heart of Leicester, offering freshly baked pastries, artisanal coffee, and a warm, welcoming atmosphere. Our specialty is homemade sourdough bread and seasonal fruit tarts.',
    rating: 4.7,
    priceLevel: 2,
    image: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    coverImage: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    menu: [
      'Artisanal Coffee - £3.50',
      'Avocado Toast - £8.95',
      'Homemade Granola Bowl - £7.50',
      'Eggs Benedict - £9.95',
      'Fresh Pastries - £3.25',
    ],
    timeSlots: [
      { id: 1, time: '09:00', available: true },
      { id: 2, time: '10:30', available: true },
      { id: 3, time: '12:00', available: false },
      { id: 4, time: '13:30', available: true },
      { id: 5, time: '15:00', available: true },
      { id: 6, time: '16:30', available: false },
    ],
  },
  {
    id: 2,
    name: 'Brew & Bloom',
    address: '45 Granby Street, Leicester LE1 6FE',
    description: 'Brew & Bloom combines excellent coffee with beautiful floral arrangements. Enjoy your latte surrounded by lush plants in our greenhouse-inspired space. We source our beans ethically and roast in small batches on site.',
    rating: 4.5,
    priceLevel: 3,
    image: 'https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    coverImage: 'https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    menu: [
      'Specialty Pour Over - £4.50',
      'Botanical Breakfast - £10.95',
      'Vegan Buddha Bowl - £11.50',
      'Rose Latte - £4.75',
      'Lavender Scone - £3.95',
    ],
    timeSlots: [
      { id: 1, time: '08:00', available: true },
      { id: 2, time: '09:30', available: false },
      { id: 3, time: '11:00', available: true },
      { id: 4, time: '12:30', available: true },
      { id: 5, time: '14:00', available: false },
      { id: 6, time: '15:30', available: true },
    ],
  },
  {
    id: 3,
    name: 'Rustic Bean',
    address: '78 Queens Road, Leicester LE2 1TU',
    description: 'A charming rustic café serving hearty breakfasts and lunches made from locally sourced ingredients. Our cozy interior features reclaimed wood and vintage décor, creating the perfect atmosphere for relaxation or casual meetings.',
    rating: 4.2,
    priceLevel: 2,
    image: 'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    coverImage: 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    menu: [
      'Farmhouse Breakfast - £12.50',
      'Sourdough Sandwich - £8.95',
      'Seasonal Soup - £6.50',
      'Rustic Ploughman\'s - £11.25',
      'Apple Crumble - £5.95',
    ],
    timeSlots: [
      { id: 1, time: '09:00', available: true },
      { id: 2, time: '10:30', available: true },
      { id: 3, time: '12:00', available: true },
      { id: 4, time: '13:30', available: false },
      { id: 5, time: '15:00', available: false },
      { id: 6, time: '16:30', available: true },
    ],
  },
  {
    id: 4,
    name: 'Urban Grind',
    address: '23 Belvoir Street, Leicester LE1 6QH',
    description: 'A modern, minimalist coffee shop specializing in single-origin beans and precision brewing methods. Popular with students and professionals alike, we offer fast Wi-Fi, plenty of power outlets, and a focused atmosphere for work or study.',
    rating: 4.8,
    priceLevel: 2,
    image: 'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    coverImage: 'https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    menu: [
      'Aeropress Coffee - £3.75',
      'Cold Brew - £4.25',
      'Avocado & Feta Toast - £7.95',
      'Protein Power Bowl - £9.50',
      'Energy Ball - £2.50',
    ],
    timeSlots: [
      { id: 1, time: '07:30', available: true },
      { id: 2, time: '09:00', available: true },
      { id: 3, time: '10:30', available: false },
      { id: 4, time: '12:00', available: true },
      { id: 5, time: '13:30', available: true },
      { id: 6, time: '15:00', available: true },
    ],
  },
  {
    id: 5,
    name: 'Sweet Moments',
    address: '89 London Road, Leicester LE2 0PF',
    description: 'A delightful patisserie and tea room offering an exquisite selection of handcrafted cakes, pastries, and macarons. Our elegant space is perfect for afternoon tea, celebrations, or treating yourself to something special.',
    rating: 4.6,
    priceLevel: 3,
    image: 'https://images.pexels.com/photos/239975/pexels-photo-239975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    coverImage: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    menu: [
      'Afternoon Tea for Two - £32.95',
      'French Macarons (6) - £9.50',
      'Signature Chocolate Cake - £5.75',
      'Champagne & Strawberries - £15.95',
      'Luxury Hot Chocolate - £4.50',
    ],
    timeSlots: [
      { id: 1, time: '10:00', available: true },
      { id: 2, time: '11:30', available: false },
      { id: 3, time: '13:00', available: true },
      { id: 4, time: '14:30', available: true },
      { id: 5, time: '16:00', available: true },
      { id: 6, time: '17:30', available: false },
    ],
  },
];

export const cafeService = {
  getCafes: async (): Promise<Cafe[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCafes);
      }, 700);
    });
  },

  getCafeById: async (id: number): Promise<Cafe | null> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const cafe = mockCafes.find((c) => c.id === id);
        resolve(cafe || null);
      }, 500);
    });
  },
};