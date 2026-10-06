import React from 'react';
import { Users, Building2, Clock } from 'lucide-react';

const StatsOverview = ({ totalEmployees, departmentsCount, recentEmployees = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {/* Total Employees */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total Employees
          </p>
          <div className="flex items-baseline space-x-2 mt-1">
            <h3 className="text-2xl font-bold text-slate-900">{totalEmployees}</h3>
            <span className="text-xs text-slate-500">active members</span>
          </div>
        </div>
        <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
          <Users className="w-6 h-6" />
        </div>
      </div>

      {/* Departments */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total Departments
          </p>
          <div className="flex items-baseline space-x-2 mt-1">
            <h3 className="text-2xl font-bold text-slate-900">{departmentsCount}</h3>
            <span className="text-xs text-slate-500">departments</span>
          </div>
        </div>
        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
          <Building2 className="w-6 h-6" />
        </div>
      </div>

      {/* Recently Added Employees */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between sm:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Recently Added
          </p>
          <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        {recentEmployees && recentEmployees.length > 0 ? (
          <div className="space-y-1.5">
            {recentEmployees.slice(0, 2).map((emp) => (
              <div key={emp._id} className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 truncate max-w-[150px]">
                  {emp.name}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                  {emp.department}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">No employees added yet</p>
        )}
      </div>
    </div>
  );
};

export default StatsOverview;

