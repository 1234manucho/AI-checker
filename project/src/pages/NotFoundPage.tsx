import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

function NotFoundPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-md mx-auto text-center">
        <div className="text-9xl font-extrabold text-primary-600 dark:text-primary-400">404</div>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Page not found</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="btn-primary">
            <Home size={18} className="mr-2" />
            Go to Home
          </Link>
          <button onClick={() => window.history.back()} className="btn-outline">
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;