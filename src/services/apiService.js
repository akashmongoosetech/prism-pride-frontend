import apiClient, { ApiError } from '../lib/api';

/**
 * Standardized error formatter and handler
 */
export function formatApiError(error, defaultMessage = 'An unexpected error occurred') {
  if (!error) {
    return {
      message: defaultMessage,
      statusCode: 500,
      errors: null,
      isNetworkError: false
    };
  }

  const statusCode = error.statusCode || error.response?.status || 0;
  const isNetworkError = statusCode === 0;
  const message =
    error.message ||
    error.response?.data?.message ||
    error.response?.data?.error ||
    defaultMessage;
  const errors = error.errors || error.response?.data?.errors || null;

  return {
    message,
    statusCode,
    errors,
    isNetworkError
  };
}

/**
 * Standardized API execution helper that safely unwraps responses and handles errors
 */
export async function executeApiRequest(requestPromise, options = {}) {
  const { defaultErrorMessage = 'Operation failed', fallbackValue = null, throwOnError = true } = options;
  try {
    const response = await requestPromise;
    // Extract standardized { data: ... } structure if returned by backend
    if (response && response.data !== undefined) {
      if (response.data && response.data.data !== undefined) {
        return response.data.data;
      }
      return response.data;
    }
    return response;
  } catch (error) {
    const formatted = formatApiError(error, defaultErrorMessage);
    console.error(`[apiService] ${defaultErrorMessage}:`, formatted);
    if (throwOnError) {
      const err = new ApiError(formatted.message, formatted.statusCode, formatted.errors);
      throw err;
    }
    return fallbackValue;
  }
}

/**
 * Centralized API service for all entity-based requests
 */
