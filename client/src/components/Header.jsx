import React from 'react';
import { Users, Server, Database, CheckCircle2, AlertCircle } from 'lucide-react';

const Header = ({ isBackendOnline }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  EmployeeHub
                </h1>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                React • Express REST API • MongoDB Atlas
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-xs text-slate-500 bg-slate-50 py-1.5 px-3 rounded-lg border border-slate-200">
              <Database className="w-3.5 h-3.5 text-teal-600" />
              <span>MongoDB Atlas</span>
            </div>

            <div
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
                isBackendOnline
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              {isBackendOnline ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>API Connected</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>API Offline</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
