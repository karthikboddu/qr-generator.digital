import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { AlertTriangle } from 'lucide-react';

function NotFoundPage() {
  return (
    <>
      <Seo title="404 - Page Not Found" description="The page you are looking for does not exist." />
      <div className="text-center flex flex-col items-center justify-center h-full">
        <AlertTriangle className="w-24 h-24 text-yellow-400 mb-4" />
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <p className="text-2xl mt-2 mb-6 text-muted-foreground">Page Not Found</p>
        <p className="text-lg mb-8 text-muted-foreground">
          Sorry, the page you are looking for could not be found.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-primary-foreground bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Go back to Homepage
        </Link>
      </div>
    </>
  );
}

export default NotFoundPage;
