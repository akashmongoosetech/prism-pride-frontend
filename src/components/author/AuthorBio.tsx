import React from 'react';
import { User, Heart, Sparkles, ExternalLink, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface AuthorBioProps {
  name: string;
  role?: string;
  avatar?: string;
  pronouns?: string;
  bio?: string;
  isAnonymous?: boolean;
  socialLink?: string;
  type?: 'blog' | 'story';
  className?: string;
}

export const AuthorBio: React.FC<AuthorBioProps> = ({
  name,
  role = 'Community Contributor',
  avatar,
  pronouns,
  bio,
  isAnonymous = false,
  socialLink,
  type = 'blog',
  className = ''
}) => {
  // Determine fallback bio if none provided
  const resolvedBio = bio || (
    isAnonymous
      ? 'This story was shared anonymously to provide safety, dignity, and honest representation. Prism honors every storyteller’s choice in sharing their authentic path.'
      : type === 'story'
      ? `${name} is a valued member of the Prism community, sharing authentic lived experiences to foster empathy, connection, and pride.`
      : `${name} is an active contributor to Prism, writing educational guides and cultural perspectives to empower the LGBTQIA+ community and our allies.`
  );

  const initials = name
    ? name
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'PR';

  return (
    <section
      id="author-bio-section"
      aria-labelledby="author-bio-heading"
      className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 md:p-8 shadow-sm transition-all ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 md:gap-6">
        {/* Avatar */}
        <div className="relative shrink-0">
          {isAnonymous ? (
            <div 
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 p-0.5 flex items-center justify-center shadow-md"
              aria-hidden="true"
            >
              <div className="w-full h-full rounded-[14px] bg-white dark:bg-slate-900 flex items-center justify-center">
                <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          ) : avatar ? (
            <img
              src={avatar}
              alt={`${name}'s avatar`}
              referrerPolicy="no-referrer"
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover ring-2 ring-purple-500/30 shadow-md"
            />
          ) : (
            <div 
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-md"
              aria-hidden="true"
            >
              {initials}
            </div>
          )}
        </div>

        {/* Info & Content */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2
              id="author-bio-heading"
              className="text-lg md:text-xl font-bold text-slate-900 dark:text-white"
            >
              {isAnonymous ? 'Anonymous Storyteller' : name}
            </h2>

            {pronouns && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60">
                {pronouns}
              </span>
            )}

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {isAnonymous ? (
                <>
                  <Shield className="w-3 h-3 text-purple-500" aria-hidden="true" />
                  <span>Protected Voice</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-pink-500" aria-hidden="true" />
                  <span>{role}</span>
                </>
              )}
            </span>
          </div>

          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {resolvedBio}
          </p>

          {/* Action Links */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs md:text-sm font-medium">
            {type === 'story' ? (
              <Link
                to="/stories"
                className="inline-flex items-center gap-1.5 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
              >
                <span>Read more community stories</span>
                <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
              >
                <span>Explore all articles</span>
                <span aria-hidden="true">→</span>
              </Link>
            )}

            {socialLink && (
              <a
                href={socialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
                aria-label={`Connect with ${name} (opens in new tab)`}
              >
                <span>Connect</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
