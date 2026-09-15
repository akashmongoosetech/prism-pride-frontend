import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useData } from '../context/DataContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Globe, ExternalLink, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const PartnersPage: React.FC = () => {
  const { partners } = useData();
  const { addToast } = useToast();
  const [partnerFilter, setPartnerFilter] = useState('all');

  useEffect(() => {
    document.title = 'Partner Organizations & Coalitions • Prism';
  }, []);

  const categories = ['all', 'Advocacy', 'Healthcare', 'Legal Aid', 'Education', 'Community Center'];

  const filteredPartners = partners.filter((p) =>
    partnerFilter === 'all' ? true : p.category === partnerFilter
  );

  return (
    <div id="partners-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
      <Breadcrumbs items={[{ label: 'Partners & Coalitions' }]} />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-rose-500/10 dark:from-indigo-950/30 dark:to-rose-950/30 rounded-3xl p-8 sm:p-14 border border-indigo-200/40 dark:border-indigo-800/40 space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Stronger Together</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Partner Organizations &amp; Allies
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          We collaborate with grassroots advocacy groups, clinical healthcare networks, legal defense funds, and youth shelters to build comprehensive ecosystems of care.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setPartnerFilter(cat)}
            className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
              partnerFilter === cat
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {cat === 'all' ? 'All Coalitions' : cat}
          </button>
        ))}
      </div>

      {/* Partners Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="purple">{p.category}</Badge>
                <span className="text-[11px] text-slate-400">{p.region}</span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                />
                <div>
                  <h2 className="font-bold text-base text-slate-900 dark:text-white">
                    {p.name}
                  </h2>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {p.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <a
                href={p.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <span>Visit Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Partner</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Become a Partner Callout */}
      <div className="rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center sm:text-left">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Is your organization serving the LGBTQIA+ community?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            We welcome non-profits, healthcare providers, student collectives, and legal clinics to join our verified directory.
          </p>
        </div>
        <Link to="/contact">
          <Button variant="primary" size="md">
            Apply to Partner with Prism
          </Button>
        </Link>
      </div>

    </div>
  );
};
