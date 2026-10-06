import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

const Toast = ({ notification, onClose }) => {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  if (!notification) return null;

  const isSuccess = notification.type === 'success';
  const isError = notification.type === 'error';

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-full px-4 animate-slide-up">
      <div
        className={`flex items-start p-4 rounded-xl border shadow-lg backdrop-blur-md transition-all ${
          isSuccess
            ? 'bg-emerald-50/95 border-emerald-200 text-emerald-900'
            : isError
            ? 'bg-rose-50/95 border-rose-200 text-rose-900'
            : 'bg-sky-50/95 border-sky-200 text-sky-900'
        }`}
      >
        <div className="flex-shrink-0 mt-0.5">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-600" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-600" />}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-semibold">{notification.title || (isSuccess ? 'Success' : 'Error')}</p>
          <p className="text-sm mt-0.5 opacity-90">{notification.message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-3 flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors text-slate-500 hover:text-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
