import React from "react";
import Navbar from "../components/Navbar/Navbar";

import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>

      <footer className="w-full bg-gray-800 text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
