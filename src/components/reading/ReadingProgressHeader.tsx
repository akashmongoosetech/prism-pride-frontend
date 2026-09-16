import React, { useState, useEffect } from 'react';
import { Clock, BookOpen, CheckCircle2, ArrowUp } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { calculateReadingTime } from '../../utils/readingTime';

export interface ReadingProgressHeaderProps {
  /** The title of the blog post or personal story */
  title: string;
  /** Category of the story or article */
  category: string;
  /** Full textual content used to calculate reading time and words */
  content: string;
  /** Optional fallback reading time string (e.g. '5 min read') */
  fallbackReadTime?: string;
  /** Ref to the main article element to measure scroll progress through */
  targetRef?: React.RefObject<HTMLElement | null>;
  /** Optional author name */
  author?: string;
  /** Optional container class name */
  className?: string;
}

export const ReadingProgressHeader: React.FC<ReadingProgressHeaderProps> = ({
  title,
  category,
  content,
  fallbackReadTime,
  targetRef,
  className = '',
}) => {
  const [progress, setProgress] = useState(0);
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  // Calculate reading time metrics
  const { minutes: totalMinutes, words: wordCount } = calculateReadingTime(content);

  // Dynamic remaining reading time based on progress
  const remainingMinutes = Math.max(0, Math.ceil(totalMinutes * (1 - progress / 100)));

  // Scroll listener for reading progress optimized with requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!targetRef?.current) {
        // Window scroll fallback
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight <= 0) {
          setProgress(100);
          ticking = false;
          return;
        }
        const currentScroll = window.scrollY;
        const pct = Math.min(100, Math.max(0, (currentScroll / scrollHeight) * 100));
        setProgress(pct);
        setIsScrolledPast(currentScroll > 220);
        ticking = false;
        return;
      }

      const element = targetRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top + window.scrollY;
      const elementHeight = rect.height;

      // Account for site header height (~75px)
      const headerOffset = 75;
      const startY = elementTop - headerOffset;
      const endY = elementTop + elementHeight - windowHeight;
      const currentY = window.scrollY;

      if (currentY <= startY) {
        setProgress(0);
        setIsScrolledPast(false);
      } else if (currentY >= endY) {
        setProgress(100);
        setIsScrolledPast(true);
      } else {
        const scrollDistance = endY - startY;
        const currentDistance = currentY - startY;
        const pct = scrollDistance > 0 ? (currentDistance / scrollDistance) * 100 : 0;
        setProgress(Math.min(100, Math.max(0, pct)));
        setIsScrolledPast(currentY > startY + 180);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    // Run once on mount
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [targetRef]);

  const scrollToTop = () => {
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. In-Page Reader Engagement Header Card (Top of Post) */}
      <section
        aria-label="Reading engagement and progress overview"
        className={`rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-gradient-to-br from-slate-50/90 via-white to-indigo-50/20 dark:from-slate-900/90 dark:via-slate-900/60 dark:to-indigo-950/20 p-4 sm:p-5 shadow-xs transition-colors ${className}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Time to Read indicator */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                  Time to read
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {wordCount > 0 ? `${wordCount} words` : fallbackReadTime || 'Community piece'}
                </span>
              </div>
              <p className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                {totalMinutes} min read{' '}
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                  (based on 200 wpm)
                </span>
              </p>
            </div>
          </div>

          {/* Right: Real-time progress status badge */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {progress >= 95 ? (
              <Badge variant="success" className="flex items-center gap-1 py-1 px-3">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Completed</span>
              </Badge>
            ) : progress > 0 ? (
              <Badge variant="purple" className="flex items-center gap-1.5 py-1 px-3 font-mono">
                <span>{Math.round(progress)}% read</span>
                <span className="text-slate-400">•</span>
                <span className="font-sans font-medium">~{remainingMinutes} min left</span>
              </Badge>
            ) : (
              <Badge variant="default" className="flex items-center gap-1.5 py-1 px-3">
                <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                <span>Ready to read</span>
              </Badge>
            )}
          </div>
        </div>

        {/* Reading Progress Bar */}
        <div className="mt-3.5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-medium px-0.5">
            <span>Reading Progress</span>
            <span className="font-mono">{Math.round(progress)}%</span>
          </div>

          <div
            className="w-full bg-slate-200/80 dark:bg-slate-800/80 h-2.5 rounded-full overflow-hidden relative shadow-inner"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Article reading progress: ${Math.round(progress)}%`}
          >
            <div
              className="h-full pride-rainbow-bar transition-all duration-150 ease-out rounded-full"
              style={{ width: `${Math.max(progress > 0 ? 2 : 0, progress)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 px-0.5">
            <span>Start</span>
            <span>Halfway (50%)</span>
            <span>Complete (100%)</span>
          </div>
        </div>
      </section>

      {/* 2. Sticky Floating Reading Progress Bar (Docked under main site header as user scrolls) */}
      <aside
        aria-label="Sticky reading progress bar"
        className={`fixed top-16 sm:top-[72px] md:top-[80px] left-0 right-0 z-30 transition-all duration-300 ease-in-out ${
          isScrolledPast
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          {/* Edge progress bar track */}
          <div
            className="w-full bg-slate-100 dark:bg-slate-800 h-1 relative overflow-hidden"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Sticky reading progress: ${Math.round(progress)}%`}
          >
            <div
              className="h-full pride-rainbow-bar transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3 text-xs">
            {/* Title / Category */}
            <div className="flex items-center gap-2 min-w-0">
              <Badge variant="default" className="text-[10px] py-0.5 px-2 shrink-0">
                {category}
              </Badge>
              <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[180px] sm:max-w-xs md:max-w-md">
                {title}
              </span>
            </div>

            {/* Time to read & progress indicator */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" aria-hidden="true" />
                <span>
                  Time to read: <strong className="font-bold text-slate-900 dark:text-white">{totalMinutes} min</strong>
                </span>
                <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
                <span className="text-slate-500 dark:text-slate-400 hidden sm:inline text-[11px]">
                  {progress >= 95 ? 'Completed' : `~${remainingMinutes} min left`}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full font-mono text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
                  {Math.round(progress)}%
                </span>

                <button
                  type="button"
                  onClick={scrollToTop}
                  title="Scroll to top of article"
                  aria-label="Scroll to top of article"
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
