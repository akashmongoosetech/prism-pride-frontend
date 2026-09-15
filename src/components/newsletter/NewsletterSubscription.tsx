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
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';

interface NewsletterTopic {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const TOPICS: NewsletterTopic[] = [
  { id: 'pride-updates', label: 'Pride Celebrations 2026', icon: <Flame className="w-3.5 h-3.5 text-rose-500" aria-hidden="true" /> },
  { id: 'stories', label: 'Community Stories & Essays', icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" /> },
  { id: 'support-groups', label: 'Peer Support & Mental Health', icon: <Heart className="w-3.5 h-3.5 text-purple-500" aria-hidden="true" /> },
  { id: 'advocacy', label: 'Civil Rights & Action Alerts', icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" /> }
];

interface NewsletterSubscriptionProps {
  heading?: string;
  description?: string;
  className?: string;
  sourceContext?: 'blog' | 'story' | 'general';
}

export const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  heading = "Stay Connected with Our Affirming Community",
  description = "Get curated monthly updates on upcoming Pride celebrations, honest community stories, peer support circles, and vital advocacy alerts. No spam, ever.",
  className = "",
  sourceContext = 'general'
}) => {
  const { subscribeNewsletter, unsubscribeNewsletter, newsletterSubscribers } = useData();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'pride-updates', 
    sourceContext === 'story' ? 'stories' : 'support-groups'
  ]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);

  const activeSubscribersCount = newsletterSubscribers.filter(s => s.status === 'active').length + 12450;

  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev => {
      if (prev.includes(topicId)) {
        // keep at least 1 topic selected
        if (prev.length === 1) return prev;
        return prev.filter(t => t !== topicId);
      }
      return [...prev, topicId];
    });
  };

  const validateEmail = (val: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setError('Please enter your email address to subscribe.');
      return;
    }

    if (!validateEmail(trimmed)) {
      setError('Please enter a valid email address (e.g. name@example.com).');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = subscribeNewsletter(
        trimmed,
        selectedTopics.length > 0 ? selectedTopics : ['pride-updates']
      );

      setIsSubmitting(false);

      if (result.success) {
        setSubscribedEmail(trimmed);
        setError(null);
        addToast({
          type: 'success',
          title: result.alreadySubscribed ? 'Subscription Updated!' : 'Welcome to the Prism Community!',
          message: result.message
        });
      } else {
        setError(result.message);
        addToast({
          type: 'error',
          title: 'Subscription Error',
          message: result.message
        });
      }
    }, 350);
  };

  const handleUnsubscribe = () => {
    if (!subscribedEmail) return;
    unsubscribeNewsletter(subscribedEmail);
    setSubscribedEmail(null);
    setEmail('');
    addToast({
      type: 'info',
      title: 'Unsubscribed',
      message: 'You have been unsubscribed from community email dispatches.'
    });
  };

  return (
    <section 
      id="newsletter-subscription-section"
      aria-labelledby="newsletter-subscription-heading"
      className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-purple-50/50 via-white to-pink-50/40 dark:from-slate-900/90 dark:via-purple-950/20 dark:to-slate-900 p-6 md:p-8 lg:p-10 shadow-sm transition-all ${className}`}
    >
      <div className="max-w-3xl mx-auto text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          {/* Header & Copy */}
          <div className="flex-1 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Community Dispatch</span>
              <span className="text-slate-400 dark:text-slate-500">•</span>
              <span>{activeSubscribersCount.toLocaleString()} Advocates</span>
            </div>

            <h2 
              id="newsletter-subscription-heading"
              className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight"
            >
              {heading}
            </h2>

            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Subscription Form / Confirmation */}
        <div className="mt-6 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
          {subscribedEmail ? (
            <div 
              role="status"
              aria-live="polite"
              className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 text-base">
                    You're Subscribed!
                  </h3>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300/90 mt-0.5">
                    Updates will be delivered to <span className="font-medium">{subscribedEmail}</span> at the beginning of each month.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setSubscribedEmail(null)}
                  className="px-3.5 py-2 text-xs font-medium rounded-lg text-emerald-800 dark:text-emerald-200 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/60 dark:hover:bg-emerald-800/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  Change Email
                </button>
                <button
                  type="button"
                  onClick={handleUnsubscribe}
                  className="px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                >
                  Unsubscribe
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Topic Selectors */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-left">
                  Choose your interests (optional):
                </label>
                <div className="flex flex-wrap gap-2 text-left" role="group" aria-label="Newsletter topics">
                  {TOPICS.map(topic => {
                    const isSelected = selectedTopics.includes(topic.id);
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => toggleTopic(topic.id)}
                        aria-pressed={isSelected}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                          isSelected
                            ? 'bg-purple-600 text-white shadow-sm ring-1 ring-purple-600'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {topic.icon}
                        <span>{topic.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input + Button Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <label htmlFor="newsletter-subscription-email" className="sr-only">
                    Email address
                  </label>
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <input
                    id="newsletter-subscription-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Enter your email (e.g. name@example.com)"
                    aria-invalid={!!error}
                    aria-describedby={error ? "newsletter-subscription-error" : "newsletter-privacy-note"}
                    className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white border shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      error 
                        ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500' 
                        : 'border-slate-300 dark:border-slate-700 focus:ring-purple-500 focus:border-purple-500'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="newsletter-subscription-submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 shrink-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Join Community</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>

              {/* Inline Error Message */}
              {error && (
                <div 
                  id="newsletter-subscription-error" 
                  role="alert" 
                  aria-live="assertive"
                  className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 font-medium text-left"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              {/* Privacy note */}
              <p 
                id="newsletter-privacy-note" 
                className="text-xs text-slate-500 dark:text-slate-400 text-left flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" aria-hidden="true" />
                <span>Zero spam, full privacy protection. One-click unsubscribe anytime.</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
