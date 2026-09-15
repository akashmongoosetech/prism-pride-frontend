import React, { useState } from 'react';
import { Send, Shield, Sparkles, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export interface CommentFormProps {
  onSubmit: (data: {
    authorName: string;
    pronouns?: string;
    content: string;
    isAnonymous: boolean;
  }) => Promise<void> | void;
  type?: 'story' | 'blog';
  className?: string;
}

const MAX_CHARACTERS = 1000;
const MIN_CHARACTERS = 3;

export const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  type = 'story',
  className = ''
}) => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [authorName, setAuthorName] = useState(user?.displayName || '');
  const [pronouns, setPronouns] = useState(user?.pronouns || '');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const characterCount = content.length;
  const isOverLimit = characterCount > MAX_CHARACTERS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedContent = content.trim();
    if (!trimmedContent) {
      setErrorMessage('Please enter your message or reflection before posting.');
      return;
    }

    if (trimmedContent.length < MIN_CHARACTERS) {
      setErrorMessage(`Your message must be at least ${MIN_CHARACTERS} characters.`);
      return;
    }

    if (trimmedContent.length > MAX_CHARACTERS) {
      setErrorMessage(`Your message exceeds the maximum allowed length of ${MAX_CHARACTERS} characters.`);
      return;
    }

    const finalAuthor = isAnonymous 
      ? 'Anonymous Peer' 
      : (authorName.trim() || 'Caring Community Member');

    setIsSubmitting(true);

    try {
      await onSubmit({
        authorName: finalAuthor,
        pronouns: isAnonymous ? undefined : pronouns.trim(),
        content: trimmedContent,
        isAnonymous
      });

      setContent('');
      setJustSubmitted(true);
      setTimeout(() => setJustSubmitted(false), 5000);
    } catch (err) {
      setErrorMessage('Unable to post message at this time. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      id="comment-submission-form"
      aria-label={`Submit a comment on this ${type}`}
      className={`rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
            {type === 'story' ? 'Share Your Affirmation or Reflection' : 'Join the Discussion'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Messages are moderated to maintain an unconditionally affirming, safe sanctuary for everyone.
          </p>
        </div>

        {/* Anonymous Toggle */}
        <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300 select-none py-1">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
          />
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-purple-500" aria-hidden="true" />
            <span>Post Anonymously</span>
          </span>
        </label>
      </div>

      {/* Name and Pronouns (hidden or disabled if anonymous) */}
      {!isAnonymous && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label 
              htmlFor="comment-author-name"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
            >
              Your Name or Moniker
            </label>
            <input
              id="comment-author-name"
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g. Jordan or Morgan K."
              maxLength={50}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <div>
            <label 
              htmlFor="comment-author-pronouns"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
            >
              Pronouns <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <input
              id="comment-author-pronouns"
              type="text"
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
              placeholder="e.g. they/them, she/her, he/him"
              maxLength={30}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>
        </div>
      )}

      {/* Content Textarea */}
      <div className="space-y-1.5">
        <label 
          htmlFor="comment-message-body"
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
        >
          {type === 'story' ? 'Affirmation Message *' : 'Your Thoughts or Perspective *'}
        </label>
        
        <textarea
          id="comment-message-body"
          required
          rows={3}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (errorMessage) setErrorMessage(null);
          }}
          placeholder={
            type === 'story'
              ? 'Share loving encouragement, thank the author for their vulnerability, or reflect on your shared journey...'
              : 'Add your voice, ask respectful questions, or share your insights on this topic...'
          }
          aria-invalid={!!errorMessage || isOverLimit}
          aria-describedby="comment-character-counter"
          className={`w-full text-sm px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border placeholder:text-slate-400 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all resize-y min-h-[90px] ${
            isOverLimit || errorMessage
              ? 'border-rose-300 dark:border-rose-700 focus:ring-rose-500'
              : 'border-slate-200 dark:border-slate-700 focus:ring-purple-500 focus:border-purple-500'
          }`}
        />

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-0.5">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-purple-400" aria-hidden="true" />
            <span>Kindness &amp; respect strictly required</span>
          </span>

          <span 
            id="comment-character-counter"
            aria-live="polite"
            className={isOverLimit ? 'text-rose-500 font-bold' : ''}
          >
            {characterCount} / {MAX_CHARACTERS}
          </span>
        </div>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Success banner */}
      {justSubmitted && (
        <div
          role="status"
          aria-live="polite"
          className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
          <span>Thank you! Your affirming message has been submitted and posted with safe community screening.</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end pt-1">
        <button
          type="submit"
          disabled={isSubmitting || isOverLimit || !content.trim()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-purple-600 hover:bg-purple-700 active:scale-[0.98] shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span>Posting...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>Post {type === 'story' ? 'Affirmation' : 'Comment'}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
