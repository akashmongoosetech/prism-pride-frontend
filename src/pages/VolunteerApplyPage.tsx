import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import { INITIAL_VOLUNTEER_ROLES } from '../data/mockData';
import { HeartHandshake, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';

export const VolunteerApplyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { submitVolunteerApplication } = useData();
  const { user } = useAuth();
  const { addToast } = useToast();

  const preselectedRoleId = searchParams.get('role') || INITIAL_VOLUNTEER_ROLES[0].id;

  const [roleId, setRoleId] = useState(preselectedRoleId);
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [pronouns, setPronouns] = useState(user?.pronouns || '');
  const [experience, setExperience] = useState('');
  const [backgroundCheckAgreed, setBackgroundCheckAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    document.title = 'Volunteer Application • Prism';
  }, []);

  const selectedRole = INITIAL_VOLUNTEER_ROLES.find((r) => r.id === roleId) || INITIAL_VOLUNTEER_ROLES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!backgroundCheckAgreed) {
      addToast({
        type: 'error',
        title: 'Safety Check Required',
        message: 'Please consent to the community safety and background screening protocol.'
      });
      return;
    }

    setIsSubmitting(true);

    submitVolunteerApplication({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      roleId: selectedRole.id,
      roleTitle: selectedRole.title,
      pronouns: pronouns.trim(),
      experience: experience.trim()
    });

    setIsSubmitting(false);
    setIsDone(true);
    addToast({
      type: 'success',
      title: 'Application Received!',
      message: 'Thank you for stepping up to support our queer family. Our coordinator will reach out within 48 hours.'
    });
  };

  return (
    <div id="volunteer-apply-page" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Volunteer', url: '/volunteer' },
          { label: 'Application' }
        ]}
      />

      <Link
        to="/volunteer"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Volunteer Overview</span>
      </Link>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Care In Practice</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Prism Volunteer Application
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Thank you for offering your time and talents. Please share a little about yourself and how you would like to contribute.
        </p>
      </div>

      {isDone ? (
        <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-100">
            Application Submitted!
          </h2>
          <p className="text-sm text-emerald-900 dark:text-emerald-200 max-w-md mx-auto leading-relaxed">
            We have received your application for <strong>{selectedRole.title}</strong>. Our volunteer engagement team will contact you via {email} with orientation schedules and next steps.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link to="/community">
              <Button variant="primary">Explore Community</Button>
            </Link>
            <Link to="/">
              <Button variant="outline">Return Home</Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          
          {/* Role Choice */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Select Desired Volunteer Role *
            </label>
            <select
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
            >
              {INITIAL_VOLUNTEER_ROLES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title} ({r.commitment})
                </option>
              ))}
            </select>
          </div>

          {/* Personal details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                required
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g., Alex Rivera"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Pronouns *
              </label>
              <input
                required
                type="text"
                value={pronouns}
                onChange={(e) => setPronouns(e.target.value)}
                placeholder="e.g., they/them, she/her, he/him"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
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
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 000-0000"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Motivation & Experience */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Why do you want to volunteer with Prism &amp; what relevant experience do you bring? *
            </label>
            <textarea
              required
              rows={4}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Tell us about your background, personal passion for LGBTQIA+ advocacy, lived experience, or any previous community organizing..."
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white leading-relaxed"
            />
          </div>

          {/* Safety protocol agreement */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-200">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Community Protection &amp; Youth Safeguarding</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Because volunteers interact with vulnerable youth, support groups, and confidential forums, all accepted candidates must pass a standard identity verification and complete our 2-hour trauma-informed boundary training.
            </p>
            <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer pt-1">
              <input
                type="checkbox"
                required
                checked={backgroundCheckAgreed}
                onChange={(e) => setBackgroundCheckAgreed(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 mt-0.5 shrink-0"
              />
              <span>
                I agree to participate in volunteer orientation and consent to basic background screening prior to working with community members.
              </span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Link to="/volunteer">
              <Button type="button" variant="ghost">Cancel</Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Submit Application
            </Button>
          </div>

        </form>
      )}
    </div>
  );
};
