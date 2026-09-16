export type UserRole = 
  | 'ADMIN' 
  | 'SUB_ADMIN' 
  | 'MANAGER' 
  | 'EMPLOYEE' 
  | 'VOLUNTEER' 
  | 'MEMBER'
  | 'admin'
  | 'moderator'
  | 'member'
  | 'volunteer';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  pronouns: string;
  role: UserRole;
  status?: UserStatus;
  permissions?: string[];
  bio?: string;
  city?: string;
  createdBy?: string;
  updatedBy?: string | null;
  lastLoginAt?: string | null;
  bookmarks: string[]; // resource or story IDs
  registeredEvents: string[]; // event IDs
  joinedSupportGroups: string[]; // group IDs
  createdAt: string;
  bookmarkedStoryIds?: string[];
  bookmarkedResourceIds?: string[];
  rsvpEventIds?: string[];
  joinedGroupIds?: string[];
  joinedDate?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  userRole: string;
  action: string;
  targetUserId?: string | null;
  targetUserEmail?: string | null;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface StoryReaction {
  heart: number;
  rainbow: number;
  inspire: number;
}

export type CommentModerationStatus = 'approved' | 'pending' | 'rejected';

export interface StoryComment {
  id: string;
  authorName: string;
  pronouns?: string;
  content: string;
  createdAt: string;
  status?: CommentModerationStatus;
  isAnonymous?: boolean;
  avatar?: string;
}

export interface BlogComment {
  id: string;
  postId: string;
  authorName: string;
  pronouns?: string;
  content: string;
  createdAt: string;
  status?: CommentModerationStatus;
  isAnonymous?: boolean;
  avatar?: string;
}

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  authorName: string;
  isAnonymous: boolean;
  authorPronouns?: string;
  authorAvatar?: string;
  authorBio?: string;
  authorRole?: string;
  category: 'Coming Out' | 'Identity' | 'Family' | 'Love' | 'Transition' | 'Mental Wellness' | 'Pride' | 'Advocacy' | 'Community';
  tags: string[];
  coverImage: string;
  readTime: string;
  publishedAt: string;
  likes: number;
  reactions: StoryReaction;
  status: 'approved' | 'pending' | 'rejected';
  featured?: boolean;
  comments: StoryComment[];
}

export type ResourceCategory = 
  | 'mental-health' 
  | 'sexual-health' 
  | 'youth' 
  | 'trans-support' 
  | 'coming-out' 
  | 'family-parents' 
  | 'housing' 
  | 'legal' 
  | 'workplace' 
  | 'safety' 
  | 'crisis';

export interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullContent?: string;
  category: ResourceCategory;
  type: 'Crisis Helpline' | 'Health Service' | 'Legal Aid' | 'Support Guide' | 'Community Space' | 'Housing Network';
  phone?: string;
  hours?: string;
  websiteUrl?: string;
  address?: string;
  region: string;
  verified: boolean;
  emergencyPriority?: boolean;
  tags: string[];
}

export type ResourceCommentType = 'experience' | 'question' | 'tip';

export interface ResourceCommentReply {
  id: string;
  authorId: string;
  authorName: string;
  authorPronouns?: string;
  authorAvatar?: string;
  authorRole?: string;
  isAnonymous?: boolean;
  content: string;
  createdAt: string;
}

export interface ResourceComment {
  id: string;
  resourceId: string;
  authorId: string;
  authorName: string;
  authorEmail?: string;
  authorPronouns?: string;
  authorAvatar?: string;
  authorRole?: string;
  isAnonymous?: boolean;
  commentType: ResourceCommentType;
  content: string;
  createdAt: string;
  helpfulCount: number;
  helpfulUserIds?: string[];
  tags?: string[];
  replies?: ResourceCommentReply[];
}

export type EventCategory = 
  | 'Pride' 
  | 'Community' 
  | 'Support' 
  | 'Workshop' 
  | 'Social' 
  | 'Advocacy' 
  | 'Health'
  | 'Arts & Culture';

export interface EventItem {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  date: string;
  time: string;
  isOnline: boolean;
  isVirtual?: boolean;
  location: string;
  virtualLink?: string;
  organizer: string;
  image: string;
  capacity: number;
  attendeesCount: number;
  tags: string[];
  featured?: boolean;
  isPrideOfficial?: boolean;
  scheduleHighlights?: string[];
  isFree?: boolean;
  city?: string;
}

export type SupportGroupCategory = 
  | 'Youth' 
  | 'Trans & Nonbinary' 
  | 'Parents & Families' 
  | 'Mental Wellness' 
  | 'Coming Out' 
  | 'Seniors' 
  | 'Grief & Healing' 
  | 'General';

export interface SupportGroup {
  id: string;
  name: string;
  description: string;
  category: SupportGroupCategory;
  meetingFormat: 'Online' | 'In-Person' | 'Hybrid';
  schedule: string;
  location: string;
  ageRange: string;
  facilitator: {
    name: string;
    credentials: string;
    avatar: string;
  } | string;
  confidentialityLevel: 'High - Anonymous Screen Names Allowed' | 'Standard Safe Space Agreement';
  isAcceptingNewMembers: boolean;
  guidelines: string[];
  membersCount: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    pronouns: string;
    bio?: string;
    socialLink?: string;
  } | string;
  authorRole?: string;
  authorPronouns?: string;
  authorAvatar?: string;
  authorBio?: string;
  socialLink?: string;
  publishedAt: string;
  readTime: string;
  category: 'LGBTQIA+ Education' | 'Pride' | 'Health & Wellness' | 'Community' | 'Advocacy' | 'Coming Out';
  coverImage: string;
  tags: string[];
  featured?: boolean;
  comments?: BlogComment[];
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  category: 'Healthcare' | 'Legal Aid' | 'Education' | 'Advocacy' | 'Youth Services' | 'Corporate Ally';
  description: string;
  websiteUrl: string;
  partnershipSince: string;
  impactMetrics: string;
  region?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Community' | 'Support Groups' | 'Events' | 'Safety' | 'Donations' | 'Volunteering';
}

export interface VolunteerRole {
  id: string;
  title: string;
  department: string;
  commitment: string;
  location: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export interface CommunityDiscussion {
  id: string;
  title: string;
  category: string;
  author: {
    name: string;
    pronouns: string;
    avatar: string;
  };
  createdAt: string;
  content: string;
  repliesCount: number;
  likesCount: number;
  pinned?: boolean;
  isPinned?: boolean;
  tags?: string[];
  lastActivity?: string;
  replies: {
    id: string;
    author: {
      name: string;
      pronouns: string;
      avatar: string;
    };
    content: string;
    createdAt: string;
  }[];
}

export interface ModerationReport {
  id: string;
  contentType: 'story' | 'comment' | 'discussion';
  contentId: string;
  contentTitle: string;
  reason: string;
  reporterName: string;
  reportedAt: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  preferences: string[];
  status: 'active' | 'unsubscribed';
  source?: string;
}

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

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  roleId: string;
  roleTitle: string;
  pronouns: string;
  experience: string;
  submittedAt: string;
  status?: 'pending' | 'reviewed' | 'accepted' | 'contacted';
}
