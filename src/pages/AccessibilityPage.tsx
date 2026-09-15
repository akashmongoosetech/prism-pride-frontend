import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { CheckCircle2 } from 'lucide-react';

export const AccessibilityPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Accessibility Statement • Prism';
  }, []);

  return (
    <div id="accessibility-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <Breadcrumbs items={[{ label: 'Accessibility Statement' }]} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Accessibility Statement
        </h1>
        <p className="text-xs text-slate-500">WCAG 2.1 AA Compliance Standard</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          Prism is dedicated to digital accessibility for all users, including individuals with visual, auditory, cognitive, and physical disabilities. We continually refine our user interface in accordance with the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>.
        </p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Accessibility Features Implemented:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Full keyboard navigable layout and accessible modal focus traps</span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Tested color contrast ratios exceeding 4.5:1 for all text elements</span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Reduced motion preference support via media queries</span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Semantic HTML landmarks and descriptive ARIA labels</span>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Feedback &amp; Inquiries
          </h2>
          <p>
            If you encounter any accessibility barriers on our platform, please inform us at <strong>accessibility@prism-sanctuary.org</strong> so we can resolve the issue promptly.
          </p>
        </section>
      </div>
    </div>
  );
};
