import React, { useState, useEffect } from 'react';
import { AuditLog } from '../../types';
import { Button } from '../ui/Button';
import { X, ShieldCheck, RefreshCw, Filter, Clock, User, ArrowRight } from 'lucide-react';
import apiService from '../../services/apiService';
import { ROLE_BADGES, normalizeRole } from '../../config/roles';

interface AuditLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditLogsModal: React.FC<AuditLogsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [actionFilter, setActionFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const res = await apiService.users.getAuditLogs({
        page,
        limit: 25,
        action: actionFilter
      });
      setLogs(res.logs || []);
      setTotal(res.total || 0);
    } catch (err) {
      console.error('Failed to fetch audit logs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
    }
  }, [isOpen, page, actionFilter]);

  if (!isOpen) return null;

  const getActionBadge = (action: string) => {
    if (action.includes('CREATED') || action.includes('ACTIVATED')) {
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200';
    }
    if (action.includes('ROLE') || action.includes('PASSWORD')) {
      return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200';
    }
    if (action.includes('DELETED') || action.includes('SUSPENDED') || action.includes('DEACTIVATED')) {
      return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200';
    }
    return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Administrative Audit Logs
              </h2>
              <p className="text-xs text-slate-500">
                Immutable security trail of administrative access and role changes
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

        {/* Filter Controls */}
        <div className="px-6 py-3 bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={actionFilter}
              onChange={(e) => {
                setActionFilter(e.target.value);
                setPage(1);
              }}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            >
              <option value="">All Security Actions</option>
              <option value="LOGIN">LOGIN</option>
              <option value="USER_CREATED">USER_CREATED</option>
              <option value="ROLE_CHANGED">ROLE_CHANGED</option>
              <option value="USER_ACTIVATED">USER_ACTIVATED</option>
              <option value="USER_DEACTIVATED">USER_DEACTIVATED</option>
              <option value="USER_SUSPENDED">USER_SUSPENDED</option>
              <option value="PASSWORD_RESET">PASSWORD_RESET</option>
              <option value="USER_DELETED">USER_DELETED</option>
            </select>
            <span className="text-xs text-slate-500">
              Showing {logs.length} of {total} events
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={fetchLogs}
            isLoading={isLoading}
            className="gap-1.5 text-xs text-slate-600 dark:text-slate-300"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </Button>
        </div>

        {/* Logs Table */}
        <div className="p-6 overflow-y-auto flex-1">
          {isLoading && logs.length === 0 ? (
            <div className="py-16 text-center text-xs text-slate-400">
              Loading security audit stream...
            </div>
          ) : logs.length === 0 ? (
            <div className="py-16 text-center text-xs text-slate-400">
              No audit log records found matching the filter criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="pb-3 pr-4">Timestamp</th>
                    <th className="pb-3 px-4">Action</th>
                    <th className="pb-3 px-4">Actor</th>
                    <th className="pb-3 px-4">Target User</th>
                    <th className="pb-3 pl-4">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {logs.map((log) => {
                    const actorBadge = ROLE_BADGES[normalizeRole(log.userRole)] || ROLE_BADGES.MEMBER;
                    return (
                      <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 pr-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                          {new Date(log.createdAt).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getActionBadge(log.action)}`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                              {log.userEmail}
                            </span>
                            <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold border ${actorBadge.bg} ${actorBadge.text} ${actorBadge.border}`}>
                              {log.userRole}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                          {log.targetUserEmail || '—'}
                        </td>
                        <td className="py-3 pl-4 text-slate-500 text-[11px] font-mono max-w-[200px] truncate">
                          {log.metadata ? JSON.stringify(log.metadata) : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer with close button */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Audit logs are permanently recorded and cannot be altered.
          </div>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
