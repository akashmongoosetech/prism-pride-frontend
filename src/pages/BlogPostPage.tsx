import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useData } from '../context/DataContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ReadingTimeIndicator } from '../components/ui/ReadingTimeIndicator';
import { ReadingProgressHeader } from '../components/reading/ReadingProgressHeader';
import { ArticleSkeleton } from '../components/ui/ArticleSkeleton';
import { SocialShareBar } from '../components/social/SocialShareBar';
import { RecommendedForYou } from '../components/content/RecommendedForYou';
import { AuthorBio } from '../components/author/AuthorBio';
import { CommentsSection } from '../components/comments/CommentsSection';
import { NewsletterSubscription } from '../components/newsletter/NewsletterSubscription';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blogPosts } = useData();
  const [isLoading, setIsLoading] = useState(true);

  const post = blogPosts.find((p) => p.slug === slug);
  const articleRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    if (post) {
      document.title = `${post.title} • Prism Magazine`;
      window.scrollTo(0, 0);
    }

    return () => clearTimeout(timer);
  }, [slug, post]);

  if (isLoading) {
    return <ArticleSkeleton variant="blog" />;
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Article Not Found</h2>
        <p className="text-slate-500 text-sm">We could not locate this article in our archives.</p>
        <Link to="/blog">
          <Button variant="primary">Return to Magazine</Button>
        </Link>
      </div>
    );
  }

  const authorName = typeof post.author === 'object' && post.author ? post.author.name : String(post.author || 'Prism Editorial Team');
  const authorRole = typeof post.author === 'object' && post.author ? post.author.role : (post.authorRole || 'Contributor');
  const authorPronouns = typeof post.author === 'object' && post.author ? post.author.pronouns : post.authorPronouns;
  const authorAvatar = typeof post.author === 'object' && post.author ? post.author.avatar : post.authorAvatar;
  const authorBio = typeof post.author === 'object' && post.author ? post.author.bio : post.authorBio;
  const authorSocial = post.socialLink;

  return (
    <article ref={articleRef} id="blog-post" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Magazine', url: '/blog' },
          { label: post.title }
        ]}
      />

      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Articles</span>
      </Link>

      {/* Top Reading Progress Bar & Dynamic Time to Read Indicator (Targeted to actual reading content) */}
      <ReadingProgressHeader
        title={post.title}
        category={post.category}
        content={post.content}
        fallbackReadTime={post.readTime}
        targetRef={contentRef}
        author={authorName}
      />

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge variant="purple">{post.category}</Badge>
          <span className="text-slate-400">•</span>
          <ReadingTimeIndicator content={post.content} readTime={post.readTime} />
          <span className="text-slate-400">•</span>
          <span className="text-slate-500 dark:text-slate-400">Published {post.publishedAt}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-y border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2.5">
            {authorAvatar && (
              <img
                src={authorAvatar}
                alt={authorName}
                className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
            )}
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200 block">
                Written by {authorName} {authorPronouns && <span className="font-normal text-slate-400">({authorPronouns})</span>}
              </span>
              {authorRole && <span className="text-[11px] text-slate-500">{authorRole}</span>}
            </div>
          </div>

          {/* Compact Social Sharing Bar in Header */}
          <SocialShareBar
            title={post.title}
            description={post.excerpt}
            variant="compact"
          />
        </div>
      </div>

      {/* Hero Image */}
      <div className="rounded-3xl overflow-hidden shadow-md max-h-[400px]">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Actual Article Reading Content Body */}
      <div
        ref={contentRef}
        id="article-reading-body"
        className="prose prose-slate dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300 space-y-5"
      >
        {post.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Educational & Healthcare Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Informational &amp; Community Disclaimer:</strong>
          <p className="mt-0.5 leading-relaxed">
            This educational piece is produced for general community well-being. It should not be used in place of individual clinical therapy, psychiatric evaluation, or medical consultation.
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="pt-2 flex flex-wrap gap-1.5">
        <span className="text-xs text-slate-400 mr-1">Topics:</span>
        {post.tags.map((t, i) => (
          <span
            key={i}
            className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            #{t}
          </span>
        ))}
      </div>

      {/* Full Social Sharing Section at Bottom of Post */}
      <SocialShareBar
        title={post.title}
        description={post.excerpt}
        variant="full"
      />

      {/* Author Bio Component */}
      <AuthorBio
        name={authorName}
        role={authorRole}
        avatar={authorAvatar || undefined}
        pronouns={authorPronouns || undefined}
        bio={authorBio}
        socialLink={authorSocial}
        type="blog"
      />

      {/* Moderated Comments Section */}
      <CommentsSection
        contentId={post.id}
        type="blog"
        comments={post.comments || []}
      />

      {/* Recommended for You Section */}
      <RecommendedForYou
        type="blog"
        currentId={post.id}
        currentCategory={post.category}
        currentTags={post.tags}
      />

      {/* Newsletter Subscription Section */}
      <NewsletterSubscription
        sourceContext="blog"
        heading="Subscribe to the Prism Editorial Digest"
        description="Stay informed with thoughtful explorations, health advocacy, queer history, and community resources delivered straight to your inbox."
      />
    </article>
  );
};
