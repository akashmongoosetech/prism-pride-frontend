import React, { useState } from 'react';
import { 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  Heart, 
  Calendar, 
  X,
  Loader2
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';

interface NewsletterTopic {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const TOPICS: NewsletterTopic[] = [
  { id: 'pride-updates', label: 'Pride Celebrations 2026', icon: <Flame className="w-3 h-3 text-rose-400" /> },
  { id: 'events', label: 'Community Gatherings & Events', icon: <Calendar className="w-3 h-3 text-amber-400" /> },
  { id: 'support-groups', label: 'Peer Support & Mental Health', icon: <Heart className="w-3 h-3 text-purple-400" /> },
  { id: 'advocacy', label: 'Legal Rights & Action Alerts', icon: <ShieldCheck className="w-3 h-3 text-emerald-400" /> }
];

export const FooterNewsletter: React.FC = () => {
  const { subscribeNewsletter, isSubscribed, unsubscribeNewsletter, newsletterSubscribers } = useData();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['pride-updates', 'events']);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribedSuccess, setSubscribedSuccess] = useState<string | null>(null);

  const activeSubscribersCount = newsletterSubscribers.filter(s => s.status === 'active').length + 12450;

  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId)
        ? prev.filter(t => t !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      addToast({
        type: 'error',
        title: 'Valid email required',
        message: 'Please enter a valid email address to receive our monthly Pride dispatch.'
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate swift server response
    setTimeout(() => {
      const result = subscribeNewsletter(
        email, 
        selectedTopics.length > 0 ? selectedTopics : ['pride-updates']
      );
      
      setIsSubmitting(false);

      if (result.success) {
        setSubscribedSuccess(email);
        addToast({
          type: 'success',
          title: result.alreadySubscribed ? 'Preferences Updated!' : 'Subscribed to Monthly Pride Updates!',
          message: result.message
        });
      } else {
        addToast({
          type: 'error',
          title: 'Subscription failed',
          message: result.message
        });
      }
    }, 400);
  };

  const handleUnsubscribe = () => {
    if (!subscribedSuccess) return;
    unsubscribeNewsletter(subscribedSuccess);
    setSubscribedSuccess(null);
    setEmail('');
    addToast({
      type: 'info',
      title: 'Unsubscribed',
      message: 'You have been unsubscribed from monthly community updates.'
    });
  };

  return (
    <div 
      id="footer-newsletter-section"
      className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4"
    >
      {/* Header Tag & Title */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-indigo-500/20 border border-rose-400/30 text-[11px] font-bold text-rose-300 uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-rose-400" />
          <span>Monthly Pride &amp; Community Dispatch</span>
        </div>
        <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
          Stay Connected to Affirming Community
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
          Receive a curated monthly digest of Pride celebrations, upcoming virtual and in-person peer circles, youth programs, and urgent legal action alerts.
        </p>
      </div>

      {subscribedSuccess ? (
        /* Confirmation State */
        <div className="rounded-xl bg-emerald-950/50 border border-emerald-800/60 p-4 text-xs space-y-2 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>You&apos;re subscribed to Monthly Pride updates!</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-700/50 uppercase font-semibold">
              Active
            </span>
          </div>

          <p className="text-slate-300 text-xs">
            We sent a welcome confirmation to <strong className="text-white">{subscribedSuccess}</strong>. Watch your inbox on the 1st of every month.
          </p>

          <div className="pt-2 flex items-center justify-between text-[11px] border-t border-emerald-800/40 text-slate-400">
            <span>Subscribed to: {selectedTopics.length} topic{selectedTopics.length === 1 ? '' : 's'}</span>
            <button
              onClick={handleUnsubscribe}
              className="text-rose-400 hover:text-rose-300 underline font-medium transition-colors"
            >
              Unsubscribe
            </button>
          </div>
        </div>
      ) : (
        /* Subscription Form */
        <form onSubmit={handleSubmit} className="space-y-3">
          
          {/* Email input + submit button */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                id="footer-newsletter-email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email (e.g. alex@example.com)"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-indigo-500 transition-colors"
                aria-label="Email address for monthly Pride community newsletter"
                disabled={isSubmitting}
                required
              />
            </div>

            <button
              type="submit"
              id="footer-newsletter-submit-btn"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-md shadow-rose-500/20 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <span>Join Monthly Updates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {/* Topic customizer toggle */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-[11px]">
              <button
                type="button"
                onClick={() => setShowPreferences(prev => !prev)}
                className="text-slate-400 hover:text-indigo-300 transition-colors flex items-center gap-1 font-medium"
              >
                <span>{showPreferences ? 'Hide topic preferences' : 'Customize topics (Pride, Events, Support)'}</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded-md">
                  {selectedTopics.length} selected
                </span>
              </button>

              <span className="text-slate-500 hidden sm:inline">
                Join <strong className="text-slate-300 font-semibold">{activeSubscribersCount.toLocaleString()}</strong> subscribers
              </span>
            </div>

            {/* Topic Chips Drawer */}
            {showPreferences && (
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 animate-in fade-in duration-200">
                {TOPICS.map((topic) => {
                  const isChecked = selectedTopics.includes(topic.id);
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => toggleTopic(topic.id)}
                      className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs transition-all border ${
                        isChecked
                          ? 'bg-slate-800 border-indigo-500/60 text-white font-medium'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${
                        isChecked 
                          ? 'bg-indigo-600 border-indigo-500 text-white' 
                          : 'border-slate-700 bg-slate-900'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                      <span className="shrink-0">{topic.icon}</span>
                      <span className="truncate">{topic.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Assurance footer */}
          <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>100% confidential. Zero advertising or data sharing. Instant 1-click unsubscribe anytime.</span>
          </div>

        </form>
      )}

    </div>
  );
};
