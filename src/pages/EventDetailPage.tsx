import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowLeft, 
  Share2, 
  Sparkles,
  ShieldCheck, 
  Download,
  CalendarCheck,
  XCircle,
  UserCheck
} from 'lucide-react';

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { events, registerEventAttendee, cancelEventAttendee } = useData();
  const { user, isEventRegistered, attendEvent, unattendEvent } = useAuth();
  const { addToast } = useToast();

  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [accommodations, setAccommodations] = useState('');

  const event = events.find((e) => e.id === id);
  const isAttending = event ? isEventRegistered(event.id) : false;

  useEffect(() => {
    if (event) {
      document.title = `${event.title} • Prism Events`;
      window.scrollTo(0, 0);
    }
  }, [event]);

  useEffect(() => {
    if (user) {
      if (!attendeeName) setAttendeeName(user.name || '');
      if (!attendeeEmail) setAttendeeEmail(user.email || '');
    }
  }, [user]);

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Event Not Found</h2>
        <p className="text-slate-500 text-sm">We could not find the gathering you requested.</p>
        <Link to="/events">
          <Button variant="primary">Return to Events</Button>
        </Link>
      </div>
    );
  }

  const handleToggleAttend = () => {
    if (!user) {
      addToast({
        type: 'info',
        title: 'Sign In Required',
        message: 'Please sign in to register for events and view them in your profile commitments.'
      });
      navigate('/login');
      return;
    }

    if (isAttending) {
      unattendEvent(event.id);
      cancelEventAttendee(event.id);
      addToast({
        type: 'info',
        title: 'Attendance Canceled',
        message: `You have canceled your attendance for "${event.title}". Removed from upcoming commitments.`
      });
    } else {
      attendEvent(event.id);
      registerEventAttendee(event.id);
      addToast({
        type: 'success',
        title: 'Registration Confirmed!',
        message: `You are attending "${event.title}"! Added to your Upcoming Commitments in your profile.`
      });
    }
  };

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      attendEvent(event.id);
    }
    registerEventAttendee(event.id);
    addToast({
      type: 'success',
      title: 'Registration Confirmed!',
      message: `You're all set for ${event.title}! Added to your Upcoming Commitments in your profile.`
    });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      type: 'info',
      title: 'Event Link Copied',
      message: 'Share this link with friends or community allies.'
    });
  };

  const handleDownloadICS = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Prism LGBTQIA+ Sanctuary//Events//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast({
      type: 'success',
      title: 'Calendar File Downloaded',
      message: 'Open the .ics file to add it to Google Calendar, Apple Calendar, or Outlook.'
    });
  };

  return (
    <div id="event-detail" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Events', url: '/events' },
          { label: event.title }
        ]}
      />

      <Link
        to="/events"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Gatherings</span>
      </Link>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={event.isPrideOfficial ? 'pride' : 'purple'}>
            {event.category}
          </Badge>
          {event.isFree && (
            <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
              Free Admission
            </span>
          )}
          {event.isVirtual && (
            <Badge variant="info">Virtual Gathering</Badge>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {event.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-600 dark:text-slate-300 py-3 border-y border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold">{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-600" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>{event.attendeesCount} Registered</span>
          </div>
        </div>
      </div>

      {/* Banner Image */}
      <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 max-h-[400px]">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content & RSVP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Description & Accommodations */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              About This Event
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>

            {/* Accessibility features */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Accessibility &amp; Accommodations
              </h3>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-4">
                <li>Wheelchair accessible entrance and gender-neutral restrooms</li>
                <li>ASL interpretation provided (or automated closed captions online)</li>
                <li>Designated low-sensory recharge area with earplugs &amp; dim lighting</li>
                <li>Sober event: Alcohol and recreational substances are strictly prohibited</li>
              </ul>
            </div>
          </div>

          {/* Organizer card */}
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900 p-5 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 font-semibold">Organized by</span>
              <p className="font-bold text-slate-900 dark:text-white text-sm">{event.organizer}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleDownloadICS}>
                <Download className="w-4 h-4" />
                <span>Add to Calendar (.ics)</span>
              </Button>
              <button
                onClick={handleShare}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900"
                aria-label="Share event"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Registration / RSVP Card */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 sticky top-24">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                Community Gathering
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {isAttending ? 'Registration Confirmed' : 'Reserve Your Spot'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {isAttending
                  ? 'You are registered to attend! Tracked in your profile commitments.'
                  : 'Free and open to the community. Click Attend to save to your commitments.'}
              </p>
            </div>

            {isAttending ? (
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 space-y-3.5 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <div>
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-base">
                    You&apos;re Attending!
                  </h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed mt-1">
                    This gathering has been added to your profile&apos;s <strong>Upcoming Commitments</strong>.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <Link to="/profile" className="block w-full">
                    <Button variant="primary" size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <UserCheck className="w-4 h-4" />
                      <span>View in My Commitments</span>
                    </Button>
                  </Link>

                  <Button variant="outline" size="sm" onClick={handleDownloadICS} className="w-full">
                    <Download className="w-4 h-4" />
                    <span>Download Calendar File (.ics)</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleAttend}
                    className="w-full text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs"
                  >
                    <XCircle className="w-3.5 h-3.5 mr-1" />
                    <span>Cancel Attendance</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {user ? (
                  <div className="space-y-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleToggleAttend}
                      className="w-full shadow-md text-sm font-bold bg-indigo-600 hover:bg-indigo-700"
                      id="event-detail-one-click-attend"
                    >
                      <CalendarCheck className="w-5 h-5 mr-2" />
                      <span>Attend Event (1-Click)</span>
                    </Button>
                    <p className="text-[11px] text-center text-slate-400">
                      Signed in as <strong>{user.name}</strong> • Instantly saves to your profile commitments.
                    </p>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                    <p>Have an account? Sign in to attend with 1 click and keep track of your upcoming commitments.</p>
                    <Link to="/login">
                      <Button variant="outline" size="sm" className="w-full">
                        Sign In to Attend
                      </Button>
                    </Link>
                  </div>
                )}

                <form onSubmit={handleRSVPSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Your Name (or preferred alias) *
                    </label>
                    <input
                      required
                      type="text"
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      placeholder="e.g., Taylor M."
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      value={attendeeEmail}
                      onChange={(e) => setAttendeeEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Accessibility Needs (Optional)
                    </label>
                    <input
                      type="text"
                      value={accommodations}
                      onChange={(e) => setAccommodations(e.target.value)}
                      placeholder="e.g. ASL interpreter, front row seating"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="pride"
                    size="md"
                    className="w-full shadow-lg shadow-rose-500/20"
                  >
                    <CalendarCheck className="w-4 h-4 mr-1.5" />
                    <span>Attend &amp; Register Free</span>
                  </Button>

                  <div className="flex items-center gap-1.5 justify-center text-[11px] text-slate-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Your email is strictly private and never shared.</span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
