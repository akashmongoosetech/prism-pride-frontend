import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { ResourceBookmarkButton } from '../components/resources/ResourceBookmarkButton';
import { 
  Search, 
  ShieldCheck, 
  PhoneCall, 
  Globe, 
  ExternalLink, 
  ArrowRight, 
  Filter,
  CheckCircle2,
  Sparkles,
  Bookmark
} from 'lucide-react';
import { ResourceCategory } from '../types';

export const ResourcesPage: React.FC = () => {
  const { resources } = useData();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || 'all';
  const showSavedOnly = searchParams.get('saved') === 'true';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    document.title = 'LGBTQIA+ Resource Library & Care Directory • Prism';
  }, []);

  const savedResourceIds = useMemo(() => {
    if (!user) return [];
    return (user.bookmarks || []).filter((id) => id.startsWith('res-'));
  }, [user]);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Categories' },
    { id: 'crisis', label: 'Crisis Helplines' },
    { id: 'mental-health', label: 'Mental Health' },
    { id: 'trans-support', label: 'Trans & Nonbinary' },
    { id: 'coming-out', label: 'Coming Out' },
    { id: 'family-parents', label: 'Family & Parents' },
    { id: 'housing', label: 'Housing & Shelter' },
    { id: 'legal', label: 'Legal Assistance' },
    { id: 'sexual-health', label: 'Healthcare & PrEP' },
    { id: 'safety', label: 'Safety & Relocation' }
  ];

  const types = ['all', 'Crisis Helpline', 'Health Service', 'Legal Aid', 'Support Guide', 'Housing Network'];

  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      const matchSaved = !showSavedOnly || savedResourceIds.includes(res.id);
      const matchCat = activeCategory === 'all' || res.category === activeCategory;
      const matchType = selectedType === 'all' || res.type === selectedType;
      const matchSearch =
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchSaved && matchCat && matchType && matchSearch;
    });
  }, [resources, showSavedOnly, savedResourceIds, activeCategory, selectedType, searchQuery]);

  const setCategoryFilter = (catId: string) => {
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      searchParams.set('category', catId);
      setSearchParams(searchParams);
    }
  };

  const toggleSavedFilter = () => {
    if (showSavedOnly) {
      searchParams.delete('saved');
    } else {
      searchParams.set('saved', 'true');
    }
    setSearchParams(searchParams);
  };

  return (
    <div id="resources-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <Breadcrumbs items={[{ label: 'Resources' }]} />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-rose-500/10 dark:from-indigo-950/40 dark:to-rose-950/40 rounded-3xl p-8 sm:p-12 border border-indigo-200/40 dark:border-indigo-800/40 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Vetted &amp; Verified Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          LGBTQIA+ Affirming Resources &amp; Care
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          From 24/7 crisis intervention and gender-affirming healthcare to legal defense clinics and coming-out workbooks, access verified tools designed to safeguard and empower you.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources by name, topic, or region..."
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Resource Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="text-xs font-medium px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t === 'all' ? 'All Types' : t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {user && (
            <button
              onClick={toggleSavedFilter}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                showSavedOnly
                  ? 'bg-amber-500 text-white shadow-xs font-semibold'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 hover:bg-amber-100 dark:hover:bg-amber-900/40'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-current' : ''}`} />
              <span>Saved Guides ({savedResourceIds.length})</span>
            </button>
          )}

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                if (showSavedOnly) {
                  searchParams.delete('saved');
                }
                setCategoryFilter(cat.id);
              }}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer ${
                !showSavedOnly && activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Cards Grid */}
      {filteredResources.length === 0 ? (
        <EmptyState
          icon={showSavedOnly ? <Bookmark className="w-8 h-8 text-amber-500" /> : <ShieldCheck className="w-8 h-8 text-slate-400" />}
          title={showSavedOnly ? 'No Saved Guides Found' : 'No resources match your search'}
          description={
            showSavedOnly
              ? 'You have not saved any resource guides to your profile sanctuary yet. Browse the directory and tap the bookmark icon on any guide to save it for quick offline reference.'
              : 'Try broadening your keywords or resetting filters to browse all verified organizations.'
          }
          actionLabel={showSavedOnly ? 'Browse All Verified Guides' : 'Reset All Filters'}
          onAction={() => {
            setSearchParams({});
            setSearchQuery('');
            setSelectedType('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={res.emergencyPriority ? 'danger' : 'info'}>
                      {res.type}
                    </Badge>
                    <span className="text-[11px] text-slate-400">{res.region}</span>
                  </div>
                  <ResourceBookmarkButton
                    resourceId={res.id}
                    resourceTitle={res.title}
                    size="sm"
                  />
                </div>

                <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  <Link to={`/resources/${res.slug}`} className="hover:underline">
                    {res.title}
                  </Link>
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {res.description}
                </p>

                {res.hours && (
                  <p className="text-[11px] text-slate-500 font-medium">
                    ⏰ Hours: {res.hours}
                  </p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {res.tags.slice(0, 3).map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                {res.phone ? (
                  <a
                    href={`tel:${res.phone}`}
                    className="flex items-center gap-1 font-bold text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{res.phone}</span>
                  </a>
                ) : (
                  <span className="text-slate-400">Verified Guide</span>
                )}

                <Link
                  to={`/resources/${res.slug}`}
                  className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
