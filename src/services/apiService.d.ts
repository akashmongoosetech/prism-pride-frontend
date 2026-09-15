import { 
  Story, 
  Resource, 
  ResourceComment, 
  EventItem, 
  SupportGroup, 
  BlogPost, 
  CommunityDiscussion, 
  ModerationReport, 
  RecordedDonation, 
  VolunteerApplication, 
  User, 
  UserRole 
} from '../types';

export interface FormattedApiError {
  message: string;
  statusCode: number;
  errors: any;
  isNetworkError: boolean;
}

export declare function formatApiError(error: any, defaultMessage?: string): FormattedApiError;
export declare function executeApiRequest<T = any>(
  requestPromise: Promise<any>,
  options?: {
    defaultErrorMessage?: string;
    fallbackValue?: T;
    throwOnError?: boolean;
  }
): Promise<T>;

export interface ApiService {
  formatError: (error: any, defaultMessage?: string) => FormattedApiError;
  executeRequest: typeof executeApiRequest;

  stories: {
    getAll: (params?: { category?: string; status?: string }) => Promise<Story[]>;
    getById: (id: string) => Promise<Story>;
    create: (data: Partial<Story>) => Promise<Story>;
    react: (id: string, type: 'heart' | 'rainbow' | 'inspire') => Promise<Story>;
    addComment: (id: string, comment: { authorName: string; pronouns?: string; content: string; isAnonymous?: boolean }) => Promise<any>;
  };

  resources: {
    getAll: (params?: { category?: string; region?: string; type?: string }) => Promise<Resource[]>;
    getBySlug: (slug: string) => Promise<Resource>;
    getComments: (resourceId: string) => Promise<ResourceComment[]>;
    addComment: (resourceId: string, commentData: Partial<ResourceComment>) => Promise<ResourceComment>;
    toggleHelpful: (commentId: string) => Promise<{ helpfulCount: number; isHelpful: boolean }>;
  };

  events: {
    getAll: (params?: { category?: string; isPrideOfficial?: boolean; isOnline?: boolean }) => Promise<EventItem[]>;
    getById: (id: string) => Promise<EventItem>;
    rsvp: (id: string) => Promise<EventItem>;
    unrsvp: (id: string) => Promise<EventItem>;
  };

  supportGroups: {
    getAll: (params?: { category?: string; format?: string }) => Promise<SupportGroup[]>;
    getById: (id: string) => Promise<SupportGroup>;
    join: (id: string) => Promise<SupportGroup>;
    leave: (id: string) => Promise<SupportGroup>;
  };

  blog: {
    getAll: (params?: { category?: string }) => Promise<BlogPost[]>;
    getBySlug: (slug: string) => Promise<BlogPost>;
    addComment: (slug: string, comment: { authorName: string; pronouns?: string; content: string; isAnonymous?: boolean }) => Promise<any>;
  };

  community: {
    getDiscussions: (params?: { category?: string }) => Promise<CommunityDiscussion[]>;
    createDiscussion: (data: { title: string; category: string; content: string; tags?: string[] }) => Promise<CommunityDiscussion>;
    addReply: (discussionId: string, content: string) => Promise<any>;
  };

  volunteer: {
    submit: (data: Partial<VolunteerApplication>) => Promise<VolunteerApplication>;
    getAll: () => Promise<VolunteerApplication[]>;
  };

  donations: {
    record: (data: Partial<RecordedDonation>) => Promise<RecordedDonation>;
    getAll: () => Promise<RecordedDonation[]>;
  };

  newsletter: {
    subscribe: (email: string, preferences?: string[], source?: string) => Promise<{ success: boolean; message: string }>;
    getSubscribers: () => Promise<any[]>;
  };

  contact: {
    sendMessage: (data: { name: string; email: string; pronouns?: string; category?: string; message: string }) => Promise<any>;
    getMessages: () => Promise<any[]>;
  };

  search: {
    searchAll: (query: string) => Promise<{
      stories: Story[];
      resources: Resource[];
      events: EventItem[];
      groups: SupportGroup[];
      blog: BlogPost[];
      total: number;
    }>;
  };

  auth: {
    login: (email: string, password?: string) => Promise<{ user: User; token: string }>;
    logout: () => Promise<any>;
    getMe: () => Promise<User>;
    updateProfile: (updates: Partial<User>) => Promise<User>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<any>;
  };

  users: {
    list: (params?: { search?: string; role?: string; status?: string; page?: number; limit?: number }) => Promise<{
      users: User[];
      total: number;
      page: number;
      totalPages: number;
    }>;
    getById: (id: string) => Promise<User>;
    create: (userData: any) => Promise<{ user: User; temporaryPasswordGenerated?: string | null }>;
    update: (id: string, updates: Partial<User>) => Promise<User>;
    changeRole: (id: string, role: string) => Promise<User>;
    changeStatus: (id: string, status: string) => Promise<User>;
    resetPassword: (id: string, newPassword?: string) => Promise<{ temporaryPassword?: string | null }>;
    delete: (id: string) => Promise<any>;
    getAuditLogs: (params?: { page?: number; limit?: number; action?: string; userId?: string }) => Promise<{
      logs: any[];
      total: number;
      page: number;
      totalPages: number;
    }>;
  };

  admin: {
    getStats: () => Promise<any>;
    getReports: () => Promise<ModerationReport[]>;
    updateReportStatus: (id: string, status: 'pending' | 'resolved' | 'dismissed') => Promise<ModerationReport>;
    updateStoryStatus: (id: string, status: 'approved' | 'pending' | 'rejected') => Promise<Story>;
    exportAllData: () => Promise<any>;
  };

  health: {
    check: () => Promise<any>;
  };
}

export declare const apiService: ApiService;
export default apiService;
