import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { 
  HeartHandshake, 
  Users, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { INITIAL_VOLUNTEER_ROLES } from '../data/mockData';

export const VolunteerPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Volunteer with Prism • LGBTQIA+ Community Care';
  }, []);

  const benefits = [
    { title: 'Trauma-Informed Training', desc: 'Free certification in peer crisis de-escalation, active listening, and affirming terminology.' },
    { title: 'Flexible Commitment', desc: 'Contribute anywhere from 2 hours a month to weekly shifts, fully remote or in person.' },
    { title: 'Chosen Family & Friends', desc: 'Join an uplifting community of volunteers who genuinely care for and support one another.' },
    { title: 'Direct Measurable Impact', desc: 'Your presence directly combats loneliness, provides warmth, and saves LGBTQIA+ lives.' }
  ];

  return (
    <div id="volunteer-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
      <Breadcrumbs items={[{ label: 'Volunteer' }]} />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 dark:from-emerald-950/30 dark:to-indigo-950/30 rounded-3xl p-8 sm:p-14 border border-emerald-200/40 dark:border-emerald-800/40 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Community Care In Action</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Lend Your Heart. <br />
            <span className="text-emerald-600 dark:text-emerald-400">Become a Prism Volunteer.</span>
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Our programs thrive because compassionate individuals step up. Whether you are facilitating online support circles, coordinating Pride safety marshals, or editing youth stories, you create sanctuary.
          </p>

          <div className="pt-2">
            <Link to="/volunteer/apply">
              <Button variant="primary" size="lg" className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20">
                <span>Submit Volunteer Application</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800 max-w-sm w-full">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80"
            alt="Smiling volunteers wearing pride pins"
            className="w-full h-64 object-cover"
          />
        </div>
      </div>

      {/* Why Volunteer With Us */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Why Join Us
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            What You Bring &amp; What You Gain
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                0{i + 1}
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{b.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Open Volunteer Positions */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Current Openings
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Active Volunteer Roles
            </h2>
          </div>
          <Link to="/volunteer/apply">
            <Button variant="outline" size="sm">
              <span>Apply for Any Role</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_VOLUNTEER_ROLES.map((role) => (
            <div
              key={role.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="success">{role.department}</Badge>
                  <span className="text-xs text-slate-400">{role.commitment}</span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {role.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {role.description}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    Key Requirements:
                  </span>
                  <ul className="text-xs text-slate-500 space-y-1">
                    {role.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <Link to={`/volunteer/apply?role=${role.id}`}>
                  <Button variant="secondary" size="sm" className="w-full">
                    Apply for This Role
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
