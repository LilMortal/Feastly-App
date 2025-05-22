/**
 * Vite Configuration
 * Configures the Vite development server and build process for the Feastly application.
 * 
 * Features:
 * - React plugin integration
 * - Dependency optimization settings
 * - Development server configuration
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0'
  }
});
