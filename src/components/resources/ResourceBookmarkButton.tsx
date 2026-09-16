import React from 'react';
import { Bookmark } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface ResourceBookmarkButtonProps {
  resourceId: string;
  resourceTitle: string;
  variant?: 'icon' | 'button' | 'pill' | 'badge';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const ResourceBookmarkButton: React.FC<ResourceBookmarkButtonProps> = ({
  resourceId,
  resourceTitle,
  variant = 'icon',
  size = 'md',
  showText = false,
  className = ''
}) => {
  const { user, toggleBookmark, isBookmarked } = useAuth();
  const { addToast } = useToast();

  const saved = user ? isBookmarked(resourceId) : false;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      addToast({
        type: 'info',
        title: 'Sign In to Save',
        message: 'Please sign in to save this resource guide to your sanctuary profile.'
      });
      return;
    }

    const isNowSaved = toggleBookmark(resourceId);

    if (isNowSaved) {
      addToast({
        type: 'success',
        title: 'Guide Saved to Profile',
        message: `"${resourceTitle}" has been saved to your sanctuary profile for quick reference.`
      });
    } else {
      addToast({
        type: 'info',
        title: 'Bookmark Removed',
        message: `"${resourceTitle}" was removed from your saved resources.`
      });
    }
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  if (variant === 'button') {
    return (
      <button
        type="button"
        id={`bookmark-btn-${resourceId}`}
        onClick={handleClick}
        aria-label={saved ? `Remove "${resourceTitle}" from saved guides` : `Save "${resourceTitle}" to your profile`}
        title={saved ? 'Remove from saved guides' : 'Save guide to your profile'}
        className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
          saved
            ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shadow-xs hover:bg-amber-100 dark:hover:bg-amber-900/60'
            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-xs'
        } ${className}`}
      >
        <Bookmark className={`${iconSizes[size]} transition-transform ${saved ? 'fill-current scale-105' : ''}`} />
        <span>{saved ? 'Saved to Profile' : 'Save Guide to Profile'}</span>
      </button>
    );
  }

  if (variant === 'pill') {
    return (
      <button
        type="button"
        id={`bookmark-pill-${resourceId}`}
        onClick={handleClick}
        aria-label={saved ? `Remove "${resourceTitle}" from saved guides` : `Save "${resourceTitle}" to profile`}
        title={saved ? 'Bookmarked in profile' : 'Save to profile'}
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
          saved
            ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
        } ${className}`}
      >
        <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
        <span>{saved ? 'Saved' : 'Bookmark'}</span>
      </button>
    );
  }

  // Default: Icon button
  const iconPad = size === 'sm' ? 'p-1.5' : size === 'lg' ? 'p-3' : 'p-2';

  return (
    <button
      type="button"
      id={`bookmark-icon-${resourceId}`}
      onClick={handleClick}
      aria-label={saved ? `Remove "${resourceTitle}" from bookmarks` : `Bookmark "${resourceTitle}" to profile`}
      title={saved ? 'Remove from saved guides' : 'Save guide to your profile'}
      className={`rounded-xl border transition-all cursor-pointer ${iconPad} ${
        saved
          ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 shadow-xs'
          : 'border-slate-200 dark:border-slate-700/80 bg-white/90 dark:bg-slate-800/90 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-700'
      } ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <Bookmark className={`${iconSizes[size]} transition-all ${saved ? 'fill-current scale-110' : ''}`} />
        {showText && (
          <span className="text-xs font-medium">{saved ? 'Saved' : 'Save'}</span>
        )}
      </div>
    </button>
  );
};
