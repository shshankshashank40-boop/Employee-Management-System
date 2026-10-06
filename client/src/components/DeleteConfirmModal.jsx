import React from 'react';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, employee, isDeleting }) => {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-scale-up">
        <div className="p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Delete Employee</h3>
            </div>
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-4 text-sm text-slate-600 space-y-2">
            <p>
              Are you sure you want to permanently delete{' '}
              <strong className="text-slate-900">{employee.name}</strong> (
              <span className="font-mono text-xs">{employee.email}</span>)?
            </p>
            <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-100">
              This action cannot be undone. The record will be deleted from the MongoDB database immediately.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              id="confirm-delete-btn"
              onClick={onConfirm}
              disabled={isDeleting}
              className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-all disabled:opacity-50"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <span>Yes, Delete</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
