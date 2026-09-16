import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ReadingTimeIndicator } from '../components/ui/ReadingTimeIndicator';
import { 
  User, 
  Bookmark, 
  Calendar, 
  HeartHandshake, 
  ShieldCheck, 
  LogOut, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  MapPin, 
  CalendarCheck, 
  Download, 
  XCircle, 
  Users, 
  Trash2, 
  CheckCircle2,
  CalendarDays,
  ExternalLink
} from 'lucide-react';
import { UserRole } from '../types';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    user, 
    logout, 
    switchDemoRole, 
    toggleBookmark, 
    unattendEvent, 
    unattendSupportGroup 
  } = useAuth();
  const { 
    resources, 
    stories, 
    events, 
    supportGroups, 
    cancelEventAttendee, 
    leaveSupportGroupMember 
  } = useData();
  const { addToast } = useToast();

  const [commitmentTab, setCommitmentTab] = useState<'all' | 'events' | 'circles'>('all');

  useEffect(() => {
    document.title = user ? `${user.name}'s Sanctuary Profile • Prism` : 'User Sanctuary Profile • Prism';
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Sign In Required</h2>
        <p className="text-sm text-slate-500">Please sign in to access your profile sanctuary and upcoming commitments.</p>
        <Link to="/login">
          <Button variant="primary">Sign In</Button>
        </Link>
      </div>
    );
  }

  const bookmarkedResources = resources.filter((r) =>
    (user.bookmarks || []).includes(r.id) || (user.bookmarkedResourceIds || []).includes(r.id)
  );
  const bookmarkedStories = stories.filter((s) =>
    (user.bookmarks || []).includes(s.id) || (user.bookmarkedStoryIds || []).includes(s.id)
  );
  const rsvpEvents = events.filter((e) =>
    (user.registeredEvents || []).includes(e.id) || (user.rsvpEventIds || []).includes(e.id)
  );
  const joinedCircles = supportGroups.filter((g) =>
    (user.joinedSupportGroups || []).includes(g.id) || (user.joinedGroupIds || []).includes(g.id)
  );

  const totalCommitments = rsvpEvents.length + joinedCircles.length;

  const handleCancelEventAttendance = (eventId: string, eventTitle: string) => {
    unattendEvent(eventId);
    cancelEventAttendee(eventId);
    addToast({
      type: 'info',
      title: 'Commitment Removed',
      message: `You are no longer attending "${eventTitle}". Removed from your upcoming commitments.`
    });
  };

  const handleLeaveSupportCircle = (groupId: string, groupName: string) => {
    unattendSupportGroup(groupId);
    leaveSupportGroupMember(groupId);
    addToast({
      type: 'info',
      title: 'Circle Left',
      message: `You left "${groupName}". Removed from your upcoming commitments.`
    });
  };

  const handleDownloadICS = (event: typeof events[0]) => {
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
      message: 'Add this event to Google Calendar, Apple Calendar, or Outlook.'
    });
  };

  return (
    <div id="profile-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-10">
      <Breadcrumbs items={[{ label: 'My Sanctuary Profile' }]} />

      {/* Profile Header Card */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full ring-4 ring-purple-100 dark:ring-purple-900/40 object-cover shadow-sm"
          />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {user.name}
              </h1>
              <Badge variant={user.role === 'admin' ? 'pride' : user.role === 'moderator' ? 'purple' : 'info'}>
                {user.role.toUpperCase()}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Pronouns: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{user.pronouns}</span> • {user.email}
            </p>
            <p className="text-[11px] text-slate-400">
              Community Member since {user.createdAt || user.joinedDate || '2025-11-12'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {user.role === 'admin' && (
            <Link to="/admin">
              <Button variant="outline" size="sm">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>Admin Console</span>
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>

      {/* Persona Switcher */}
      <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Interactive Persona Switcher: Test different platform permissions
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {(['member', 'moderator', 'admin'] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => switchDemoRole(r)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                user.role === r
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300'
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* DEDICATED UPCOMING COMMITMENTS SECTION */}
      <section id="upcoming-commitments-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Upcoming Commitments
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300">
                {totalCommitments} Scheduled
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Gatherings and peer support circles you have committed to attend.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-medium self-start sm:self-auto">
            <button
              onClick={() => setCommitmentTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                commitmentTab === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All ({totalCommitments})
            </button>
            <button
              onClick={() => setCommitmentTab('events')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                commitmentTab === 'events'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Events ({rsvpEvents.length})
            </button>
            <button
              onClick={() => setCommitmentTab('circles')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                commitmentTab === 'circles'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Circles ({joinedCircles.length})
            </button>
          </div>
        </div>

        {/* Commitment Stat Cards Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{totalCommitments}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total Commitments</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{rsvpEvents.length}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Upcoming Gatherings</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{joinedCircles.length}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Peer Support Circles</p>
            </div>
          </div>
        </div>

        {/* Commitment List */}
        {totalCommitments === 0 ? (
          <div className="p-10 rounded-3xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
              <CalendarCheck className="w-7 h-7" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                No Upcoming Commitments Yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Click <strong>&quot;Attend&quot;</strong> on any community gathering, Pride festival, or peer support circle across the platform to add it directly to your schedule here.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link to="/events">
                <Button variant="primary" size="sm">
                  <Calendar className="w-4 h-4" />
                  <span>Find Events to Attend</span>
                </Button>
              </Link>
              <Link to="/support-groups">
                <Button variant="outline" size="sm">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Join a Support Circle</span>
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Show Events if tab is all or events */}
            {(commitmentTab === 'all' || commitmentTab === 'events') &&
              rsvpEvents.map((event) => (
                <div
                  key={`event-comm-${event.id}`}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all space-y-4 group"
                  id={`commitment-event-${event.id}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300">
                          <Calendar className="w-3 h-3" />
                          <span>Community Event</span>
                        </span>
                        <Badge variant="purple">{event.category}</Badge>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Attending</span>
                      </span>
                    </div>

                    <Link to={`/events/${event.id}`}>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {event.title}
                      </h3>
                    </Link>

                    <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                        <Users className="w-3.5 h-3.5 shrink-0" />
                        <span>{event.attendeesCount} community members attending</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Link to={`/events/${event.id}`}>
                        <Button variant="outline" size="sm">
                          <span>Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadICS(event)}
                        title="Download .ics calendar invite"
                        className="text-slate-600 hover:text-indigo-600 dark:text-slate-400"
                      >
                        <Download className="w-3.5 h-3.5 mr-1" />
                        <span className="text-xs">.ics</span>
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCancelEventAttendance(event.id, event.title)}
                      className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs"
                      title="Cancel attendance"
                      id={`cancel-attendance-event-${event.id}`}
                    >
                      <XCircle className="w-3.5 h-3.5 mr-1" />
                      <span>Cancel Attendance</span>
                    </Button>
                  </div>
                </div>
              ))}

            {/* Show Support Groups if tab is all or circles */}
            {(commitmentTab === 'all' || commitmentTab === 'circles') &&
              joinedCircles.map((group) => (
                <div
                  key={`circle-comm-${group.id}`}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between shadow-xs hover:border-purple-300 dark:hover:border-purple-700 transition-all space-y-4 group"
                  id={`commitment-group-${group.id}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300">
                          <HeartHandshake className="w-3 h-3" />
                          <span>Support Circle</span>
                        </span>
                        <Badge variant="purple">{group.category}</Badge>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Active Member</span>
                      </span>
                    </div>

                    <Link to={`/support-groups/${group.id}`}>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                        {group.name}
                      </h3>
                    </Link>

                    <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{group.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Format: {group.meetingFormat}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                        <Users className="w-3.5 h-3.5 shrink-0" />
                        <span>Facilitator: {typeof group.facilitator === 'string' ? group.facilitator : group.facilitator?.name} • {group.membersCount} members</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <Link to={`/support-groups/${group.id}`}>
                      <Button variant="outline" size="sm">
                        <span>Circle Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLeaveSupportCircle(group.id, group.name)}
                      className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs"
                      title="Leave circle"
                      id={`leave-circle-${group.id}`}
                    >
                      <XCircle className="w-3.5 h-3.5 mr-1" />
                      <span>Leave Circle</span>
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>

      {/* SAVED BOOKMARKS SECTION */}
      <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Saved Bookmarks &amp; Reading List
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Guides and community narratives you have bookmarked to read later.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Saved Resource Guides */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Saved Resource Guides ({bookmarkedResources.length})</span>
              </h3>
              <Link to="/resources" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                Explore All
              </Link>
            </div>

            <div className="space-y-3">
              {bookmarkedResources.length === 0 ? (
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                  <p className="text-xs text-slate-500">You haven&apos;t saved any resource guides to your sanctuary yet.</p>
                  <Link to="/resources" className="inline-block text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                    Browse Verified Guides →
                  </Link>
                </div>
              ) : (
                bookmarkedResources.map((res) => (
                  <div
                    key={res.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-600 transition-colors space-y-2 group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant={res.emergencyPriority ? 'danger' : 'info'}>
                        {res.type}
                      </Badge>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400">{res.region}</span>
                        <button
                          type="button"
                          onClick={() => toggleBookmark(res.id)}
                          title="Remove guide from profile"
                          aria-label={`Remove ${res.title} from saved guides`}
                          className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <Link to={`/resources/${res.slug}`} className="block group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      <p className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{res.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{res.description}</p>
                    </Link>
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      {res.phone ? (
                        <span className="font-bold text-rose-600 dark:text-rose-400">{res.phone}</span>
                      ) : (
                        <span className="text-slate-400">Verified Guide</span>
                      )}
                      <Link
                        to={`/resources/${res.slug}`}
                        className="text-indigo-600 dark:text-indigo-400 font-semibold inline-flex items-center gap-1 hover:underline"
                      >
                        <span>View Guide</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Saved Stories */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Saved Stories ({bookmarkedStories.length})</span>
              </h3>
              <Link to="/my-story" className="text-xs text-indigo-600 hover:underline">
                Browse More
              </Link>
            </div>

            <div className="space-y-3">
              {bookmarkedStories.length === 0 ? (
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
                  You haven&apos;t saved any stories yet.
                </div>
              ) : (
                bookmarkedStories.map((story) => (
                  <div
                    key={story.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition-colors space-y-1 block"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-rose-500">{story.category}</span>
                      <button
                        type="button"
                        onClick={() => toggleBookmark(story.id)}
                        title="Remove story from saved"
                        aria-label={`Remove ${story.title} from saved stories`}
                        className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <Link to={`/my-story/${story.id}`}>
                      <p className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 hover:text-indigo-600">{story.title}</p>
                      <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                        <span>By {story.authorName}</span>
                        <ReadingTimeIndicator content={story.content} readTime={story.readTime} className="text-[11px] text-slate-400" />
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
