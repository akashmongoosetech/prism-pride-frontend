import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Sparkles,
  CalendarCheck
} from 'lucide-react';
import { EventItem } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import { formatEventDateFriendly, getCategoryStyle } from './eventUtils';
import { useAuth } from '../../context/AuthContext';

interface EventCardGridProps {
  events: EventItem[];
  onRSVP: (eventId: string, title: string) => void;
  onResetFilters?: () => void;
}

export const EventCardGrid: React.FC<EventCardGridProps> = ({
  events,
  onRSVP,
  onResetFilters
}) => {
  const { user, isEventRegistered } = useAuth();
  if (events.length === 0) {
    return (
      <EmptyState
        icon={<CalendarIcon className="w-8 h-8 text-slate-400" />}
        title="No gatherings found"
        description="Try clearing your filters or selecting a different category, location, or date."
        actionLabel="Reset All Filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => {
        const catStyle = getCategoryStyle(event.category);
        return (
          <div
            key={event.id}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="h-48 overflow-hidden relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <Badge variant={event.isPrideOfficial ? 'pride' : 'purple'}>
                    {event.category}
                  </Badge>
                  {event.isFree && (
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Free
                    </span>
                  )}
                </div>

                {event.isPrideOfficial && (
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 border border-white/20">
                    <Flame className="w-3 h-3 text-rose-400" />
                    <span>Pride Official</span>
                  </div>
                )}
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {formatEventDateFriendly(event.date)}
                  </span>
                  <span>{event.time}</span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                  <Link to={`/events/${event.id}`}>
                    {event.title}
                  </Link>
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {event.description}
                </p>

                <div className="pt-1 space-y-1 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{event.attendeesCount} attending</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-5 pt-0 flex items-center gap-2">
              {(() => {
                const isAttending = isEventRegistered(event.id);
                return (
                  <Button
                    variant={isAttending ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => onRSVP(event.id, event.title)}
                    className={`flex-1 transition-all ${
                      isAttending
                        ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                        : ''
                    }`}
                    id={`attend-event-grid-${event.id}`}
                    title={isAttending ? 'Click to cancel attendance' : 'Click to attend'}
                  >
                    {isAttending ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Attending</span>
                      </>
                    ) : (
                      <>
                        <CalendarCheck className="w-4 h-4" />
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
          </div>
        );
      })}
    </div>
  );
};
