import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ResourceBookmarkButton } from '../components/resources/ResourceBookmarkButton';
import { ResourceCommunityComments } from '../components/resources/ResourceCommunityComments';
import { 
  PhoneCall, 
  Globe, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowLeft, 
  ExternalLink,
  Share2,
  ArrowRight,
  Sparkles,
  Tag,
  Bookmark,
  UserCheck,
  MessageSquare
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ResourceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { resources, resourceComments } = useData();
  const { user, isBookmarked } = useAuth();
  const { addToast } = useToast();

  const resource = resources.find((r) => r.slug === slug);
  const isSaved = resource && user ? isBookmarked(resource.id) : false;
  const commentsCount = resource ? resourceComments.filter((c) => c.resourceId === resource.id).length : 0;

  useEffect(() => {
    if (resource) {
      document.title = `${resource.title} • Prism Resources`;
      window.scrollTo(0, 0);
    }
  }, [resource]);

  if (!resource) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Resource Not Found</h2>
        <p className="text-slate-500 text-sm">We could not find the requested resource guide.</p>
        <Link to="/resources">
          <Button variant="primary">Return to Resource Directory</Button>
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      type: 'info',
      title: 'Resource Link Copied',
      message: 'You can now share this resource link with someone in need.'
    });
  };

  // Suggest 3 other resources based on similar tags or categories from DataContext
  const relatedResources = useMemo(() => {
    if (!resource) return [];

    const currentTags = (resource.tags || []).map((t) => t.toLowerCase());

    const scored = resources
      .filter((r) => r.id !== resource.id)
      .map((r) => {
        let score = 0;
        const matchingTags: string[] = [];

        // Category match: strong relevance (+3 points)
        if (r.category === resource.category) {
          score += 3;
        }

        // Shared tags: high relevance (+2 points per shared tag)
        (r.tags || []).forEach((t) => {
          if (currentTags.includes(t.toLowerCase())) {
            score += 2;
            matchingTags.push(t);
          }
        });

        // Same type: bonus relevance (+1 point)
        if (r.type === resource.type) {
          score += 1;
        }

        // Emergency priority alignment (+1 point)
        if (resource.emergencyPriority && r.emergencyPriority) {
          score += 1;
        }

        return {
          item: r,
          score,
          matchingTags
        };
      });

    // Sort by relevance score descending
    scored.sort((a, b) => b.score - a.score);

    // Pick top 3 recommendations
    return scored.slice(0, 3);
  }, [resources, resource]);

  return (
    <div id="resource-detail" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Resources', url: '/resources' },
          { label: resource.title }
        ]}
      />

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Link
          to="/resources"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Resources Directory</span>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href="#community-comments"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Jump to Community Comments & Questions"
          >
            <MessageSquare className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Community ({commentsCount})</span>
          </a>
          <ResourceBookmarkButton
            resourceId={resource.id}
            resourceTitle={resource.title}
            variant="button"
          />
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </div>

      {/* Saved in Profile Banner */}
      {user && isSaved && (
        <div id="saved-in-profile-banner" className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 text-xs sm:text-sm shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-amber-500 text-white shrink-0">
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </span>
            <span className="text-xs sm:text-sm">
              <strong className="font-bold">Saved to your Profile:</strong> This resource guide is saved to your Sanctuary profile for quick reference.
            </span>
          </div>
          <Link
            to="/profile"
            className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0 text-xs ml-2"
          >
            <span>View in Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={resource.emergencyPriority ? 'danger' : 'info'}>
            {resource.type}
          </Badge>
          <Badge variant="default">{resource.region}</Badge>
          {resource.verified && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Organization</span>
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {resource.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {resource.description}
        </p>

        {/* Action / Contact & Sanctuary Bookmark Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          {resource.phone && (
            <a
              href={`tel:${resource.phone}`}
              className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-100 hover:bg-rose-100 transition-colors group"
            >
              <div className="p-2.5 rounded-xl bg-rose-500 text-white shrink-0 shadow-xs">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] uppercase font-bold text-rose-600 dark:text-rose-400 tracking-wider">
                  Call Hotline / Line
                </span>
                <p className="text-base font-extrabold group-hover:underline truncate">{resource.phone}</p>
              </div>
            </a>
          )}

          {resource.websiteUrl && (
            <a
              href={resource.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-indigo-900 dark:text-indigo-100 hover:bg-indigo-100 transition-colors group"
            >
              <div className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0 shadow-xs">
                <Globe className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                  Official Website
                </span>
                <p className="text-sm font-extrabold truncate flex items-center gap-1">
                  <span>Visit Organization</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </p>
              </div>
            </a>
          )}

          {/* Bookmark & Sanctuary Profile Status Card */}
          <div
            id="resource-bookmark-card"
            className={`flex items-center justify-between gap-3 p-4 rounded-2xl border transition-all ${
              isSaved
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-100 shadow-xs'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`p-2.5 rounded-xl shrink-0 ${
                  isSaved
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                  Sanctuary Profile
                </span>
                <p className="text-sm font-bold truncate">
                  {isSaved ? 'Saved in Profile' : 'Save for Later'}
                </p>
                {isSaved && user ? (
                  <Link
                    to="/profile"
                    className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-0.5"
                  >
                    <span>View in Sanctuary</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </Link>
                ) : (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {user ? 'Quick access in profile' : 'Sign in to bookmark'}
                  </p>
                )}
              </div>
            </div>
            <ResourceBookmarkButton
              resourceId={resource.id}
              resourceTitle={resource.title}
              variant="pill"
            />
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          About This Resource &amp; Access Guide
        </h2>

        {resource.fullContent ? (
          <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 space-y-4">
            {resource.fullContent.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        ) : (
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            {resource.description}
          </p>
        )}

        {/* Operating Hours & Address */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-400">
          {resource.hours && (
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong>Availability:</strong>
                <p className="text-slate-800 dark:text-slate-200 mt-0.5">{resource.hours}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <strong>Service Region:</strong>
              <p className="text-slate-800 dark:text-slate-200 mt-0.5">{resource.region}</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="pt-4 flex flex-wrap items-center gap-1.5 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-400 mr-1">Tags:</span>
          {resource.tags.map((t, idx) => (
            <span
              key={idx}
              className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Share / Save Ribbon */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="space-y-0.5 text-center sm:text-left">
          <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
            <Bookmark className={`w-4 h-4 ${isSaved ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
            <span>Save to Sanctuary Profile or Share</span>
          </p>
          <p className="text-xs text-slate-500">
            {isSaved
              ? 'This guide is saved in your Sanctuary profile. You can access it anytime offline or share it with a friend.'
              : 'Keep this verified resource handy in your Sanctuary profile or share it with a friend in need.'}
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap justify-center">
          <ResourceBookmarkButton
            resourceId={resource.id}
            resourceTitle={resource.title}
            variant="button"
          />
          {user && isSaved && (
            <Link
              to="/profile"
              className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-xs"
            >
              <span>View in Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4" />
            <span>Copy Link</span>
          </Button>
        </div>
      </div>

      {/* Community Comments & Questions Section */}
      <ResourceCommunityComments resource={resource} />

      {/* Related Resources */}
      {relatedResources.length > 0 && (
        <div id="related-resources-section" className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Related Resources</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Suggested Community Guides
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Recommended based on shared tags and {resource.category.replace('-', ' ')} support topics.
              </p>
            </div>
            <Link
              to={`/resources?category=${resource.category}`}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-1 group shrink-0"
            >
              <span>Explore more in this category</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedResources.map(({ item: rel, matchingTags }) => (
              <div
                key={rel.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all flex flex-col justify-between group relative space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge variant={rel.emergencyPriority ? 'danger' : 'info'}>
                        {rel.type}
                      </Badge>
                      <span className="text-[10px] text-slate-400">{rel.region}</span>
                    </div>
                    <ResourceBookmarkButton
                      resourceId={rel.id}
                      resourceTitle={rel.title}
                      size="sm"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                      <Link to={`/resources/${rel.slug}`} className="hover:underline">
                        {rel.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mt-1">
                      {rel.description}
                    </p>
                  </div>

                  {/* Shared or Highlighted Tags */}
                  {rel.tags && rel.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {rel.tags.slice(0, 3).map((t, idx) => {
                        const isMatched = matchingTags.includes(t);
                        return (
                          <span
                            key={idx}
                            className={`text-[10px] px-2 py-0.5 rounded-md font-medium inline-flex items-center gap-1 ${
                              isMatched
                                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {isMatched && <Tag className="w-2.5 h-2.5" />}
                            <span>{t}</span>
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  {rel.phone ? (
                    <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 truncate max-w-[120px]">
                      {rel.phone}
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400">Verified Guide</span>
                  )}
                  <Link
                    to={`/resources/${rel.slug}`}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Guide</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
