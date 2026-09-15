import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { HeartCrack, ArrowLeft, ArrowRight } from 'lucide-react';

export const DonateCancelPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Donation Incomplete • Prism';
  }, []);

  return (
    <div id="donate-cancel-page" className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
      <Breadcrumbs items={[{ label: 'Donate', url: '/donate' }, { label: 'Incomplete' }]} />

      <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
        <HeartCrack className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Donation Process Was Not Completed
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          No charges were made to your account. If you experienced any technical difficulty or would like to try again later, we are here for you.
        </p>
      </div>

      <div className="flex justify-center gap-3 pt-2">
        <Link to="/donate">
          <Button variant="primary">
            <span>Try Again</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
        <Link to="/">
          <Button variant="outline">Return to Home</Button>
        </Link>
      </div>
    </div>
  );
};
