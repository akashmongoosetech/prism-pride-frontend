import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  Story, 
  Resource, 
  ResourceComment,
  ResourceCommentReply,
  EventItem, 
  SupportGroup, 
  BlogPost, 
  Partner, 
  FAQItem, 
  CommunityDiscussion, 
  ModerationReport,
  NewsletterSubscriber,
  CommentModerationStatus,
  BlogComment
} from '../types';
import { getEstimatedReadingTime } from '../utils/readingTime';
import { 
  INITIAL_STORIES, 
  INITIAL_RESOURCES, 
  INITIAL_RESOURCE_COMMENTS,
  INITIAL_EVENTS, 
  INITIAL_SUPPORT_GROUPS, 
  INITIAL_BLOG_POSTS, 
  INITIAL_PARTNERS, 
  INITIAL_FAQS, 
  INITIAL_DISCUSSIONS, 
  INITIAL_MODERATION_REPORTS,
  INITIAL_NEWSLETTER_SUBSCRIBERS
} from '../data/mockData';
import apiService from '../services/apiService';

export interface RecordedDonation {
  id: string;
  amount: number;
  currency: string;
  frequency: 'one-time' | 'monthly';
  donorName: string;
  isAnonymous: boolean;
  dedicatedTo?: string;
  date: string;
}

export interface VolunteerApplicationSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  roleId: string;
  roleTitle: string;
  pronouns: string;
  experience: string;
  submittedAt: string;
}

interface DataContextType {
  stories: Story[];
  resources: Resource[];
  events: EventItem[];
  supportGroups: SupportGroup[];
  blogPosts: BlogPost[];
  partners: Partner[];
  faqs: FAQItem[];
  discussions: CommunityDiscussion[];
  moderationReports: ModerationReport[];
  donations: RecordedDonation[];
  volunteerApplications: VolunteerApplicationSubmission[];
  newsletterSubscribers: NewsletterSubscriber[];
  resourceComments: ResourceComment[];
  
