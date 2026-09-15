import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { 
  Calendar as CalendarIcon, 
  Flame, 
  Sparkles,
  MapPin,
  CalendarDays,
  List,
  LayoutGrid
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { 
  EventFilters, 
  EventFilterState, 
  EventViewMode 
} from '../components/events/EventFilters';
import { EventCalendarView } from '../components/events/EventCalendarView';
import { EventListView } from '../components/events/EventListView';
import { EventCardGrid } from '../components/events/EventCardGrid';

export const EventsPage: React.FC = () => {
  const { events, registerEventAttendee, cancelEventAttendee } = useData();
  const { user, isEventRegistered, attendEvent, unattendEvent } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    document.title = 'LGBTQIA+ Community Events & Pride Calendar • Prism';
  }, []);

  // Initialize filter state from searchParams or defaults
  const viewMode = (searchParams.get('view') as EventViewMode) || 'calendar';
  const category = searchParams.get('category') || 'all';
  const locationFormat = (searchParams.get('format') as EventFilterState['locationFormat']) || 'all';
  const city = searchParams.get('city') || 'all';
  const datePreset = (searchParams.get('preset') as EventFilterState['datePreset']) || 'all';
  const selectedDate = searchParams.get('date') || '';
  const searchQuery = searchParams.get('q') || '';
  const sortBy = (searchParams.get('sort') as EventFilterState['sortBy']) || 'date-asc';

  const filterState: EventFilterState = useMemo(() => ({
    viewMode,
    category,
    locationFormat,
    city,
    datePreset,
    selectedDate,
    searchQuery,
    sortBy
  }), [viewMode, category, locationFormat, city, datePreset, selectedDate, searchQuery, sortBy]);

  // Extract all unique cities from events
  const availableCities = useMemo(() => {
    const cities = new Set<string>();
    events.forEach((e) => {
      if (e.city && e.city !== 'Virtual / Online') {
        cities.add(e.city);
      }
    });
    return Array.from(cities).sort();
  }, [events]);

  // Update URL search parameters when filters change
  const handleFilterChange = (updates: Partial<EventFilterState>) => {
    const nextParams = new URLSearchParams(searchParams);

    const merged = { ...filterState, ...updates };

    if (merged.viewMode && merged.viewMode !== 'calendar') {
      nextParams.set('view', merged.viewMode);
    } else {
      nextParams.delete('view');
    }

    if (merged.category && merged.category !== 'all') {
      nextParams.set('category', merged.category);
    } else {
      nextParams.delete('category');
    }

    if (merged.locationFormat && merged.locationFormat !== 'all') {
      nextParams.set('format', merged.locationFormat);
    } else {
      nextParams.delete('format');
    }

    if (merged.city && merged.city !== 'all') {
      nextParams.set('city', merged.city);
    } else {
      nextParams.delete('city');
    }

    if (merged.datePreset && merged.datePreset !== 'all') {
      nextParams.set('preset', merged.datePreset);
    } else {
      nextParams.delete('preset');
    }

    if (merged.selectedDate) {
      nextParams.set('date', merged.selectedDate);
    } else {
      nextParams.delete('date');
    }

    if (merged.searchQuery && merged.searchQuery.trim()) {
      nextParams.set('q', merged.searchQuery.trim());
    } else {
      nextParams.delete('q');
    }

    if (merged.sortBy && merged.sortBy !== 'date-asc') {
      nextParams.set('sort', merged.sortBy);
    } else {
      nextParams.delete('sort');
    }

    setSearchParams(nextParams, { replace: true });
  };

  const handleResetFilters = () => {
    setSearchParams({}, { replace: true });
  };

  // Filter and sort events based on active filters
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      // 1. Category / Event Type filter
      if (filterState.category !== 'all' && e.category !== filterState.category) {
        return false;
      }

      // 2. Location format filter (online vs in-person)
      if (filterState.locationFormat === 'online' && !e.isOnline) {
        return false;
      }
      if (filterState.locationFormat === 'in-person' && e.isOnline) {
        return false;
      }

      // 3. City filter
      if (filterState.city !== 'all') {
        const matchesCity = (e.city && e.city.toLowerCase() === filterState.city.toLowerCase()) ||
          e.location.toLowerCase().includes(filterState.city.toLowerCase());
        if (!matchesCity) return false;
      }

      // 4. Date filters
      if (filterState.selectedDate) {
        if (e.date !== filterState.selectedDate) return false;
      } else if (filterState.datePreset === 'current-month') {
        if (!e.date.startsWith('2026-09')) return false;
      } else if (filterState.datePreset === 'next-month') {
        if (!e.date.startsWith('2026-10')) return false;
      } else if (filterState.datePreset === 'pride') {
        if (!e.date.startsWith('2026-06')) return false;
      }

      // 5. Search query (title, description, location, organizer, tags)
      if (filterState.searchQuery.trim()) {
        const query = filterState.searchQuery.toLowerCase();
        const matchesQuery = 
          e.title.toLowerCase().includes(query) ||
          e.description.toLowerCase().includes(query) ||
          e.location.toLowerCase().includes(query) ||
          e.organizer.toLowerCase().includes(query) ||
          e.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesQuery) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'date-desc') {
        return b.date.localeCompare(a.date);
      }
      if (filterState.sortBy === 'popular') {
        return b.attendeesCount - a.attendeesCount;
      }
      // default: date-asc
      return a.date.localeCompare(b.date);
    });
  }, [events, filterState]);

  // Handle Attend action
  const handleRSVP = (eventId: string, eventTitle: string) => {
    if (!user) {
      addToast({
        type: 'warning',
        title: 'Sign In Required',
        message: 'Please sign in to register for events and track them in your profile commitments.'
      });
      navigate('/login');
      return;
    }

    const currentlyAttending = isEventRegistered(eventId);
    if (currentlyAttending) {
      unattendEvent(eventId);
      cancelEventAttendee(eventId);
      addToast({
        type: 'info',
        title: 'Attendance Canceled',
        message: `You have canceled attendance for "${eventTitle}". Removed from your upcoming commitments.`
      });
    } else {
      attendEvent(eventId);
      registerEventAttendee(eventId);
      addToast({
        type: 'success',
        title: 'Registration Confirmed!',
        message: `You are attending "${eventTitle}"! Added to your Upcoming Commitments in your profile.`
      });
    }
  };

  return (
    <div id="events-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <Breadcrumbs items={[{ label: 'Events & Pride' }]} />

      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 dark:from-amber-950/30 dark:to-purple-950/30 rounded-3xl p-6 sm:p-10 border border-amber-200/40 dark:border-amber-800/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-3 text-center md:text-left max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Inclusive Gatherings &amp; Pride 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Community Events &amp; Celebrations
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Connect in person and online across workshops, creative arts, picnics, Pride marches, youth hangouts, and intergenerational storytelling evenings.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <Link to="/pride-events">
            <Button variant="pride" size="md" className="shadow-lg shadow-rose-500/20">
              <Flame className="w-4 h-4" />
              <span>Dedicated Pride 2026 Guide</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Unified Filters Component with View Toggle, Date, Location & Type Filters */}
      <EventFilters
        filters={filterState}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        availableCities={availableCities}
        totalResults={filteredEvents.length}
      />

      {/* Main View: Calendar View vs List View vs Card Grid View */}
      <main id="events-main-content">
        {filterState.viewMode === 'calendar' && (
          <EventCalendarView
            events={filteredEvents}
            selectedDate={filterState.selectedDate}
            onSelectDate={(date) => handleFilterChange({ selectedDate: date })}
            onRSVP={handleRSVP}
          />
        )}

        {filterState.viewMode === 'list' && (
          <EventListView
            events={filteredEvents}
            onRSVP={handleRSVP}
            onResetFilters={handleResetFilters}
          />
        )}

        {filterState.viewMode === 'grid' && (
          <EventCardGrid
            events={filteredEvents}
            onRSVP={handleRSVP}
            onResetFilters={handleResetFilters}
          />
        )}
      </main>

    </div>
  );
};
