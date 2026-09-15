import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import { Lock, Mail, Sparkles, Shield, ArrowRight, Info, AlertCircle } from 'lucide-react';
import { UserRole, ROLES, ROLE_LABELS, ROLE_BADGES } from '../config/roles';

interface DemoAccount {
  role: UserRole;
  label: string;
  email: string;
  pass: string;
  desc: string;
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    role: 'ADMIN',
    label: 'Administrator',
    email: 'taylor@prismcommunity.org',
    pass: 'prism123456',
    desc: 'Full system control, manage roles & view audit logs'
  },
  {
    role: 'SUB_ADMIN',
    label: 'Sub-Admin',
    email: 'jordan.subadmin@prismcommunity.org',
    pass: 'prism123456',
    desc: 'Manage operational staff and community members'
  },
  {
    role: 'MANAGER',
    label: 'Programs Manager',
    email: 'marcus.manager@prismcommunity.org',
    pass: 'prism123456',
    desc: 'Moderate content, manage events & support groups'
  },
  {
    role: 'EMPLOYEE',
    label: 'Staff Employee',
    email: 'elena.employee@prismcommunity.org',
    pass: 'prism123456',
    desc: 'Sanctuary staff member with operational access'
  },
  {
    role: 'VOLUNTEER',
    label: 'Volunteer',
    email: 'alex.volunteer@prismcommunity.org',
    pass: 'prism123456',
    desc: 'Community volunteer assisting events and groups'
  },
  {
    role: 'MEMBER',
    label: 'Member',
    email: 'samira@example.com',
    pass: 'prism123456',
    desc: 'Standard authenticated sanctuary member'
  }
];

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Sign In | Prism Community Sanctuary';
  }, []);

  const from = (location.state as any)?.from?.pathname || (location.search ? new URLSearchParams(location.search).get('redirect') : null) || '/profile';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      addToast({
        type: 'success',
        title: 'Authentication Successful',
        message: 'Welcome back to Prism Community Sanctuary.'
      });
      navigate(from, { replace: true });
    } else {
      const msg = result.message || 'Invalid credentials. Please verify your email and password.';
      setErrorMessage(msg);
      addToast({
        type: 'error',
        title: 'Sign In Failed',
        message: msg
      });
    }
  };

  const handleSelectDemo = async (account: DemoAccount) => {
    setEmail(account.email);
    setPassword(account.pass);
    setErrorMessage(null);
    setIsLoading(true);

    const result = await login(account.email, account.pass);
    setIsLoading(false);

    if (result.success) {
      addToast({
        type: 'success',
        title: `Signed in as ${account.label}`,
        message: `Authenticated with real credentials: ${account.email}`
      });
      if (account.role === 'ADMIN' || account.role === 'SUB_ADMIN' || account.role === 'MANAGER') {
        navigate('/admin', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } else {
      setErrorMessage(result.message || 'Sign in failed');
    }
  };

  return (
    <div id="login-page" className="max-w-xl mx-auto px-4 py-10 space-y-6">
      <Breadcrumbs items={[{ label: 'Sign In' }]} />

      <div className="text-center space-y-2">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-100 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <Shield className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Prism Community Access
        </h1>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Sign in to your private, protected LGBTQIA+ sanctuary account with role-based permissions.
        </p>
      </div>

      {/* Quick Role Tester Bar */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-100">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Instant Role Accounts:</span>
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Click any role to test authorization
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {DEMO_ACCOUNTS.map((acc) => {
            const badge = ROLE_BADGES[acc.role] || ROLE_BADGES.MEMBER;
            return (
              <button
                key={acc.role}
                type="button"
                onClick={() => handleSelectDemo(acc)}
                className="p-2 text-left rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-xs transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                    {acc.role}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                  {acc.label}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {acc.email}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Credentials Form */}
      <form onSubmit={handleLogin} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-start gap-2.5 text-rose-700 dark:text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@prismcommunity.org"
              className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="w-full"
        >
          <span>Sign In to Account</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>

        {/* Informative Note Explaining Administrative User Provisioning */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                Administrative Account Provisioning
              </p>
              <p className="text-[11px] leading-relaxed">
                Prism Sanctuary operates an invitation-only security model. Accounts are created and assigned roles directly by Administrators and Sub-Administrators.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
