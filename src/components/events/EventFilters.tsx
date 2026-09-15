import React from 'react';
import { 
  Search, 
  MapPin, 
  Calendar as CalendarIcon, 
  Tag, 
  X, 
  RotateCcw, 
  List, 
  CalendarDays, 
  LayoutGrid, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { EventCategory } from '../../types';

export type EventViewMode = 'calendar' | 'list' | 'grid';

export interface EventFilterState {
  viewMode: EventViewMode;
  category: string; // 'all' or EventCategory
  locationFormat: 'all' | 'in-person' | 'online';
  city: string; // 'all' or specific city
  datePreset: 'all' | 'current-month' | 'next-month' | 'pride' | 'custom';
  selectedDate: string; // 'YYYY-MM-DD' or ''
  searchQuery: string;
  sortBy: 'date-asc' | 'date-desc' | 'popular';
}

interface EventFiltersProps {
  filters: EventFilterState;
  onFilterChange: (newFilters: Partial<EventFilterState>) => void;
  onResetFilters: () => void;
  availableCities: string[];
  totalResults: number;
}

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'All Categories' },
  { id: 'Pride', label: 'Pride & Parades' },
  { id: 'Community', label: 'Community & Gatherings' },
  { id: 'Support', label: 'Peer Support' },
  { id: 'Workshop', label: 'Workshops & Education' },
  { id: 'Social', label: 'Social & Mixers' },
  { id: 'Arts & Culture', label: 'Arts, Poetry & Culture' },
  { id: 'Advocacy', label: 'Legal & Advocacy' },
  { id: 'Health', label: 'Wellness & Health' }
];

