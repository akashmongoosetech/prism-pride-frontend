import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { 
  ROLES, 
  ROLE_LABELS, 
  ROLE_BADGES, 
  getAllowedCreationRoles, 
  canActorManageTargetRole,
  normalizeRole 
} from '../../config/roles';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { X, ShieldAlert, Check, AlertCircle } from 'lucide-react';
import apiService from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

interface ChangeRoleModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onRoleChanged: (updatedUser: User) => void;
}

export const ChangeRoleModal: React.FC<ChangeRoleModalProps> = ({
  user,
  isOpen,
  onClose,
  onRoleChanged
}) => {
  const { user: currentUser } = useAuth();
  const { addToast } = useToast();

  const actorRole = normalizeRole(currentUser?.role);
  const targetUserRole = normalizeRole(user?.role);
  const allowedRoles = getAllowedCreationRoles(actorRole);

  const [selectedRole, setSelectedRole] = useState<UserRole>(() => targetUserRole);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen || !user) return null;

  const isSelf = currentUser?.id === user.id;
  const canManage = canActorManageTargetRole(actorRole, targetUserRole);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSelf) {
      setErrorMessage('You cannot modify your own role.');
      return;
    }
    if (!canManage) {
      setErrorMessage(`Role '${actorRole}' cannot alter roles for rank '${targetUserRole}'.`);
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    try {
      const updated = await apiService.users.changeRole(user.id, selectedRole);
      addToast({
        type: 'success',
        title: 'Role Updated',
        message: `${user.name}'s role was changed to ${selectedRole}.`
      });
      onRoleChanged(updated);
      onClose();
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to update user role.';
      setErrorMessage(msg);
      addToast({
        type: 'error',
        title: 'Role Change Failed',
        message: msg
      });
    } finally {
      setIsLoading(false);
    }
  };

  const currentBadge = ROLE_BADGES[targetUserRole] || ROLE_BADGES.MEMBER;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Modify User Role
              </h2>
              <p className="text-xs text-slate-500">
                Adjust permissions for {user.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-start gap-2.5 text-rose-700 dark:text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Target User:</span>
              <span className="font-bold text-slate-900 dark:text-white">{user.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Current Role:</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${currentBadge.bg} ${currentBadge.text} ${currentBadge.border}`}>
                {targetUserRole}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Select New Assigned Role
            </label>
            <div className="space-y-2">
              {allowedRoles.map((r) => {
                const badge = ROLE_BADGES[r] || ROLE_BADGES.MEMBER;
                const isSelected = selectedRole === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`w-full p-3 rounded-xl text-left border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-600'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                          {badge.label}
                        </span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {ROLE_LABELS[r]}
                        </span>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              disabled={isSelf || !canManage || selectedRole === targetUserRole}
            >
              Update Role
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
