import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  Sparkles,
  Globe,
  Tag,
  Share2,
  CalendarCheck
} from 'lucide-react';
import { EventItem } from '../../types';
import { 
  formatEventDateFriendly, 
  getCategoryStyle, 
  getMonthName, 
  parseDateString 
} from './eventUtils';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { EmptyState } from '../ui/EmptyState';
import { useAuth } from '../../context/AuthContext';

interface EventListViewProps {
  events: EventItem[];
  onRSVP: (eventId: string, title: string) => void;
  onResetFilters?: () => void;
}

export const EventListView: React.FC<EventListViewProps> = ({
  events,
  onRSVP,
  onResetFilters
}) => {
  const { user, isEventRegistered } = useAuth();
  // Group events by Month-Year for clean agenda grouping
  const groupedEvents: Record<string, EventItem[]> = useMemo(() => {
    const groups: Record<string, EventItem[]> = {};
    
    events.forEach((ev) => {
      const { year, month } = parseDateString(ev.date);
      const groupKey = `${getMonthName(month)} ${year}`;
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(ev);
    });

    return groups;
  }, [events]);

  if (events.length === 0) {
    return (
      <EmptyState
        icon={<CalendarIcon className="w-8 h-8 text-slate-400" />}
        title="No events match your selected filters"
        description="Try clearing your date, location, or category filters to explore more upcoming community gatherings."
        actionLabel="Clear All Filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedEvents).map(([monthGroup, groupEvents]) => (
        <section key={monthGroup} className="space-y-4">
          
          {/* Month Header Banner */}
          <div className="flex items-center gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {monthGroup}
              </h2>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {groupEvents.length} event{groupEvents.length === 1 ? '' : 's'}
            </span>
          </div>

          {/* Event Items List */}
          <div className="space-y-3">
            {groupEvents.map((event) => {
              const { day, month } = parseDateString(event.date);
              const shortMonth = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][month];
              const dayOfWeek = new Date(event.date + 'T12:00:00Z').toLocaleDateString('en-US', { weekday: 'short' });
              const catStyle = getCategoryStyle(event.category);

              return (
                <article
                  key={event.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700/70 hover:shadow-md transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 group"
                >
                  {/* Left: Date Badge + Image + Core Details */}
                  <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
                    
                    {/* Date Block */}
                    <div className="shrink-0 flex flex-col items-center justify-center w-14 sm:w-16 h-16 sm:h-18 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-center p-1 group-hover:border-indigo-400 dark:group-hover:border-indigo-500 transition-colors">
                      <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
                        {shortMonth}
                      </span>
                      <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-none">
                        {day}
                      </span>
                      <span className="text-[10px] font-medium text-slate-500 uppercase">
                        {dayOfWeek}
                      </span>
                    </div>

                    {/* Image Thumbnail (Hidden on small mobile, visible on sm+) */}
                    <div className="hidden sm:block w-24 h-20 rounded-xl overflow-hidden shrink-0 relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {event.isPrideOfficial && (
                        <div className="absolute top-1 left-1 bg-rose-500 text-white p-0.5 rounded-md shadow-xs">
                          <Flame className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    {/* Content Details */}
                    <div className="space-y-1.5 min-w-0 flex-1">
                      {/* Badges row */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${catStyle.bg} ${catStyle.text} border ${catStyle.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`} />
                          <span>{event.category}</span>
                        </span>

                        {event.isPrideOfficial && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 text-white shadow-xs">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Pride Official</span>
                          </span>
                        )}

                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {event.isOnline ? '🌐 Virtual (Zoom)' : '📍 In-Person'}
                        </span>

                        {event.isFree && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 uppercase">
                            Free
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        <Link to={`/events/${event.id}`}>
                          {event.title}
                        </Link>
                      </h3>

                      {/* Excerpt Description */}
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Metadata row: Time, Location, Organizer, RSVPs */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span>{event.time}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate max-w-[220px]">{event.location}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{event.attendeesCount} attending</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Right Actions: Attend Button + View Details */}
                  <div className="flex items-center gap-2 w-full lg:w-auto shrink-0 justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                    {(() => {
                      const isAttending = isEventRegistered(event.id);
                      return (
                        <Button
                          variant={isAttending ? 'secondary' : 'primary'}
                          size="sm"
                          onClick={() => onRSVP(event.id, event.title)}
                          className={`flex-1 lg:flex-none shadow-xs transition-all ${
                            isAttending
                              ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                              : ''
                          }`}
                          id={`attend-event-list-${event.id}`}
                          title={isAttending ? 'Click to cancel attendance' : 'Click to attend'}
                        >
                          {isAttending ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              <span>Attending</span>
                            </>
                          ) : (
                            <>
                              <CalendarCheck className="w-3.5 h-3.5" />
                              <span>Attend</span>
                            </>
                          )}
                        </Button>
                      );
                    })()}

                    <Link to={`/events/${event.id}`}>
                      <Button variant="outline" size="sm">
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>

                </article>
              );
            })}
          </div>

        </section>
      ))}
    </div>
  );
};
