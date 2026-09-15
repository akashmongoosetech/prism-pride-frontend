import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole, UserStatus } from '../types';
import apiService from '../services/apiService';
import { setAuthTokenProvider } from '../lib/api';
import { 
  ROLES, 
  PERMISSIONS, 
  ROLE_PERMISSIONS, 
  normalizeRole, 
  getAllowedCreationRoles,
  canActorManageTargetRole 
} from '../config/roles';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  hasPermission: (permission: string) => boolean;
  canCreateRole: (role: UserRole) => boolean;
  canManageUserRole: (targetRole: UserRole) => boolean;
  switchDemoRole: (role: UserRole) => Promise<void>;
  switchRole: (role: UserRole) => Promise<void>;
  toggleBookmark: (id: string) => boolean;
  isBookmarked: (id: string) => boolean;
  toggleEventRegistration: (eventId: string) => boolean;
  toggleSupportGroupJoin: (groupId: string) => boolean;
  isEventRegistered: (eventId: string) => boolean;
  isSupportGroupJoined: (groupId: string) => boolean;
  attendEvent: (eventId: string) => boolean;
  unattendEvent: (eventId: string) => boolean;
  attendSupportGroup: (groupId: string) => boolean;
  unattendSupportGroup: (groupId: string) => boolean;
}