export const apiService = {
  // Error handling utilities
  formatError: formatApiError,
  executeRequest: executeApiRequest,

  // Stories Service
  stories: {
    async getAll(params = {}) {
      return executeApiRequest(apiClient.get('/stories', { params }), {
        defaultErrorMessage: 'Failed to fetch stories',
        fallbackValue: []
      });
    },

    async getById(id) {
      return executeApiRequest(apiClient.get(`/stories/${id}`), {
        defaultErrorMessage: `Failed to fetch story ${id}`
      });
    },

    async create(storyData) {
      return executeApiRequest(apiClient.post('/stories', storyData), {
        defaultErrorMessage: 'Failed to create story'
      });
    },

    async react(id, type) {
      return executeApiRequest(apiClient.post(`/stories/${id}/react`, { type }), {
        defaultErrorMessage: 'Failed to react to story'
      });
    },

    async addComment(id, comment) {
      return executeApiRequest(apiClient.post(`/stories/${id}/comments`, comment), {
        defaultErrorMessage: 'Failed to add comment to story'
      });
    }
  },

  // Resources Service
  resources: {
    async getAll(params = {}) {
      return executeApiRequest(apiClient.get('/resources', { params }), {
        defaultErrorMessage: 'Failed to fetch community resources',
        fallbackValue: []
      });
    },

    async getBySlug(slug) {
      return executeApiRequest(apiClient.get(`/resources/${slug}`), {
        defaultErrorMessage: `Failed to fetch resource ${slug}`
      });
    },

    async getComments(resourceId) {
      return executeApiRequest(apiClient.get(`/resources/${resourceId}/comments`), {
        defaultErrorMessage: 'Failed to fetch resource comments',
        fallbackValue: []
      });
    },

    async addComment(resourceId, commentData) {
      return executeApiRequest(apiClient.post(`/resources/${resourceId}/comments`, commentData), {
        defaultErrorMessage: 'Failed to submit resource comment'
      });
    },

    async toggleHelpful(commentId) {
      return executeApiRequest(apiClient.post(`/resources/comments/${commentId}/helpful`), {
        defaultErrorMessage: 'Failed to update helpful feedback'
      });
    }
  },

  // Events Service
  events: {
    async getAll(params = {}) {
      return executeApiRequest(apiClient.get('/events', { params }), {
        defaultErrorMessage: 'Failed to fetch events',
        fallbackValue: []
      });
    },

    async getById(id) {
      return executeApiRequest(apiClient.get(`/events/${id}`), {
        defaultErrorMessage: `Failed to fetch event ${id}`
      });
    },

    async rsvp(id) {
      return executeApiRequest(apiClient.post(`/events/${id}/rsvp`), {
        defaultErrorMessage: 'Failed to RSVP for event'
      });
    },

    async unrsvp(id) {
      return executeApiRequest(apiClient.post(`/events/${id}/unrsvp`), {
        defaultErrorMessage: 'Failed to cancel RSVP for event'
      });
    }
  },

  // Support Groups Service
  supportGroups: {
    async getAll(params = {}) {
      return executeApiRequest(apiClient.get('/support-groups', { params }), {
        defaultErrorMessage: 'Failed to fetch support groups',
        fallbackValue: []
      });
    },

    async getById(id) {
      return executeApiRequest(apiClient.get(`/support-groups/${id}`), {
        defaultErrorMessage: `Failed to fetch support group ${id}`
      });
    },

    async join(id) {
      return executeApiRequest(apiClient.post(`/support-groups/${id}/join`), {
        defaultErrorMessage: 'Failed to join support group'
      });
    },

    async leave(id) {
      return executeApiRequest(apiClient.post(`/support-groups/${id}/leave`), {
        defaultErrorMessage: 'Failed to leave support group'
      });
    }
  },

  // Blog / Articles Service
  blog: {
    async getAll(params = {}) {
      return executeApiRequest(apiClient.get('/blog', { params }), {
        defaultErrorMessage: 'Failed to fetch blog posts',
        fallbackValue: []
      });
    },

    async getBySlug(slug) {
      return executeApiRequest(apiClient.get(`/blog/${slug}`), {
        defaultErrorMessage: `Failed to fetch blog post ${slug}`
      });
    },

    async addComment(slug, comment) {
      return executeApiRequest(apiClient.post(`/blog/${slug}/comments`, comment), {
        defaultErrorMessage: 'Failed to submit comment'
      });
    }
  },

  // Community Discussions Service
  community: {
    async getDiscussions(params = {}) {
      return executeApiRequest(apiClient.get('/community/discussions', { params }), {
        defaultErrorMessage: 'Failed to fetch community discussions',
        fallbackValue: []
      });
    },

    async createDiscussion(data) {
      return executeApiRequest(apiClient.post('/community/discussions', data), {
        defaultErrorMessage: 'Failed to create discussion thread'
      });
    },

    async addReply(discussionId, content) {
      return executeApiRequest(apiClient.post(`/community/discussions/${discussionId}/replies`, { content }), {
        defaultErrorMessage: 'Failed to post reply'
      });
    }
  },

  // Volunteer Service
  volunteer: {
    async submit(data) {
      return executeApiRequest(apiClient.post('/volunteer/apply', data), {
        defaultErrorMessage: 'Failed to submit volunteer application'
      });
    },

    async getAll() {
      return executeApiRequest(apiClient.get('/volunteer/applications'), {
        defaultErrorMessage: 'Failed to fetch volunteer applications',
        fallbackValue: []
      });
    }
  },

  // Donations Service
  donations: {
    async record(data) {
      return executeApiRequest(apiClient.post('/donations/record', data), {
        defaultErrorMessage: 'Failed to record donation'
      });
    },

    async getAll() {
      return executeApiRequest(apiClient.get('/donations'), {
        defaultErrorMessage: 'Failed to fetch donation records',
        fallbackValue: []
      });
    }
  },

  // Newsletter Service
  newsletter: {
    async subscribe(email, preferences = [], source = 'website') {
      return executeApiRequest(apiClient.post('/newsletter/subscribe', { email, preferences, source }), {
        defaultErrorMessage: 'Failed to subscribe to newsletter'
      });
    },

    async getSubscribers() {
      return executeApiRequest(apiClient.get('/newsletter/subscribers'), {
        defaultErrorMessage: 'Failed to fetch newsletter subscribers',
        fallbackValue: []
      });
    }
  },

  // Contact Service
  contact: {
    async sendMessage(data) {
      return executeApiRequest(apiClient.post('/contact', data), {
        defaultErrorMessage: 'Failed to send message'
      });
    },

    async getMessages() {
      return executeApiRequest(apiClient.get('/contact'), {
        defaultErrorMessage: 'Failed to fetch contact inquiries',
        fallbackValue: []
      });
    }
  },

  // Global Search Service
  search: {
    async searchAll(query) {
      return executeApiRequest(apiClient.get('/search', { params: { q: query } }), {
        defaultErrorMessage: 'Search failed',
        fallbackValue: { stories: [], resources: [], events: [], groups: [], blog: [], total: 0 }
      });
    }
  },

  // Authentication Service
  auth: {
    async login(email, password) {
      return executeApiRequest(apiClient.post('/auth/login', { email, password }), {
        defaultErrorMessage: 'Invalid credentials. Please verify your email and password.'
      });
    },

    async logout() {
      return executeApiRequest(apiClient.post('/auth/logout'), {
        defaultErrorMessage: 'Logout failed',
        fallbackValue: null
      });
    },

    async getMe() {
      return executeApiRequest(apiClient.get('/auth/me'), {
        defaultErrorMessage: 'Failed to fetch profile'
      });
    },

    async updateProfile(updates) {
      return executeApiRequest(apiClient.patch('/auth/profile', updates), {
        defaultErrorMessage: 'Failed to update profile'
      });
    },

    async changePassword(currentPassword, newPassword) {
      return executeApiRequest(apiClient.post('/auth/change-password', { currentPassword, newPassword }), {
        defaultErrorMessage: 'Failed to change password'
      });
    }
  },

  // User Management & RBAC Service (Administrative)
  users: {
    async list(params = {}) {
      return executeApiRequest(apiClient.get('/users', { params }), {
        defaultErrorMessage: 'Failed to fetch users',
        fallbackValue: { users: [], total: 0, page: 1, totalPages: 1 }
      });
    },

    async getById(id) {
      return executeApiRequest(apiClient.get(`/users/${id}`), {
        defaultErrorMessage: `Failed to fetch user ${id}`
      });
    },

    async create(userData) {
      return executeApiRequest(apiClient.post('/users', userData), {
        defaultErrorMessage: 'Failed to create user'
      });
    },

    async update(id, updates) {
      return executeApiRequest(apiClient.patch(`/users/${id}`, updates), {
        defaultErrorMessage: `Failed to update user ${id}`
      });
    },

    async changeRole(id, role) {
      return executeApiRequest(apiClient.patch(`/users/${id}/role`, { role }), {
        defaultErrorMessage: 'Failed to update user role'
      });
    },

    async changeStatus(id, status) {
      return executeApiRequest(apiClient.patch(`/users/${id}/status`, { status }), {
        defaultErrorMessage: 'Failed to update user status'
      });
    },

    async resetPassword(id, newPassword) {
      return executeApiRequest(apiClient.post(`/users/${id}/reset-password`, { newPassword }), {
        defaultErrorMessage: 'Failed to reset user password'
      });
    },

    async delete(id) {
      return executeApiRequest(apiClient.delete(`/users/${id}`), {
        defaultErrorMessage: 'Failed to delete user'
      });
    },

    async getAuditLogs(params = {}) {
      return executeApiRequest(apiClient.get('/users/audit-logs', { params }), {
        defaultErrorMessage: 'Failed to fetch audit logs',
        fallbackValue: { logs: [], total: 0, page: 1, totalPages: 1 }
      });
    }
  },

  // Admin Service
  admin: {
    async getStats() {
      return executeApiRequest(apiClient.get('/admin/stats'), {
        defaultErrorMessage: 'Failed to fetch admin stats'
      });
    },

    async getReports() {
      return executeApiRequest(apiClient.get('/admin/reports'), {
        defaultErrorMessage: 'Failed to fetch moderation reports',
        fallbackValue: []
      });
    },

    async updateReportStatus(id, status) {
      return executeApiRequest(apiClient.patch(`/admin/reports/${id}`, { status }), {
        defaultErrorMessage: `Failed to update report ${id}`
      });
    },

    async updateStoryStatus(id, status) {
      return executeApiRequest(apiClient.patch(`/admin/stories/${id}`, { status }), {
        defaultErrorMessage: `Failed to update story status for ${id}`
      });
    },

    async exportAllData() {
      return executeApiRequest(apiClient.get('/admin/export'), {
        defaultErrorMessage: 'Failed to export platform data'
      });
    }
  },

  // Health Service
  health: {
    async check() {
      return executeApiRequest(apiClient.get('/health'), {
        defaultErrorMessage: 'Health check failed'
      });
    }
  }
};

export default apiService;
