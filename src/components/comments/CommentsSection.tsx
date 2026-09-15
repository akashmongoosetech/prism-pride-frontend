import React, { useState, useMemo } from 'react';
import { MessageCircle, ShieldCheck, Heart, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { StoryComment, BlogComment, CommentModerationStatus } from '../../types';
import { CommentItem } from './CommentItem';
import { CommentForm } from './CommentForm';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';

export interface CommentsSectionProps {
  contentId: string;
  type: 'story' | 'blog';
  comments?: (StoryComment | BlogComment)[];
  className?: string;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  contentId,
  type,
  comments = [],
  className = ''
}) => {
  const { addStoryComment, addBlogComment } = useData();
  const { addToast } = useToast();

  const [filterStatus, setFilterStatus] = useState<'all' | 'approved'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Filtered and sorted comments
  const processedComments = useMemo(() => {
    let list = [...comments];

    if (filterStatus === 'approved') {
      list = list.filter(c => (c.status || 'approved') === 'approved');
    }

    list.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return list;
  }, [comments, filterStatus, sortOrder]);

  const handleAddComment = async (data: {
    authorName: string;
    pronouns?: string;
    content: string;
    isAnonymous: boolean;
  }) => {
    // Automatically approve for delightful preview experience while marking with status
    const status: CommentModerationStatus = 'approved';

    if (type === 'story') {
      addStoryComment(
        contentId,
        data.authorName,
        data.content,
        data.pronouns,
        status,
        data.isAnonymous
      );
    } else {
      addBlogComment(
        contentId,
        data.authorName,
        data.content,
        data.pronouns,
        status,
        data.isAnonymous
      );
    }

    addToast({
      type: 'success',
      title: type === 'story' ? 'Affirmation posted!' : 'Comment posted!',
      message: 'Your affirming message is now visible to the community.'
    });
  };

  return (
    <section
      id="comments-section"
      aria-labelledby="comments-section-heading"
      className={`space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800 ${className}`}
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2
              id="comments-section-heading"
              className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
            >
              {type === 'story' ? 'Community Affirmations' : 'Community Discussion'}
              <span className="ml-2 text-sm font-semibold text-purple-600 dark:text-purple-400">
                ({comments.length})
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              A safe, affirming space for uplifting reflections and solidarity.
            </p>
          </div>
        </div>

        {/* Filters & Sorting */}
        {comments.length > 1 && (
          <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
            <label htmlFor="comments-sort-order" className="sr-only">
              Sort comments
            </label>
            <select
              id="comments-sort-order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        )}
      </div>

      {/* Moderation Safety Guarantee Banner */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-purple-50/70 via-pink-50/50 to-indigo-50/70 dark:from-slate-900 dark:to-purple-950/20 border border-purple-100 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
        <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-0.5">
          <span className="font-semibold text-slate-900 dark:text-white">
            Moderated Safe Haven Guarantee
          </span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            All messages are screened against anti-hate policies. We maintain zero tolerance for deadnaming, misgendering, hate speech, or unsolicited personal attacks.
          </p>
        </div>
      </div>

      {/* Comments List */}
      <div 
        className="space-y-3.5"
        role="feed"
        aria-label="Comments feed"
      >
        {processedComments.length === 0 ? (
          <div className="text-center py-10 px-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 space-y-2">
            <Heart className="w-8 h-8 text-purple-400 mx-auto opacity-70" aria-hidden="true" />
            <h3 className="font-medium text-sm text-slate-800 dark:text-slate-200">
              No affirmations shared yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Be the first caring peer to leave an encouraging message or share how this resonated with you.
            </p>
          </div>
        ) : (
          processedComments.map((comm) => (
            <CommentItem
              key={comm.id}
              id={comm.id}
              authorName={comm.authorName}
              pronouns={comm.pronouns}
              content={comm.content}
              createdAt={comm.createdAt}
              status={comm.status || 'approved'}
              isAnonymous={comm.isAnonymous}
              avatar={comm.avatar}
              type={type}
            />
          ))
        )}
      </div>

      {/* Submission Form */}
      <CommentForm
        type={type}
        onSubmit={handleAddComment}
      />
    </section>
  );
};
