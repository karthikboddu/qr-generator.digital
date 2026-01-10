import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
}

export default NotFound;
