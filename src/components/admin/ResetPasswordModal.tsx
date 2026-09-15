import React, { useState } from 'react';
import { User } from '../../types';
import { Button } from '../ui/Button';
import { X, KeyRound, AlertCircle, CheckCircle2, Copy } from 'lucide-react';
import apiService from '../../services/apiService';
import { useToast } from '../../context/ToastContext';

interface ResetPasswordModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  user,
  isOpen,
  onClose
}) => {
  const { addToast } = useToast();
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generatedTemp, setGeneratedTemp] = useState<string | null>(null);

  if (!isOpen || !user) return null;

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await apiService.users.resetPassword(user.id, newPassword.trim() || undefined);
      const tempPass = res?.temporaryPassword || newPassword.trim();
      setGeneratedTemp(tempPass);
      addToast({
        type: 'success',
        title: 'Password Reset',
        message: `Password successfully updated for ${user.email}.`
      });
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Password reset failed.';
      setErrorMessage(msg);
      addToast({
        type: 'error',
        title: 'Reset Failed',
        message: msg
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setNewPassword('');
    setErrorMessage(null);
    setGeneratedTemp(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Reset Password
              </h2>
              <p className="text-xs text-slate-500">
                Security credential override for {user.name}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {generatedTemp ? (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div>
                <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-100">
                  Password Updated Successfully
                </h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Provide this new password securely to {user.name}:
                </p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-300 dark:border-emerald-700 font-mono text-base font-bold text-slate-900 dark:text-white select-all">
                {generatedTemp}
              </div>
              <Button variant="primary" onClick={handleClose} className="w-full">
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-start gap-2.5 text-rose-700 dark:text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Enter a specific new password or leave blank to automatically generate a secure temporary password.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  New Password (Optional)
                </label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Leave empty to auto-generate"
                  className="w-full text-xs px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <Button type="button" variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" isLoading={isLoading}>
                  Confirm Reset
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
