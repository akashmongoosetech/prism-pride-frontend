import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Privacy Policy & Confidentiality • Prism';
  }, []);

  return (
    <div id="privacy-policy" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Zero-Selling • Strict Anonymity</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Privacy Policy &amp; Data Safeguards
        </h1>
        <p className="text-xs text-slate-500">Last updated: May 2026</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. Our Non-Negotiable Privacy Promise
          </h2>
          <p>
            At Prism, we recognize that privacy is not merely a legal compliance checkbox—for LGBTQIA+ individuals, privacy is fundamentally a matter of physical and psychological safety. <strong>We will never sell, rent, monetize, or disclose your personal information to third-party data brokers or marketing aggregators.</strong>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. What Data We Collect
          </h2>
          <p>We practice extreme data minimization:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Pseudonyms &amp; Pronouns:</strong> You are encouraged to use chosen names and handles.</li>
            <li><strong>Email Addresses:</strong> Used exclusively for authentication, circle attendance reminders, and donation receipts.</li>
            <li><strong>Local Storage:</strong> Your client preferences (e.g. Dark Mode, high-contrast, saved bookmarked stories) reside entirely on your device.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            3. Peer Support Circle Confidentiality
          </h2>
          <p>
            Conversations within peer support groups are protected by our community oath. Recording, screenshots, or external transcription is strictly prohibited. Facilitators adhere to ethical non-disclosure standards, except where legally required by mandatory reporting in cases of active child abuse or imminent physical harm.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            4. Right to Deletion
          </h2>
          <p>
            You may request complete erasure of your account, published stories, or discussion posts at any time with immediate effect. Contact privacy@prism-sanctuary.org.
          </p>
        </section>
      </div>
    </div>
  );
};
