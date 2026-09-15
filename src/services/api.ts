import apiClient, { apiRequest, ApiError, API_BASE_URL } from './apiClient';
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

export { apiClient, apiRequest, ApiError, API_BASE_URL };
export { default as apiService } from './apiService';

export const authApi = {
  async register(data: { name: string; email: string; password: string; pronouns?: string; bio?: string; city?: string; isAnonymous?: boolean }) {
    return apiRequest<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      data
    });
  },

  async login(email: string, password?: string, role?: UserRole) {
    return apiRequest<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      data: { email, password, role }
    });
  },

  async getMe() {
    return apiRequest<User>('/auth/me');
  },

  async updateProfile(updates: Partial<User>) {
    return apiRequest<User>('/auth/profile', {
      method: 'PATCH',
      data: updates
    });
  }
};

export const storiesApi = {
  async getAll(params?: { category?: string; status?: string }) {
    return apiRequest<Story[]>('/stories', {
      params
    });
  },

  async getById(id: string) {
    return apiRequest<Story>(`/stories/${id}`);
  },

  async create(data: Partial<Story>) {
    return apiRequest<Story>('/stories', {
      method: 'POST',
      data
    });
  },

  async react(id: string, type: 'heart' | 'rainbow' | 'inspire') {
    return apiRequest<Story>(`/stories/${id}/react`, {
      method: 'POST',
      data: { type }
    });
  },

  async addComment(id: string, comment: { authorName: string; pronouns?: string; content: string; isAnonymous?: boolean }) {
    return apiRequest<any>(`/stories/${id}/comments`, {
      method: 'POST',
      data: comment
    });
  }
};

export const resourcesApi = {
  async getAll(params?: { category?: string; region?: string; type?: string }) {
    return apiRequest<Resource[]>('/resources', {
      params
    });
  },

  async getBySlug(slug: string) {
    return apiRequest<Resource>(`/resources/${slug}`);
  },

  async getComments(resourceId: string) {
    return apiRequest<ResourceComment[]>(`/resources/${resourceId}/comments`);
  },

  async addComment(resourceId: string, commentData: Partial<ResourceComment>) {
    return apiRequest<ResourceComment>(`/resources/${resourceId}/comments`, {
      method: 'POST',
      data: commentData
    });
  },

  async toggleHelpful(commentId: string) {
    return apiRequest<{ helpfulCount: number; isHelpful: boolean }>(`/resources/comments/${commentId}/helpful`, {
      method: 'POST'
    });
  }
};

export const eventsApi = {
  async getAll(params?: { category?: string; isPrideOfficial?: boolean; isOnline?: boolean }) {
    return apiRequest<EventItem[]>('/events', {
      params
    });
  },

  async getById(id: string) {
    return apiRequest<EventItem>(`/events/${id}`);
  },

  async rsvp(id: string) {
    return apiRequest<EventItem>(`/events/${id}/rsvp`, {
      method: 'POST'
    });
  }
};

export const supportGroupsApi = {
  async getAll(params?: { category?: string; format?: string }) {
    return apiRequest<SupportGroup[]>('/support-groups', {
      params
    });
  },

  async getById(id: string) {
    return apiRequest<SupportGroup>(`/support-groups/${id}`);
  },

  async join(id: string) {
    return apiRequest<SupportGroup>(`/support-groups/${id}/join`, {
      method: 'POST'
    });
  }
};

export const blogApi = {
  async getAll(params?: { category?: string }) {
    return apiRequest<BlogPost[]>('/blog', {
      params
    });
  },

  async getBySlug(slug: string) {
    return apiRequest<BlogPost>(`/blog/${slug}`);
  },

  async addComment(slug: string, comment: { authorName: string; pronouns?: string; content: string; isAnonymous?: boolean }) {
    return apiRequest<any>(`/blog/${slug}/comments`, {
      method: 'POST',
      data: comment
    });
  }
};

export const communityApi = {
  async getDiscussions(params?: { category?: string }) {
    return apiRequest<CommunityDiscussion[]>('/community/discussions', {
      params
    });
  },

  async createDiscussion(data: { title: string; category: string; content: string; tags?: string[] }) {
    return apiRequest<CommunityDiscussion>('/community/discussions', {
      method: 'POST',
      data
    });
  },

  async addReply(discussionId: string, content: string) {
    return apiRequest<any>(`/community/discussions/${discussionId}/replies`, {
      method: 'POST',
      data: { content }
    });
  }
};

export const volunteerApi = {
  async submit(data: Partial<VolunteerApplication>) {
    return apiRequest<VolunteerApplication>('/volunteer/apply', {
      method: 'POST',
      data
    });
  },

  async getAll() {
    return apiRequest<VolunteerApplication[]>('/volunteer/applications');
  }
};

export const donationsApi = {
  async record(data: Partial<RecordedDonation>) {
    return apiRequest<RecordedDonation>('/donations/record', {
      method: 'POST',
      data
    });
  },

  async getAll() {
    return apiRequest<RecordedDonation[]>('/donations');
  }
};

export const newsletterApi = {
  async subscribe(email: string, preferences?: string[], source?: string) {
    return apiRequest('/newsletter/subscribe', {
      method: 'POST',
      data: { email, preferences, source }
    });
  },

  async getSubscribers() {
    return apiRequest<any[]>('/newsletter/subscribers');
  }
};

export const contactApi = {
  async sendMessage(data: { name: string; email: string; pronouns?: string; category?: string; message: string }) {
    return apiRequest('/contact', {
      method: 'POST',
      data
    });
  },

  async getMessages() {
    return apiRequest<any[]>('/contact');
  }
};

export const adminApi = {
  async getStats() {
    return apiRequest<any>('/admin/stats');
  },

  async getReports() {
    return apiRequest<ModerationReport[]>('/admin/reports');
  },

  async updateReportStatus(id: string, status: 'pending' | 'resolved' | 'dismissed') {
    return apiRequest<ModerationReport>(`/admin/reports/${id}`, {
      method: 'PATCH',
      data: { status }
    });
  },

  async updateStoryStatus(id: string, status: 'approved' | 'pending' | 'rejected') {
    return apiRequest<Story>(`/admin/stories/${id}`, {
      method: 'PATCH',
      data: { status }
    });
  },

  async exportAllData() {
    return apiRequest<any>('/admin/export');
  }
};

export const searchApi = {
  async search(query: string) {
    return apiRequest<{
      stories: Story[];
      resources: Resource[];
      events: EventItem[];
      groups: SupportGroup[];
      blog: BlogPost[];
      total: number;
    }>('/search', {
      params: { q: query }
    });
  }
};

export const healthApi = {
  async checkHealth() {
    return apiRequest<{
      status: string;
      timestamp: string;
      service: string;
      database: { connected: boolean; type: string };
    }>('/health');
  }
};
