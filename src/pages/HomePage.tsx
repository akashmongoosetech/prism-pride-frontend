import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  Calendar, 
  BookOpen, 
  HeartHandshake, 
  ArrowRight, 
  Flame, 
  ShieldAlert, 
  CheckCircle2, 
  MessageSquare,
  Activity,
  HeartCrack,
  Star
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ReadingTimeIndicator } from '../components/ui/ReadingTimeIndicator';

export const HomePage: React.FC = () => {
  const { events, resources, stories, supportGroups, blogPosts, partners } = useData();

  // Set document title & SEO
  useEffect(() => {
    document.title = 'Prism - LGBTQIA+ Pride & Community Support Sanctuary';
  }, []);

  // Animated counters state
  const [stats, setStats] = useState({ members: 0, resources: 0, events: 0, partners: 0 });

  useEffect(() => {
    const duration = 1200;
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        members: Math.floor(progress * 14500),
        resources: Math.floor(progress * 280),
        events: Math.floor(progress * 135),
        partners: Math.floor(progress * 54)
      });
      if (step >= steps) clearInterval(timer);
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const featuredEvent = events.find(e => e.featured) || events[0];
  const prideEvents = events.filter(e => e.category === 'Pride' || e.isPrideOfficial);
  const featuredStories = stories.slice(0, 3);
  const featuredGroups = supportGroups.slice(0, 3);
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <div id="home-page-container" className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section id="home-hero-section" className="relative pt-6 pb-12 sm:pt-12 sm:pb-20 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none -z-10 flex justify-center opacity-60 dark:opacity-30">
          <div className="w-[800px] h-[450px] bg-gradient-to-tr from-rose-400/20 via-amber-300/20 to-indigo-400/20 blur-3xl rounded-full transform -translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200">
                <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                <span>Intersectional • Affirming • Always Free</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                You Belong Here. <br />
                <span className="pride-gradient-text">Your Story Matters.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                A safe, welcoming sanctuary to connect with LGBTQIA+ peers, discover verified healthcare and legal resources, join affirming support groups, celebrate Pride, and build a world where everyone thrives without fear.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <Link to="/community">
                  <Button variant="pride" size="lg" className="shadow-lg shadow-rose-500/20">
                    <Users className="w-5 h-5" />
                    <span>Join the Community</span>
                  </Button>
                </Link>

                <Link to="/resources">
                  <Button variant="secondary" size="lg" className="border border-slate-200 dark:border-slate-700">
                    <ShieldCheck className="w-5 h-5 text-indigo-500" />
                    <span>Explore Resources</span>
                  </Button>
                </Link>
              </div>

              {/* Quick Trust badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>100% Free Peer Circles</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Strict Confidentiality</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>24/7 Crisis Access</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visuals */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 ring-1 ring-slate-900/10 dark:ring-white/10 group">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                    alt="Smiling diverse LGBTQIA+ community members sharing a moment together"
                    className="w-full h-96 sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white space-y-1">
                      <span className="text-xs uppercase font-bold tracking-wider text-rose-300">
                        Sanctuary &amp; Joy
                      </span>
                      <p className="text-base font-bold">
                        &quot;Here, I learned that living my truth is the most courageous gift I can give myself.&quot;
                      </p>
                      <p className="text-xs text-slate-300">— Alex, Community Member</p>
                    </div>
                  </div>
                </div>

                {/* Floating Highlight Card */}
                <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-800 items-center gap-3.5 max-w-xs animate-in fade-in slide-in-from-bottom-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Mutual Aid &amp; Support</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Over 1,200 peer sessions hosted this year.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. COMMUNITY IMPACT METRICS */}
      <section id="community-impact-stats" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-xs uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
              Measurable Community Impact
            </h2>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Together, We Build Sanctuary
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-x-0 md:divide-x divide-slate-200 dark:divide-slate-800">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {stats.members.toLocaleString()}+
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                Community Members
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-rose-600 dark:text-rose-400 tracking-tight">
                {stats.resources}+
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                Verified Resources
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-500 dark:text-amber-400 tracking-tight">
                {stats.events}+
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                Gatherings &amp; Events
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
                {stats.partners}+
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                Partner Coalitions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WELCOME & MISSION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
              Our Core Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              A Platform Built on Unconditional Dignity, Radical Care &amp; Belonging
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Every person deserves to walk in the world without fearing rejection, erasure, or prejudice. Prism is an independent, non-profit community platform established to bridge isolation, provide life-affirming resources, and celebrate the radiant spectrum of LGBTQIA+ identity.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Whether you are searching for an affirming therapist, wondering how to support your transgender teenager, or seeking the courage to take your first steps out, you are surrounded by family here.
            </p>
            <div className="pt-2">
              <Link to="/about">
                <Button variant="outline" size="sm">
                  <span>Read Our Full Story &amp; Principles</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-indigo-50 dark:bg-slate-800/80 p-5 space-y-2 border border-indigo-100 dark:border-slate-700">
              <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Community First</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Peer-facilitated connections that break the barriers of geographic and social isolation.
              </p>
            </div>

            <div className="rounded-2xl bg-rose-50 dark:bg-slate-800/80 p-5 space-y-2 border border-rose-100 dark:border-slate-700">
              <ShieldAlert className="w-6 h-6 text-rose-600 dark:text-rose-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Unwavering Safety</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Quick-exit triggers, anonymous participation, and zero tolerance for harassment.
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50 dark:bg-slate-800/80 p-5 space-y-2 border border-amber-100 dark:border-slate-700">
              <Flame className="w-6 h-6 text-amber-500" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Pride &amp; Advocacy</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Celebrating historical milestones while fighting for inclusive civil protections.
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 dark:bg-slate-800/80 p-5 space-y-2 border border-emerald-100 dark:border-slate-700">
              <HeartHandshake className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Mutual Healing</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Centering somatic wellbeing, trans joy, and intergenerational queer wisdom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRIDE EVENTS SPECTACULAR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-8 sm:p-12 overflow-hidden relative shadow-2xl border border-purple-900/50">
          {/* Decorative Rainbow Line */}
          <div className="h-1.5 pride-rainbow-bar absolute top-0 left-0 right-0" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>Pride Celebrations 2026</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Celebrate Pride. Celebrate Community. Celebrate You.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                From historic downtown parades and youth rainbow picnics to open-mic poetry and sober dance parties—discover safe, high-energy, and welcoming celebrations near you.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link to="/pride-events">
                  <Button variant="pride" size="md">
                    <span>Explore Full Pride Calendar</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <Link to="/events">
                  <Button variant="secondary" size="md" className="bg-slate-800 text-white hover:bg-slate-700">
                    <span>All Community Events</span>
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1561525140-c2a4cc68e4bd?auto=format&fit=crop&w=800&q=80"
                  alt="Vibrant Pride March celebration"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-slate-900/90 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs text-amber-300 font-semibold mb-1">
                    <span>Metro Pride Parade &amp; Festival</span>
                    <span>June 27, 2026</span>
                  </div>
                  <p className="text-xs text-slate-300">Downtown Civic Plaza • Free &amp; All-Ages Welcome</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LGBTQIA+ RESOURCES DIRECTORY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Verified Resource Library
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Affirming Care &amp; Support Guides
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Vetted healthcare providers, legal assistance, coming out guides, and 24/7 crisis hotlines.
            </p>
          </div>
          <Link to="/resources">
            <Button variant="outline" size="sm">
              <span>View All 250+ Resources</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.slice(0, 6).map((res) => (
            <div
              key={res.id}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={res.emergencyPriority ? 'danger' : 'info'}>
                    {res.type}
                  </Badge>
                  <span className="text-xs text-slate-400">{res.region}</span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {res.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {res.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                {res.phone ? (
                  <span className="font-semibold text-rose-600 dark:text-rose-400">{res.phone}</span>
                ) : (
                  <span className="text-slate-400">Verified Guide</span>
                )}
                <Link
                  to={`/resources/${res.slug}`}
                  className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SUPPORT GROUPS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                Safe Peer Circles
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Find Your Support Group
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Free, confidential, facilitated weekly circles for youth, trans/nonbinary individuals, families, and adults.
              </p>
            </div>
            <Link to="/support-groups">
              <Button variant="outline" size="sm">
                <span>Browse All Groups</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="purple">{group.category}</Badge>
                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                      Accepting Members
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                    {group.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {group.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                  <div><strong>Format:</strong> {group.meetingFormat} • {group.schedule}</div>
                  <div><strong>Age:</strong> {group.ageRange}</div>
                  <div className="pt-2">
                    <Link to={`/support-groups/${group.id}`}>
                      <Button variant="secondary" size="sm" className="w-full">
                        View Schedule &amp; Join
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. COMMUNITY VOICES / STORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Community Voices
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Personal Stories of Courage &amp; Joy
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Authentic journeys of coming out, family healing, finding chosen relatives, and living proudly.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/my-story/create">
              <Button variant="pride" size="sm">
                <span>Share Your Story</span>
              </Button>
            </Link>
            <Link to="/my-story">
              <Button variant="outline" size="sm">
                <span>All Stories</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredStories.map((story) => (
            <article
              key={story.id}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="pride">{story.category}</Badge>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <ReadingTimeIndicator content={story.content} readTime={story.readTime} className="text-[11px] text-slate-400 block" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {story.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {story.isAnonymous ? 'Anonymous' : story.authorName} {story.authorPronouns && `(${story.authorPronouns})`}
                </span>
                <Link
                  to={`/my-story/${story.id}`}
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 8. HEALTH & WELLNESS WITH MEDICAL DISCLAIMER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-indigo-50/60 dark:bg-slate-900/80 border border-indigo-100 dark:border-slate-800 p-8 sm:p-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4" />
              <span>Holistic Healthcare &amp; Wellness</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Compassionate Physical &amp; Mental Health Care
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We connect community members to informed-consent hormone providers, affirming psychotherapists, sexual health navigators, PrEP assistance, and somatic stress-release workshops.
            </p>
            
            {/* Medical disclaimer as demanded by prompt */}
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              <strong>Important Notice:</strong> Content provided on Prism is for educational, community-building, and informational purposes. It does not constitute professional medical advice, clinical diagnosis, or treatment. Always consult a licensed healthcare clinician regarding any personal health decisions.
            </div>

            <div className="pt-3 flex flex-wrap gap-3">
              <Link to="/resources?category=mental-health">
                <Button variant="primary" size="sm">
                  Mental Wellness Directory
                </Button>
              </Link>
              <Link to="/resources?category=sexual-health">
                <Button variant="secondary" size="sm">
                  Affirming Healthcare Clinicians
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BLOG & EDUCATIONAL ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Community Education
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Latest Insights &amp; Articles
            </h2>
          </div>
          <Link to="/blog">
            <Button variant="outline" size="sm">
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                <div className="h-44 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <Badge variant="default">{post.category}</Badge>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <ReadingTimeIndicator content={post.content} readTime={post.readTime} />
                <Link
                  to={`/blog/${post.slug}`}
                  className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 10. VOLUNTEER CTA & PARTNERS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Volunteer card */}
          <div className="lg:col-span-6 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white p-8 sm:p-10 flex flex-col justify-between border border-emerald-900/40 shadow-xl">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Get Involved
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Become a Prism Volunteer
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Whether you can contribute 2 hours a week as a chat moderator, help organize local Pride events, or mentor young writers, your energy saves lives.
              </p>
            </div>
            <div className="pt-6">
              <Link to="/volunteer">
                <Button variant="secondary" size="md" className="bg-emerald-600 text-white hover:bg-emerald-500 font-bold border-none">
                  <span>Explore Open Volunteer Roles</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Partner Coalition Card */}
          <div className="lg:col-span-6 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Coalition Allies
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Trusted Partner Organizations
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We work side-by-side with recognized advocacy groups, healthcare centers, legal aid clinics, and student coalitions.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {partners.map(p => (
                  <span key={p.id} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-6">
              <Link to="/partners">
                <Button variant="outline" size="sm">
                  <span>View All Partners &amp; Apply</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 11. DONATION CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-700 text-white p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Help Us Build a World Where Everyone Belongs
            </h2>
            <p className="text-sm sm:text-base text-rose-100 leading-relaxed">
              Your gift funds emergency housing for vulnerable youth, peer counseling circles, gender-affirming care grants, and vibrant community Pride celebrations. Every single contribution makes a difference.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link to="/donate">
                <Button variant="secondary" size="lg" className="bg-white text-slate-900 hover:bg-rose-50 font-bold shadow-lg">
                  <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                  <span>Donate Today</span>
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10">
                  <span>How Funds Are Used</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
