import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { 
  HeartHandshake, 
  Users, 
  Calendar, 
  ShieldCheck, 
  Search, 
  Lock, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';
import { SupportGroupCategory } from '../types';

export const SupportGroupsPage: React.FC = () => {
  const { supportGroups, joinSupportGroupMember, leaveSupportGroupMember } = useData();
  const { user, isSupportGroupJoined, attendSupportGroup, unattendSupportGroup } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [formatFilter, setFormatFilter] = useState<'all' | 'Virtual' | 'In-Person'>('all');

  useEffect(() => {
    document.title = 'Safe Peer Support Groups • Prism';
  }, []);

  const handleToggleAttendGroup = (groupId: string, groupName: string) => {
    if (!user) {
      addToast({
        type: 'info',
        title: 'Sign In Required',
        message: 'Please sign in to join support circles and track them in your profile commitments.'
      });
      navigate('/login');
      return;
    }

    const isJoined = isSupportGroupJoined(groupId);
    if (isJoined) {
      unattendSupportGroup(groupId);
      leaveSupportGroupMember(groupId);
      addToast({
        type: 'info',
        title: 'Support Circle Left',
        message: `You left "${groupName}". Removed from your upcoming commitments.`
      });
    } else {
      attendSupportGroup(groupId);
      joinSupportGroupMember(groupId);
      addToast({
        type: 'success',
        title: 'Welcome to the Circle!',
        message: `You are attending "${groupName}"! Added to your Upcoming Commitments in your profile.`
      });
    }
  };

  const categories = [
    'all',
    'Youth',
    'Trans & Nonbinary',
    'Coming Out',
    'Families & Parents',
    'Adults & Seniors',
    'BIPOC LGBTQIA+',
    'Mental Wellness'
  ];

  const filteredGroups = useMemo(() => {
    return supportGroups.filter((g) => {
      const matchCat = activeCategory === 'all' || g.category === activeCategory;
      const matchFormat = formatFilter === 'all' || g.meetingFormat.includes(formatFilter);
      const matchSearch =
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (typeof g.facilitator === 'string' ? g.facilitator : g.facilitator?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchFormat && matchSearch;
    });
  }, [supportGroups, activeCategory, formatFilter, searchQuery]);

  return (
    <div id="support-groups-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <Breadcrumbs items={[{ label: 'Peer Support Groups' }]} />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-500/10 via-rose-500/10 to-indigo-500/10 dark:from-purple-950/30 dark:to-indigo-950/30 rounded-3xl p-8 sm:p-12 border border-purple-200/40 dark:border-purple-800/40 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Confidential • Facilitated • Always Free</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Affirming Peer Support Groups
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          You don&apos;t have to carry your journey alone. Join our weekly circles facilitated by trained community peers and clinical social workers. Completely free, confidential, and safe.
        </p>
      </div>

      {/* Group Commitments Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <div className="text-xs">
            <strong className="text-slate-900 dark:text-white block">Strict Privacy Oath</strong>
            <span className="text-slate-500">What is shared in the circle stays in the circle.</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div className="text-xs">
            <strong className="text-slate-900 dark:text-white block">Trauma-Informed Facilitators</strong>
            <span className="text-slate-500">Experienced facilitators holding non-judgmental space.</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Users className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
          <div className="text-xs">
            <strong className="text-slate-900 dark:text-white block">No Attendance Obligation</strong>
            <span className="text-slate-500">Come as often as you like; you are always welcome.</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search circles by name, age, or topic..."
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Format:</span>
            <select
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value as any)}
              className="text-xs font-medium px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
            >
              <option value="all">All Formats</option>
              <option value="Virtual">Virtual Only</option>
              <option value="In-Person">In-Person Only</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                if (cat === 'all') {
                  searchParams.delete('category');
                } else {
                  searchParams.set('category', cat);
                }
                setSearchParams(searchParams);
              }}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-purple-700 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat === 'all' ? 'All Circles' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Support Groups Grid */}
      {filteredGroups.length === 0 ? (
        <EmptyState
          icon={<HeartHandshake className="w-8 h-8 text-slate-400" />}
          title="No support groups match criteria"
          description="Try selecting another category or format."
          actionLabel="View All Support Groups"
          onAction={() => {
            setSearchParams({});
            setSearchQuery('');
            setFormatFilter('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="purple">{group.category}</Badge>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                    {group.membersCount} Active Members
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {group.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {group.description}
                </p>

                <div className="pt-2 space-y-1.5 text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800">
                  <div><strong>Schedule:</strong> {group.schedule}</div>
                  <div><strong>Format:</strong> {group.meetingFormat}</div>
                  <div><strong>Ages:</strong> {group.ageRange}</div>
                  <div><strong>Facilitated by:</strong> {typeof group.facilitator === 'string' ? group.facilitator : group.facilitator?.name}</div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                {(() => {
                  const isAttending = isSupportGroupJoined(group.id);
                  return (
                    <Button
                      variant={isAttending ? 'secondary' : 'primary'}
                      size="sm"
                      onClick={() => handleToggleAttendGroup(group.id, group.name)}
                      className={`flex-1 transition-all ${
                        isAttending
                          ? 'bg-purple-50 hover:bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:hover:bg-purple-900/80 dark:text-purple-300 border border-purple-300 dark:border-purple-700'
                          : 'bg-purple-700 hover:bg-purple-800 text-white'
                      }`}
                      id={`attend-group-card-${group.id}`}
                      title={isAttending ? 'Click to leave circle' : 'Click to attend circle'}
                    >
                      {isAttending ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <span>Attending</span>
                        </>
                      ) : (
                        <>
                          <HeartHandshake className="w-4 h-4" />
                          <span>Attend</span>
                        </>
                      )}
                    </Button>
                  );
                })()}

                <Link to={`/support-groups/${group.id}`}>
                  <Button variant="outline" size="sm">
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
