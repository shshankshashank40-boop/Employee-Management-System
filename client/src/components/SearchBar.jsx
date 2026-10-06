import React from 'react';
import { Search, UserPlus, X, Filter, ArrowUpDown } from 'lucide-react';

const SearchBar = ({
  searchQuery,
  onSearchChange,
  departmentFilter,
  onDepartmentChange,
  departments,
  sortBy = 'newest',
  onSortChange,
  onOpenAddModal,
  onClearFilters,
}) => {
  const hasActiveFilters =
    searchQuery.trim() !== '' || departmentFilter !== 'All' || sortBy !== 'newest';

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search & Filter Group */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 flex-1 items-stretch sm:items-center">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[220px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="employee-search-input"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search employees by name or email..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-900 placeholder-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Department Filter Dropdown */}
          <div className="relative sm:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Filter className="w-4 h-4" />
            </div>
            <select
              id="department-filter-select"
              value={departmentFilter}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-900 appearance-none cursor-pointer"
            >
              <option value="All">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <span className="text-xs">▼</span>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="relative sm:w-44">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <ArrowUpDown className="w-4 h-4" />
            </div>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-900 appearance-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name_asc">Name A → Z</option>
              <option value="name_desc">Name Z → A</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <span className="text-xs">▼</span>
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center justify-center px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-3.5 h-3.5 mr-1" />
              Clear Filters
            </button>
          )}
        </div>

        {/* Add Employee CTA Button */}
        <div>
          <button
            id="add-employee-button"
            onClick={onOpenAddModal}
            className="w-full md:w-auto inline-flex items-center justify-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-sm hover:shadow transition-all duration-150 active:scale-[0.98]"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add Employee</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
