import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet is a placeholder for the page content
import Navbar from './Navbar'; // Assuming your Navbar is in the same folder

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      {/* The Outlet component from react-router-dom will render the current page's content here */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      {/* You could add a Footer component here later */}
    </div>
  );
};

export default MainLayout;
