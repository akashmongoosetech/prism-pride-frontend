import React from 'react';
import { Clock } from 'lucide-react';
import { getEstimatedReadingTime } from '../../utils/readingTime';

interface ReadingTimeIndicatorProps {
  content?: string | null;
  readTime?: string | null;
  className?: string;
  iconClassName?: string;
  showIcon?: boolean;
}

/**
 * Clean, accessible indicator displaying estimated reading time
 * (e.g. "5 min read") with an optional subtle clock icon.
 */
export const ReadingTimeIndicator: React.FC<ReadingTimeIndicatorProps> = ({
  content,
  readTime,
  className = 'text-xs text-slate-500 dark:text-slate-400',
  iconClassName = 'w-3.5 h-3.5 text-slate-400 dark:text-slate-500',
  showIcon = true,
}) => {
  const estimatedTime = getEstimatedReadingTime(content, readTime);

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium ${className}`}
      title={`Estimated reading duration: ${estimatedTime}`}
      aria-label={`Estimated reading time: ${estimatedTime}`}
    >
      {showIcon && <Clock className={`shrink-0 ${iconClassName}`} aria-hidden="true" />}
      <span>{estimatedTime}</span>
    </span>
  );
};
