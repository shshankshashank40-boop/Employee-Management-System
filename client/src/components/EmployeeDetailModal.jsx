import React from 'react';
import { X, User, Mail, Building2, Briefcase, Calendar, Hash, Edit2, Trash2 } from 'lucide-react';

const EmployeeDetailModal = ({ isOpen, onClose, employee, onEdit, onDelete }) => {
  if (!isOpen || !employee) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-scale-up">
        {/* Header with Avatar */}
        <div className="px-6 pt-6 pb-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white flex items-start justify-between relative">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-xl font-bold text-white shadow-inner">
              {employee.name
                ? employee.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .substring(0, 2)
                    .toUpperCase()
                : 'EM'}
            </div>
            <div>
              <h3 className="text-xl font-bold leading-tight">{employee.name}</h3>
              <p className="text-teal-100 text-sm mt-0.5">{employee.designation}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Detail Content */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                <Mail className="w-3.5 h-3.5 text-teal-600" />
                <span>Email</span>
              </div>
              <p className="text-sm font-medium text-slate-900 break-all font-mono">
                {employee.email}
              </p>
            </div>

            {/* Department */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                <Building2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Department</span>
              </div>
              <p className="text-sm font-medium text-slate-900">
                {employee.department}
              </p>
            </div>

            {/* Designation */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                <Briefcase className="w-3.5 h-3.5 text-teal-600" />
                <span>Designation</span>
              </div>
              <p className="text-sm font-medium text-slate-900">
                {employee.designation}
              </p>
            </div>

            {/* Employee ID */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                <Hash className="w-3.5 h-3.5 text-teal-600" />
                <span>MongoDB ID</span>
              </div>
              <p className="text-xs font-mono text-slate-600 truncate" title={employee._id}>
                {employee._id}
              </p>
            </div>
          </div>

          {/* Timestamps */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500 space-y-1">
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Created At:</span>
              </span>
              <span className="font-medium text-slate-700">{formatDate(employee.createdAt)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Last Updated:</span>
              </span>
              <span className="font-medium text-slate-700">{formatDate(employee.updatedAt)}</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                onClose();
                onDelete(employee);
              }}
              className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-medium text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  onClose();
                  onEdit(employee);
                }}
                className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailModal;
