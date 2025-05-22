/**
 * MainLayout Component
 * The primary layout wrapper for the application's main content.
 * Includes the top navigation bar, main content area, and bottom navigation.
 * Uses React Router's Outlet for rendering nested routes.
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import BottomNav from '../components/BottomNav';

const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="container-custom flex-1 pb-16 pt-20 md:pb-6">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default MainLayout;