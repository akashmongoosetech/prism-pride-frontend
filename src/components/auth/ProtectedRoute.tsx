import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole, normalizeRole, ROLE_BADGES, ROLE_LABELS } from '../../config/roles';
import { ShieldAlert, ArrowLeft, LogIn, Lock, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  requiredPermissions?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
  requiredPermissions
}) => {
  const { user, isAuthenticated, isLoading, hasPermission, switchDemoRole } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Verifying security clearance and session...
        </p>
      </div>
    );
  }

  // If not authenticated, redirect to /login
  if (!isAuthenticated || !user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  const userRole = normalizeRole(user.role);

  // Check role authorization
  if (requiredRoles && requiredRoles.length > 0) {
    const normalizedRequired = requiredRoles.map(r => normalizeRole(r));
    if (!normalizedRequired.includes(userRole)) {
      return renderAccessDenied(user, userRole, `Role '${ROLE_LABELS[userRole] || userRole}' is not authorized to access this section.`);
    }
  }

  // Check explicit permission authorization
  if (requiredPermissions && requiredPermissions.length > 0) {
    const missingPerms = requiredPermissions.filter(p => !hasPermission(p));
    if (missingPerms.length > 0) {
      return renderAccessDenied(user, userRole, `Missing required permissions: [${missingPerms.join(', ')}].`);
    }
  }

  return <>{children}</>;

  function renderAccessDenied(currentUser: any, role: UserRole, reason: string) {
    const badge = ROLE_BADGES[role] || ROLE_BADGES.MEMBER;
    return (
      <div id="access-denied-container" className="max-w-xl mx-auto px-4 py-16 text-center space-y-6 animate-in fade-in duration-200">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-100 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <Lock className="w-3.5 h-3.5" />
            <span>403 — Access Denied</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Insufficient Permissions
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            You are signed in as <strong className="text-slate-900 dark:text-white">{currentUser.name}</strong>, but your assigned role lacks clearance for this resource.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 text-left space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Your Role:</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
              {badge.label}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Clearance Reason:</span>
            <span className="text-slate-700 dark:text-slate-300 font-mono text-[11px] truncate max-w-[280px]">
              {reason}
            </span>
          </div>
        </div>

        {/* Rapid Testing Switcher */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Evaluation Persona Quick-Switch
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => switchDemoRole('ADMIN')}
              className="px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-semibold hover:bg-rose-100 transition-colors"
            >
              Sign In as Admin
            </button>
            <button
              onClick={() => switchDemoRole('SUB_ADMIN')}
              className="px-2.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-semibold hover:bg-purple-100 transition-colors"
            >
              Sign In as Sub-Admin
            </button>
            <button
              onClick={() => switchDemoRole('MANAGER')}
              className="px-2.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold hover:bg-indigo-100 transition-colors"
            >
              Sign In as Manager
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button variant="secondary" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="primary" className="gap-2">
              <LogIn className="w-4 h-4" />
              <span>Switch Account</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }
};
