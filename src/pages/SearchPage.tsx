import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useData } from '../context/DataContext';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { ResourceBookmarkButton } from '../components/resources/ResourceBookmarkButton';
import { ReadingTimeIndicator } from '../components/ui/ReadingTimeIndicator';
import { 
  Search, 
  BookOpen, 
  ShieldCheck, 
  Calendar, 
  HeartHandshake, 
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  FileText
} from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [inputVal, setInputVal] = useState(query);
  const [activeCategoryTab, setActiveCategoryTab] = useState<'all' | 'stories' | 'resources' | 'events' | 'groups' | 'blog'>('all');

  const { stories, resources, events, supportGroups, blogPosts } = useData();

  useEffect(() => {
    document.title = query ? `Search: "${query}" • Prism` : 'Global Search • Prism';
    setInputVal(query);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setSearchParams({ q: inputVal.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleQuickSearch = (term: string) => {
    setInputVal(term);
    setSearchParams({ q: term });
  };

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { stories: [], resources: [], events: [], groups: [], blog: [], total: 0 };

    const matchedStories = stories.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.excerpt.toLowerCase().includes(q) ||
        s.content.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        s.authorName.toLowerCase().includes(q)
    );

    const matchedResources = resources.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)) ||
        r.region.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q)
    );

    const matchedEvents = events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
    );

    const matchedGroups = supportGroups.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
    );

    const matchedBlog = blogPosts.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.content.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    );

    const total =
      matchedStories.length +
      matchedResources.length +
      matchedEvents.length +
      matchedGroups.length +
      matchedBlog.length;

    return {
      stories: matchedStories,
      resources: matchedResources,
      events: matchedEvents,
      groups: matchedGroups,
      blog: matchedBlog,
      total
    };
  }, [query, stories, resources, events, supportGroups, blogPosts]);

  const scrollToCategory = (catId: 'all' | 'stories' | 'resources' | 'events' | 'groups' | 'blog') => {
    setActiveCategoryTab(catId);
    if (catId !== 'all') {
      const el = document.getElementById(`category-group-${catId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div id="search-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <Breadcrumbs items={[{ label: 'Search Results' }]} />

      {/* Search Input Hero */}
      <div className="max-w-3xl mx-auto space-y-4 pt-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Unified Platform Search</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Search Prism by Category
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Explore across Community Stories, Verified Resources, and Upcoming Pride Gatherings &amp; Events.
        </p>

        <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Search stories, crisis hotlines, healthcare, pride events, workshops..."
            className="w-full pl-11 pr-24 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white shadow-sm focus:outline-hidden focus:border-indigo-500 transition-colors"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Popular / Suggested Quick Searches */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs pt-1">
          <span className="text-slate-400 font-medium mr-1">Popular searches:</span>
          {['Crisis Hotline', 'Trans Healthcare', 'Coming Out', 'Youth Group', 'Pride Parade', 'Legal Aid'].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => handleQuickSearch(term)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-all cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {query ? (
        <div className="space-y-8">
          {/* Category Overview Summary Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Results Overview by Category</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold">
                    {results.total} total
                  </span>
                </h2>
                <p className="text-xs text-slate-500">
                  Matches found for &ldquo;<span className="font-semibold text-slate-700 dark:text-slate-300">{query}</span>&rdquo; grouped across platform categories:
                </p>
              </div>
            </div>

            {/* Overview Bento Cards: Stories, Resources, Events */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Stories Overview Card */}
              <div
                onClick={() => scrollToCategory('stories')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group text-left ${
                  activeCategoryTab === 'stories'
                    ? 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 ring-2 ring-rose-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 group-hover:scale-105 transition-transform">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300">
                    {results.stories.length} {results.stories.length === 1 ? 'Story' : 'Stories'}
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    Community Stories
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Lived experiences, memoirs, and peer support narratives.
                  </p>
                </div>
              </div>

              {/* Resources Overview Card */}
              <div
                onClick={() => scrollToCategory('resources')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group text-left ${
                  activeCategoryTab === 'resources'
                    ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 ring-2 ring-indigo-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    {results.resources.length} {results.resources.length === 1 ? 'Resource' : 'Resources'}
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    Verified Resources
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Crisis helplines, healthcare services &amp; legal guides.
                  </p>
                </div>
              </div>

              {/* Events Overview Card */}
              <div
                onClick={() => scrollToCategory('events')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group text-left ${
                  activeCategoryTab === 'events'
                    ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 ring-2 ring-amber-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                    {results.events.length} {results.events.length === 1 ? 'Event' : 'Events'}
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Gatherings &amp; Pride
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Upcoming local gatherings, meetups &amp; workshops.
                  </p>
                </div>
              </div>
            </div>

            {/* Secondary category pill badges if groups or blog have matches */}
            {(results.groups.length > 0 || results.blog.length > 0) && (
              <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
                <span>Also found:</span>
                {results.groups.length > 0 && (
                  <button
                    onClick={() => scrollToCategory('groups')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-100 cursor-pointer font-medium"
                  >
                    <HeartHandshake className="w-3 h-3" />
                    <span>{results.groups.length} Support Circles</span>
                  </button>
                )}
                {results.blog.length > 0 && (
                  <button
                    onClick={() => scrollToCategory('blog')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer font-medium"
                  >
                    <FileText className="w-3 h-3" />
                    <span>{results.blog.length} Educational Articles</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Category Filter Navigation Bar */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 gap-3 overflow-x-auto text-xs">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveCategoryTab('all')}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategoryTab === 'all'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                All Categories ({results.total})
              </button>
              <button
                onClick={() => setActiveCategoryTab('stories')}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeCategoryTab === 'stories'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Stories ({results.stories.length})</span>
              </button>
              <button
                onClick={() => setActiveCategoryTab('resources')}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeCategoryTab === 'resources'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Resources ({results.resources.length})</span>
              </button>
              <button
                onClick={() => setActiveCategoryTab('events')}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeCategoryTab === 'events'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Events ({results.events.length})</span>
              </button>
              {results.groups.length > 0 && (
                <button
                  onClick={() => setActiveCategoryTab('groups')}
                  className={`px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeCategoryTab === 'groups'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Groups ({results.groups.length})</span>
                </button>
              )}
              {results.blog.length > 0 && (
                <button
                  onClick={() => setActiveCategoryTab('blog')}
                  className={`px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeCategoryTab === 'blog'
                      ? 'bg-slate-700 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Articles ({results.blog.length})</span>
                </button>
              )}
            </div>

            {activeCategoryTab !== 'all' && (
              <button
                onClick={() => setActiveCategoryTab('all')}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline shrink-0"
              >
                View all categories
              </button>
            )}
          </div>

          {/* Search Result Groups */}
          {results.total === 0 ? (
            <EmptyState
              title="No results found across any category"
              description={`We couldn't find any stories, resources, or events matching "${query}". Try testing terms like "hotline", "trans", "youth", or "support".`}
              actionLabel="Clear Search"
              onAction={() => {
                setInputVal('');
                setSearchParams({});
              }}
            />
          ) : (
            <div className="space-y-12">
              {/* Category Group 1: Stories */}
              {(activeCategoryTab === 'all' || activeCategoryTab === 'stories') && results.stories.length > 0 && (
                <section id="category-group-stories" className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-rose-100 dark:border-rose-950">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>Community Stories</span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold">
                            {results.stories.length} {results.stories.length === 1 ? 'entry' : 'entries'}
                          </span>
                        </h2>
                        <p className="text-xs text-slate-500">
                          Personal narratives, journeys, and lived LGBTQIA+ experiences.
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/my-story"
                      className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline inline-flex items-center gap-1 group"
                    >
                      <span>Explore all Stories</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.stories.map((s) => (
                      <div
                        key={s.id}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-800 hover:shadow-md transition-all flex flex-col justify-between group space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <Badge variant="pride">{s.category}</Badge>
                            <ReadingTimeIndicator content={s.content} readTime={s.readTime} className="text-[11px] text-slate-400" />
                          </div>
                          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-1">
                            <Link to={`/my-story/${s.id}`} className="hover:underline">
                              {s.title}
                            </Link>
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {s.excerpt}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                          <span className="text-slate-400 text-[11px]">By {s.authorName}</span>
                          <Link
                            to={`/my-story/${s.id}`}
                            className="font-semibold text-rose-600 dark:text-rose-400 hover:underline inline-flex items-center gap-1"
                          >
                            <span>Read Story</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Category Group 2: Resources */}
              {(activeCategoryTab === 'all' || activeCategoryTab === 'resources') && results.resources.length > 0 && (
                <section id="category-group-resources" className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-indigo-100 dark:border-indigo-950">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>Verified Resources &amp; Guides</span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
                            {results.resources.length} {results.resources.length === 1 ? 'guide' : 'guides'}
                          </span>
                        </h2>
                        <p className="text-xs text-slate-500">
                          Emergency hotlines, legal aid, healthcare services &amp; shelter directories.
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/resources"
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 group"
                    >
                      <span>Explore all Resources</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.resources.map((r) => (
                      <div
                        key={r.id}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all flex flex-col justify-between group relative space-y-3"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <Badge variant={r.emergencyPriority ? 'danger' : 'info'}>
                                {r.type}
                              </Badge>
                              <span className="text-[10px] text-slate-400">{r.region}</span>
                            </div>
                            <ResourceBookmarkButton
                              resourceId={r.id}
                              resourceTitle={r.title}
                              size="sm"
                            />
                          </div>

                          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                            <Link to={`/resources/${r.slug}`} className="hover:underline">
                              {r.title}
                            </Link>
                          </h3>

                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {r.description}
                          </p>

                          {r.tags && r.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {r.tags.slice(0, 3).map((t, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                          {r.phone ? (
                            <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 truncate max-w-[120px]">
                              {r.phone}
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-400">Verified Guide</span>
                          )}
                          <Link
                            to={`/resources/${r.slug}`}
                            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                          >
                            <span>View Guide</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Category Group 3: Events */}
              {(activeCategoryTab === 'all' || activeCategoryTab === 'events') && results.events.length > 0 && (
                <section id="category-group-events" className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-amber-100 dark:border-amber-950">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>Gatherings &amp; Pride Events</span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold">
                            {results.events.length} {results.events.length === 1 ? 'event' : 'events'}
                          </span>
                        </h2>
                        <p className="text-xs text-slate-500">
                          Community pride marches, cultural mixers, virtual meetups &amp; wellness circles.
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/events"
                      className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1 group"
                    >
                      <span>Explore all Events</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.events.map((e) => (
                      <div
                        key={e.id}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-md transition-all flex flex-col justify-between group space-y-3"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2 text-xs">
                            <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{e.date}</span>
                            </span>
                            <Badge variant="purple">{e.category}</Badge>
                          </div>

                          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                            <Link to={`/events/${e.id}`} className="hover:underline">
                              {e.title}
                            </Link>
                          </h3>

                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {e.description}
                          </p>

                          <div className="flex items-center gap-1 text-[11px] text-slate-400">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span className="truncate">{e.location}</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                          <span className="text-[11px] text-slate-500">
                            {e.attendeesCount || 0} registered
                          </span>
                          <Link
                            to={`/events/${e.id}`}
                            className="font-semibold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
                          >
                            <span>Event Details</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Category Group 4: Support Groups (if present) */}
              {(activeCategoryTab === 'all' || activeCategoryTab === 'groups') && results.groups.length > 0 && (
                <section id="category-group-groups" className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-purple-100 dark:border-purple-950">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400">
                        <HeartHandshake className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>Support Circles &amp; Groups</span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">
                            {results.groups.length} {results.groups.length === 1 ? 'group' : 'groups'}
                          </span>
                        </h2>
                        <p className="text-xs text-slate-500">
                          Peer-facilitated support circles and dedicated healing spaces.
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/support-groups"
                      className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1 group"
                    >
                      <span>Explore all Circles</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.groups.map((g) => (
                      <div
                        key={g.id}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition-all flex flex-col justify-between group space-y-3"
                      >
                        <div className="space-y-2">
                          <Badge variant="purple">{g.category}</Badge>
                          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                            <Link to={`/support-groups/${g.id}`} className="hover:underline">
                              {g.name}
                            </Link>
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {g.description}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                          <span className="text-[11px] text-slate-400">{g.meetingFormat || 'Online Circle'}</span>
                          <Link
                            to={`/support-groups/${g.id}`}
                            className="font-semibold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1"
                          >
                            <span>Join Circle</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Category Group 5: Articles & Blog (if present) */}
              {(activeCategoryTab === 'all' || activeCategoryTab === 'blog') && results.blog.length > 0 && (
                <section id="category-group-blog" className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>Educational Articles &amp; Insights</span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                            {results.blog.length} {results.blog.length === 1 ? 'article' : 'articles'}
                          </span>
                        </h2>
                        <p className="text-xs text-slate-500">
                          In-depth guides, historical overviews &amp; community wellness articles.
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/blog"
                      className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:underline inline-flex items-center gap-1 group"
                    >
                      <span>Explore all Articles</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.blog.map((b) => (
                      <div
                        key={b.id}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-400 transition-all flex flex-col justify-between group space-y-3"
                      >
                        <div className="space-y-2">
                          <Badge variant="default">{b.category}</Badge>
                          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                            <Link to={`/blog/${b.slug}`} className="hover:underline">
                              {b.title}
                            </Link>
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {b.excerpt}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                          <ReadingTimeIndicator content={b.content} readTime={b.readTime} className="text-[11px] text-slate-400" />
                          <Link
                            to={`/blog/${b.slug}`}
                            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                          >
                            <span>Read Article</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Empty Query State: Category Exploration Hub */
        <div className="max-w-4xl mx-auto pt-6 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Explore Prism by Core Category
            </h2>
            <p className="text-xs text-slate-500">
              Select a category to explore our verified networks, personal stories, and community events:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/my-story"
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-md transition-all space-y-3 group block"
            >
              <div className="p-3 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 w-fit group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                Community Stories
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Read authentic first-person accounts of coming out, family dynamics, gender affirmation, and queer joy.
              </p>
              <div className="text-xs font-bold text-rose-600 dark:text-rose-400 inline-flex items-center gap-1 pt-1">
                <span>Browse {stories.length} Stories</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/resources"
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all space-y-3 group block"
            >
              <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 w-fit group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Verified Resources
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Vetted crisis helplines, gender-affirming clinical directories, legal assistance, and youth housing guides.
              </p>
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1 pt-1">
                <span>Browse {resources.length} Guides</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/events"
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-md transition-all space-y-3 group block"
            >
              <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 w-fit group-hover:scale-105 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Events &amp; Pride
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Connect locally and virtually through pride parades, workshops, panel discussions, and social mixers.
              </p>
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 inline-flex items-center gap-1 pt-1">
                <span>Browse {events.length} Events</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
