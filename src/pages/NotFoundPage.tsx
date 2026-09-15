import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Sparkles, ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Page Not Found • Prism Sanctuary';
  }, []);

  return (
    <div id="not-found-page" className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="text-7xl font-black pride-gradient-text tracking-tighter">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Sanctuary Path Not Found
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The link you followed may have been updated or moved. You are always safe here—let&apos;s guide you back to our community spaces.
        </p>
      </div>

      <div className="flex justify-center gap-3 pt-2">
        <Link to="/">
          <Button variant="primary">
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Button>
        </Link>
        <Link to="/resources">
          <Button variant="outline">
            <span>Explore Resources</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
