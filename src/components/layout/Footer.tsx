import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, PhoneCall } from 'lucide-react';
import { FooterNewsletter } from './FooterNewsletter';

export const Footer: React.FC = () => {
  return (
    <footer id="main-site-footer" className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-12 pb-8">
      {/* Emergency Hotline Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="rounded-2xl bg-gradient-to-r from-rose-950/80 via-purple-950/70 to-slate-900 border border-rose-800/40 p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">In Crisis or Need Someone to Talk to Right Now?</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Free, confidential, 24/7 LGBTQIA+ peer support: <strong className="text-rose-300">Trevor Project: 1-866-488-7386</strong> or text <strong className="text-rose-300">START to 678-678</strong> • Trans Lifeline: <strong>877-565-8860</strong>
              </p>
            </div>
          </div>
          <Link
            to="/safety"
            id="footer-crisis-btn"
            className="shrink-0 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors whitespace-nowrap shadow-md"
          >
            Access All Emergency Helplines
          </Link>
        </div>
      </div>

      {/* Monthly Pride Newsletter Subscription Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <FooterNewsletter />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 via-amber-500 to-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                PRISM
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              An inclusive, non-profit community sanctuary committed to LGBTQIA+ connection, peer support groups, affirming resources, storytelling, and Pride celebration.
            </p>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p>🌱 Community run &bull; Moderated 24/7 &bull; Intersectional safe space</p>
              <p>Delivering mutual aid, care guides, and joy since 2024.</p>
            </div>
          </div>

          {/* Column 1: Community */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Community</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/community" className="hover:text-indigo-400 transition-colors">Community Hub</Link></li>
              <li><Link to="/support-groups" className="hover:text-indigo-400 transition-colors">Support Groups</Link></li>
              <li><Link to="/my-story" className="hover:text-indigo-400 transition-colors">My Story & Voices</Link></li>
              <li><Link to="/events" className="hover:text-indigo-400 transition-colors">Community Events</Link></li>
              <li><Link to="/pride-events" className="text-amber-400 hover:text-amber-300 transition-colors font-medium">Pride Events 2026</Link></li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/resources" className="hover:text-indigo-400 transition-colors">Resource Library</Link></li>
              <li><Link to="/resources?category=mental-health" className="hover:text-indigo-400 transition-colors">Mental Health & Care</Link></li>
              <li><Link to="/resources?category=trans-support" className="hover:text-indigo-400 transition-colors">Trans & Nonbinary Care</Link></li>
              <li><Link to="/safety" className="text-rose-400 hover:text-rose-300 transition-colors">Safety & Hotlines</Link></li>
              <li><Link to="/blog" className="hover:text-indigo-400 transition-colors">Blog & Education</Link></li>
              <li><Link to="/faq" className="hover:text-indigo-400 transition-colors">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* Column 3: Get Involved & Org */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Get Involved</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/donate" className="text-rose-400 hover:text-rose-300 font-semibold transition-colors">Make a Donation</Link></li>
              <li><Link to="/volunteer" className="hover:text-indigo-400 transition-colors">Become a Volunteer</Link></li>
              <li><Link to="/partners" className="hover:text-indigo-400 transition-colors">Partner Organizations</Link></li>
              <li><Link to="/my-story/create" className="hover:text-indigo-400 transition-colors">Share Your Story</Link></li>
              <li className="pt-2 border-t border-slate-800">
                <Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link>
              </li>
              <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

        </div>

        {/* Inclusion Statement & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left leading-relaxed">
            © {new Date().getFullYear()} Prism Community Support Platform. 
            All rights reserved. Dedicated to intersectional LGBTQIA+ dignity, safety, and mutual care.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
            <Link to="/safety" className="hover:text-white transition-colors">Safety Guidelines</Link>
          </div>
        </div>

        {/* Bottom Pride Stripe */}
        <div className="mt-8 h-1 pride-rainbow-bar rounded-full opacity-60" aria-hidden="true" />
      </div>
    </footer>
  );
};
