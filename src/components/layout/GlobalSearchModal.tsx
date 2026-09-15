import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Calendar, BookOpen, HeartHandshake, FileText, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { INITIAL_STORIES, INITIAL_RESOURCES, INITIAL_EVENTS, INITIAL_SUPPORT_GROUPS, INITIAL_BLOG_POSTS } from '../../data/mockData';
import apiService from '../../services/apiService';

interface SearchResultItem {
  id: string;
  title: string;
  category: string;
  type: 'Event' | 'Story' | 'Resource' | 'Support Group' | 'Blog' | 'Page';
  url: string;
  snippet: string;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isLoadingBackend, setIsLoadingBackend] = useState(false);
  const [backendItems, setBackendItems] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Fetch live search results via API client service
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setBackendItems([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoadingBackend(true);
      try {
        const res = await apiService.search.searchAll(query.trim());
        const items: SearchResultItem[] = [];

        if (res.stories) {
          res.stories.forEach((s) => {
            items.push({
              id: s.id,
              title: s.title,
              category: s.category,
              type: 'Story',
              url: `/my-story/${s.id}`,
              snippet: `${s.readTime} • By ${s.isAnonymous ? 'Anonymous' : s.authorName} • ${s.excerpt}`
            });
          });
        }
        if (res.resources) {
          res.resources.forEach((r) => {
            items.push({
              id: r.id,
              title: r.title,
              category: r.category,
              type: 'Resource',
              url: `/resources/${r.slug}`,
              snippet: `${r.type} • ${r.region} • ${r.description}`
            });
          });
        }
        if (res.events) {
          res.events.forEach((e) => {
            items.push({
              id: e.id,
              title: e.title,
              category: e.category,
              type: 'Event',
              url: `/events/${e.id}`,
              snippet: `${e.date} • ${e.location} • ${e.description}`
            });
          });
        }
        if (res.groups) {
          res.groups.forEach((g) => {
            items.push({
              id: g.id,
              title: g.name,
              category: g.category,
              type: 'Support Group',
              url: `/support-groups/${g.id}`,
              snippet: `${g.meetingFormat} • ${g.schedule} • ${g.description}`
            });
          });
        }
        if (res.blog) {
          res.blog.forEach((b) => {
            items.push({
              id: b.id,
              title: b.title,
              category: b.category,
              type: 'Blog',
              url: `/blog/${b.slug}`,
              snippet: `${b.readTime} • ${b.excerpt}`
            });
          });
        }
        setBackendItems(items);
      } catch (err) {
        // Fall back gracefully
      } finally {
        setIsLoadingBackend(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const allItems: SearchResultItem[] = useMemo(() => {
    const staticPages: SearchResultItem[] = [
      { id: 'p1', title: 'About Prism Community', category: 'About', type: 'Page', url: '/about', snippet: 'Our mission, vision, values, leadership, and community history.' },
      { id: 'p2', title: 'Donate & Support Our Programs', category: 'Support', type: 'Page', url: '/donate', snippet: 'Help fund emergency housing, free mental health therapy, and youth programs.' },
      { id: 'p3', title: 'Volunteer With Us', category: 'Community', type: 'Page', url: '/volunteer', snippet: 'Become an event coordinator, chat moderator, or youth mentor.' },
      { id: 'p4', title: 'Community Safety & Digital Privacy', category: 'Safety', type: 'Page', url: '/safety', snippet: 'Crisis hotlines, quick-exit tools, digital privacy guides, and community guidelines.' },
      { id: 'p5', title: 'Pride Events Hub 2026', category: 'Events', type: 'Page', url: '/pride-events', snippet: 'Pride calendar, parades, festivals, workshops, and local gatherings.' },
      { id: 'p6', title: 'Frequently Asked Questions (FAQ)', category: 'FAQ', type: 'Page', url: '/faq', snippet: 'Clear answers on membership, safety, attending without coming out, and donations.' },
      { id: 'p7', title: 'Contact Our Team', category: 'Contact', type: 'Page', url: '/contact', snippet: 'Reach out to community coordinators, organizers, and media team.' }
    ];

    const events: SearchResultItem[] = INITIAL_EVENTS.map(e => ({
      id: e.id,
      title: e.title,
      category: e.category,
      type: 'Event',
      url: `/events/${e.id}`,
      snippet: `${e.date} • ${e.location} • ${e.description}`
    }));

    const stories: SearchResultItem[] = INITIAL_STORIES.map(s => ({
      id: s.id,
      title: s.title,
      category: s.category,
      type: 'Story',
      url: `/my-story/${s.id}`,
      snippet: `${s.readTime} • By ${s.isAnonymous ? 'Anonymous' : s.authorName} • ${s.excerpt}`
    }));

    const resources: SearchResultItem[] = INITIAL_RESOURCES.map(r => ({
      id: r.id,
      title: r.title,
      category: r.category,
      type: 'Resource',
      url: `/resources/${r.slug}`,
      snippet: `${r.type} • ${r.region} • ${r.description}`
    }));

    const groups: SearchResultItem[] = INITIAL_SUPPORT_GROUPS.map(g => ({
      id: g.id,
      title: g.name,
      category: g.category,
      type: 'Support Group',
      url: `/support-groups/${g.id}`,
      snippet: `${g.meetingFormat} • ${g.schedule} • ${g.description}`
    }));

    const blogs: SearchResultItem[] = INITIAL_BLOG_POSTS.map(b => ({
      id: b.id,
      title: b.title,
      category: b.category,
      type: 'Blog',
      url: `/blog/${b.slug}`,
      snippet: `${b.readTime} • ${b.excerpt}`
    }));

    return [...staticPages, ...events, ...stories, ...resources, ...groups, ...blogs];
  }, []);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 8);
    const q = query.toLowerCase();

    // Combine backend results (fetched via axios API client) and local catalog
    const seenIds = new Set<string>();
    const combined: SearchResultItem[] = [];

    // Prioritize fresh backend items fetched from API
    for (const item of backendItems) {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        combined.push(item);
      }
    }

    // Add local matches
    for (const item of allItems) {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        combined.push(item);
      }
    }

    return combined.filter(item => {
      const matchFilter = activeFilter === 'all' || item.type.toLowerCase().replace(' ', '-') === activeFilter;
      const matchQuery =
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q);
      return matchFilter && matchQuery;
    });
  }, [query, activeFilter, allItems, backendItems]);

  const handleSelect = (url: string) => {
    onClose();
    navigate(url);
  };

  if (!isOpen) return null;

  return (
    <div
      id="global-search-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-start justify-center p-4 pt-16 sm:pt-24"
      onClick={onClose}
    >
      <div
        id="global-search-dialog"
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-800 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          {isLoadingBackend ? (
            <Loader2 className="w-5 h-5 text-indigo-500 shrink-0 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          )}
          <input
            ref={inputRef}
            id="global-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources, support groups, Pride events, stories..."
            className="w-full bg-transparent border-none outline-none text-base placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <kbd className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
          <button
            onClick={onClose}
            id="close-search-modal-btn"
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 overflow-x-auto bg-slate-50/50 dark:bg-slate-950/30 border-b border-slate-100 dark:border-slate-800/60 text-xs">
          {[
            { id: 'all', label: 'All Content' },
            { id: 'resource', label: 'Resources' },
            { id: 'support-group', label: 'Support Groups' },
            { id: 'event', label: 'Events' },
            { id: 'story', label: 'Stories' },
            { id: 'blog', label: 'Articles' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                activeFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/50">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
              <p className="font-medium text-base">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1 text-slate-400">Try searching for &quot;youth&quot;, &quot;counseling&quot;, &quot;Pride parade&quot;, or &quot;coming out&quot;.</p>
            </div>
          ) : (
            filteredResults.map((item) => (
              <div
                key={item.id}
                id={`search-res-${item.id}`}
                onClick={() => handleSelect(item.url)}
                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
              >
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/40 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors shrink-0 mt-0.5">
                  {item.type === 'Event' && <Calendar className="w-4 h-4" />}
                  {item.type === 'Story' && <BookOpen className="w-4 h-4" />}
                  {item.type === 'Resource' && <ShieldCheck className="w-4 h-4" />}
                  {item.type === 'Support Group' && <HeartHandshake className="w-4 h-4" />}
                  {item.type === 'Blog' && <FileText className="w-4 h-4" />}
                  {item.type === 'Page' && <ArrowRight className="w-4 h-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {item.type}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{item.category}</span>
                  </div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {item.snippet}
                  </p>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors shrink-0 mt-2" />
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Need immediate help? Visit our <a href="/safety" className="text-rose-600 dark:text-rose-400 underline">Safety & Crisis page</a></span>
          <span className="hidden sm:inline">Use ↑ ↓ to navigate, ESC to close</span>
        </div>
      </div>
    </div>
  );
};
