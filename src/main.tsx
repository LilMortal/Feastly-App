/**
 * Application Entry Point
 * Initializes and renders the React application.
 *
 * Features:
 * - React 18 root creation
 * - Strict Mode for development
 * - Global styles import
 * - Root element mounting
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);