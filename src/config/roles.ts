export type UserRole = 'ADMIN' | 'SUB_ADMIN' | 'MANAGER' | 'EMPLOYEE' | 'VOLUNTEER' | 'MEMBER';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';

export const ROLES: Record<UserRole, UserRole> = {
  ADMIN: 'ADMIN',
  SUB_ADMIN: 'SUB_ADMIN',
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE',
  VOLUNTEER: 'VOLUNTEER',
  MEMBER: 'MEMBER'
};

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  ADMIN: 100,
  SUB_ADMIN: 80,
  MANAGER: 60,
  EMPLOYEE: 40,
  VOLUNTEER: 20,
  MEMBER: 10
};

export const USER_STATUS: Record<UserStatus, UserStatus> = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
  PENDING: 'PENDING'
};

export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: 'Administrator',
  SUB_ADMIN: 'Sub-Administrator',
  MANAGER: 'Programs Manager',
  EMPLOYEE: 'Staff Employee',
  VOLUNTEER: 'Community Volunteer',
  MEMBER: 'Sanctuary Member'
};

export const ROLE_BADGES: Record<UserRole, { label: string; bg: string; text: string; border: string }> = {
  ADMIN: {
    label: 'Admin',
    bg: 'bg-rose-100 dark:bg-rose-950/70',
    text: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-200 dark:border-rose-800'
  },
  SUB_ADMIN: {
    label: 'Sub-Admin',
    bg: 'bg-purple-100 dark:bg-purple-950/70',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800'
  },
  MANAGER: {
    label: 'Manager',
    bg: 'bg-indigo-100 dark:bg-indigo-950/70',
    text: 'text-indigo-700 dark:text-indigo-300',
    border: 'border-indigo-200 dark:border-indigo-800'
  },
  EMPLOYEE: {
    label: 'Staff',
    bg: 'bg-teal-100 dark:bg-teal-950/70',
    text: 'text-teal-700 dark:text-teal-300',
    border: 'border-teal-200 dark:border-teal-800'
  },
  VOLUNTEER: {
    label: 'Volunteer',
    bg: 'bg-amber-100 dark:bg-amber-950/70',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800'
  },
  MEMBER: {
    label: 'Member',
    bg: 'bg-slate-100 dark:bg-slate-800/80',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-200 dark:border-slate-700'
  }
};

export const STATUS_BADGES: Record<UserStatus, { label: string; bg: string; text: string; border: string }> = {
  ACTIVE: {
    label: 'Active',
    bg: 'bg-emerald-100 dark:bg-emerald-950/70',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800'
  },
  INACTIVE: {
    label: 'Inactive',
    bg: 'bg-slate-100 dark:bg-slate-800/80',
    text: 'text-slate-600 dark:text-slate-400',
    border: 'border-slate-200 dark:border-slate-700'
  },
  SUSPENDED: {
    label: 'Suspended',
    bg: 'bg-red-100 dark:bg-red-950/70',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-200 dark:border-red-800'
  },
  PENDING: {
    label: 'Pending',
    bg: 'bg-amber-100 dark:bg-amber-950/70',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800'
  }
};

