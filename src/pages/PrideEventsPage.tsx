import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useData } from '../context/DataContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { 
  Flame, 
  Sparkles, 
  MapPin, 
  Calendar as CalendarIcon, 
  ShieldCheck, 
  Heart, 
  Users, 
  Sun, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export const PrideEventsPage: React.FC = () => {
  const { events } = useData();

  useEffect(() => {
    document.title = 'Pride 2026 Celebrations & Calendar • Prism';
  }, []);

  const prideEvents = events.filter((e) => e.category === 'Pride' || e.isPrideOfficial);

  const prideMilestones = [
    {
      year: '1969',
      title: 'The Stonewall Riots',
      desc: 'Led by Black and Latina trans women Marsha P. Johnson and Sylvia Rivera, the uprising ignited modern LGBTQIA+ liberation.'
    },
    {
      year: '1970',
      title: 'First Christopher Street Liberation Day',
      desc: 'The inaugural Pride march commemorated the first anniversary of Stonewall across New York, Chicago, and Los Angeles.'
    },
    {
      year: '1978',
      title: 'The Rainbow Flag Debut',
      desc: 'Gilbert Baker created the original eight-stripe rainbow flag as a universal symbol of hope, diversity, and solidarity.'
    },
    {
      year: '2026',
      title: 'Intersectional Pride Today',
      desc: 'Continuing the fight for trans healthcare, bodily autonomy, global human rights, and unconditional belonging.'
    }
  ];

  const safetyTips = [
    { title: 'Hydrate & Protect', desc: 'Carry sealed water bottles, electrolyte packets, and SPF 50+ sunscreen.' },
    { title: 'Buddy System', desc: 'Stay paired up and establish an agreed-upon meetup spot if cellular service is congested.' },
    { title: 'Know Your Rights', desc: 'Peaceful assembly is protected. Save our legal clinic helpline in your phone beforehand.' },
    { title: 'Sensory Relief', desc: 'Look for the designated Prism quiet tent if music or crowds become overwhelming.' }
  ];

  return (
    <div id="pride-events-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Events', url: '/events' },
          { label: 'Pride Celebrations 2026' }
        ]}
      />

      {/* Hero Pride Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-purple-950 to-rose-950 text-white p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-purple-800/40">
        <div className="h-2 pride-rainbow-bar absolute top-0 left-0 right-0" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4 text-rose-400" />
            <span>June &amp; Year-Round Pride 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Celebrate Our Past. <br />
            <span className="pride-gradient-text">Ignite Our Future.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Pride was born as a protest and endures as a beacon of joy. Find affirming marches, youth rainbow festivals, sober celebrations, and artist showcases in your region.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link to="/events">
              <Button variant="pride" size="lg">
                <span>View Full Event Calendar</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/volunteer">
              <Button variant="secondary" size="lg" className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                <span>Volunteer at Pride</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Official Pride Gatherings */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
              Curated Highlights
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Featured Pride 2026 Gatherings
            </h2>
          </div>
          <Link to="/events?category=Pride">
            <Button variant="outline" size="sm">
              <span>View All Pride Events</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {prideEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="pride">Official Pride</Badge>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link to={`/events/${event.id}`}>
                  <Button variant="primary" size="sm" className="w-full">
                    RSVP &amp; View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pride March Safety & Care Checklist */}
      <div className="rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 space-y-6">
        <div className="max-w-xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Care &amp; Well-being
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Community Pride March Safety Guide
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            We want your Pride experience to be exhilarating, affirming, and safe. Keep these essential tips in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyTips.map((tip, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2"
            >
              <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{tip.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Milestones */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
            Our Living History
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Standing on the Shoulders of Giants
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {prideMilestones.map((m, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 relative"
            >
              <span className="text-2xl font-black text-rose-500 tracking-tight">{m.year}</span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{m.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
