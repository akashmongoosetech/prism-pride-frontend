import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ReadingTimeIndicator } from '../components/ui/ReadingTimeIndicator';
import { ReadingProgressHeader } from '../components/reading/ReadingProgressHeader';
import { ArticleSkeleton } from '../components/ui/ArticleSkeleton';
import { SocialShareBar } from '../components/social/SocialShareBar';
import { RecommendedForYou } from '../components/content/RecommendedForYou';
import { AuthorBio } from '../components/author/AuthorBio';
import { CommentsSection } from '../components/comments/CommentsSection';
import { NewsletterSubscription } from '../components/newsletter/NewsletterSubscription';
import { 
  Heart, 
  Sparkles, 
  Bookmark, 
  Flag, 
  MessageCircle, 
  ArrowLeft, 
  Flame
} from 'lucide-react';

export const StoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { stories, reactToStory } = useData();
  const { user, toggleBookmark } = useAuth();
  const { addToast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [hasReacted, setHasReacted] = useState<Record<string, boolean>>({});

  const story = stories.find((s) => s.id === id);
  const articleRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    if (story) {
      document.title = `${story.title} • Prism Stories`;
      window.scrollTo(0, 0);
    }

    return () => clearTimeout(timer);
  }, [id, story]);

  if (isLoading) {
    return <ArticleSkeleton variant="story" />;
  }

  if (!story) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Story Not Found</h2>
        <p className="text-slate-500 text-sm">The community story you are looking for does not exist or has been moved.</p>
        <Link to="/my-story">
          <Button variant="primary">Return to Stories</Button>
        </Link>
      </div>
    );
  }

  const isBookmarked = user ? user.bookmarks.includes(story.id) : false;

  const handleReaction = (type: 'heart' | 'rainbow' | 'inspire') => {
    reactToStory(story.id, type);
    setHasReacted(prev => ({ ...prev, [type]: true }));
    addToast({
      type: 'success',
      title: 'Affirmation Sent',
      message: 'Thank you for supporting this storyteller with your love!'
    });
  };

  const handleReport = () => {
    addToast({
      type: 'info',
      title: 'Report Received',
      message: 'Our community moderation team will review this item immediately.'
    });
  };

  return (
    <article ref={articleRef} id="story-detail" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Stories', url: '/my-story' },
          { label: story.title }
        ]}
      />

      <Link
        to="/my-story"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Stories</span>
      </Link>

      {/* Top Reading Progress Bar & Dynamic Time to Read Indicator (Targeted to actual reading content) */}
      <ReadingProgressHeader
        title={story.title}
        category={story.category}
        content={story.content}
        fallbackReadTime={story.readTime}
        targetRef={contentRef}
        author={story.isAnonymous ? 'Anonymous Member' : story.authorName}
      />

      {/* Story Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="pride">{story.category}</Badge>
          <span className="text-xs text-slate-400">•</span>
          <ReadingTimeIndicator content={story.content} readTime={story.readTime} />
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">Published {story.publishedAt}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {story.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-y border-slate-200 dark:border-slate-800 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              {story.isAnonymous ? 'A' : story.authorName.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">
                {story.isAnonymous ? 'Anonymous Community Member' : story.authorName}
              </p>
              {story.authorPronouns && (
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  Pronouns: {story.authorPronouns}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Header Compact Social Sharing */}
            <SocialShareBar
              title={story.title}
              description={story.excerpt}
              variant="compact"
            />

            <button
              onClick={() => toggleBookmark(story.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isBookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700 text-amber-600'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Bookmark story"
              aria-label="Bookmark story"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleReport}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="Flag or report content"
              aria-label="Report content"
            >
              <Flag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="rounded-3xl overflow-hidden shadow-md max-h-[420px] border border-slate-200 dark:border-slate-800">
        <img
          src={story.coverImage}
          alt={story.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Story Content Body (Targeted for scroll progress) */}
      <div
        ref={contentRef}
        id="story-reading-body"
        className="prose prose-slate dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300 space-y-6"
      >
        {story.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Tags */}
      <div className="pt-2 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400">Themes:</span>
        {story.tags.map((t, idx) => (
          <span
            key={idx}
            className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            #{t}
          </span>
        ))}
      </div>

      {/* Full Social Sharing Section */}
      <SocialShareBar
        title={story.title}
        description={story.excerpt}
        variant="full"
      />

      {/* Interactive Reactions Bar */}
      <div className="rounded-2xl bg-gradient-to-r from-rose-50 via-purple-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800/80 p-6 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <div className="text-center sm:text-left">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Did this story resonate with you?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Leave an anonymous token of love, solidarity, or inspiration for the storyteller.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleReaction('heart')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-xs sm:text-sm transition-all active:scale-95 ${
              hasReacted.heart
                ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/20'
                : 'bg-white dark:bg-slate-900 border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${hasReacted.heart ? 'fill-current' : ''}`} />
            <span>Sending Love ({story.reactions.heart})</span>
          </button>

          <button
            onClick={() => handleReaction('rainbow')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-xs sm:text-sm transition-all active:scale-95 ${
              hasReacted.rainbow
                ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20'
                : 'bg-white dark:bg-slate-900 border-amber-200 dark:border-amber-900 text-amber-600 dark:text-amber-400 hover:bg-amber-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Pride &amp; Solidarity ({story.reactions.rainbow})</span>
          </button>

          <button
            onClick={() => handleReaction('inspire')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-xs sm:text-sm transition-all active:scale-95 ${
              hasReacted.inspire
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                : 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Deeply Inspiring ({story.reactions.inspire})</span>
          </button>
        </div>
      </div>

      {/* Author Bio Component */}
      <AuthorBio
        name={story.authorName}
        role={story.authorRole || (story.isAnonymous ? undefined : 'Community Storyteller')}
        avatar={story.authorAvatar}
        pronouns={story.authorPronouns}
        bio={story.authorBio}
        isAnonymous={story.isAnonymous}
        type="story"
      />

      {/* Moderated Comments Section */}
      <CommentsSection
        contentId={story.id}
        type="story"
        comments={story.comments}
      />

      {/* Recommended for You Section */}
      <RecommendedForYou
        type="story"
        currentId={story.id}
        currentCategory={story.category}
        currentTags={story.tags}
      />

      {/* Newsletter Subscription Section */}
      <NewsletterSubscription
        sourceContext="story"
        heading="Stay Connected with Community Stories & Pride Updates"
        description="Receive curated monthly stories of resilience, coming out journeys, upcoming Pride marches, and peer support directly in your inbox."
      />
    </article>
  );
};