const ROLE_DEMO_CREDENTIALS: Record<string, { email: string; pass: string }> = {
  ADMIN: { email: 'taylor@prismcommunity.org', pass: 'prism123456' },
  admin: { email: 'taylor@prismcommunity.org', pass: 'prism123456' },
  SUB_ADMIN: { email: 'jordan.subadmin@prismcommunity.org', pass: 'prism123456' },
  moderator: { email: 'jordan.subadmin@prismcommunity.org', pass: 'prism123456' },
  MANAGER: { email: 'marcus.manager@prismcommunity.org', pass: 'prism123456' },
  EMPLOYEE: { email: 'elena.employee@prismcommunity.org', pass: 'prism123456' },
  VOLUNTEER: { email: 'alex.volunteer@prismcommunity.org', pass: 'prism123456' },
  volunteer: { email: 'alex.volunteer@prismcommunity.org', pass: 'prism123456' },
  MEMBER: { email: 'samira@example.com', pass: 'prism123456' },
  member: { email: 'samira@example.com', pass: 'prism123456' }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('prism_user_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) {
          return {
            ...parsed,
            role: normalizeRole(parsed.role)
          };
        }
      } catch (e) {
        console.error('Failed to parse cached session:', e);
      }
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Configure dynamic bearer token provider for API requests
  useEffect(() => {
    setAuthTokenProvider(() => {
      try {
        return localStorage.getItem('prism_auth_token');
      } catch {
        return null;
      }
    });
  }, []);

  // Initialize session verification on app startup
  useEffect(() => {
    let isMounted = true;
    const initAuth = async () => {
      const token = localStorage.getItem('prism_auth_token');
      if (!token) {
        // If no token exists, automatically seed initial admin session for seamless local evaluation
        try {
          const res = await apiService.auth.login(
            ROLE_DEMO_CREDENTIALS.ADMIN.email, 
            ROLE_DEMO_CREDENTIALS.ADMIN.pass
          );
          if (isMounted && res?.user && res?.token) {
            localStorage.setItem('prism_auth_token', res.token);
            const normUser: User = {
              ...res.user,
              role: normalizeRole(res.user.role)
            };
            setUser(normUser);
            localStorage.setItem('prism_user_session', JSON.stringify(normUser));
          }
        } catch {
          // Keep null if login fails
        }
        if (isMounted) setIsLoading(false);
        return;
      }

      try {
        const currentUser = await apiService.auth.getMe();
        if (isMounted && currentUser && currentUser.id) {
          const normUser: User = {
            ...currentUser,
            role: normalizeRole(currentUser.role)
          };
          setUser(normUser);
          localStorage.setItem('prism_user_session', JSON.stringify(normUser));
        } else if (isMounted) {
          setUser(null);
          localStorage.removeItem('prism_user_session');
          localStorage.removeItem('prism_auth_token');
        }
      } catch (err) {
        console.warn('Session verification failed, resetting auth state:', err);
        if (isMounted) {
          setUser(null);
          localStorage.removeItem('prism_user_session');
          localStorage.removeItem('prism_auth_token');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync user state changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('prism_user_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('prism_user_session');
    }
  }, [user]);

  // Real backend login flow
  const login = async (email: string, password?: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    try {
      const pass = password || 'prism123456';
      const response = await apiService.auth.login(email.trim().toLowerCase(), pass);
      
      if (response && response.user) {
        if (response.token) {
          localStorage.setItem('prism_auth_token', response.token);
        }
        const normUser: User = {
          ...response.user,
          role: normalizeRole(response.user.role)
        };
        setUser(normUser);
        localStorage.setItem('prism_user_session', JSON.stringify(normUser));
        setIsLoading(false);
        return { success: true };
      }
      setIsLoading(false);
      return { success: false, message: 'Invalid credentials' };
    } catch (err: any) {
      setIsLoading(false);
      const message = err?.response?.data?.message || err?.message || 'Login failed. Please verify your credentials.';
      return { success: false, message };
    }
  };

  // Real backend logout flow
  const logout = async () => {
    try {
      await apiService.auth.logout();
    } catch {
      // safe cleanup
    } finally {
      setUser(null);
      localStorage.removeItem('prism_user_session');
      localStorage.removeItem('prism_auth_token');
    }
  };

  // Switch demo account by performing real authenticated login to backend
  const switchDemoRole = async (targetRole: UserRole) => {
    const norm = normalizeRole(targetRole);
    const creds = ROLE_DEMO_CREDENTIALS[norm] || ROLE_DEMO_CREDENTIALS.MEMBER;
    await login(creds.email, creds.pass);
  };

  const updateUser = async (data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
    try {
      await apiService.auth.updateProfile(data);
    } catch (e) {
      console.warn('Profile update failed:', e);
    }
  };

  const hasPermission = useCallback((permission: string): boolean => {
    if (!user) return false;
    const role = normalizeRole(user.role);
    if (role === 'ADMIN') return true;
    if (user.permissions && user.permissions.includes(permission)) return true;
    const rolePerms = ROLE_PERMISSIONS[role] || [];
    return rolePerms.includes(permission);
  }, [user]);

  const canCreateRole = useCallback((targetRole: UserRole): boolean => {
    if (!user) return false;
    const actorRole = normalizeRole(user.role);
    const allowed = getAllowedCreationRoles(actorRole);
    return allowed.includes(normalizeRole(targetRole));
  }, [user]);

  const canManageUserRole = useCallback((targetRole: UserRole): boolean => {
    if (!user) return false;
    return canActorManageTargetRole(user.role, targetRole);
  }, [user]);

  // Bookmark and attendance helpers
  const toggleBookmark = (id: string): boolean => {
    if (!user) return false;
    const currentBookmarks = user.bookmarks || [];
    const currentResourceIds = user.bookmarkedResourceIds || [];
    const currentStoryIds = user.bookmarkedStoryIds || [];
    const isSaved = currentBookmarks.includes(id) || currentResourceIds.includes(id) || currentStoryIds.includes(id);

    const updatedBookmarks = isSaved
      ? currentBookmarks.filter((b) => b !== id)
      : [...currentBookmarks, id];

    const updatedResourceIds = isSaved
      ? currentResourceIds.filter((b) => b !== id)
      : id.startsWith('res') ? [...currentResourceIds, id] : currentResourceIds;

    const updatedStoryIds = isSaved
      ? currentStoryIds.filter((b) => b !== id)
      : id.startsWith('story') ? [...currentStoryIds, id] : currentStoryIds;

    const updatedUser = {
      ...user,
      bookmarks: updatedBookmarks,
      bookmarkedResourceIds: updatedResourceIds,
      bookmarkedStoryIds: updatedStoryIds
    };

    setUser(updatedUser);
    apiService.auth.updateProfile({ bookmarks: updatedBookmarks }).catch(() => {});
    return !isSaved;
  };

  const isBookmarked = (id: string): boolean => {
    if (!user) return false;
    return (
      (user.bookmarks || []).includes(id) ||
      (user.bookmarkedResourceIds || []).includes(id) ||
      (user.bookmarkedStoryIds || []).includes(id)
    );
  };

  const isEventRegistered = (eventId: string): boolean => {
    if (!user) return false;
    return (
      (user.registeredEvents || []).includes(eventId) ||
      (user.rsvpEventIds || []).includes(eventId)
    );
  };

  const isSupportGroupJoined = (groupId: string): boolean => {
    if (!user) return false;
    return (
      (user.joinedSupportGroups || []).includes(groupId) ||
      (user.joinedGroupIds || []).includes(groupId)
    );
  };

  const toggleEventRegistration = (eventId: string): boolean => {
    if (!user) return false;
    const isRegistered = isEventRegistered(eventId);
    const current = user.registeredEvents || [];
    const updated = isRegistered
      ? current.filter((id) => id !== eventId)
      : [...current, eventId];

    const currentRsvp = user.rsvpEventIds || [];
    const updatedRsvp = isRegistered
      ? currentRsvp.filter((id) => id !== eventId)
      : [...currentRsvp, eventId];

    const updatedUser = { ...user, registeredEvents: updated, rsvpEventIds: updatedRsvp };
    setUser(updatedUser);

    apiService.auth.updateProfile({ registeredEvents: updated }).catch(() => {});
    return !isRegistered;
  };

  const attendEvent = (eventId: string): boolean => {
    if (!user) return false;
    if (isEventRegistered(eventId)) return true;
    return toggleEventRegistration(eventId);
  };

  const unattendEvent = (eventId: string): boolean => {
    if (!user) return false;
    if (!isEventRegistered(eventId)) return true;
    return toggleEventRegistration(eventId);
  };

  const toggleSupportGroupJoin = (groupId: string): boolean => {
    if (!user) return false;
    const isJoined = isSupportGroupJoined(groupId);
    const current = user.joinedSupportGroups || [];
    const updated = isJoined
      ? current.filter((id) => id !== groupId)
      : [...current, groupId];

    const currentJoinedGroupIds = user.joinedGroupIds || [];
    const updatedJoinedGroupIds = isJoined
      ? currentJoinedGroupIds.filter((id) => id !== groupId)
      : [...currentJoinedGroupIds, groupId];

    const updatedUser = {
      ...user,
      joinedSupportGroups: updated,
      joinedGroupIds: updatedJoinedGroupIds
    };
    setUser(updatedUser);

    apiService.auth.updateProfile({ joinedSupportGroups: updated }).catch(() => {});
    return !isJoined;
  };

  const attendSupportGroup = (groupId: string): boolean => {
    if (!user) return false;
    if (isSupportGroupJoined(groupId)) return true;
    return toggleSupportGroupJoin(groupId);
  };

  const unattendSupportGroup = (groupId: string): boolean => {
    if (!user) return false;
    if (!isSupportGroupJoined(groupId)) return true;
    return toggleSupportGroupJoin(groupId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
        hasPermission,
        canCreateRole,
        canManageUserRole,
        switchDemoRole,
        switchRole: switchDemoRole,
        toggleBookmark,
        isBookmarked,
        toggleEventRegistration,
        toggleSupportGroupJoin,
        isEventRegistered,
        isSupportGroupJoined,
        attendEvent,
        unattendEvent,
        attendSupportGroup,
        unattendSupportGroup
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
