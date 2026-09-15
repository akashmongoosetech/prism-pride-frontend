import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Heart, Sparkles, Users, ShieldCheck, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = 'About Us • Prism LGBTQIA+ Sanctuary';
  }, []);

  const values = [
    {
      title: 'Unconditional Inclusivity',
      desc: 'We celebrate the entire spectrum of sexual orientations, gender identities, expressions, races, ages, abilities, and backgrounds.'
    },
    {
      title: 'Safety & Confidentiality',
      desc: 'We uphold digital privacy, consent-based communication, and rigorous safeguards to protect our members wherever they are on their journey.'
    },
    {
      title: 'Peer-Powered Care',
      desc: 'Lived experience is valid wisdom. We empower community members to hold space for one another in compassionate, non-hierarchical ways.'
    },
    {
      title: 'Radical Joy & Pride',
      desc: 'While we confront prejudice and minority stress head-on, our celebrations of love, self-discovery, and triumph are the heartbeats of our mission.'
    }
  ];

  const leadership = [
    {
      name: 'Maya Lin, MSW',
      role: 'Executive Director & Co-Founder',
      bio: 'Queer organizer and social worker with 14 years dedicated to youth crisis intervention and community mental health.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      pronouns: 'she/her'
    },
    {
      name: 'River Thorne, PhD',
      role: 'Director of Programs & Clinical Guidance',
      bio: 'Transgender advocate, researcher, and psychologist specializing in gender-affirming care pathways and minority resilience.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      pronouns: 'he/they'
    },
    {
      name: 'Amara Diop, JD',
      role: 'Legal Advocacy & Civil Rights Liaison',
      bio: 'Civil rights attorney fighting for workplace equality, transgender healthcare access, and asylum defense for queer refugees.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      pronouns: 'she/they'
    },
    {
      name: 'Carlos Santiago',
      role: 'Head of Youth Engagement & Peer Support',
      bio: 'Former unhoused queer youth leader who established our 24/7 online drop-in center and mutual aid clothing closet.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      pronouns: 'he/him'
    }
  ];

  return (
    <div id="about-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Identity &amp; Heart</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Building a World Where No LGBTQIA+ Person Walks Alone
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Prism was founded with a straightforward promise: to provide a vibrant, affirming, and protective home for anyone discovering, embracing, or celebrating their queer identity.
        </p>
      </div>

      {/* Story & Origins */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            How It Began
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            From a Basement Peer Circle to a Global Sanctuary
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            In 2019, four queer friends—a social worker, an unhoused youth advocate, a college educator, and a community designer—noticed that while large cities had occasional Pride rallies, thousands of LGBTQIA+ people in rural towns and hostile environments had nowhere to turn for authentic connection.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            What started as a tiny Sunday evening video call with eight questioning teenagers quickly evolved into a multifaceted support platform with peer groups, emergency relocation support, medical directories, and annual Pride parades.
          </p>
          <div className="pt-2">
            <Link to="/community">
              <Button variant="pride" size="sm">
                <span>Join Our Circles</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
            alt="Prism community members gathered warmly"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      {/* Values Grid */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
            Our Guiding Pillars
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Principles We Live By
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="rounded-2xl bg-slate-50 dark:bg-slate-900/80 p-6 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-sm">
                0{i + 1}
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{v.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Team */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Dedicated Team
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Community Leadership
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Over 80% of our board and leadership team identify openly as LGBTQIA+.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((leader, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 p-5 space-y-3 text-center shadow-xs">
              <img
                src={leader.image}
                alt={leader.name}
                className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-indigo-500/20"
              />
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{leader.name}</h3>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold block">{leader.pronouns}</span>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{leader.role}</p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed text-left pt-2 border-t border-slate-100 dark:border-slate-800">
                {leader.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Commitment to Safety & Inclusivity */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-rose-950 text-white p-8 sm:p-12 space-y-4 border border-indigo-900/50">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
          Our Inclusion Promise
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          A Safe Space for Every Identity and Ally
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          We maintain zero tolerance for racism, transphobia, biphobia, homophobia, misogyny, ableism, or hate speech of any kind. Whether you are out, stealth, questioning, or an ally seeking education, you are held in unconditional care.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Link to="/safety">
            <Button variant="secondary" size="sm" className="bg-white text-slate-900 hover:bg-slate-100 font-bold">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Safety &amp; Privacy Policies</span>
            </Button>
          </Link>
          <Link to="/volunteer">
            <Button variant="outline" size="sm" className="border-white/40 text-white hover:bg-white/10">
              <span>Join as a Volunteer</span>
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
};
