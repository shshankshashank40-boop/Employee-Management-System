import React from 'react';
import { Users, UserPlus, SearchX } from 'lucide-react';

const EmptyState = ({ isFiltered, onClearFilters, onOpenAddModal }) => {
  if (isFiltered) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-4">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">No matching employees</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1 mb-6">
          We couldn't find any employees matching your current search or department filter.
        </p>
        <button
          onClick={onClearFilters}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
        >
          <span>Reset Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
      <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto text-teal-600 mb-4 shadow-sm">
        <Users className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">No employees registered yet</h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1 mb-6">
        Get started by adding your first employee to the MongoDB database.
      </p>
      <button
        onClick={onOpenAddModal}
        className="inline-flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-all"
      >
        <UserPlus className="w-4 h-4" />
        <span>Add First Employee</span>
      </button>
    </div>
  );
};

export default EmptyState;
