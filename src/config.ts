// API configuration
/**
 * Application Configuration
 * Central configuration file containing all application-wide constants and settings.
 * 
 * Features:
 * - API endpoint configuration
 * - Application branding and metadata
 * - Rating and price level settings
 * - Dynamic copyright year
 */

/**
 * API Configuration
 * Base URL for all API endpoints
 * In development, this would typically point to a local server
 * In production, this would point to the actual API server
 */

// API configuration
export const API_URL = '/api';

// App constants
export const APP_NAME = 'Feastly';
export const LOCATION = 'Leicester, England';
export const COPYRIGHT_YEAR = new Date().getFullYear();

// Rating display configuration
export const MAX_RATING = 5;
export const PRICE_LEVEL_SYMBOL = '£';
export const MAX_PRICE_LEVEL = 3;