import React from 'react';
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-500">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-6 text-gray-800 dark:text-gray-200">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-primary-600 border border-transparent rounded-md font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <Home size={20} className="mr-2" />
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default NotFound
