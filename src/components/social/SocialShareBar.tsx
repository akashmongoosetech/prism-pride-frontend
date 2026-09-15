import React, { useState } from 'react';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  MessageCircle, 
  Copy, 
  Check, 
  Share2 
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export interface SocialShareBarProps {
  /** The title of the article or story to share */
  title: string;
  /** Optional custom URL, defaults to window.location.href */
  url?: string;
  /** Optional excerpt/description */
  description?: string;
  /** Visual presentation layout */
  variant?: 'compact' | 'full' | 'inline';
  /** Optional container class name */
  className?: string;
}

export const SocialShareBar: React.FC<SocialShareBarProps> = ({
  title,
  url,
  description,
  variant = 'full',
  className = '',
}) => {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  // Dynamic current URL resolution
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(description || title);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      addToast({
        type: 'success',
        title: 'Link Copied',
        message: 'Direct link copied to your clipboard to share safely.',
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      addToast({
        type: 'error',
        title: 'Clipboard Error',
        message: 'Could not automatically copy link. Please copy from browser address bar.',
      });
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled share dialog or unsupported, ignore gracefully
        if ((err as Error)?.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const shareTargets = [
    {
      name: 'X (Twitter)',
      label: 'Share on X (formerly Twitter)',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: Twitter,
      color: 'hover:text-sky-500 hover:border-sky-300 dark:hover:border-sky-700 hover:bg-sky-50 dark:hover:bg-sky-950/40',
    },
    {
      name: 'Facebook',
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
      color: 'hover:text-blue-600 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/40',
    },
    {
      name: 'LinkedIn',
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
      color: 'hover:text-blue-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/40',
    },
    {
      name: 'WhatsApp',
      label: 'Share on WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      icon: MessageCircle,
      color: 'hover:text-emerald-600 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40',
    },
  ];

  // Compact inline variant (e.g. for post bylines or top actions)
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-1.5 ${className}`} role="group" aria-label="Share this post">
        {shareTargets.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              title={item.label}
              className={`p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 transition-colors focus:ring-2 focus:ring-indigo-400 cursor-pointer ${item.color}`}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          );
        })}

        <button
          type="button"
          onClick={handleCopyLink}
          aria-label={copied ? 'Link copied' : 'Copy link to clipboard'}
          title={copied ? 'Link copied' : 'Copy link to clipboard'}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
            copied
              ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400'
              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    );
  }

  // Full / Banner presentation (e.g. bottom of post)
  return (
    <section
      aria-label="Share this story"
      className={`rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-slate-50/80 dark:bg-slate-900/60 p-4 sm:p-5 transition-colors ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Share2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Share this with your community</span>
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Empower friends and allies by passing along affirming stories and vital knowledge.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Social Links */}
          {shareTargets.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                title={item.label}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 shadow-xs transition-all active:scale-95 cursor-pointer ${item.color}`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">{item.name}</span>
              </a>
            );
          })}

          {/* Copy Link Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label={copied ? 'Link copied' : 'Copy link to clipboard'}
            title={copied ? 'Link copied' : 'Copy link to clipboard'}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
              copied
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-700 dark:text-emerald-300'
                : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          {/* Native Share button for Mobile */}
          <button
            type="button"
            onClick={handleNativeShare}
            aria-label="Open mobile sharing sheet"
            title="Open native share dialog"
            className="sm:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>More</span>
          </button>
        </div>
      </div>
    </section>
  );
};
