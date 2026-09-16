import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BookOpen, Clock, Heart } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Badge } from '../ui/Badge';
import { ReadingTimeIndicator } from '../ui/ReadingTimeIndicator';
import { BlogPost, Story } from '../../types';

export interface RecommendedForYouProps {
  /** Content type */
  type: 'blog' | 'story';
  /** Current post/story ID or slug to exclude */
  currentId: string;
  /** Current category to match relevance against */
  currentCategory: string;
  /** Optional tags to match relevance against */
  currentTags?: string[];
  /** Maximum number of recommendations to display (defaults to 3) */
  limit?: number;
  /** Optional custom section heading */
  title?: string;
  /** Optional descriptive subtitle */
  subtitle?: string;
  /** Optional custom container class name */
  className?: string;
}

export const RecommendedForYou: React.FC<RecommendedForYouProps> = ({
  type,
  currentId,
  currentCategory,
  currentTags = [],
  limit = 3,
  title = 'Recommended for You',
  subtitle,
  className = '',
}) => {
  const { blogPosts, stories } = useData();

  // Smart relevance ranking algorithm
  const recommendations = useMemo(() => {
    if (type === 'blog') {
      const candidates = blogPosts.filter(
        (post) => post.id !== currentId && post.slug !== currentId
      );

      // Score candidates
      const scored = candidates.map((post) => {
        let score = 0;
        // Exact category match gets high relevance
        if (post.category === currentCategory) score += 5;
        // Shared tags
        if (currentTags && currentTags.length > 0 && post.tags) {
          const matchingTags = post.tags.filter((t) =>
            currentTags.map((ct) => ct.toLowerCase()).includes(t.toLowerCase())
          );
          score += matchingTags.length * 2;
        }
        return { item: post, score };
      });

      // Sort by score desc, then by published date
      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, limit).map((s) => s.item);
    } else {
      const candidates = stories.filter(
        (story) => story.id !== currentId && story.status === 'approved'
      );

      // Score candidates
      const scored = candidates.map((story) => {
        let score = 0;
        if (story.category === currentCategory) score += 5;
        if (currentTags && currentTags.length > 0 && story.tags) {
          const matchingTags = story.tags.filter((t) =>
            currentTags.map((ct) => ct.toLowerCase()).includes(t.toLowerCase())
          );
          score += matchingTags.length * 2;
        }
        return { item: story, score };
      });

      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, limit).map((s) => s.item);
    }
  }, [type, currentId, currentCategory, currentTags, limit, blogPosts, stories]);

  const defaultSubtitle =
    type === 'blog'
      ? `Thoughtfully curated articles and wellness guides related to ${currentCategory}.`
      : `Personal journeys and affirming experiences sharing similar themes of ${currentCategory}.`;

  return (
    <section
      id="recommended-for-you-section"
      aria-labelledby="recommended-heading"
      className={`pt-10 border-t border-slate-200 dark:border-slate-800 space-y-6 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Discover More</span>
          </div>
          <h3
            id="recommended-heading"
            className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1"
          >
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            {subtitle || defaultSubtitle}
          </p>
        </div>

        {/* View All Link */}
        <Link
          to={type === 'blog' ? '/blog' : '/my-story'}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group shrink-0"
        >
          <span>{type === 'blog' ? 'Browse all articles' : 'Explore all stories'}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Recommendations Grid */}
      {recommendations.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8 text-center bg-slate-50/50 dark:bg-slate-900/30 space-y-3">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            No further recommendations found in this category right now.
          </p>
          <Link
            to={type === 'blog' ? '/blog' : '/my-story'}
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline"
          >
            <span>Explore our full archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendations.map((item) => {
            const isBlogPost = 'slug' in item;
            const targetUrl = isBlogPost
              ? `/blog/${(item as BlogPost).slug}`
              : `/my-story/${(item as Story).id}`;

            const authorName = isBlogPost
              ? typeof (item as BlogPost).author === 'object' && (item as BlogPost).author !== null
                ? ((item as BlogPost).author as any).name
                : String((item as BlogPost).author || 'Prism Editorial')
              : (item as Story).isAnonymous
              ? 'Anonymous Member'
              : (item as Story).authorName;

            return (
              <article
                key={item.id}
                className="group flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400/80 dark:hover:border-indigo-600/80 transition-all duration-200 shadow-xs hover:shadow-md overflow-hidden"
              >
                {/* Thumbnail Image */}
                <Link
                  to={targetUrl}
                  className="block relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-800"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <Badge variant={isBlogPost ? 'purple' : 'pride'} className="shadow-xs backdrop-blur-xs">
                      {item.category}
                    </Badge>
                  </div>
                </Link>

                {/* Card Body */}
                <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    {/* Metadata line: Reading time & Date */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <ReadingTimeIndicator
                        content={item.content}
                        readTime={item.readTime}
                        className="text-[11px] text-slate-500 dark:text-slate-400"
                      />
                      <span>{item.publishedAt}</span>
                    </div>

                    {/* Title */}
                    <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                      <Link to={targetUrl} className="focus:outline-hidden">
                        {item.title}
                      </Link>
                    </h4>

                    {/* Excerpt */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  {/* Card Footer: Author & Read CTA */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[140px]">
                      {authorName}
                    </span>

                    <Link
                      to={targetUrl}
                      className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300"
                      aria-label={`Read ${item.title}`}
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
