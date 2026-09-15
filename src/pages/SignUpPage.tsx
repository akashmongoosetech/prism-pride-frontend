import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { ShieldCheck, Lock, LogIn, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SignUpPage: React.FC = () => {
  const { user, canCreateRole } = useAuth();

  useEffect(() => {
    document.title = 'Account Provisioning | Prism Sanctuary';
  }, []);

  const isAdminOrSub = canCreateRole('MEMBER');

  return (
    <div id="signup-page" className="max-w-lg mx-auto px-4 py-16 space-y-6 text-center">
      <Breadcrumbs items={[{ label: 'Account Provisioning' }]} />

      <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-100 dark:border-indigo-800/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm">
        <Lock className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Administrative Provisioning Only
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          To maintain a safe, strictly moderated space for LGBTQIA+ members, public self-registration is disabled. All user accounts are created and provisioned by community Administrators and Sub-Administrators.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Security & Access Policy</span>
        </div>
        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-4">
          <li><strong>Zero Public Sign-up:</strong> No uncontrolled open self-registrations.</li>
          <li><strong>Role-Based Access Control:</strong> Explicit permissions enforced for Administrators, Sub-Admins, Managers, Staff, Volunteers, and Members.</li>
          <li><strong>Privilege Escalation Prevention:</strong> Roles can only be provisioned by authorized superiors.</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link to="/login" className="w-full sm:w-auto">
          <Button variant="primary" className="w-full sm:w-auto gap-2">
            <LogIn className="w-4 h-4" />
            <span>Go to Sign In</span>
          </Button>
        </Link>
        {isAdminOrSub && (
          <Link to="/admin/users" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full sm:w-auto gap-2">
              <Users className="w-4 h-4" />
              <span>Manage & Provision Users</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
