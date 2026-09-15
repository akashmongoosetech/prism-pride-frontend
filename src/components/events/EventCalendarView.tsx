import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Flame,
  Globe,
  X,
  CalendarCheck
} from 'lucide-react';
import { EventItem, EventCategory } from '../../types';
import { 
  generateCalendarDays, 
  getMonthName, 
  getCategoryStyle, 
  formatEventDateFriendly,
  CATEGORY_COLORS 
} from './eventUtils';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAuth } from '../../context/AuthContext';

interface EventCalendarViewProps {
  events: EventItem[];
  selectedDate: string;
  onSelectDate: (dateString: string) => void;
  onRSVP: (eventId: string, title: string) => void;
}

export const EventCalendarView: React.FC<EventCalendarViewProps> = ({
  events,
  selectedDate,
  onSelectDate,
  onRSVP
}) => {
  const { user, isEventRegistered } = useAuth();
  // Determine initial active year and month (2026-09 by default, or from selectedDate)
  const initialYear = 2026;
  const initialMonth = 8; // September (0-indexed)

  const [viewYear, setViewYear] = useState<number>(() => {
    if (selectedDate) {
      const parts = selectedDate.split('-');
      return parseInt(parts[0], 10);
    }
    return initialYear;
  });

  const [viewMonth, setViewMonth] = useState<number>(() => {
    if (selectedDate) {
      const parts = selectedDate.split('-');
      return parseInt(parts[1], 10) - 1;
    }
    return initialMonth;
  });

  const todayString = '2026-09-12';

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleJumpToToday = () => {
    setViewYear(2026);
    setViewMonth(8); // September
    onSelectDate(todayString);
  };

  const handleJumpToMonth = (year: number, month: number) => {
    setViewYear(year);
    setViewMonth(month);
  };

  // Generate calendar day cells
  const calendarDays = useMemo(() => {
    return generateCalendarDays(viewYear, viewMonth, events, todayString);
  }, [viewYear, viewMonth, events, todayString]);

  // Events on currently selected date (if any)
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    return events.filter((e) => e.date === selectedDate);
  }, [events, selectedDate]);

  // Events in current active month
  const monthEventsCount = useMemo(() => {
    const monthPrefix = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
    return events.filter((e) => e.date.startsWith(monthPrefix)).length;
  }, [events, viewYear, viewMonth]);

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      
      {/* Calendar Navigation & Month Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Month Title & Prev/Next */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevMonth}
              id="calendar-prev-month-btn"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              id="calendar-next-month-btn"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {getMonthName(viewMonth)} {viewYear}
          </h2>

          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 font-semibold">
            {monthEventsCount} Gathering{monthEventsCount === 1 ? '' : 's'}
          </span>
        </div>

        {/* Quick Month Jump Chips */}
        <div className="flex items-center flex-wrap gap-1.5 text-xs w-full md:w-auto justify-end">
          <button
            onClick={handleJumpToToday}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Today (Sep 2026)
          </button>
          
          <button
            onClick={() => handleJumpToMonth(2026, 5)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1 ${
              viewYear === 2026 && viewMonth === 5
                ? 'bg-rose-500 text-white shadow-xs'
                : 'border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
            }`}
          >
            <Flame className="w-3 h-3" />
            <span>Pride (Jun 2026)</span>
          </button>

          <button
            onClick={() => handleJumpToMonth(2026, 8)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              viewYear === 2026 && viewMonth === 8
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Sep 2026
          </button>

          <button
            onClick={() => handleJumpToMonth(2026, 9)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              viewYear === 2026 && viewMonth === 9
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Oct 2026
          </button>

          <button
            onClick={() => handleJumpToMonth(2026, 10)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              viewYear === 2026 && viewMonth === 10
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Nov 2026
          </button>
        </div>

      </div>

      {/* Monthly Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        
        {/* Day of Week Headers */}
        <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 text-center text-xs font-bold text-slate-600 dark:text-slate-400 py-3">
          {weekdays.map((day, idx) => (
            <div key={day} className={idx === 0 || idx === 6 ? 'text-rose-500/80 dark:text-rose-400/80' : ''}>
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day[0]}</span>
            </div>
          ))}
        </div>

        {/* Day Cells Matrix */}
        <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 dark:divide-slate-800/80">
          {calendarDays.map((day) => {
            const isSelected = selectedDate === day.dateString;
            const hasEvents = day.events.length > 0;

            return (
              <div
                key={day.dateString}
                onClick={() => {
                  if (isSelected) {
                    onSelectDate('');
                  } else {
                    onSelectDate(day.dateString);
                  }
                }}
                className={`min-h-[90px] sm:min-h-[120px] p-1.5 sm:p-2.5 transition-all cursor-pointer flex flex-col justify-between ${
                  !day.isCurrentMonth
                    ? 'bg-slate-50/40 dark:bg-slate-950/40 text-slate-400 dark:text-slate-600'
                    : 'bg-white dark:bg-slate-900 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20'
                } ${
                  isSelected
                    ? 'ring-2 ring-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/50'
                    : ''
                }`}
                role="button"
                tabIndex={0}
                aria-label={`${day.dateString}, ${day.events.length} events`}
              >
                {/* Cell Header: Day Number and Badges */}
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center justify-center text-xs sm:text-sm font-semibold rounded-full w-6 h-6 ${
                      day.isToday
                        ? 'bg-rose-500 text-white font-bold shadow-xs'
                        : isSelected
                        ? 'bg-indigo-600 text-white'
                        : day.isCurrentMonth
                        ? 'text-slate-800 dark:text-slate-200'
                        : 'text-slate-400 dark:text-slate-600'
                    }`}
                  >
                    {day.dayNumber}
                  </span>

                  {hasEvents && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {day.events.length}
                    </span>
                  )}
                </div>

                {/* Event Markers & Pills */}
                <div className="space-y-1 mt-1.5 overflow-hidden">
                  {day.events.slice(0, 2).map((ev) => {
                    const catStyle = getCategoryStyle(ev.category);
                    return (
                      <div
                        key={ev.id}
                        className={`text-[10px] sm:text-[11px] leading-tight px-1.5 py-0.5 rounded-md border truncate font-medium flex items-center gap-1 ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
                        title={`${ev.title} (${ev.time})`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${catStyle.dot}`} />
                        <span className="truncate">{ev.title}</span>
                      </div>
                    );
                  })}

                  {day.events.length > 2 && (
                    <div className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 pl-1">
                      +{day.events.length - 2} more
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Selected Day Agenda Detail Drawer / Card */}
      {selectedDate && (
        <div 
          id="calendar-selected-day-panel"
          className="bg-gradient-to-br from-indigo-50/80 via-purple-50/50 to-white dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-slate-900 border-2 border-indigo-200 dark:border-indigo-800/80 rounded-2xl p-5 sm:p-6 shadow-md animate-in fade-in slide-in-from-top-2 duration-200 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-indigo-200/60 dark:border-indigo-800/60">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Events on {formatEventDateFriendly(selectedDate)}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedDateEvents.length === 0
                    ? 'No gatherings currently scheduled on this exact date.'
                    : `${selectedDateEvents.length} gathering${selectedDateEvents.length === 1 ? '' : 's'} scheduled`}
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectDate('')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-colors"
              title="Close day view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {selectedDateEvents.length === 0 ? (
            <div className="py-8 text-center space-y-2">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                No events scheduled for {formatEventDateFriendly(selectedDate)}.
              </p>
              <p className="text-xs text-slate-400">
                Check other days in this month marked with color badges, or explore the full agenda list.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelectDate('')}
                className="mt-2"
              >
                Clear Day Selection
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDateEvents.map((ev) => {
                const catStyle = getCategoryStyle(ev.category);
                return (
                  <div
                    key={ev.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full ${catStyle.bg} ${catStyle.text} border ${catStyle.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`} />
                          <span>{ev.category}</span>
                        </span>

                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {ev.isOnline ? 'Virtual Event' : ev.city || 'In-Person'}
                        </span>
                      </div>

                      <h4 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                        <Link to={`/events/${ev.id}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                          {ev.title}
                        </Link>
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                        {ev.description}
                      </p>

                      <div className="pt-1 space-y-1 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span>{ev.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate">{ev.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{ev.attendeesCount} community members attending</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                      {(() => {
                        const isAttending = isEventRegistered(ev.id);
                        return (
                          <Button
                            variant={isAttending ? 'secondary' : 'primary'}
                            size="sm"
                            onClick={() => onRSVP(ev.id, ev.title)}
                            className={`flex-1 transition-all ${
                              isAttending
                                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                                : ''
                            }`}
                            id={`attend-event-cal-${ev.id}`}
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

                      <Link to={`/events/${ev.id}`}>
                        <Button variant="outline" size="sm">
                          <span>Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Category Color Legend */}
      <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-3 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Category Legend:</span>
        </span>

        <div className="flex flex-wrap items-center gap-3">
          {Object.entries(CATEGORY_COLORS).map(([cat, style]) => (
            <div key={cat} className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
              <span className="font-medium text-[11px]">{cat}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
