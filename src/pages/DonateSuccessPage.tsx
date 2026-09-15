import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { CheckCircle2, Heart, Sparkles, Share2, ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const DonateSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { addToast } = useToast();

  const id = searchParams.get('id') || 'DON-' + Math.floor(100000 + Math.random() * 900000);
  const amount = searchParams.get('amount') || '1,000';
  const currency = searchParams.get('currency') || '₹';
  const frequency = searchParams.get('frequency') || 'monthly';

  useEffect(() => {
    document.title = 'Thank You for Your Generous Gift • Prism';
  }, []);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin + '/donate');
    addToast({
      type: 'info',
      title: 'Donation Link Copied',
      message: 'Share Prism with allies and community members.'
    });
  };

  return (
    <div id="donate-success-page" className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-center">
      <Breadcrumbs
        items={[
          { label: 'Donate', url: '/donate' },
          { label: 'Gratitude & Receipt' }
        ]}
      />

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-md space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto ring-8 ring-rose-50 dark:ring-rose-950/20">
          <Heart className="w-8 h-8 fill-current" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
            Gift Confirmed
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Thank You for Empowering Our Family
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Your {frequency} contribution of <strong>{currency}{amount}</strong> is already at work protecting, affirming, and bringing joy to LGBTQIA+ people.
          </p>
        </div>

        {/* Receipt summary box */}
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-5 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2.5">
          <div className="flex justify-between">
            <span className="text-slate-500">Transaction ID:</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Contribution Frequency:</span>
            <span className="font-semibold capitalize text-slate-800 dark:text-slate-200">{frequency}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Tax Status:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">100% Tax Deductible (501c3)</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 font-bold text-sm">
            <span>Total Gift:</span>
            <span className="text-rose-600 dark:text-rose-400">{currency}{amount}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link to="/community">
            <Button variant="pride" size="md">
              <span>Visit Community Sanctuary</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>

          <Button variant="outline" size="md" onClick={handleShare}>
            <Share2 className="w-4 h-4" />
            <span>Invite Others to Support</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
