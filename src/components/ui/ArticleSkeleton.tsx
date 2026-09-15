import React from 'react';

interface ArticleSkeletonProps {
  /** Optional variant to match different page layouts */
  variant?: 'blog' | 'story';
}

/**
 * Realistic, accessible skeleton placeholder for individual blog posts and stories.
 * Matches exact spacing, dimensions, and typography hierarchy to minimize Layout Shift (CLS).
 */
export const ArticleSkeleton: React.FC<ArticleSkeletonProps> = ({ variant = 'blog' }) => {
  const isStory = variant === 'story';
  const maxWidthClass = isStory ? 'max-w-4xl' : 'max-w-3xl';

  return (
    <div
      className={`${maxWidthClass} mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8 animate-pulse`}
      aria-busy="true"
      aria-label="Loading article content..."
      role="status"
    >
      <span className="sr-only">Loading article and recommendations...</span>

      {/* 1. Breadcrumbs Skeleton */}
      <div className="flex items-center gap-2 pt-2">
        <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-3 w-3 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-3 w-36 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>

      {/* 2. Back Navigation Link Skeleton */}
      <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded-md" />

      {/* 3. Reading Progress Header Card Skeleton */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
            <div className="space-y-1.5">
              <div className="h-3 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
          <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
        </div>
        <div className="space-y-2 pt-1">
          <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="flex justify-between">
            <div className="h-2.5 w-10 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-2.5 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-2.5 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
      </div>

      {/* 4. Article Title & Metadata Header Skeleton */}
      <div className="space-y-4">
        {/* Category & reading time pill */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="h-3 w-3 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-3 w-3 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>

        {/* Title Lines */}
        <div className="space-y-2.5">
          <div className="h-8 sm:h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-8 sm:h-10 w-4/5 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        </div>

        {/* Author Byline & Sharing Actions Skeleton */}
        <div className="flex items-center justify-between py-3 border-y border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
            <div className="space-y-1.5">
              <div className="h-3.5 w-36 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-2.5 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>
        </div>
      </div>

      {/* 5. Hero Featured Image Skeleton */}
      <div className="rounded-3xl bg-slate-200 dark:bg-slate-800 h-64 sm:h-80 md:h-96 w-full" />

      {/* 6. Realistic Content Paragraphs Skeleton */}
      <div className="space-y-6 pt-2">
        {/* Paragraph 1 */}
        <div className="space-y-2.5">
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-[98%] bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-[95%] bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-[90%] bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-[75%] bg-slate-200 dark:bg-slate-800 rounded" />
        </div>

        {/* Paragraph 2 */}
        <div className="space-y-2.5">
          <div className="h-4 w-[97%] bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-[92%] bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-[60%] bg-slate-200 dark:bg-slate-800 rounded" />
        </div>

        {/* Paragraph 3 */}
        <div className="space-y-2.5">
          <div className="h-4 w-[95%] bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-[98%] bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-[85%] bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>

      {/* 7. Topics / Tags Skeleton */}
      <div className="flex items-center gap-2 pt-2">
        <div className="h-3 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="h-6 w-14 bg-slate-200 dark:bg-slate-800 rounded-full" />
      </div>

      {/* 8. Social Sharing Buttons Skeleton */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3">
        <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="flex flex-wrap gap-2">
          <div className="h-9 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-9 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-9 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-9 w-28 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-9 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        </div>
      </div>

      {/* 9. Recommended for You Section Skeleton */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <div className="space-y-1">
          <div className="h-5 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-3 w-64 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 bg-white dark:bg-slate-900"
            >
              <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-3 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
