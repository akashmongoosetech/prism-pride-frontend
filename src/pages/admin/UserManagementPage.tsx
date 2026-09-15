import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { User, UserRole, UserStatus } from '../../types';
import { 
  ROLES, 
  ROLE_LABELS, 
  ROLE_BADGES, 
  STATUS_BADGES, 
  PERMISSIONS, 
  normalizeRole, 
  canActorManageTargetRole 
} from '../../config/roles';
import apiService from '../../services/apiService';
import { Button } from '../../components/ui/Button';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Shield, 
  KeyRound, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  UserCheck, 
  UserX, 
  AlertCircle,
  RefreshCw,
  Clock,
  ChevronLeft,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

import { CreateUserModal } from '../../components/admin/CreateUserModal';
import { EditUserModal } from '../../components/admin/EditUserModal';
import { ChangeRoleModal } from '../../components/admin/ChangeRoleModal';
import { ResetPasswordModal } from '../../components/admin/ResetPasswordModal';
import { AuditLogsModal } from '../../components/admin/AuditLogsModal';

export const UserManagementPage: React.FC = () => {
  const { user: currentUser, hasPermission, canManageUserRole } = useAuth();
  const { addToast } = useToast();

  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [activeUserForEdit, setActiveUserForEdit] = useState<User | null>(null);
  const [activeUserForRole, setActiveUserForRole] = useState<User | null>(null);
  const [activeUserForPass, setActiveUserForPass] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    document.title = 'User Management & RBAC | Prism Administration';
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await apiService.users.list({
        search,
        role: roleFilter,
        status: statusFilter,
        page,
        limit: 15
      });
      setUsers(res.users || []);
      setTotal(res.total || 0);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error('Failed to load users:', err);
      addToast({
        type: 'error',
        title: 'Error Loading Users',
        message: 'Could not retrieve user directory from server.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, roleFilter, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const handleToggleStatus = async (user: User) => {
    const isCurrentlyActive = user.status === 'ACTIVE';
    const newStatus: UserStatus = isCurrentlyActive ? 'INACTIVE' : 'ACTIVE';

    if (currentUser?.id === user.id) {
      addToast({
        type: 'error',
        title: 'Operation Prevented',
        message: 'You cannot deactivate your own administrative account.'
      });
      return;
    }

    try {
      const updated = await apiService.users.changeStatus(user.id, newStatus);
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
      addToast({
        type: 'success',
        title: `Account ${newStatus}`,
        message: `${user.name}'s status was set to ${newStatus}.`
      });
    } catch (err: any) {
      addToast({
        type: 'error',
        title: 'Status Change Failed',
        message: err?.response?.data?.message || err?.message || 'Action failed.'
      });
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      await apiService.users.delete(userToDelete.id);
      addToast({
        type: 'success',
        title: 'User Deleted',
        message: `Account ${userToDelete.email} was permanently deleted.`
      });
      setUserToDelete(null);
      fetchUsers();
    } catch (err: any) {
      addToast({
        type: 'error',
        title: 'Deletion Failed',
        message: err?.response?.data?.message || err?.message || 'Could not delete user.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const canCreate = hasPermission(PERMISSIONS.USERS_CREATE);
  const canAudit = hasPermission(PERMISSIONS.AUDIT_VIEW);
  const isAdmin = normalizeRole(currentUser?.role) === 'ADMIN';

  // Stats calculation
  const activeCount = users.filter(u => u.status === 'ACTIVE').length;
  const staffCount = users.filter(u => ['ADMIN', 'SUB_ADMIN', 'MANAGER', 'EMPLOYEE'].includes(normalizeRole(u.role))).length;

  return (
    <div id="user-management-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      <Breadcrumbs
        items={[
          { label: 'Admin Console', url: '/admin' },
          { label: 'User Directory & RBAC' }
        ]}
      />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <Shield className="w-3.5 h-3.5" />
            <span>Role-Based Access Control</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            User Management & Clearance
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Manage authenticated accounts, enforce security hierarchy, and inspect system audit trails.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {canAudit && (
            <Button
              variant="secondary"
              onClick={() => setIsAuditOpen(true)}
              className="gap-2 text-xs"
            >
              <Clock className="w-4 h-4 text-purple-500" />
              <span>Audit Logs</span>
            </Button>
          )}

          {canCreate && (
            <Button
              variant="primary"
              onClick={() => setIsCreateOpen(true)}
              className="gap-2 text-xs shadow-xs"
            >
              <UserPlus className="w-4 h-4" />
              <span>Provision User</span>
            </Button>
          )}
        </div>
      </div>

      {/* Quick Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Directory
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {total}
          </div>
          <div className="text-[11px] text-slate-400">Verified community accounts</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Active Accounts
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {activeCount}
          </div>
          <div className="text-[11px] text-slate-400">Full platform clearance</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            Staff & Leadership
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {staffCount}
          </div>
          <div className="text-[11px] text-slate-400">Admin, Sub-Admin, Manager, Staff</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            Clearance Protocol
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white mt-1 truncate">
            {ROLE_LABELS[normalizeRole(currentUser?.role)] || currentUser?.role}
          </div>
          <div className="text-[11px] text-slate-400">Your current operating tier</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </form>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(1);
              }}
              className="text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option value="">All Roles</option>
              <option value="ADMIN">ADMIN</option>
              <option value="SUB_ADMIN">SUB_ADMIN</option>
              <option value="MANAGER">MANAGER</option>
              <option value="EMPLOYEE">EMPLOYEE</option>
              <option value="VOLUNTEER">VOLUNTEER</option>
              <option value="MEMBER">MEMBER</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option value="">All Statuses</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="SUSPENDED">SUSPENDED</option>
              <option value="PENDING">PENDING</option>
            </select>

            <Button
              variant="ghost"
              size="sm"
              onClick={fetchUsers}
              isLoading={isLoading}
              className="p-2"
              title="Refresh Directory"
            >
              <RefreshCw className="w-4 h-4 text-slate-500" />
            </Button>
          </div>
        </div>
      </div>

      {/* Users Directory Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px] bg-slate-50/50 dark:bg-slate-800/30">
                <th className="py-3.5 pl-6 pr-4">User Details</th>
                <th className="py-3.5 px-4">Role Tier</th>
                <th className="py-3.5 px-4">Account Status</th>
                <th className="py-3.5 px-4">Location & Contact</th>
                <th className="py-3.5 px-4">Enrolled</th>
                <th className="py-3.5 pr-6 pl-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {isLoading && users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-xs text-slate-400">
                    Loading community directory...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-xs text-slate-400">
                    No users matched your search criteria.
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const roleNorm = normalizeRole(u.role);
                  const roleBadge = ROLE_BADGES[roleNorm] || ROLE_BADGES.MEMBER;
                  const statusNorm = (u.status || 'ACTIVE') as UserStatus;
                  const statusBadge = STATUS_BADGES[statusNorm] || STATUS_BADGES.ACTIVE;
                  const isSelf = currentUser?.id === u.id;
                  const canManageThisUser = canManageUserRole(roleNorm) || isSelf;

                  return (
                    <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      {/* User Info */}
                      <td className="py-4 pl-6 pr-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                            alt={u.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-900 dark:text-white text-xs">
                                {u.name}
                              </span>
                              {isSelf && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                                  YOU
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              {u.email}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {u.pronouns || 'they/them'}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${roleBadge.bg} ${roleBadge.text} ${roleBadge.border}`}>
                          <span>{roleBadge.label}</span>
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {ROLE_LABELS[roleNorm]}
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusNorm === 'ACTIVE' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          <span>{statusBadge.label}</span>
                        </span>
                      </td>

                      {/* Location & Phone */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="text-slate-700 dark:text-slate-300 text-xs">
                          {u.city || '—'}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {u.phone || 'No phone'}
                        </div>
                      </td>

                      {/* Created date */}
                      <td className="py-4 px-4 whitespace-nowrap text-slate-500 text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>

                      {/* Actions */}
                      <td className="py-4 pr-6 pl-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          {/* Edit Details */}
                          <button
                            onClick={() => setActiveUserForEdit(u)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Edit User Profile"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Role Change (Protected) */}
                          <button
                            onClick={() => setActiveUserForRole(u)}
                            disabled={isSelf || !canManageThisUser}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isSelf || !canManageThisUser
                                ? 'text-slate-200 dark:text-slate-700 cursor-not-allowed'
                                : 'text-purple-500 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/50'
                            }`}
                            title={isSelf ? 'Cannot edit own role' : !canManageThisUser ? 'Insufficient rank clearance' : 'Change User Role'}
                          >
                            <Shield className="w-4 h-4" />
                          </button>

                          {/* Password Reset */}
                          <button
                            onClick={() => setActiveUserForPass(u)}
                            disabled={!canManageThisUser}
                            className={`p-1.5 rounded-lg transition-colors ${
                              !canManageThisUser
                                ? 'text-slate-200 dark:text-slate-700 cursor-not-allowed'
                                : 'text-amber-500 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/50'
                            }`}
                            title="Reset User Password"
                          >
                            <KeyRound className="w-4 h-4" />
                          </button>

                          {/* Toggle Active/Inactive */}
                          <button
                            onClick={() => handleToggleStatus(u)}
                            disabled={isSelf || !canManageThisUser}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isSelf || !canManageThisUser
                                ? 'text-slate-200 dark:text-slate-700 cursor-not-allowed'
                                : u.status === 'ACTIVE'
                                  ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50'
                                  : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50'
                            }`}
                            title={u.status === 'ACTIVE' ? 'Deactivate Account' : 'Activate Account'}
                          >
                            {u.status === 'ACTIVE' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                          </button>

                          {/* Delete User (Admin only) */}
                          {isAdmin && (
                            <button
                              onClick={() => setUserToDelete(u)}
                              disabled={isSelf || u.id === 'usr-admin-1'}
                              className={`p-1.5 rounded-lg transition-colors ${
                                isSelf || u.id === 'usr-admin-1'
                                  ? 'text-slate-200 dark:text-slate-700 cursor-not-allowed'
                                  : 'text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/50'
                              }`}
                              title={u.id === 'usr-admin-1' ? 'Root Admin cannot be deleted' : 'Delete Account'}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Page {page} of {totalPages} ({total} total records)
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="gap-1 text-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="gap-1 text-xs"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateUserModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onUserCreated={() => {
          fetchUsers();
        }}
      />

      <EditUserModal
        user={activeUserForEdit}
        isOpen={!!activeUserForEdit}
        onClose={() => setActiveUserForEdit(null)}
        onUserUpdated={(updated) => {
          setUsers(prev => prev.map(u => u.id === updated.id ? { ...u, ...updated } : u));
        }}
      />

      <ChangeRoleModal
        user={activeUserForRole}
        isOpen={!!activeUserForRole}
        onClose={() => setActiveUserForRole(null)}
        onRoleChanged={(updated) => {
          setUsers(prev => prev.map(u => u.id === updated.id ? { ...u, ...updated } : u));
        }}
      />

      <ResetPasswordModal
        user={activeUserForPass}
        isOpen={!!activeUserForPass}
        onClose={() => setActiveUserForPass(null)}
      />

      <AuditLogsModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
      />

      {/* Delete Confirmation Dialog */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-100 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Delete User Account?
              </h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to delete <strong className="text-slate-800 dark:text-slate-200">{userToDelete.name}</strong> ({userToDelete.email})? This action is permanently logged to audit trails and cannot be reversed.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Button variant="secondary" onClick={() => setUserToDelete(null)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                isLoading={isDeleting}
                onClick={handleDeleteUser}
              >
                Permanently Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
