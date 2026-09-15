import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, 
  ChevronDown, 
  Heart, 
  Users, 
  ShieldCheck, 
  Calendar, 
  BookOpen, 
  Sparkles, 
  PhoneCall, 
  Sun, 
  Moon, 
  UserCircle,
  HelpCircle,
  Mail,
  ShieldAlert,
  Search,
  Shield,
  LogOut,
  Flame,
  HeartHandshake
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch?: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onOpenSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Auto-expand active section on open
  useEffect(() => {
    if (isOpen) {
      if (location.pathname.startsWith('/community') || location.pathname.startsWith('/support-groups') || location.pathname.startsWith('/stories') || location.pathname.startsWith('/my-story') || location.pathname.startsWith('/volunteer') || location.pathname.startsWith('/partners')) {
        setExpandedSection('community');
      } else if (location.pathname.startsWith('/resources')) {
        setExpandedSection('resources');
      } else if (location.pathname.startsWith('/events') || location.pathname.startsWith('/pride-events')) {
        setExpandedSection('events');
      }
    }
  }, [isOpen, location.pathname]);

  // Handle body scroll lock & Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleLinkClick = () => {
    onClose();
  };

  const handleSearchClick = () => {
    if (onOpenSearch) {
      onOpenSearch();
    } else {
      onClose();
    }
  };

  const isCurrent = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div
      id="mobile-drawer-overlay"
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm lg:hidden flex justify-end transition-opacity duration-200"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label="Mobile Navigation Menu"
    >
      <div
        id="mobile-drawer-content"
        className="w-full max-w-sm h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-4">
          
          {/* Header of Drawer */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <Link to="/" onClick={handleLinkClick} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  PRISM
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300">
                  Menu
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              id="close-mobile-menu-btn"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Search Action Bar */}
          <button
            onClick={handleSearchClick}
            id="mobile-drawer-search-btn"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-sm border border-slate-200 dark:border-slate-700/70 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors text-left"
          >
            <span className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-indigo-500 shrink-0" />
              <span className="text-xs sm:text-sm font-medium">Search directory, events & stories...</span>
            </span>
            <kbd className="text-[10px] bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Navigation Links */}
          <div className="space-y-1 text-sm font-medium">
            <Link
              to="/"
              onClick={handleLinkClick}
              className={`flex items-center px-3 py-2.5 rounded-xl transition-colors ${
                isCurrent('/') && location.pathname === '/'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold'
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={handleLinkClick}
              className={`flex items-center px-3 py-2.5 rounded-xl transition-colors ${
                isCurrent('/about')
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold'
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              About Us
            </Link>

            {/* Community Accordion */}
            <div className="rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('community')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                  isCurrent('/community') || isCurrent('/support-groups') || isCurrent('/stories') || isCurrent('/my-story') || isCurrent('/volunteer') || isCurrent('/partners')
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/30 font-semibold'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                aria-expanded={expandedSection === 'community'}
              >
                <span className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Community</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'community' ? 'rotate-180' : ''}`} />
              </button>

              {expandedSection === 'community' && (
                <div className="pl-6 pr-2 py-1.5 space-y-1 text-xs border-l-2 border-indigo-200 dark:border-indigo-900 ml-4 my-1">
                  <Link 
                    to="/community" 
                    onClick={handleLinkClick} 
                    className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    <span>Community Hub</span>
                    <span className="text-[10px] text-slate-400">Forums</span>
                  </Link>
                  <Link 
                    to="/support-groups" 
                    onClick={handleLinkClick} 
                    className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    <span>Support Groups</span>
                    <span className="text-[10px] text-rose-500 font-semibold">Circles</span>
                  </Link>
                  <Link 
                    to="/stories" 
                    onClick={handleLinkClick} 
                    className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    <span>My Story &amp; Voices</span>
                    <span className="text-[10px] text-amber-500 font-semibold">Personal</span>
                  </Link>
                  <Link 
                    to="/volunteer" 
                    onClick={handleLinkClick} 
                    className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    <span>Volunteer Roles</span>
                    <span className="text-[10px] text-emerald-500 font-semibold">Join Team</span>
                  </Link>
                  <Link 
                    to="/partners" 
                    onClick={handleLinkClick} 
                    className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    <span>Partner Organizations</span>
                    <span className="text-[10px] text-blue-500">Coalition</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Resources Accordion */}
            <div className="rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('resources')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                  isCurrent('/resources')
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/30 font-semibold'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                aria-expanded={expandedSection === 'resources'}
              >
                <span className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Resources</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'resources' ? 'rotate-180' : ''}`} />
              </button>

              {expandedSection === 'resources' && (
                <div className="pl-6 pr-2 py-1.5 space-y-1 text-xs border-l-2 border-emerald-200 dark:border-emerald-900 ml-4 my-1">
                  <Link 
                    to="/resources" 
                    onClick={handleLinkClick} 
                    className="flex items-center justify-between py-2 px-2 rounded-lg font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <span>Explore All Resources</span>
                    <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950 px-1.5 py-0.2 rounded-full">250+</span>
                  </Link>
                  <Link 
                    to="/resources?category=mental-health" 
                    onClick={handleLinkClick} 
                    className="block py-2 px-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Mental Health &amp; Therapy
                  </Link>
                  <Link 
                    to="/resources?category=trans-support" 
                    onClick={handleLinkClick} 
                    className="block py-2 px-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Trans &amp; Nonbinary Care &amp; HRT
                  </Link>
                  <Link 
                    to="/resources?category=coming-out" 
                    onClick={handleLinkClick} 
                    className="block py-2 px-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Coming Out Guides
                  </Link>
                  <Link 
                    to="/resources?category=family-parents" 
                    onClick={handleLinkClick} 
                    className="block py-2 px-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Parent &amp; Family Allyship
                  </Link>
                  <Link 
                    to="/safety" 
                    onClick={handleLinkClick} 
                    className="flex items-center justify-between py-2 px-2 rounded-lg font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  >
                    <span>Crisis Helplines &amp; Safety</span>
                    <ShieldAlert className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Events Accordion */}
            <div className="rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('events')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                  isCurrent('/events') || isCurrent('/pride-events')
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/30 font-semibold'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                aria-expanded={expandedSection === 'events'}
              >
                <span className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Events &amp; Pride</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedSection === 'events' ? 'rotate-180' : ''}`} />
              </button>

              {expandedSection === 'events' && (
                <div className="pl-6 pr-2 py-1.5 space-y-1 text-xs border-l-2 border-amber-200 dark:border-amber-900 ml-4 my-1">
                  <Link 
                    to="/events?view=calendar" 
                    onClick={handleLinkClick} 
                    className="block py-2 px-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Calendar Grid View
                  </Link>
                  <Link 
                    to="/events?view=list" 
                    onClick={handleLinkClick} 
                    className="block py-2 px-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Agenda List View
                  </Link>
                  <Link 
                    to="/pride-events" 
                    onClick={handleLinkClick} 
                    className="flex items-center justify-between py-2 px-2 rounded-lg font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  >
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-rose-500" />
                      <span>Pride Celebrations 2026</span>
                    </span>
                    <span className="text-[9px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full uppercase font-bold">Hot</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/blog"
              onClick={handleLinkClick}
              className={`flex items-center px-3 py-2.5 rounded-xl transition-colors ${
                isCurrent('/blog')
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold'
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Blog &amp; Articles
            </Link>

            <Link
              to="/faq"
              onClick={handleLinkClick}
              className={`flex items-center px-3 py-2.5 rounded-xl transition-colors ${
                isCurrent('/faq')
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold'
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Frequently Asked Questions (FAQ)
            </Link>

            <Link
              to="/contact"
              onClick={handleLinkClick}
              className={`flex items-center px-3 py-2.5 rounded-xl transition-colors ${
                isCurrent('/contact')
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold'
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Contact Our Team
            </Link>

            {/* Admin Console Shortcut if Admin or Moderator */}
            {user && (user.role === 'admin' || user.role === 'moderator') && (
              <Link
                to="/admin"
                onClick={handleLinkClick}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800/80 hover:bg-purple-100 transition-colors mt-2"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Admin &amp; Moderator Console</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-200/80 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                  {user.role}
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Drawer Actions & Safeguards */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3 mt-4">
          
          {/* Quick crisis lifeline banner */}
          <Link
            to="/safety"
            onClick={handleLinkClick}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-bold active:scale-98 transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>24/7 Crisis Helplines &amp; Safety</span>
          </Link>

          {/* Quick Exit trigger */}
          <button
            onClick={() => window.location.replace('https://www.google.com')}
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            <span>Quick Exit to Google (Instant)</span>
          </button>

          {/* Donate Primary CTA */}
          <Link
            to="/donate"
            id="mobile-menu-donate-btn"
            onClick={handleLinkClick}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 text-white text-sm font-bold shadow-md shadow-rose-500/20 active:scale-98 transition-all"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Donate to Prism Community</span>
          </Link>

          {/* User Account / Theme Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600"
                >
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover ring-1 ring-indigo-500/30" />
                  <div className="text-left">
                    <p className="leading-tight truncate max-w-[110px]">{user.name}</p>
                    <p className="text-[10px] text-slate-400 capitalize font-normal">{user.role}</p>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Sign out"
                  aria-label="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <UserCircle className="w-4 h-4" />
                <span>Sign In / Register</span>
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
              <span className="capitalize">{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
