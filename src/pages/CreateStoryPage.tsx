import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import { Sparkles, ShieldCheck, Heart, Info, ArrowLeft, Clock } from 'lucide-react';
import { calculateReadingTime } from '../utils/readingTime';
import { Story } from '../types';

export const CreateStoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { addStory } = useData();
  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    document.title = 'Share Your Story • Prism Sanctuary';
  }, []);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Story['category']>('Coming Out');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState(user?.name || '');
  const [pronouns, setPronouns] = useState(user?.pronouns || '');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80');
  const [tagsInput, setTagsInput] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [guidelinesAgreed, setGuidelinesAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const liveReadingTime = useMemo(() => calculateReadingTime(content), [content]);

  const presetImages = [
    { label: 'Warm Gathering', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Family & Healing', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Pride Celebration', url: 'https://images.unsplash.com/photo-1561525140-c2a4cc68e4bd?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Joy & Reflection', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Chosen Community', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      addToast({
        type: 'error',
        title: 'Required fields missing',
        message: 'Please provide both a title and the content of your story.'
      });
      return;
    }

    if (!consentGiven || !guidelinesAgreed) {
      addToast({
        type: 'error',
        title: 'Agreements required',
        message: 'Please confirm your consent and agreement with our community guidelines.'
      });
      return;
    }

    setIsSubmitting(true);

    const excerpt = content.slice(0, 160) + (content.length > 160 ? '...' : '');
    const tags = tagsInput
      ? tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
      : [category, 'Community', 'Lived Experience'];

    // Calculate approx read time using centralized utility
    const readMinutes = liveReadingTime.text;

    const newStory = addStory({
      title: title.trim(),
      excerpt,
      content: content.trim(),
      authorName: isAnonymous ? 'Anonymous Member' : (authorName.trim() || 'Community Member'),
      isAnonymous,
      authorPronouns: isAnonymous ? undefined : pronouns.trim(),
      category,
      tags,
      coverImage,
      readTime: readMinutes,
      status: 'approved'
    });

    setIsSubmitting(false);

    addToast({
      type: 'success',
      title: 'Your Story Has Been Published!',
      message: 'Thank you for sharing your heart and courage with our community sanctuary.'
    });

    navigate(`/my-story/${newStory.id}`);
  };

  return (
    <div id="create-story-page" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Stories', url: '/my-story' },
          { label: 'Share Your Story' }
        ]}
      />

      <Link
        to="/my-story"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Cancel &amp; Return</span>
      </Link>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Vulnerable &amp; Sacred Space</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Share Your Story
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Your journey is unique, yet it carries reflections of so many in our family. Share as much or as little as you feel comfortable with. You may post anonymously at any time.
        </p>
      </div>

      {/* Community Moderation & Safety Notice */}
      <div className="rounded-2xl bg-indigo-50 dark:bg-slate-800/80 border border-indigo-200 dark:border-slate-700 p-4 flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
        <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-slate-900 dark:text-white">Moderation &amp; Privacy Shield</p>
          <p className="leading-relaxed">
            Every submission is checked by our trained community care facilitators to filter out harassment, hate speech, or unsolicited contact information. You retain full ownership of your story.
          </p>
        </div>
      </div>

      {/* Story Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        {/* Title */}
        <div>
          <label htmlFor="story-title" className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5">
            Story Headline / Title *
          </label>
          <input
            id="story-title"
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Finding Courage in Quiet Moments"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
          />
        </div>

        {/* Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="story-category" className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5">
              Primary Theme / Category *
            </label>
            <select
              id="story-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Story['category'])}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
            >
              <option value="Coming Out">Coming Out</option>
              <option value="Identity">Identity</option>
              <option value="Family">Family</option>
              <option value="Love">Love &amp; Relationships</option>
              <option value="Transition">Transition &amp; Affirmation</option>
              <option value="Mental Wellness">Mental Wellness</option>
              <option value="Pride">Pride &amp; Celebration</option>
              <option value="Advocacy">Advocacy &amp; Action</option>
              <option value="Community">Chosen Family &amp; Community</option>
            </select>
          </div>

          <div>
            <label htmlFor="story-tags" className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5">
              Tags (comma-separated)
            </label>
            <input
              id="story-tags"
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Hope, HighSchool, LaterInLife, Parents"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Image Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Choose a Story Banner / Photo
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {presetImages.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCoverImage(img.url)}
                className={`relative rounded-xl overflow-hidden h-20 border-2 transition-all ${
                  coverImage === img.url
                    ? 'border-indigo-600 ring-2 ring-indigo-500/40 scale-102'
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                <span className="absolute bottom-1 left-1 right-1 text-[10px] font-bold text-white bg-slate-950/70 rounded px-1 text-center truncate">
                  {img.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Story Body */}
        <div>
          <label htmlFor="story-content" className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5">
            Your Story &amp; Reflections *
          </label>
          <textarea
            id="story-content"
            required
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write freely. Share what you felt, what helped you through difficult days, moments of unexpected kindness, and where you find joy today..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white leading-relaxed focus:outline-hidden focus:border-indigo-500"
          />
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-1.5 px-1">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>
                Estimated reading time: <strong className="text-slate-800 dark:text-slate-200">{liveReadingTime.text}</strong> ({liveReadingTime.words} words)
              </span>
            </span>
            <span className="text-[11px] text-slate-400">
              {liveReadingTime.words < 50
                ? 'Share as much or as little as feels safe for you'
                : 'Great length for community connection'}
            </span>
          </div>
        </div>

        {/* Author Privacy and Preferences */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Author &amp; Privacy Settings
          </h4>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
              Publish anonymously (Your name and email will never be displayed publicly)
            </span>
          </label>

          {!isAnonymous && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Display Author Name
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Maya Lin or Alex R."
                  className="w-full text-xs px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Pronouns
                </label>
                <input
                  type="text"
                  value={pronouns}
                  onChange={(e) => setPronouns(e.target.value)}
                  placeholder="e.g. they/them, she/her, he/him"
                  className="w-full text-xs px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>
          )}
        </div>

        {/* Consents */}
        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-400">
            <input
              type="checkbox"
              required
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 mt-0.5 shrink-0"
            />
            <span>
              I confirm that this is my own lived experience (or shared with explicit consent of individuals involved), and I give Prism permission to publish it to inspire others.
            </span>
          </label>

          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-400">
            <input
              type="checkbox"
              required
              checked={guidelinesAgreed}
              onChange={(e) => setGuidelinesAgreed(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 mt-0.5 shrink-0"
            />
            <span>
              I agree to abide by the <Link to="/safety" className="text-indigo-600 underline">Prism Community Safety Guidelines</Link>, ensuring respectful representation free from commercial promotions or hate speech.
            </span>
          </label>
        </div>

        {/* Submit button */}
        <div className="pt-4 flex items-center justify-end gap-3">
          <Link to="/my-story">
            <Button variant="ghost" size="md">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            variant="pride"
            size="lg"
            isLoading={isSubmitting}
            className="shadow-lg shadow-rose-500/20"
          >
            <Heart className="w-5 h-5 fill-white" />
            <span>Publish Story</span>
          </Button>
        </div>

      </form>
    </div>
  );
};
