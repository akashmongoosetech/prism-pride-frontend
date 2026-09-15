import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { 
  HeartHandshake, 
  Users, 
  Calendar, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Video, 
  Clock,
  CalendarCheck,
  UserCheck,
  XCircle
} from 'lucide-react';

export const SupportGroupDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { supportGroups, joinSupportGroupMember, leaveSupportGroupMember } = useData();
  const { user, isSupportGroupJoined, attendSupportGroup, unattendSupportGroup } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [agreedOath, setAgreedOath] = useState(false);

  const group = supportGroups.find((g) => g.id === id);
  const isJoined = group ? isSupportGroupJoined(group.id) : false;

  useEffect(() => {
    if (group) {
      document.title = `${group.name} • Prism Support Groups`;
      window.scrollTo(0, 0);
    }
  }, [group]);

  useEffect(() => {
    if (user) {
      if (!name) setName(user.name || '');
      if (!email) setEmail(user.email || '');
      if (!pronouns) setPronouns(user.pronouns || '');
    }
  }, [user]);

  if (!group) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Circle Not Found</h2>
        <p className="text-slate-500 text-sm">We could not locate this support circle.</p>
        <Link to="/support-groups">
          <Button variant="primary">Return to Support Groups</Button>
        </Link>
      </div>
    );
  }

  const handleToggleAttend = () => {
    if (!user) {
      addToast({
        type: 'warning',
        title: 'Sign In Required',
        message: 'Please sign in to join support circles and track them in your profile commitments.'
      });
      navigate('/login');
      return;
    }

    if (isJoined) {
      unattendSupportGroup(group.id);
      leaveSupportGroupMember(group.id);
      addToast({
        type: 'info',
        title: 'Support Circle Left',
        message: `You left "${group.name}". Removed from your upcoming commitments.`
      });
    } else {
      attendSupportGroup(group.id);
      joinSupportGroupMember(group.id);
      addToast({
        type: 'success',
        title: 'Welcome to the Circle!',
        message: `You are attending "${group.name}"! Added to your Upcoming Commitments in your profile.`
      });
    }
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedOath) {
      addToast({
        type: 'error',
        title: 'Agreement Required',
        message: 'Please accept the circle confidentiality and respect oath.'
      });
      return;
    }

    if (user) {
      attendSupportGroup(group.id);
    }
    joinSupportGroupMember(group.id);
    addToast({
      type: 'success',
      title: 'Welcome to the Circle!',
      message: `You have successfully joined ${group.name}! Added to your Upcoming Commitments.`
    });
  };

  return (
    <div id="support-group-detail" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Support Groups', url: '/support-groups' },
          { label: group.name }
        ]}
      />

      <Link
        to="/support-groups"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Support Groups</span>
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="purple">{group.category}</Badge>
          <Badge variant="default">{group.meetingFormat}</Badge>
          <Badge variant="info">Age: {group.ageRange}</Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {group.name}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 py-3 border-y border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-600" />
            <span>{group.schedule}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600" />
            <span>{group.membersCount} Community Members</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Facilitator: {group.facilitator}</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: About & Circle Agreements */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              About This Circle
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {group.description}
            </p>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Circle Space Agreements
              </h3>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-4">
                <li><strong>Strict Confidentiality:</strong> What is spoken and who participates remains confidential within the group.</li>
                <li><strong>No Unsolicited Advice:</strong> We share lived experiences using &quot;I&quot; statements rather than telling others what they &quot;should&quot; do.</li>
                <li><strong>Pronoun &amp; Name Respect:</strong> We honor every member&apos;s chosen name and pronouns without debate.</li>
                <li><strong>Cameras Optional:</strong> Participate via video, audio-only, or text chat depending on your comfort level.</li>
                <li><strong>Take Care of Yourself:</strong> You may step away, mute, or take breaks whenever you need to breathe.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Join Form */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 sticky top-24">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Peer Circle Registration
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {isJoined ? 'Active Circle Member' : `Join ${group.name}`}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isJoined
                  ? 'You are an active participant! This circle is tracked in your profile commitments.'
                  : 'Attendance is free. Register to receive the confidential meeting link and save to your profile.'}
              </p>
            </div>

            {isJoined ? (
              <div className="p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 space-y-3.5 text-center">
                <CheckCircle2 className="w-10 h-10 text-purple-600 dark:text-purple-400 mx-auto" />
                <div>
                  <h4 className="font-bold text-purple-900 dark:text-purple-200 text-base">
                    You Are Attending This Circle!
                  </h4>
                  <p className="text-xs text-purple-800 dark:text-purple-300 leading-relaxed mt-1">
                    Scheduled meetings are tracked in your profile&apos;s <strong>Upcoming Commitments</strong>.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <Link to="/profile" className="block w-full">
                    <Button variant="primary" size="sm" className="w-full bg-purple-700 hover:bg-purple-800">
                      <UserCheck className="w-4 h-4" />
                      <span>View in My Commitments</span>
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleAttend}
                    className="w-full text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs"
                  >
                    <XCircle className="w-3.5 h-3.5 mr-1" />
                    <span>Leave Circle / Cancel Attendance</span>
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
                      className="w-full shadow-md text-sm font-bold bg-purple-700 hover:bg-purple-800"
                      id="group-detail-one-click-attend"
                    >
                      <HeartHandshake className="w-5 h-5 mr-2" />
                      <span>Attend Support Circle (1-Click)</span>
                    </Button>
                    <p className="text-[11px] text-center text-slate-400">
                      Signed in as <strong>{user.name}</strong> • Instantly adds to your profile commitments.
                    </p>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-slate-800 border border-purple-100 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                    <p>Have a Prism account? Sign in to attend with 1 click and keep track of your upcoming commitments.</p>
                    <Link to="/login">
                      <Button variant="outline" size="sm" className="w-full">
                        Sign In to Attend
                      </Button>
                    </Link>
                  </div>
                )}

                <form onSubmit={handleJoinSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Your Preferred First Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Casey"
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Pronouns (Optional)
                    </label>
                    <input
                      type="text"
                      value={pronouns}
                      onChange={(e) => setPronouns(e.target.value)}
                      placeholder="e.g., they/them, she/her"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <label className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      required
                      checked={agreedOath}
                      onChange={(e) => setAgreedOath(e.target.checked)}
                      className="w-4 h-4 rounded text-purple-600 mt-0.5 shrink-0"
                    />
                    <span>
                      I agree to protect circle confidentiality and treat fellow members with kindness and respect.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full bg-purple-700 hover:bg-purple-800"
                  >
                    <HeartHandshake className="w-4 h-4 mr-1.5" />
                    <span>Attend &amp; Accept Oath</span>
                  </Button>

                  <div className="flex items-center gap-1.5 justify-center text-[11px] text-slate-400">
                    <Lock className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Zero data sharing. Total privacy.</span>
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
