import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, PhoneCall, Sparkles } from 'lucide-react';

export const PreHeader: React.FC = () => {
  return (
    <aside 
      id="site-pre-header" 
      aria-label="Community announcement and crisis support"
      className="bg-slate-900 text-slate-100 text-xs py-1.5 sm:py-2 px-3 sm:px-4 md:px-6 lg:px-6 xl:px-8 border-b border-slate-800"
    >
      <div className="w-full max-w-7xl 2xl:max-w-screen-2xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Affirmation message */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          <span className="font-medium text-slate-200 truncate">
            <span className="hidden sm:inline">You belong here. </span>
            A safe, affirming sanctuary for all LGBTQIA+ folks &amp; allies.
          </span>
        </div>

        {/* Quick actions & Emergency resources */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          <Link
            to="/safety"
            id="preheader-crisis-link"
            className="flex items-center gap-1 sm:gap-1.5 text-rose-400 hover:text-rose-300 transition-colors font-semibold text-[11px] sm:text-xs"
            title="24/7 Free, Confidential Crisis Support"
          >
            <PhoneCall className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden md:inline">24/7 Crisis Lifelines</span>
            <span className="md:hidden">Lifeline</span>
          </Link>

          <Link
            to="/pride-events"
            id="preheader-pride-link"
            className="hidden lg:flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors text-[11px] sm:text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Pride 2026</span>
          </Link>

          {/* Quick Exit Link (Vital for LGBTQIA+ browsing safety) */}
          <a
            href="https://www.google.com"
            id="preheader-quick-exit-btn"
            title="Immediately leave this site and open Google"
            className="flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-rose-600/90 hover:bg-rose-500 text-white font-bold text-[11px] sm:text-xs transition-colors focus:ring-2 focus:ring-rose-400 active:scale-95 shrink-0"
          >
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>Quick Exit</span>
            <span className="hidden xl:inline text-[10px] opacity-80">(ESC)</span>
          </a>
        </div>

      </div>
    </aside>
  );
};
