import React, { useState } from 'react';
import { ShieldCheck, Clock, ThumbsUp, Heart, User, Sparkles } from 'lucide-react';
import { CommentModerationStatus } from '../../types';

export interface CommentItemProps {
  id: string;
  authorName: string;
  pronouns?: string;
  content: string;
  createdAt: string;
  status?: CommentModerationStatus;
  isAnonymous?: boolean;
  avatar?: string;
  type?: 'story' | 'blog';
}

export const CommentItem: React.FC<CommentItemProps> = ({
  id,
  authorName,
  pronouns,
  content,
  createdAt,
  status = 'approved',
  isAnonymous = false,
  avatar,
  type = 'story'
}) => {
  const [likesCount, setLikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setLikesCount(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const displayName = isAnonymous ? 'Affirming Ally (Anonymous)' : authorName;
  const initials = isAnonymous 
    ? 'AA' 
    : displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <article
      id={`comment-${id}`}
      aria-label={`Comment by ${displayName}`}
      className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs transition-all space-y-3"
    >
      {/* Author and Metadata Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar or Initials */}
          {avatar && !isAnonymous ? (
            <img
              src={avatar}
              alt=""
              aria-hidden="true"
              referrerPolicy="no-referrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-1 ring-purple-400/30 shrink-0"
            />
          ) : (
            <div 
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-xs"
              aria-hidden="true"
            >
              {initials}
            </div>
          )}

          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="font-semibold text-sm text-slate-900 dark:text-white">
                {displayName}
              </span>

              {pronouns && !isAnonymous && (
                <span className="text-xs px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-medium">
                  {pronouns}
                </span>
              )}
            </div>

            <time 
              dateTime={createdAt}
              className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5"
            >
              {createdAt}
            </time>
          </div>
        </div>

        {/* Moderation Status Badge */}
        <div className="shrink-0">
          {status === 'approved' ? (
            <span 
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60"
              title="Verified safe community message"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span className="hidden sm:inline">Approved Affirmation</span>
              <span className="sm:hidden">Verified</span>
            </span>
          ) : status === 'pending' ? (
            <span 
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60"
              title="Awaiting community safety screening"
            >
              <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              <span>Safety Review</span>
            </span>
          ) : null}
        </div>
      </div>

      {/* Comment Body */}
      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed break-words whitespace-pre-wrap">
        {content}
      </p>

      {/* Interaction Footer */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/70 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <button
          type="button"
          onClick={handleLike}
          aria-pressed={hasLiked}
          aria-label={`Send affirmation love to ${displayName}. Current count: ${likesCount}`}
          className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
            hasLiked
              ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 font-semibold'
              : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current text-rose-500' : ''}`} aria-hidden="true" />
          <span>{likesCount > 0 ? `Resonated (${likesCount})` : 'Affirm'}</span>
        </button>

        <span className="text-slate-400 text-xs flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-purple-400" aria-hidden="true" />
          <span>Safe Space</span>
        </span>
      </div>
    </article>
  );
};
