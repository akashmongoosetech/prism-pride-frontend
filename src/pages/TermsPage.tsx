import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Terms of Use & Community Sanctuary Rules • Prism';
  }, []);

  return (
    <div id="terms-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <Breadcrumbs items={[{ label: 'Terms of Use' }]} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Terms of Use &amp; Safe Space Rules
        </h1>
        <p className="text-xs text-slate-500">Effective: May 2026</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. Zero Tolerance for Hate Speech &amp; Harassment
          </h2>
          <p>
            Prism is an explicitly anti-racist, trans-affirming, and queer-protective space. Any homophobia, transphobia, biphobia, racism, ableism, deadnaming, or doxxing will result in immediate and irreversible banning.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Medical &amp; Crisis Disclaimer
          </h2>
          <p>
            Content published on Prism—including peer stories, community discussion forums, and health resource guides—is provided for educational and community-building purposes only. It does not replace formal clinical assessment or emergency medical intervention.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            3. User-Generated Stories &amp; Content
          </h2>
          <p>
            You retain ownership of the personal stories you share. By publishing on Prism, you grant us permission to display your submission to inspire and support fellow community members in accordance with your chosen anonymity settings.
          </p>
        </section>
      </div>
    </div>
  );
};
