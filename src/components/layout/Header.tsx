import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Heart, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  ChevronDown, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  Calendar, 
  HeartHandshake, 
  BookOpen, 
  UserCircle,
  ShieldAlert,
  Flame,
  Shield,
  HelpCircle,
  Mail,
  MoreHorizontal
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { normalizeRole, ROLE_BADGES } from '../../config/roles';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu, onOpenSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleDropdownClick = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <header
      ref={headerRef}
      id="main-site-header"
      className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors shadow-xs"
    >
      {/* Pride Rainbow Accent Stripe */}
      <div className="h-1 pride-rainbow-bar w-full" aria-hidden="true" />

      <div className="w-full max-w-7xl 2xl:max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[72px] md:h-20 gap-2 sm:gap-3 lg:gap-4 w-full">
          
          {/* Brand / Logo */}
          <Link 
            to="/" 
            id="site-logo-link" 
            className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 group shrink-0 min-w-0"
            aria-label="PRISM Community Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-indigo-600 p-0.5 shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-indigo-600 dark:text-indigo-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="min-w-0 flex flex-col justify-center">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight text-slate-900 dark:text-white leading-none">
                  PRISM
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1 sm:px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 hidden sm:inline-block shrink-0">
                  Community
                </span>
              </div>
              <p className="hidden xl:block 2xl:block text-[10px] font-medium text-slate-500 dark:text-slate-400 tracking-wide mt-0.5 truncate max-w-[170px] 2xl:max-w-none">
                LGBTQIA+ Pride & Support Sanctuary
              </p>
            </div>
          </Link>

          {/* Desktop Navigation (>= 1024px lg screens) */}
          <nav 
            id="desktop-main-navigation" 
            className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 text-xs xl:text-sm font-medium"
            aria-label="Main navigation"
          >
            <Link
              to="/"
              id="nav-link-home"
              className={`px-2 xl:px-2.5 2xl:px-3 py-1.5 2xl:py-2 rounded-xl transition-colors whitespace-nowrap ${
                isActive('/') && location.pathname === '/'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              id="nav-link-about"
              className={`px-2 xl:px-2.5 2xl:px-3 py-1.5 2xl:py-2 rounded-xl transition-colors whitespace-nowrap ${
                isActive('/about')
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
              }`}
            >
              About
            </Link>

            {/* Community Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('community')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                id="nav-dropdown-community-btn"
                onClick={() => handleDropdownClick('community')}
                className={`flex items-center gap-0.5 xl:gap-1 px-2 xl:px-2.5 2xl:px-3 py-1.5 2xl:py-2 rounded-xl transition-colors whitespace-nowrap ${
                  isActive('/community') || isActive('/support-groups') || isActive('/my-story') || isActive('/stories') || isActive('/volunteer') || isActive('/partners')
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
                aria-expanded={openDropdown === 'community'}
                aria-haspopup="true"
              >
                <span>Community</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'community' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'community' && (
                <div
                  id="dropdown-menu-community"
                  className="absolute left-0 top-full pt-1.5 w-72 animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                >
                  <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 space-y-1">
                    <Link
                      to="/community"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800/80 transition-colors group"
                    >
                      <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-sm">
                          Community Hub
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Discussions, identity spaces &amp; forums
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/support-groups"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800/80 transition-colors group"
                    >
                      <HeartHandshake className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-rose-500 text-sm">
                          Support Groups
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Safe peer-led spaces &amp; circles
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/stories"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800/80 transition-colors group"
                    >
                      <BookOpen className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 text-sm">
                          My Story &amp; Voices
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Personal journeys &amp; courage stories
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/volunteer"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800/80 transition-colors group"
                    >
                      <Heart className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-500 text-sm">
                          Volunteer Roles
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Give back, guide youth, moderate
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/partners"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800/80 transition-colors group"
                    >
                      <ShieldCheck className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 text-sm">
                          Coalition Partners
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Clinics, legal advocates &amp; NGOs
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('resources')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                id="nav-dropdown-resources-btn"
                onClick={() => handleDropdownClick('resources')}
                className={`flex items-center gap-0.5 xl:gap-1 px-2 xl:px-2.5 2xl:px-3 py-1.5 2xl:py-2 rounded-xl transition-colors whitespace-nowrap ${
                  isActive('/resources') || isActive('/safety')
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
                aria-expanded={openDropdown === 'resources'}
                aria-haspopup="true"
              >
                <span>Resources</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'resources' && (
                <div
                  id="dropdown-menu-resources"
                  className="absolute left-0 top-full pt-1.5 w-80 animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                >
                  <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 space-y-1">
                    <Link
                      to="/resources"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-semibold text-indigo-600 dark:text-indigo-400 text-sm"
                    >
                      <span>Explore All Resources</span>
                      <span className="text-xs bg-indigo-100 dark:bg-indigo-950/80 px-2 py-0.5 rounded-full font-bold">250+</span>
                    </Link>

                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />

                    <Link
                      to="/resources?category=mental-health"
                      onClick={() => setOpenDropdown(null)}
                      className="block px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      Mental Health &amp; Affirming Therapy
                    </Link>
                    <Link
                      to="/resources?category=trans-support"
                      onClick={() => setOpenDropdown(null)}
                      className="block px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      Trans &amp; Nonbinary Support &amp; Care
                    </Link>
                    <Link
                      to="/resources?category=coming-out"
                      onClick={() => setOpenDropdown(null)}
                      className="block px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      Coming Out &amp; Living Authentically
                    </Link>
                    <Link
                      to="/resources?category=family-parents"
                      onClick={() => setOpenDropdown(null)}
                      className="block px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      Parent &amp; Family Allyship
                    </Link>
                    <Link
                      to="/safety"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    >
                      <span>Crisis Helplines &amp; Safety</span>
                      <ShieldAlert className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Events Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('events')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                id="nav-dropdown-events-btn"
                onClick={() => handleDropdownClick('events')}
                className={`flex items-center gap-0.5 xl:gap-1 px-2 xl:px-2.5 2xl:px-3 py-1.5 2xl:py-2 rounded-xl transition-colors whitespace-nowrap ${
                  isActive('/events') || isActive('/pride-events')
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
                aria-expanded={openDropdown === 'events'}
                aria-haspopup="true"
              >
                <span>Events</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'events' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'events' && (
                <div
                  id="dropdown-menu-events"
                  className="absolute left-0 top-full pt-1.5 w-72 animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                >
                  <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 space-y-1">
                    <Link
                      to="/events?view=calendar"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800/80 transition-colors group"
                    >
                      <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-sm">
                          Calendar Grid View
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Monthly visual schedule &amp; days
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/events?view=list"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800/80 transition-colors group"
                    >
                      <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-sm">
                          Chronological Agenda List
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Timeline format with instant RSVP
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/pride-events"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/30 dark:to-amber-950/30 hover:from-rose-100 hover:to-amber-100 dark:hover:from-rose-900/40 dark:hover:to-amber-900/40 transition-colors group"
                    >
                      <Flame className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-rose-600 dark:text-rose-400 text-sm flex items-center gap-1.5">
                          Pride Events 2026
                          <span className="text-[10px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full uppercase font-bold">Hot</span>
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          Parades, festivals &amp; gatherings
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/blog"
              id="nav-link-blog"
              className={`px-2 xl:px-2.5 2xl:px-3 py-1.5 2xl:py-2 rounded-xl transition-colors whitespace-nowrap ${
                isActive('/blog')
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
              }`}
            >
              Blog
            </Link>

            {/* Direct FAQ & Contact on wide displays (>= 1536px 2xl) */}
            <Link
              to="/faq"
              id="nav-link-faq"
              className={`hidden 2xl:inline-block px-2.5 2xl:px-3 py-1.5 2xl:py-2 rounded-xl transition-colors whitespace-nowrap ${
                isActive('/faq')
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
              }`}
            >
              FAQ
            </Link>

            <Link
              to="/contact"
              id="nav-link-contact"
              className={`hidden 2xl:inline-block px-2.5 2xl:px-3 py-1.5 2xl:py-2 rounded-xl transition-colors whitespace-nowrap ${
                isActive('/contact')
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
              }`}
            >
              Contact
            </Link>

            {/* Adaptive "More" Dropdown for Screens under 1536px (1024px - 1535px) */}
            <div 
              className="relative 2xl:hidden"
              onMouseEnter={() => setOpenDropdown('more')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                id="nav-dropdown-more-btn"
                onClick={() => handleDropdownClick('more')}
                className={`flex items-center gap-0.5 xl:gap-1 px-2 xl:px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
                  isActive('/faq') || isActive('/contact') || isActive('/volunteer') || isActive('/partners')
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
                aria-expanded={openDropdown === 'more'}
                aria-haspopup="true"
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'more' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'more' && (
                <div
                  id="dropdown-menu-more"
                  className="absolute right-0 top-full pt-1.5 w-64 animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                >
                  <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 space-y-1">
                    <Link
                      to="/faq"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-800 dark:text-slate-200"
                    >
                      <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>Frequently Asked Questions</span>
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-800 dark:text-slate-200"
                    >
                      <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Contact &amp; Inquiries</span>
                    </Link>
                    <Link
                      to="/volunteer"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-800 dark:text-slate-200"
                    >
                      <Heart className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Volunteer Program</span>
                    </Link>
                    <Link
                      to="/partners"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-800 dark:text-slate-200"
                    >
                      <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>Community Partners</span>
                    </Link>
                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                    <Link
                      to="/safety"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-colors text-sm font-semibold"
                    >
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>Crisis Helplines &amp; Safety</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
            
            {/* Search Trigger Button */}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="flex items-center justify-center gap-1.5 p-1.5 sm:px-2.5 sm:py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs shrink-0"
              title="Search (Cmd + K)"
              aria-label="Search resources and events"
            >
              <Search className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
              <span className="hidden xl:inline-block font-medium text-xs">Search</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[10px] text-slate-400 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Theme Switcher */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* User Profile Shortcut (Desktop/Laptop) */}
            {user ? (
              <Link
                to="/profile"
                id="header-profile-link"
                className="hidden md:flex items-center gap-1.5 p-1 sm:p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shrink-0"
                title={`Logged in as ${user.name}`}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover ring-2 ring-indigo-500/40 shrink-0"
                />
                <div className="hidden 2xl:block text-left text-xs">
                  <p className="font-semibold text-slate-900 dark:text-white leading-tight truncate max-w-[90px]">{user.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium capitalize">{user.role}</p>
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                id="header-login-link"
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 whitespace-nowrap"
              >
                <UserCircle className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Admin Console Shortcut (Moderators/Admins on Desktop) */}
            {user && (user.role === 'admin' || user.role === 'moderator') && (
              <Link
                to="/admin"
                id="header-admin-btn"
                className="hidden xl:inline-flex items-center gap-1 px-2 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-colors shrink-0 whitespace-nowrap"
                title="Moderation Console"
              >
                <Shield className="w-3.5 h-3.5 shrink-0" />
                <span>Admin</span>
              </Link>
            )}

            {/* Donate CTA (GUARANTEED VISIBILITY ON ALL SCREEN SIZES) */}
            <Link
              to="/donate"
              id="header-donate-btn"
              className="flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 md:px-4 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-xs shadow-rose-500/20 active:scale-95 transition-all shrink-0 whitespace-nowrap"
              aria-label="Donate to Prism Sanctuary"
            >
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white shrink-0" />
              <span>Donate</span>
            </Link>

            {/* Mobile / Tablet Drawer Toggle (< 1024px lg screens) */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={onOpenMobileMenu}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};

