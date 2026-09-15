import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { 
  ShieldCheck, 
  BookOpen, 
  AlertTriangle, 
  Users, 
  Heart, 
  Check, 
  X, 
  Download, 
  Sparkles,
  Lock,
  Mail
} from 'lucide-react';

import { normalizeRole } from '../config/roles';

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { 
    stories, 
    approveStory, 
    rejectStory, 
    moderationReports, 
    resolveModerationReport, 
    volunteerApplications, 
    donations,
    newsletterSubscribers,
    unsubscribeNewsletter
  } = useData();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<'stories' | 'reports' | 'volunteers' | 'donations' | 'subscribers'>('stories');

  useEffect(() => {
    document.title = 'Moderator & Admin Console • Prism';
  }, []);

  const normRole = normalizeRole(user?.role);
  const isAuthorized = normRole === 'ADMIN' || normRole === 'SUB_ADMIN' || normRole === 'MANAGER';

  if (!user || !isAuthorized) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <Lock className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Access Restricted</h2>
        <p className="text-sm text-slate-500">
          This console requires Manager, Sub-Admin, or Admin clearance. Please sign in with an administrative account.
        </p>
        <Link to="/login">
          <Button variant="primary">Sign In As Admin</Button>
        </Link>
      </div>
    );
  }

  const pendingStories = stories.filter((s) => s.status === 'pending');
  const pendingReports = moderationReports.filter((r) => r.status === 'pending');

  const handleApproveStory = (id: string) => {
    approveStory(id);
    addToast({
      type: 'success',
      title: 'Story Approved',
      message: 'Story has been published to the community feed.'
    });
  };

  const handleRejectStory = (id: string) => {
    rejectStory(id);
    addToast({
      type: 'info',
      title: 'Story Rejected',
      message: 'Story marked as rejected.'
    });
  };

  const handleExportData = () => {
    const backup = {
      stories,
      donations,
      volunteerApplications,
      moderationReports,
      newsletterSubscribers,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prism-community-backup-${Date.now()}.json`;
    a.click();
    addToast({
      type: 'success',
      title: 'Data Exported',
      message: 'Platform records exported safely to JSON.'
    });
  };

  const activeSubscribers = newsletterSubscribers.filter(s => s.status === 'active');

  return (
    <div id="admin-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <Breadcrumbs items={[{ label: 'Admin & Moderation Console' }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Community Moderation Portal
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Prism Safeguard Dashboard
          </h1>
          <p className="text-xs text-slate-500">
            Active clearance: <strong>{String(user.role).toUpperCase()}</strong> ({user.name})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link to="/admin/users">
            <Button variant="primary" size="sm" className="gap-2">
              <Users className="w-4 h-4" />
              <span>User Directory & RBAC</span>
            </Button>
          </Link>

          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="w-4 h-4" />
            <span>Export Records</span>
          </Button>
        </div>
      </div>

      {/* Overview Stat Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400 block">Pending Stories</span>
          <span className="text-3xl font-extrabold text-amber-500">{pendingStories.length}</span>
          <span className="text-[11px] text-slate-500 block">Awaiting review</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400 block">Flagged Reports</span>
          <span className="text-3xl font-extrabold text-rose-500">{pendingReports.length}</span>
          <span className="text-[11px] text-slate-500 block">Open safety flags</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400 block">Volunteers</span>
          <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {volunteerApplications.length}
          </span>
          <span className="text-[11px] text-slate-500 block">New applicants</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400 block">Donations</span>
          <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {donations.length}
          </span>
          <span className="text-[11px] text-slate-500 block">Recorded gifts</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400 block">Subscribers</span>
          <span className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">
            {activeSubscribers.length}
          </span>
          <span className="text-[11px] text-slate-500 block">Monthly Pride digest</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('stories')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
            activeTab === 'stories'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Story Queue ({pendingStories.length})
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
            activeTab === 'reports'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Moderation Reports ({pendingReports.length})
        </button>

        <button
          onClick={() => setActiveTab('volunteers')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
            activeTab === 'volunteers'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Volunteer Applicants ({volunteerApplications.length})
        </button>

        <button
          onClick={() => setActiveTab('donations')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
            activeTab === 'donations'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Donations Feed ({donations.length})
        </button>

        <button
          onClick={() => setActiveTab('subscribers')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
            activeTab === 'subscribers'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Newsletter Subscribers ({newsletterSubscribers.length})
        </button>
      </div>

      {/* Tab 1: Stories Queue */}
      {activeTab === 'stories' && (
        <div className="space-y-4">
          {pendingStories.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 space-y-1">
              <Check className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="font-bold text-slate-800 dark:text-slate-200">Story queue is clear!</p>
              <p>All submitted community stories have been reviewed.</p>
            </div>
          ) : (
            pendingStories.map((story) => (
              <div
                key={story.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="warning">Pending Review</Badge>
                    <Badge variant="purple">{story.category}</Badge>
                    <span className="text-xs text-slate-400">By {story.authorName}</span>
                  </div>
                  <span className="text-xs text-slate-400">{story.publishedAt}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{story.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {story.content}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-rose-600 border-rose-200 hover:bg-rose-50"
                    onClick={() => handleRejectStory(story.id)}
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => handleApproveStory(story.id)}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve &amp; Publish</span>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Reported Comments */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {pendingReports.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 space-y-1">
              <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="font-bold text-slate-800 dark:text-slate-200">No active reports!</p>
              <p>Community forums and comment sections are healthy.</p>
            </div>
          ) : (
            pendingReports.map((report) => (
              <div
                key={report.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-rose-200 dark:border-rose-900/60 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-rose-600 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Report Reason: {report.reason}</span>
                  </span>
                  <span className="text-slate-400">{report.reportedAt}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 font-mono">
                  &quot;{report.contentTitle}&quot;
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      resolveModerationReport(report.id, 'dismissed');
                      addToast({
                        type: 'info',
                        title: 'Report Dismissed',
                        message: 'Marked as reviewed and dismissed.'
                      });
                    }}
                  >
                    <span>Dismiss Flag</span>
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      resolveModerationReport(report.id, 'resolved');
                      addToast({
                        type: 'error',
                        title: 'Content Handled',
                        message: 'Report resolved and flagged content processed.'
                      });
                    }}
                  >
                    <span>Resolve Flag</span>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Volunteers */}
      {activeTab === 'volunteers' && (
        <div className="space-y-4">
          {volunteerApplications.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
              No volunteer applications submitted yet.
            </div>
          ) : (
            volunteerApplications.map((app) => (
              <div
                key={app.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {app.fullName} ({app.pronouns})
                  </span>
                  <Badge variant="purple">{app.roleTitle}</Badge>
                </div>
                <div className="text-slate-500">
                  <span>Email: {app.email}</span> • <span>Submitted: {app.submittedAt}</span>
                </div>
                <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <strong>Motivation:</strong> {app.experience}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 4: Donations */}
      {activeTab === 'donations' && (
        <div className="space-y-4">
          {donations.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
              No donations recorded yet.
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Donor</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Cadence</th>
                    <th className="p-4">Dedication</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {donations.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-4 font-semibold text-slate-900 dark:text-white">
                        {d.isAnonymous ? 'Anonymous Ally' : d.donorName}
                      </td>
                      <td className="p-4 font-bold text-rose-600 dark:text-rose-400">
                        {d.currency}{d.amount.toLocaleString()}
                      </td>
                      <td className="p-4 capitalize">{d.frequency}</td>
                      <td className="p-4 text-slate-500">{d.dedicatedTo || '—'}</td>
                      <td className="p-4 text-slate-400">{d.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Newsletter Subscribers */}
      {activeTab === 'subscribers' && (
        <div className="space-y-4">
          {newsletterSubscribers.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
              No newsletter subscribers recorded yet.
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Subscriber Email</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Topic Preferences</th>
                    <th className="p-4">Subscribed Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {newsletterSubscribers.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-4 font-semibold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{s.email}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={s.status === 'active' ? 'success' : 'neutral'}>
                          {s.status === 'active' ? 'Active' : 'Unsubscribed'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {s.preferences && s.preferences.length > 0 ? (
                            s.preferences.map(pref => (
                              <span 
                                key={pref}
                                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-medium capitalize"
                              >
                                {pref.replace('-', ' ')}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400">Monthly General</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-slate-400">{s.subscribedAt}</td>
                      <td className="p-4 text-right">
                        {s.status === 'active' ? (
                          <button
                            onClick={() => {
                              unsubscribeNewsletter(s.email);
                              addToast({
                                type: 'info',
                                title: 'Subscriber updated',
                                message: `Unsubscribed ${s.email}`
                              });
                            }}
                            className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 font-medium"
                          >
                            Unsubscribe
                          </button>
                        ) : (
                          <span className="text-slate-400 text-xs">Inactive</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