export const PERMISSIONS = {
  USERS_VIEW: 'users.view',
  USERS_CREATE: 'users.create',
  USERS_UPDATE: 'users.update',
  USERS_DELETE: 'users.delete',
  USERS_ACTIVATE: 'users.activate',
  USERS_DEACTIVATE: 'users.deactivate',
  USERS_SUSPEND: 'users.suspend',
  USERS_RESET_PASSWORD: 'users.reset_password',
  USERS_CHANGE_ROLE: 'users.change_role',

  ADMINS_CREATE: 'admins.create',
  SUBADMINS_CREATE: 'subadmins.create',
  MANAGERS_CREATE: 'managers.create',
  EMPLOYEES_CREATE: 'employees.create',
  VOLUNTEERS_CREATE: 'volunteers.create',
  MEMBERS_CREATE: 'members.create',

  ADMIN_ACCESS: 'admin.access',
  AUDIT_VIEW: 'audit.view',

  CONTENT_MODERATE: 'content.moderate',
  REPORTS_MANAGE: 'reports.manage',
  DONATIONS_VIEW: 'donations.view',
  VOLUNTEERS_MANAGE: 'volunteers.manage'
};

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  ADMIN: Object.values(PERMISSIONS),
  SUB_ADMIN: [
    PERMISSIONS.ADMIN_ACCESS,
    PERMISSIONS.USERS_VIEW,
    PERMISSIONS.USERS_CREATE,
    PERMISSIONS.USERS_UPDATE,
    PERMISSIONS.USERS_ACTIVATE,
    PERMISSIONS.USERS_DEACTIVATE,
    PERMISSIONS.USERS_SUSPEND,
    PERMISSIONS.USERS_RESET_PASSWORD,
    PERMISSIONS.USERS_CHANGE_ROLE,
    PERMISSIONS.MANAGERS_CREATE,
    PERMISSIONS.EMPLOYEES_CREATE,
    PERMISSIONS.VOLUNTEERS_CREATE,
    PERMISSIONS.MEMBERS_CREATE,
    PERMISSIONS.AUDIT_VIEW,
    PERMISSIONS.CONTENT_MODERATE,
    PERMISSIONS.REPORTS_MANAGE,
    PERMISSIONS.DONATIONS_VIEW,
    PERMISSIONS.VOLUNTEERS_MANAGE
  ],
  MANAGER: [
    PERMISSIONS.ADMIN_ACCESS,
    PERMISSIONS.USERS_VIEW,
    PERMISSIONS.CONTENT_MODERATE,
    PERMISSIONS.REPORTS_MANAGE,
    PERMISSIONS.DONATIONS_VIEW,
    PERMISSIONS.VOLUNTEERS_MANAGE
  ],
  EMPLOYEE: [
    PERMISSIONS.CONTENT_MODERATE,
    PERMISSIONS.REPORTS_MANAGE,
    PERMISSIONS.VOLUNTEERS_MANAGE
  ],
  VOLUNTEER: [
    PERMISSIONS.CONTENT_MODERATE
  ],
  MEMBER: []
};

export const normalizeRole = (role?: string | null): UserRole => {
  if (!role) return 'MEMBER';
  const upper = String(role).toUpperCase().trim();
  if (upper === 'ADMIN') return 'ADMIN';
  if (upper === 'SUB_ADMIN' || upper === 'SUBADMIN' || upper === 'MODERATOR') return 'SUB_ADMIN';
  if (upper === 'MANAGER') return 'MANAGER';
  if (upper === 'EMPLOYEE') return 'EMPLOYEE';
  if (upper === 'VOLUNTEER') return 'VOLUNTEER';
  return 'MEMBER';
};

export const getAllowedCreationRoles = (actorRole?: UserRole | string | null): UserRole[] => {
  const norm = normalizeRole(actorRole);
  if (norm === 'ADMIN') {
    return ['ADMIN', 'SUB_ADMIN', 'MANAGER', 'EMPLOYEE', 'VOLUNTEER', 'MEMBER'];
  }
  if (norm === 'SUB_ADMIN') {
    return ['MANAGER', 'EMPLOYEE', 'VOLUNTEER', 'MEMBER'];
  }
  return [];
};

export const canActorManageTargetRole = (
  actorRole?: UserRole | string | null, 
  targetRole?: UserRole | string | null
): boolean => {
  const actor = normalizeRole(actorRole);
  const target = normalizeRole(targetRole);
  if (actor === 'ADMIN') return true;
  const actorLevel = ROLE_HIERARCHY[actor] || 0;
  const targetLevel = ROLE_HIERARCHY[target] || 0;
  return actorLevel > targetLevel;
};
