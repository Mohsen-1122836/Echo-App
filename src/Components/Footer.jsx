import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        
        {/* Left side - logo / name */}
        <div className="mb-4 sm:mb-0 text-center sm:text-left">
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            Echo
          </p>
          <p>© {new Date().getFullYear()} All rights reserved</p>
        </div>

        
        <div className="flex space-x-6">
          <a
            href="#"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