  // Actions
  addStory: (story: Omit<Story, 'id' | 'likes' | 'reactions' | 'publishedAt' | 'comments'>) => Story;
  reactToStory: (storyId: string, reaction: 'heart' | 'rainbow' | 'inspire') => void;
  addStoryComment: (storyId: string, authorName: string, content: string, pronouns?: string, status?: CommentModerationStatus, isAnonymous?: boolean) => void;
  addBlogComment: (postId: string, authorName: string, content: string, pronouns?: string, status?: CommentModerationStatus, isAnonymous?: boolean) => void;
  addResourceComment: (commentData: Omit<ResourceComment, 'id' | 'createdAt' | 'helpfulCount' | 'helpfulUserIds' | 'replies'>) => ResourceComment;
  addResourceCommentReply: (commentId: string, replyData: Omit<ResourceCommentReply, 'id' | 'createdAt'>) => void;
  toggleResourceCommentHelpful: (commentId: string, userId: string) => boolean;
  deleteResourceComment: (commentId: string) => void;
  registerEventAttendee: (eventId: string) => void;
  cancelEventAttendee: (eventId: string) => void;
  joinSupportGroupMember: (groupId: string) => void;
  leaveSupportGroupMember: (groupId: string) => void;
  submitVolunteerApplication: (app: Omit<VolunteerApplicationSubmission, 'id' | 'submittedAt'>) => void;
  recordDonation: (donation: Omit<RecordedDonation, 'id' | 'date'>) => RecordedDonation;
  addDiscussionReply: (discussionId: string, content: string, authorName: string, pronouns: string) => void;
  approveStory: (storyId: string) => void;
  rejectStory: (storyId: string) => void;
  resolveModerationReport: (reportId: string, action: 'resolved' | 'dismissed') => void;
  subscribeNewsletter: (email: string, preferences?: string[]) => { success: boolean; message: string; alreadySubscribed?: boolean };
  unsubscribeNewsletter: (email: string) => void;
  isSubscribed: (email: string) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stories, setStories] = useState<Story[]>(() => {
    const saved = localStorage.getItem('prism_stories');
    const rawStories: Story[] = saved ? JSON.parse(saved) : INITIAL_STORIES;
    return rawStories.map((s) => ({
      ...s,
      readTime: getEstimatedReadingTime(s.content, s.readTime)
    }));
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('prism_events');
    if (!saved) return INITIAL_EVENTS;
    try {
      const parsed: EventItem[] = JSON.parse(saved);
      const existingIds = new Set(parsed.map((e) => e.id));
      const missing = INITIAL_EVENTS.filter((e) => !existingIds.has(e.id));
      return [...parsed, ...missing];
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [supportGroups, setSupportGroups] = useState<SupportGroup[]>(() => {
    const saved = localStorage.getItem('prism_support_groups');
    return saved ? JSON.parse(saved) : INITIAL_SUPPORT_GROUPS;
  });

  const [discussions, setDiscussions] = useState<CommunityDiscussion[]>(() => {
    const saved = localStorage.getItem('prism_discussions');
    return saved ? JSON.parse(saved) : INITIAL_DISCUSSIONS;
  });

  const [moderationReports, setModerationReports] = useState<ModerationReport[]>(() => {
    const saved = localStorage.getItem('prism_moderation_reports');
    return saved ? JSON.parse(saved) : INITIAL_MODERATION_REPORTS;
  });

  const [donations, setDonations] = useState<RecordedDonation[]>(() => {
    const saved = localStorage.getItem('prism_donations');
    return saved ? JSON.parse(saved) : [
      { id: 'don-1', amount: 2500, currency: '₹', frequency: 'monthly', donorName: 'Rohan & Kabir', isAnonymous: false, date: '2026-09-10' },
      { id: 'don-2', amount: 5000, currency: '₹', frequency: 'one-time', donorName: 'Anonymous Ally', isAnonymous: true, date: '2026-09-11' },
      { id: 'don-3', amount: 1000, currency: '₹', frequency: 'monthly', donorName: 'Samira Patel', isAnonymous: false, date: '2026-09-12' }
    ];
  });

  const [volunteerApplications, setVolunteerApplications] = useState<VolunteerApplicationSubmission[]>(() => {
    const saved = localStorage.getItem('prism_volunteer_apps');
    return saved ? JSON.parse(saved) : [];
  });

  const [newsletterSubscribers, setNewsletterSubscribers] = useState<NewsletterSubscriber[]>(() => {
    const saved = localStorage.getItem('prism_newsletter_subscribers');
    if (!saved) return INITIAL_NEWSLETTER_SUBSCRIBERS;
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_NEWSLETTER_SUBSCRIBERS;
    }
  });

  const [resourceComments, setResourceComments] = useState<ResourceComment[]>(() => {
    const saved = localStorage.getItem('prism_resource_comments');
    if (!saved) return INITIAL_RESOURCE_COMMENTS;
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_RESOURCE_COMMENTS;
    }
  });

  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem('prism_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('prism_blog_posts');
    const rawPosts: BlogPost[] = saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
    return rawPosts.map((b) => ({
      ...b,
      readTime: getEstimatedReadingTime(b.content, b.readTime)
    }));
  });

  // Fetch initial data from REST API in background
  useEffect(() => {
    const fetchRemoteData = async () => {
      try {
        const [remoteStories, remoteResources, remoteEvents, remoteGroups, remoteBlogs, remoteDiscussions] = await Promise.allSettled([
          apiService.stories.getAll(),
          apiService.resources.getAll(),
          apiService.events.getAll(),
          apiService.supportGroups.getAll(),
          apiService.blog.getAll(),
          apiService.community.getDiscussions()
        ]);

        if (remoteStories.status === 'fulfilled' && Array.isArray(remoteStories.value) && remoteStories.value.length > 0) {
          setStories(remoteStories.value);
        }
        if (remoteResources.status === 'fulfilled' && Array.isArray(remoteResources.value) && remoteResources.value.length > 0) {
          setResources(remoteResources.value);
        }
        if (remoteEvents.status === 'fulfilled' && Array.isArray(remoteEvents.value) && remoteEvents.value.length > 0) {
          setEvents(remoteEvents.value);
        }
        if (remoteGroups.status === 'fulfilled' && Array.isArray(remoteGroups.value) && remoteGroups.value.length > 0) {
          setSupportGroups(remoteGroups.value);
        }
        if (remoteBlogs.status === 'fulfilled' && Array.isArray(remoteBlogs.value) && remoteBlogs.value.length > 0) {
          setBlogPosts(remoteBlogs.value);
        }
        if (remoteDiscussions.status === 'fulfilled' && Array.isArray(remoteDiscussions.value) && remoteDiscussions.value.length > 0) {
          setDiscussions(remoteDiscussions.value);
        }
      } catch (e) {
        // Fallback silently
      }
    };
    fetchRemoteData();
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('prism_stories', JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem('prism_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('prism_resource_comments', JSON.stringify(resourceComments));
  }, [resourceComments]);

  useEffect(() => {
    localStorage.setItem('prism_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('prism_support_groups', JSON.stringify(supportGroups));
  }, [supportGroups]);

  useEffect(() => {
    localStorage.setItem('prism_discussions', JSON.stringify(discussions));
  }, [discussions]);

  useEffect(() => {
    localStorage.setItem('prism_moderation_reports', JSON.stringify(moderationReports));
  }, [moderationReports]);

  useEffect(() => {
    localStorage.setItem('prism_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('prism_volunteer_apps', JSON.stringify(volunteerApplications));
  }, [volunteerApplications]);

  useEffect(() => {
    localStorage.setItem('prism_newsletter_subscribers', JSON.stringify(newsletterSubscribers));
  }, [newsletterSubscribers]);

  useEffect(() => {
    try {
      localStorage.setItem('prism_blog_posts', JSON.stringify(blogPosts));
    } catch {
      // ignore storage quota errors
    }
  }, [blogPosts]);

  const addStory = (storyData: Omit<Story, 'id' | 'likes' | 'reactions' | 'publishedAt' | 'comments'>): Story => {
    const calculatedReadTime = getEstimatedReadingTime(storyData.content, storyData.readTime);
    const newStory: Story = {
      ...storyData,
      readTime: calculatedReadTime,
      id: 'story-' + Date.now(),
      publishedAt: new Date().toISOString().split('T')[0],
      likes: 1,
      reactions: { heart: 1, rainbow: 1, inspire: 0 },
      status: 'approved', // Auto-approved for preview delight, also flagged in admin queue
      comments: []
    };
    setStories(prev => [newStory, ...prev]);

    // Also add to moderation log for transparency
    const newReport: ModerationReport = {
      id: 'rep-' + Date.now(),
      contentType: 'story',
      contentId: newStory.id,
      contentTitle: newStory.title,
      reason: 'New story submission awaiting moderator check',
      reporterName: newStory.isAnonymous ? 'Anonymous' : newStory.authorName,
      reportedAt: new Date().toLocaleString(),
      status: 'pending'
    };
    setModerationReports(prev => [newReport, ...prev]);
    apiService.stories.create(newStory).catch(() => {});

    return newStory;
  };

  const reactToStory = (storyId: string, reaction: 'heart' | 'rainbow' | 'inspire') => {
    setStories(prev => prev.map(s => {
      if (s.id !== storyId) return s;
      return {
        ...s,
        likes: s.likes + 1,
        reactions: {
          ...s.reactions,
          [reaction]: s.reactions[reaction] + 1
        }
      };
    }));
    apiService.stories.react(storyId, reaction).catch(() => {});
  };

  const addStoryComment = (
    storyId: string, 
    authorName: string, 
    content: string, 
    pronouns?: string,
    status: CommentModerationStatus = 'approved',
    isAnonymous: boolean = false
  ) => {
    setStories(prev => prev.map(s => {
      if (s.id !== storyId) return s;
      return {
        ...s,
        comments: [
          ...s.comments,
          {
            id: 'c-' + Date.now(),
            authorName,
            pronouns,
            content,
            status,
            isAnonymous,
            createdAt: new Date().toISOString().split('T')[0]
          }
        ]
      };
    }));
    apiService.stories.addComment(storyId, { authorName, pronouns, content, isAnonymous }).catch(() => {});
  };

  const addBlogComment = (
    postId: string, 
    authorName: string, 
    content: string, 
    pronouns?: string,
    status: CommentModerationStatus = 'approved',
    isAnonymous: boolean = false
  ) => {
    setBlogPosts(prev => prev.map(p => {
      if (p.id !== postId && p.slug !== postId) return p;
      return {
        ...p,
        comments: [
          ...(p.comments || []),
          {
            id: 'bc-' + Date.now(),
            postId: p.id,
            authorName,
            pronouns,
            content,
            status,
            isAnonymous,
            createdAt: new Date().toISOString().split('T')[0]
          }
        ]
      };
    }));
    apiService.blog.addComment(postId, { authorName, pronouns, content, isAnonymous }).catch(() => {});
  };

  const addResourceComment = (
    commentData: Omit<ResourceComment, 'id' | 'createdAt' | 'helpfulCount' | 'helpfulUserIds' | 'replies'>
  ): ResourceComment => {
    const newComment: ResourceComment = {
      ...commentData,
      id: 'rc-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
      helpfulUserIds: [],
      replies: []
    };
    setResourceComments(prev => [newComment, ...prev]);
    apiService.resources.addComment(commentData.resourceId, newComment).catch(() => {});
    return newComment;
  };

  const addResourceCommentReply = (
    commentId: string,
    replyData: Omit<ResourceCommentReply, 'id' | 'createdAt'>
  ) => {
    setResourceComments(prev =>
      prev.map(c => {
        if (c.id !== commentId) return c;
        const newReply: ResourceCommentReply = {
          ...replyData,
          id: 'rep-' + Date.now(),
          createdAt: new Date().toISOString().split('T')[0]
        };
        return {
          ...c,
          replies: [...(c.replies || []), newReply]
        };
      })
    );
  };

  const toggleResourceCommentHelpful = (commentId: string, userId: string): boolean => {
    let isNowHelpful = false;
    setResourceComments(prev =>
      prev.map(c => {
        if (c.id !== commentId) return c;
        const userIds = c.helpfulUserIds || [];
        const alreadyVoted = userIds.includes(userId);
        isNowHelpful = !alreadyVoted;
        return {
          ...c,
          helpfulCount: alreadyVoted ? Math.max(0, c.helpfulCount - 1) : c.helpfulCount + 1,
          helpfulUserIds: alreadyVoted ? userIds.filter(id => id !== userId) : [...userIds, userId]
        };
      })
    );
    apiService.resources.toggleHelpful(commentId).catch(() => {});
    return isNowHelpful;
  };

  const deleteResourceComment = (commentId: string) => {
    setResourceComments(prev => prev.filter(c => c.id !== commentId));
  };

  const registerEventAttendee = (eventId: string) => {
    setEvents(prev => {
      const updated = prev.map(e => {
        if (e.id !== eventId) return e;
        return {
          ...e,
          attendeesCount: e.attendeesCount + 1
        };
      });
      localStorage.setItem('prism_events', JSON.stringify(updated));
      return updated;
    });
    apiService.events.rsvp(eventId).catch(() => {});
  };

  const cancelEventAttendee = (eventId: string) => {
    setEvents(prev => {
      const updated = prev.map(e => {
        if (e.id !== eventId) return e;
        return {
          ...e,
          attendeesCount: Math.max(0, e.attendeesCount - 1)
        };
      });
      localStorage.setItem('prism_events', JSON.stringify(updated));
      return updated;
    });
    apiService.events.unrsvp(eventId).catch(() => {});
  };

  const joinSupportGroupMember = (groupId: string) => {
    setSupportGroups(prev => {
      const updated = prev.map(g => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          membersCount: g.membersCount + 1
        };
      });
      localStorage.setItem('prism_support_groups', JSON.stringify(updated));
      return updated;
    });
    apiService.supportGroups.join(groupId).catch(() => {});
  };

  const leaveSupportGroupMember = (groupId: string) => {
    setSupportGroups(prev => {
      const updated = prev.map(g => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          membersCount: Math.max(0, g.membersCount - 1)
        };
      });
      localStorage.setItem('prism_support_groups', JSON.stringify(updated));
      return updated;
    });
    apiService.supportGroups.leave(groupId).catch(() => {});
  };

  const submitVolunteerApplication = (app: Omit<VolunteerApplicationSubmission, 'id' | 'submittedAt'>) => {
    const submission: VolunteerApplicationSubmission = {
      ...app,
      id: 'vapp-' + Date.now(),
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setVolunteerApplications(prev => [submission, ...prev]);
    apiService.volunteer.submit(submission).catch(() => {});
  };

  const recordDonation = (donation: Omit<RecordedDonation, 'id' | 'date'>): RecordedDonation => {
    const recorded: RecordedDonation = {
      ...donation,
      id: 'don-' + Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    setDonations(prev => [recorded, ...prev]);
    apiService.donations.record(recorded).catch(() => {});
    return recorded;
  };

  const addDiscussionReply = (discussionId: string, content: string, authorName: string, pronouns: string) => {
    setDiscussions(prev => prev.map(d => {
      if (d.id !== discussionId) return d;
      const newReply = {
        id: 'r-' + Date.now(),
        author: {
          name: authorName,
          pronouns,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        },
        content,
        createdAt: 'Just now'
      };
      return {
        ...d,
        repliesCount: d.repliesCount + 1,
        replies: [...d.replies, newReply]
      };
    }));
    apiService.community.addReply(discussionId, content).catch(() => {});
  };

  const approveStory = (storyId: string) => {
    setStories(prev => prev.map(s => s.id === storyId ? { ...s, status: 'approved' } : s));
    apiService.admin.updateStoryStatus(storyId, 'approved').catch(() => {});
  };

  const rejectStory = (storyId: string) => {
    setStories(prev => prev.map(s => s.id === storyId ? { ...s, status: 'rejected' } : s));
    apiService.admin.updateStoryStatus(storyId, 'rejected').catch(() => {});
  };

  const resolveModerationReport = (reportId: string, action: 'resolved' | 'dismissed') => {
    setModerationReports(prev => prev.map(r => r.id === reportId ? { ...r, status: action } : r));
    apiService.admin.updateReportStatus(reportId, action).catch(() => {});
  };

  const isSubscribed = (email: string): boolean => {
    const normalized = email.trim().toLowerCase();
    return newsletterSubscribers.some(
      s => s.email.toLowerCase() === normalized && s.status === 'active'
    );
  };

  const subscribeNewsletter = (
    email: string,
    preferences: string[] = ['pride-updates']
  ): { success: boolean; message: string; alreadySubscribed?: boolean } => {
    const normalized = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!normalized || !emailRegex.test(normalized)) {
      return {
        success: false,
        message: 'Please provide a valid email address.'
      };
    }

    const existingIndex = newsletterSubscribers.findIndex(
      s => s.email.toLowerCase() === normalized
    );

    if (existingIndex !== -1) {
      const existing = newsletterSubscribers[existingIndex];
      if (existing.status === 'active') {
        const mergedPrefs = Array.from(new Set([...existing.preferences, ...preferences]));
        setNewsletterSubscribers(prev =>
          prev.map((s, idx) =>
            idx === existingIndex ? { ...s, preferences: mergedPrefs } : s
          )
        );
        return {
          success: true,
          message: 'You are already receiving our Pride updates! Your topic preferences were updated.',
          alreadySubscribed: true
        };
      } else {
        setNewsletterSubscribers(prev =>
          prev.map((s, idx) =>
            idx === existingIndex
              ? {
                  ...s,
                  status: 'active',
                  preferences: preferences.length > 0 ? preferences : ['pride-updates'],
                  subscribedAt: new Date().toISOString().split('T')[0]
                }
              : s
          )
        );
        return {
          success: true,
          message: 'Welcome back! Your subscription to monthly Pride community updates is reactivated.'
        };
      }
    }

    const newSubscriber: NewsletterSubscriber = {
      id: 'sub-' + Date.now(),
      email: normalized,
      subscribedAt: new Date().toISOString().split('T')[0],
      preferences: preferences.length > 0 ? preferences : ['pride-updates'],
      status: 'active',
      source: 'footer'
    };

    setNewsletterSubscribers(prev => [newSubscriber, ...prev]);
    apiService.newsletter.subscribe(normalized, preferences).catch(() => {});
    return {
      success: true,
      message: 'Thank you for subscribing to monthly Pride & community updates!'
    };
  };

  const unsubscribeNewsletter = (email: string) => {
    const normalized = email.trim().toLowerCase();
    setNewsletterSubscribers(prev =>
      prev.map(s => (s.email.toLowerCase() === normalized ? { ...s, status: 'unsubscribed' } : s))
    );
  };

  return (
    <DataContext.Provider
      value={{
        stories,
        resources,
        events,
        supportGroups,
        blogPosts,
        partners: INITIAL_PARTNERS,
        faqs: INITIAL_FAQS,
        discussions,
        moderationReports,
        donations,
        volunteerApplications,
        newsletterSubscribers,
        resourceComments,
        addStory,
        reactToStory,
        addStoryComment,
        addBlogComment,
        addResourceComment,
        addResourceCommentReply,
        toggleResourceCommentHelpful,
        deleteResourceComment,
        registerEventAttendee,
        cancelEventAttendee,
        joinSupportGroupMember,
        leaveSupportGroupMember,
        submitVolunteerApplication,
        recordDonation,
        addDiscussionReply,
        approveStory,
        rejectStory,
        resolveModerationReport,
        subscribeNewsletter,
        unsubscribeNewsletter,
        isSubscribed
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
