import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { 
  Users, 
  MessageSquare, 
  Pin, 
  Sparkles, 
  HeartHandshake, 
  ShieldCheck, 
  Search, 
  PlusCircle, 
  ArrowRight,
  Flame,
  Send
} from 'lucide-react';
import { CommunityDiscussion } from '../types';

export const CommunityPage: React.FC = () => {
  const { discussions, addDiscussionReply } = useData();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDiscussion, setActiveDiscussion] = useState<CommunityDiscussion | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replyAuthor, setReplyAuthor] = useState(user?.name || '');
  const [replyPronouns, setReplyPronouns] = useState(user?.pronouns || '');

  // New discussion modal state
  const [isNewDiscussionOpen, setIsNewDiscussionOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Coming Out Advice');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    document.title = 'Community Sanctuary & Discussion Circles • Prism';
  }, []);

  const categories = [
    'all',
    'General Discussion',
    'Coming Out Advice',
    'Trans Healthcare',
    'Safe Housing',
    'Family & Relationships',
    'Joy & Celebration'
  ];

  const filteredDiscussions = discussions.filter((d) => {
    const matchCat = activeCategory === 'all' || d.category === activeCategory;
    const matchSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDiscussion || !replyText.trim()) return;

    addDiscussionReply(
      activeDiscussion.id,
      replyText.trim(),
      replyAuthor.trim() || 'Friendly Peer',
      replyPronouns.trim() || 'they/them'
    );

    setReplyText('');
    addToast({
      type: 'success',
      title: 'Reply Shared',
      message: 'Your compassionate reply has been posted to the discussion.'
    });

    // Update active discussion reference with new reply
    setActiveDiscussion((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        repliesCount: prev.repliesCount + 1,
        replies: [
          ...prev.replies,
          {
            id: 'r-' + Date.now(),
            author: {
              name: replyAuthor.trim() || 'Friendly Peer',
              pronouns: replyPronouns.trim() || 'they/them',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
            },
            content: replyText.trim(),
            createdAt: 'Just now'
          }
        ]
      };
    });
  };

  const handleCreateDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    addToast({
      type: 'success',
      title: 'Discussion Created',
      message: 'Your thread is now live for community responses!'
    });
    setIsNewDiscussionOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div id="community-hub" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <Breadcrumbs items={[{ label: 'Community Sanctuary' }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-500/10 via-purple-500/10 to-indigo-500/10 dark:from-rose-950/30 dark:to-indigo-950/30 rounded-3xl p-8 sm:p-12 border border-rose-200/40 dark:border-rose-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Inclusive Peer Forums</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Community Sanctuary &amp; Dialogue
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            A welcoming space to ask advice, connect with people who share your identity, celebrate personal victories, and exchange resources without judgment.
          </p>
        </div>

        <Button
          variant="pride"
          size="lg"
          onClick={() => setIsNewDiscussionOpen(true)}
          className="shadow-lg shadow-rose-500/20 shrink-0"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Start a Discussion</span>
        </Button>
      </div>

      {/* Community Quick Links Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/support-groups"
          className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4 hover:border-indigo-400 transition-colors group"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 flex items-center justify-center shrink-0">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              Facilitated Support Groups
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Weekly safe zoom &amp; in-person circles.
            </p>
          </div>
        </Link>

        <Link
          to="/my-story"
          className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4 hover:border-rose-400 transition-colors group"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400">
              Personal Stories &amp; Voices
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Read and share journeys of courage.
            </p>
          </div>
        </Link>

        <Link
          to="/events"
          className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4 hover:border-amber-400 transition-colors group"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
              Pride &amp; Social Gatherings
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Parades, poetry nights, game clubs.
            </p>
          </div>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations by keywords..."
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          {/* Safety rule pill */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>All conversations are moderated under our Safe Space Policy</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat === 'all' ? 'All Discussions' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Discussion Threads List */}
      <div className="space-y-4">
        {filteredDiscussions.map((thread) => (
          <div
            key={thread.id}
            onClick={() => setActiveDiscussion(thread)}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {thread.isPinned && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                    <Pin className="w-3 h-3" />
                    <span>Pinned Thread</span>
                  </span>
                )}
                <Badge variant="purple">{thread.category}</Badge>
              </div>
              <span className="text-xs text-slate-400">Last activity {thread.lastActivity}</span>
            </div>

            <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {thread.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
              {thread.content}
            </p>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-2">
                <img
                  src={thread.author.avatar}
                  alt={thread.author.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="font-semibold text-slate-800 dark:text-slate-200">{thread.author.name}</span>
                <span className="text-slate-400 font-normal">({thread.author.pronouns})</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400">
                  <MessageSquare className="w-4 h-4" />
                  <span>{thread.repliesCount} replies</span>
                </span>
                <span className="font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  <span>View Thread</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Discussion Thread Detail Modal */}
      {activeDiscussion && (
        <Modal
          isOpen={Boolean(activeDiscussion)}
          onClose={() => setActiveDiscussion(null)}
          title={activeDiscussion.title}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <img
                    src={activeDiscussion.author.avatar}
                    alt={activeDiscussion.author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="font-bold text-slate-900 dark:text-white">
                    {activeDiscussion.author.name}
                  </span>
                  <span>({activeDiscussion.author.pronouns})</span>
                </div>
                <Badge variant="purple">{activeDiscussion.category}</Badge>
              </div>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                {activeDiscussion.content}
              </p>
            </div>

            {/* Replies List */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Replies ({activeDiscussion.replies.length})
              </h4>

              {activeDiscussion.replies.map((reply) => (
                <div
                  key={reply.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {reply.author.name}{' '}
                      <span className="font-normal text-indigo-500">({reply.author.pronouns})</span>
                    </span>
                    <span className="text-slate-400">{reply.createdAt}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {reply.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Reply Form */}
            <form onSubmit={handleReplySubmit} className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={replyAuthor}
                  onChange={(e) => setReplyAuthor(e.target.value)}
                  placeholder="Your Name (or alias)"
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
                <input
                  type="text"
                  value={replyPronouns}
                  onChange={(e) => setReplyPronouns(e.target.value)}
                  placeholder="Pronouns (optional)"
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type an affirming reply..."
                  className="flex-1 text-xs px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-indigo-500"
                />
                <Button type="submit" variant="primary" size="sm">
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* New Discussion Modal */}
      <Modal
        isOpen={isNewDiscussionOpen}
        onClose={() => setIsNewDiscussionOpen(false)}
        title="Start a Community Conversation"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateDiscussion} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Discussion Topic *
            </label>
            <input
              required
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g., Advice for telling my grandparents?"
              className="w-full text-xs px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full text-xs px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <option value="Coming Out Advice">Coming Out Advice</option>
              <option value="Trans Healthcare">Trans Healthcare</option>
              <option value="Safe Housing">Safe Housing</option>
              <option value="Family & Relationships">Family &amp; Relationships</option>
              <option value="Joy & Celebration">Joy &amp; Celebration</option>
              <option value="General Discussion">General Discussion</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Message Body *
            </label>
            <textarea
              required
              rows={4}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Share details, questions, or context. We are here to listen..."
              className="w-full text-xs px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsNewDiscussionOpen(false)}>
              Cancel
            </Button>
            <Button variant="pride" size="sm" type="submit">
              Publish Discussion
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
