import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { ShieldAlert, ShieldCheck, EyeOff, Trash2, Smartphone, AlertOctagon, ExternalLink } from 'lucide-react';

export const SafetyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Safety, Privacy & Quick Exit Guide • Prism';
  }, []);

  const handleTriggerQuickExit = () => {
    window.location.replace('https://www.google.com');
  };

  return (
    <div id="safety-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
      <Breadcrumbs items={[{ label: 'Safety & Digital Privacy' }]} />

      {/* Emergency Quick Exit Test Banner */}
      <div className="rounded-3xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 p-6 sm:p-10 space-y-4">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
          <AlertOctagon className="w-4 h-4" />
          <span>Immediate Safety Control</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-rose-950 dark:text-rose-100 tracking-tight">
          Quick Exit &amp; Digital Safety Sanctuary
        </h1>

        <p className="text-sm sm:text-base text-rose-900 dark:text-rose-200 leading-relaxed max-w-2xl">
          If you share a device or someone unexpected enters the room, you can leave immediately. Clicking <strong>Quick Exit</strong> or pressing <kbd className="px-2 py-0.5 bg-rose-200 dark:bg-rose-900 rounded font-mono text-xs font-bold">Esc</kbd> 3 times instantly replaces this page with Google Search.
        </p>

        <div className="pt-2">
          <Button variant="danger" size="lg" onClick={handleTriggerQuickExit}>
            <span>Test Quick Exit Now (Opens Google)</span>
          </Button>
        </div>
      </div>

      {/* Section 1: Browsing Safely */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <EyeOff className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span>1. Use Private / Incognito Browsing</span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Browsing in private or incognito mode prevents your browser from saving visited URLs, cookies, temporary site images, or form autofill inputs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-slate-900 dark:text-white block text-sm">Google Chrome &amp; Brave</strong>
            <span className="text-slate-500">Press <strong>Ctrl + Shift + N</strong> (Windows) or <strong>Cmd + Shift + N</strong> (Mac).</span>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-slate-900 dark:text-white block text-sm">Safari (iPhone &amp; Mac)</strong>
            <span className="text-slate-500">Tap Tabs icon &rarr; Tap &quot;Private&quot; &rarr; Done, or press <strong>Cmd + Shift + N</strong>.</span>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-slate-900 dark:text-white block text-sm">Mozilla Firefox</strong>
            <span className="text-slate-500">Press <strong>Ctrl + Shift + P</strong> (Windows) or <strong>Cmd + Shift + P</strong> (Mac).</span>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-slate-900 dark:text-white block text-sm">Microsoft Edge</strong>
            <span className="text-slate-500">Press <strong>Ctrl + Shift + N</strong> to launch InPrivate mode.</span>
          </div>
        </div>
      </div>

      {/* Section 2: Clearing History */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Trash2 className="w-6 h-6 text-rose-600 dark:text-rose-400" />
          <span>2. How to Erase Browser History</span>
        </h2>
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            If you did not use private browsing, you can remove individual pages or clear recent history:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>On computers: Press <strong>Ctrl + H</strong> (or <strong>Cmd + Y</strong> in Safari) to view history. Search for &quot;Prism&quot; and delete the entries.</li>
            <li>To clear recent browsing entirely: Press <strong>Ctrl + Shift + Delete</strong> (or <strong>Cmd + Shift + Delete</strong> on Mac), select &quot;Last hour&quot; or &quot;Today&quot;, and confirm.</li>
            <li>On mobile: Open your browser settings &rarr; Privacy &amp; Security &rarr; Clear Browsing Data.</li>
          </ul>
        </div>
      </div>

      {/* Section 3: Phone Privacy Checklist */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Smartphone className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          <span>3. Phone &amp; Lock Screen Safeguards</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <strong className="font-bold text-sm text-slate-900 dark:text-white block">Disable Notification Previews</strong>
            <p className="text-slate-500 leading-relaxed">
              Set lock screen alerts to &quot;When Unlocked&quot; so emails or messages from LGBTQIA+ sources aren&apos;t visible to onlookers.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <strong className="font-bold text-sm text-slate-900 dark:text-white block">Use Pseudonyms in Circles</strong>
            <p className="text-slate-500 leading-relaxed">
              You are never required to give your legal or real name when attending Prism support groups. Choose any preferred handle.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <strong className="font-bold text-sm text-slate-900 dark:text-white block">Turn Off Location Sharing</strong>
            <p className="text-slate-500 leading-relaxed">
              If using family-sharing apps (like Find My or Life360), be aware that traveling to Pride venues or youth centers may be monitored.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <strong className="font-bold text-sm text-slate-900 dark:text-white block">Secondary &quot;Safe&quot; Email</strong>
            <p className="text-slate-500 leading-relaxed">
              Create a free proton or gmail account exclusively for newsletter receipts and support groups that only you can access.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
