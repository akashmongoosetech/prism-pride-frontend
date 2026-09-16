import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MessageSquare, 
  HelpCircle, 
  Lightbulb, 
  Sparkles, 
  ThumbsUp, 
  Reply, 
  Send, 
  Lock, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  UserCheck, 
  Trash2, 
  Filter, 
  Search,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { Resource, ResourceComment, ResourceCommentType } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ResourceCommunityCommentsProps {
  resource: Resource;
}

const TOPIC_PRESETS = [
  'Staff Inclusivity',
  'Wait Times',
  'Confidentiality',
  'Accessibility',
  'Youth Friendly',
  'Trans Affirming',
  'Free / Low Cost',
  'Intake Process'
];

export const ResourceCommunityComments: React.FC<ResourceCommunityCommentsProps> = ({ resource }) => {
  const { user } = useAuth();
  const { 
    resourceComments, 
    addResourceComment, 
    addResourceCommentReply, 
    toggleResourceCommentHelpful, 
    deleteResourceComment 
  } = useData();
  const { addToast } = useToast();
  const location = useLocation();

  // Form State
  const [commentType, setCommentType] = useState<ResourceCommentType>('experience');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filters & Sorting
  const [filterType, setFilterType] = useState<'all' | ResourceCommentType>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'helpful' | 'oldest'>('newest');
  const [searchQuery, setSearchQuery] = useState('');

  // Active reply form states: map of commentId -> reply content
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [replyIsAnonymous, setReplyIsAnonymous] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});

  // Filter comments for this resource
  const commentsForThisResource = useMemo(() => {
    return resourceComments.filter(c => c.resourceId === resource.id);
  }, [resourceComments, resource.id]);

  // Counts by type
  const counts = useMemo(() => {
    return {
      all: commentsForThisResource.length,
      experience: commentsForThisResource.filter(c => c.commentType === 'experience').length,
      question: commentsForThisResource.filter(c => c.commentType === 'question').length,
      tip: commentsForThisResource.filter(c => c.commentType === 'tip').length
    };
  }, [commentsForThisResource]);

  // Filtered & sorted comments
  const displayedComments = useMemo(() => {
    let result = [...commentsForThisResource];

    // Filter by type
    if (filterType !== 'all') {
      result = result.filter(c => c.commentType === filterType);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.content.toLowerCase().includes(q) ||
        c.authorName.toLowerCase().includes(q) ||
        (c.tags && c.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'helpful') {
        return b.helpfulCount - a.helpfulCount;
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      // 'newest'
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return result;
  }, [commentsForThisResource, filterType, searchQuery, sortBy]);

  const toggleTagSelection = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      addToast({
        type: 'info',
        title: 'Authentication Required',
        message: 'Please sign in to share experiences or ask questions in this community sanctuary.'
      });
      return;
    }

    if (!content.trim() || content.trim().length < 8) {
      addToast({
        type: 'info',
        title: 'Message Too Short',
        message: 'Please share at least a sentence (minimum 8 characters) to help your peers.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      addResourceComment({
        resourceId: resource.id,
        authorId: user.id,
        authorName: isAnonymous ? 'Queer Community Member' : user.name,
        authorEmail: user.email,
        authorPronouns: isAnonymous ? undefined : user.pronouns,
        authorAvatar: isAnonymous ? undefined : user.avatar,
        authorRole: user.role,
        isAnonymous,
        commentType,
        content: content.trim(),
        tags: selectedTags
      });

      setContent('');
      setSelectedTags([]);
      setIsAnonymous(false);

      const typeLabel = 
        commentType === 'experience' ? 'Experience shared' : 
        commentType === 'question' ? 'Question posted' : 'Helpful tip added';

      addToast({
        type: 'success',
        title: `${typeLabel}!`,
        message: 'Thank you for contributing to our safe and informed queer community.'
      });
    } catch (err) {
      console.error(err);
      addToast({
        type: 'error',
        title: 'Submission Error',
        message: 'Failed to post your comment. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHelpfulClick = (commentId: string) => {
    if (!user) {
      addToast({
        type: 'info',
        title: 'Sign In to Vote',
        message: 'Sign in to mark peer experiences and questions as helpful!'
      });
      return;
    }

    const isHelpful = toggleResourceCommentHelpful(commentId, user.id);
    addToast({
      type: isHelpful ? 'success' : 'info',
      title: isHelpful ? 'Marked as Helpful' : 'Helpful Vote Removed',
      message: isHelpful ? 'Thank you for supporting community contributors!' : 'Your vote has been updated.'
    });
  };

  const handleReplySubmit = (commentId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      addToast({
        type: 'info',
        title: 'Sign In Required',
        message: 'Please sign in to reply to peer questions or experiences.'
      });
      return;
    }

    if (!replyContent.trim()) return;

    addResourceCommentReply(commentId, {
      authorId: user.id,
      authorName: replyIsAnonymous ? 'Helpful Peer' : user.name,
      authorPronouns: replyIsAnonymous ? undefined : user.pronouns,
      authorAvatar: replyIsAnonymous ? undefined : user.avatar,
      authorRole: user.role,
      isAnonymous: replyIsAnonymous,
      content: replyContent.trim()
    });

    setReplyContent('');
    setActiveReplyId(null);
    setReplyIsAnonymous(false);
    setExpandedReplies(prev => ({ ...prev, [commentId]: true }));

    addToast({
      type: 'success',
      title: 'Reply Added',
      message: 'Your response has been published to this discussion thread.'
    });
  };

  const handleDeleteComment = (commentId: string) => {
    if (window.confirm('Are you sure you want to remove this community comment?')) {
      deleteResourceComment(commentId);
      addToast({
        type: 'info',
        title: 'Comment Removed',
        message: 'The comment was removed from this resource.'
      });
    }
  };

  const handleReportComment = () => {
    addToast({
      type: 'info',
      title: 'Report Received',
      message: 'Thank you for keeping our community safe. Our queer moderation team has been notified.'
    });
  };

  const toggleExpandReplies = (commentId: string) => {
    setExpandedReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  return (
    <section 
      id="community-comments" 
      aria-label="Community Comments & Questions"
      className="pt-10 border-t border-slate-200 dark:border-slate-800 space-y-8 scroll-mt-24"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Peer Voice &amp; Insights</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <span>Community Experiences &amp; Questions</span>
            <span className="text-base font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              {counts.all}
            </span>
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Real experiences, practical questions, and peer advice about <span className="font-semibold text-slate-900 dark:text-white">{resource.title}</span>. Powered by verified community members.
          </p>
        </div>

        {/* Quick Type Stat Pills */}
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={() => setFilterType('experience')}
            className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
              filterType === 'experience'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 font-bold'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
            }`}
          >
            💬 {counts.experience} Experiences
          </button>
          <button 
            onClick={() => setFilterType('question')}
            className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
              filterType === 'question'
                ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 font-bold'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
            }`}
          >
            ❓ {counts.question} Questions
          </button>
        </div>
      </div>

      {/* Auth Context-Aware Post Section */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
        {user ? (
          /* Authenticated User Experience Form */
          <form id="resource-comment-form" onSubmit={handleCommentSubmit} className="space-y-4">
            {/* Authenticated User Identity Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                {isAnonymous ? (
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-sm">
                    QP
                  </div>
                ) : user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-rose-500 text-white flex items-center justify-center font-bold text-sm">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {isAnonymous ? 'Posting as Anonymous Peer' : user.name}
                    </span>
                    {!isAnonymous && user.pronouns && (
                      <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium">
                        {user.pronouns}
                      </span>
                    )}
                    {!isAnonymous && user.role === 'admin' && (
                      <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 font-bold">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isAnonymous 
                      ? 'Your profile details will be private. Authenticated for spam protection.'
                      : `Verified Member • ${user.city || 'Prism Community'}`}
                  </p>
                </div>
              </div>

              {/* Anonymity Toggle */}
              <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer select-none bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300">
                <input
                  type="checkbox"
                  id="anonymous-toggle"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                />
                <span>Share Anonymously</span>
              </label>
            </div>

            {/* Contribution Type Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                What would you like to share?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  id="type-experience"
                  onClick={() => setCommentType('experience')}
                  className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                    commentType === 'experience'
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/50 border-indigo-500 text-indigo-900 dark:text-indigo-200 ring-1 ring-indigo-500/30'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs block">Personal Experience</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight block mt-0.5">
                      How was your interaction with this service or guide?
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  id="type-question"
                  onClick={() => setCommentType('question')}
                  className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                    commentType === 'question'
                      ? 'bg-amber-50/80 dark:bg-amber-950/50 border-amber-500 text-amber-900 dark:text-amber-200 ring-1 ring-amber-500/30'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs block">Ask a Question</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight block mt-0.5">
                      Inquire about wait times, intake, privacy, or fees.
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  id="type-tip"
                  onClick={() => setCommentType('tip')}
                  className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                    commentType === 'tip'
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-500/30'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs block">Helpful Advice / Tip</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight block mt-0.5">
                      Best hours, documents to bring, safety tips.
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Message Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="comment-content" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {commentType === 'experience' && 'Your Experience & Reflection *'}
                  {commentType === 'question' && 'Your Question for the Community *'}
                  {commentType === 'tip' && 'Your Helpful Tip or Recommendation *'}
                </label>
                <span className="text-[11px] text-slate-400">
                  {content.length}/1000 characters
                </span>
              </div>
              <textarea
                id="comment-content"
                rows={3}
                required
                maxLength={1000}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  commentType === 'experience'
                    ? 'Share how this resource supported you, what the environment was like, or what to expect when reaching out...'
                    : commentType === 'question'
                    ? 'Ask peers or facilitators about wait times, eligibility, gender-affirming care policies, or confidentiality...'
                    : 'Share a practical tip (e.g., best time of week to reach a live counselor, recommended phone settings for privacy)...'
                }
                className="w-full text-sm px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Quick Topic Tag Badges */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">
                Add Relevant Topics (Optional):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {TOPIC_PRESETS.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => toggleTagSelection(tag)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Community Standards & Submit Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Protected by Prism's affirming queer safety &amp; anti-harassment policy.</span>
              </div>
              <Button
                type="submit"
                id="submit-comment-button"
                variant="primary"
                size="md"
                disabled={isSubmitting || content.trim().length < 8}
                className="w-full sm:w-auto"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {isSubmitting 
                    ? 'Publishing...' 
                    : commentType === 'experience'
                    ? 'Post Experience'
                    : commentType === 'question'
                    ? 'Post Question'
                    : 'Post Tip'}
                </span>
              </Button>
            </div>
          </form>
        ) : (
          /* Unauthenticated Prompt */
          <div id="unauthenticated-comment-banner" className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-slate-50 to-rose-50/50 dark:from-slate-800/80 dark:via-slate-900 dark:to-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>Verified Community Safe Space</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Sign in to share your experience or ask the community
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                To safeguard our LGBTQIA+ members from harassment and ensure genuine peer advice, posting questions or experiences requires an authenticated Prism account.
              </p>
            </div>
            <div className="flex items-center gap-2.5 shrink-0 flex-wrap justify-center">
              <Link to={`/login?redirect=${encodeURIComponent(location.pathname + '#community-comments')}`}>
                <Button variant="primary" size="sm" id="auth-signin-comment-btn">
                  <UserCheck className="w-4 h-4" />
                  <span>Sign In to Post</span>
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="sm">
                  <span>Create Account</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              filterType === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
            }`}
          >
            All ({counts.all})
          </button>
          <button
            onClick={() => setFilterType('experience')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              filterType === 'experience'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
            }`}
          >
            Experiences ({counts.experience})
          </button>
          <button
            onClick={() => setFilterType('question')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              filterType === 'question'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
            }`}
          >
            Questions ({counts.question})
          </button>
          <button
            onClick={() => setFilterType('tip')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              filterType === 'tip'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
            }`}
          >
            Tips ({counts.tip})
          </button>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search comments..."
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] text-slate-400 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'helpful' | 'oldest')}
              className="text-xs px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-hidden"
            >
              <option value="newest">Most Recent</option>
              <option value="helpful">Most Helpful</option>
              <option value="oldest">Earliest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {displayedComments.length === 0 ? (
          <div className="p-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              {searchQuery.trim() ? 'No comments match your search' : 'No comments in this section yet'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              {user 
                ? 'Be the first community member to ask a question or share your experience with this resource!'
                : 'Sign in to be the first member to ask a question or share advice about this guide.'}
            </p>
            {user && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilterType('all');
                  setSearchQuery('');
                  const formElement = document.getElementById('resource-comment-form');
                  formElement?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Share First Comment
              </Button>
            )}
          </div>
        ) : (
          displayedComments.map((comment) => {
            const hasVotedHelpful = user && comment.helpfulUserIds?.includes(user.id);
            const isAuthor = user && user.id === comment.authorId;
            const isAdmin = user && user.role === 'admin';
            const isReplying = activeReplyId === comment.id;
            const replies = comment.replies || [];
            const areRepliesExpanded = expandedReplies[comment.id] ?? true;

            return (
              <div
                key={comment.id}
                id={`comment-${comment.id}`}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                {/* Comment Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-3">
                    {comment.isAnonymous ? (
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center font-bold text-xs">
                        QP
                      </div>
                    ) : comment.authorAvatar ? (
                      <img
                        src={comment.authorAvatar}
                        alt={comment.authorName}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/10"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-rose-500 text-white flex items-center justify-center font-bold text-sm">
                        {comment.authorName.charAt(0)}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {comment.authorName}
                        </span>
                        {comment.authorPronouns && (
                          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                            ({comment.authorPronouns})
                          </span>
                        )}
                        {comment.authorRole === 'admin' && (
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300">
                            Staff / Admin
                          </span>
                        )}
                        {comment.authorRole === 'moderator' && (
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300">
                            Moderator
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {comment.createdAt}
                      </p>
                    </div>
                  </div>

                  {/* Comment Type Badge */}
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    {comment.commentType === 'experience' && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Shared Experience</span>
                      </span>
                    )}
                    {comment.commentType === 'question' && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Community Question</span>
                      </span>
                    )}
                    {comment.commentType === 'tip' && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Helpful Tip</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Comment Body */}
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                  {comment.content}
                </p>

                {/* Attached Topic Tags */}
                {comment.tags && comment.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {comment.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions Ribbon */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2">
                    {/* Helpful Button */}
                    <button
                      type="button"
                      onClick={() => handleHelpfulClick(comment.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all active:scale-95 ${
                        hasVotedHelpful
                          ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 font-bold'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                      title="Vote this experience or question as helpful"
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${hasVotedHelpful ? 'fill-current' : ''}`} />
                      <span>Helpful ({comment.helpfulCount})</span>
                    </button>

                    {/* Reply Toggle Button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (!user) {
                          addToast({
                            type: 'info',
                            title: 'Sign In Required',
                            message: 'Sign in to join discussion threads and answer questions.'
                          });
                          return;
                        }
                        setActiveReplyId(isReplying ? null : comment.id);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Reply className="w-3.5 h-3.5" />
                      <span>{isReplying ? 'Cancel Reply' : 'Reply'}</span>
                    </button>

                    {/* Expand/Collapse Replies Button */}
                    {replies.length > 0 && (
                      <button
                        type="button"
                        onClick={() => toggleExpandReplies(comment.id)}
                        className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline px-2 py-1"
                      >
                        <span>{replies.length} {replies.length === 1 ? 'response' : 'responses'}</span>
                        {areRepliesExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>

                  {/* Moderate / Delete / Report */}
                  <div className="flex items-center gap-2">
                    {(isAuthor || isAdmin) && (
                      <button
                        type="button"
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        title="Delete your comment"
                        aria-label="Delete comment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleReportComment}
                      className="text-slate-400 hover:text-amber-600 transition-colors p-1.5 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/40"
                      title="Report comment for community guidelines violation"
                      aria-label="Report comment"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Inline Reply Input Box (when active) */}
                {isReplying && user && (
                  <form
                    onSubmit={(e) => handleReplySubmit(comment.id, e)}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 mt-3 animate-in fade-in duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <Reply className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Responding to {comment.authorName}</span>
                      </span>
                      <label className="flex items-center gap-1.5 text-[11px] text-slate-500 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={replyIsAnonymous}
                          onChange={(e) => setReplyIsAnonymous(e.target.checked)}
                          className="rounded text-indigo-600 w-3 h-3"
                        />
                        <span>Reply Anonymously</span>
                      </label>
                    </div>

                    <textarea
                      rows={2}
                      required
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder={`Share helpful guidance, solidarity, or answers for ${comment.authorName}...`}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500"
                    />

                    <div className="flex items-center justify-end gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveReplyId(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        disabled={!replyContent.trim()}
                      >
                        <Send className="w-3 h-3" />
                        <span>Send Response</span>
                      </Button>
                    </div>
                  </form>
                )}

                {/* Nested Replies Thread */}
                {replies.length > 0 && areRepliesExpanded && (
                  <div className="space-y-3 pl-4 sm:pl-6 border-l-2 border-indigo-100 dark:border-indigo-950/80 mt-3 pt-2">
                    {replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-1.5 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {reply.isAnonymous ? (
                              <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-[10px]">
                                P
                              </div>
                            ) : reply.authorAvatar ? (
                              <img
                                src={reply.authorAvatar}
                                alt={reply.authorName}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
                                {reply.authorName.charAt(0)}
                              </div>
                            )}
                            <span className="font-bold text-slate-900 dark:text-white">
                              {reply.authorName}
                            </span>
                            {reply.authorPronouns && (
                              <span className="text-[11px] text-indigo-600 dark:text-indigo-400">
                                ({reply.authorPronouns})
                              </span>
                            )}
                            {reply.authorRole === 'admin' && (
                              <span className="text-[9px] uppercase font-bold px-1 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200">
                                Staff
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400">{reply.createdAt}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-8">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