export const EventFilters: React.FC<EventFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  availableCities,
  totalResults
}) => {
  const hasActiveFilters = 
    filters.category !== 'all' ||
    filters.locationFormat !== 'all' ||
    filters.city !== 'all' ||
    filters.datePreset !== 'all' ||
    Boolean(filters.selectedDate) ||
    Boolean(filters.searchQuery.trim());

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
      
      {/* Top Bar: View Mode Switcher + Global Search + Result Count */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-xl">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search by event title, host, topic, or venue..."
            className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-8 py-2 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 transition-colors"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Mode Toggle Switch */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
            <button
              onClick={() => onFilterChange({ viewMode: 'calendar' })}
              id="view-toggle-calendar"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filters.viewMode === 'calendar'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Interactive monthly calendar grid"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Calendar</span>
            </button>

            <button
              onClick={() => onFilterChange({ viewMode: 'list' })}
              id="view-toggle-list"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filters.viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Chronological agenda list view"
            >
              <List className="w-3.5 h-3.5" />
              <span>Agenda List</span>
            </button>

            <button
              onClick={() => onFilterChange({ viewMode: 'grid' })}
              id="view-toggle-grid"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filters.viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Photo card grid view"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
          </div>
        </div>

      </div>

      {/* Main Filter Controls: Date, Location, and Event Type */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2 border-t border-slate-100 dark:border-slate-800">
        
        {/* 1. Filter by Date */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
            <CalendarIcon className="w-3.5 h-3.5 text-indigo-500" />
            <span>Filter by Date</span>
          </label>
          
          <div className="space-y-1.5">
            <select
              value={filters.datePreset}
              onChange={(e) => {
                const val = e.target.value as EventFilterState['datePreset'];
                if (val !== 'custom') {
                  onFilterChange({ datePreset: val, selectedDate: '' });
                } else {
                  onFilterChange({ datePreset: val });
                }
              }}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
            >
              <option value="all">All Dates &amp; Months</option>
              <option value="current-month">Current Month (September 2026)</option>
              <option value="next-month">Next Month (October 2026)</option>
              <option value="pride">Pride Season (June 2026)</option>
              <option value="custom">Pick Specific Single Date...</option>
            </select>

            {/* Custom Single Date Input */}
            {filters.datePreset === 'custom' && (
              <div className="flex items-center gap-1.5 pt-1">
                <input
                  type="date"
                  value={filters.selectedDate}
                  onChange={(e) => onFilterChange({ selectedDate: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
                />
                {filters.selectedDate && (
                  <button
                    onClick={() => onFilterChange({ selectedDate: '' })}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Clear date"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 2. Filter by Location & Format */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-emerald-500" />
            <span>Filter by Location</span>
          </label>

          <div className="grid grid-cols-2 gap-1.5">
            {/* Format: Online vs In-person */}
            <select
              value={filters.locationFormat}
              onChange={(e) => onFilterChange({ locationFormat: e.target.value as EventFilterState['locationFormat'] })}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
            >
              <option value="all">Any Format</option>
              <option value="in-person">In-Person Only</option>
              <option value="online">Virtual / Online Only</option>
            </select>

            {/* City Selection */}
            <select
              value={filters.city}
              onChange={(e) => onFilterChange({ city: e.target.value })}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500 truncate"
            >
              <option value="all">All Cities</option>
              {availableCities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. Filter by Event Type & Sort */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Tag className="w-3.5 h-3.5 text-rose-500" />
            <span>Filter by Event Type</span>
          </label>

          <div className="grid grid-cols-2 gap-1.5">
            {/* Event Category Type */}
            <select
              value={filters.category}
              onChange={(e) => onFilterChange({ category: e.target.value })}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as EventFilterState['sortBy'] })}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500"
            >
              <option value="date-asc">Date: Earliest First</option>
              <option value="date-desc">Date: Latest First</option>
              <option value="popular">Most Popular (RSVP)</option>
            </select>
          </div>
        </div>

      </div>

      {/* Category Pills Quick Strip */}
      <div className="pt-2 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-[11px] font-bold text-slate-500 shrink-0 mr-1 flex items-center gap-1">
          <SlidersHorizontal className="w-3 h-3" />
          <span>Quick Types:</span>
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onFilterChange({ category: cat.id })}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              filters.category === cat.id
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Active Filter Chips Bar & Reset Button */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-500 font-medium">
            Showing <strong className="text-slate-900 dark:text-white">{totalResults}</strong> event{totalResults === 1 ? '' : 's'}
          </span>

          {filters.category !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-medium text-[11px]">
              Type: {filters.category}
              <button 
                onClick={() => onFilterChange({ category: 'all' })}
                className="hover:text-indigo-900 dark:hover:text-white"
                aria-label="Remove category filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.locationFormat !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium text-[11px]">
              Format: {filters.locationFormat === 'online' ? 'Virtual' : 'In-Person'}
              <button 
                onClick={() => onFilterChange({ locationFormat: 'all' })}
                className="hover:text-emerald-900 dark:hover:text-white"
                aria-label="Remove format filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.city !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium text-[11px]">
              City: {filters.city}
              <button 
                onClick={() => onFilterChange({ city: 'all' })}
                className="hover:text-emerald-900 dark:hover:text-white"
                aria-label="Remove city filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.datePreset !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-medium text-[11px]">
              Date Range: {filters.datePreset === 'current-month' ? 'Sep 2026' : filters.datePreset === 'next-month' ? 'Oct 2026' : filters.datePreset === 'pride' ? 'June 2026' : 'Custom'}
              <button 
                onClick={() => onFilterChange({ datePreset: 'all', selectedDate: '' })}
                className="hover:text-amber-900 dark:hover:text-white"
                aria-label="Remove date range filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.selectedDate && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700 font-medium text-[11px]">
              Date: {filters.selectedDate}
              <button 
                onClick={() => onFilterChange({ selectedDate: '' })}
                className="hover:text-amber-950 dark:hover:text-white"
                aria-label="Remove specific date filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.searchQuery.trim() && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium text-[11px]">
              &ldquo;{filters.searchQuery}&rdquo;
              <button 
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="hover:text-slate-900 dark:hover:text-white"
                aria-label="Remove query filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors ml-auto"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear all filters</span>
          </button>
        )}
      </div>

    </div>
  );
};
