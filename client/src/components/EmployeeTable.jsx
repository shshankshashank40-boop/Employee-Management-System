import React from 'react';
import { Eye, Edit2, Trash2, Mail, Building2, Briefcase, User } from 'lucide-react';

const EmployeeTable = ({
  employees,
  isLoading,
  onViewEmployee,
  onEditEmployee,
  onDeleteEmployee,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="h-4 bg-slate-200 rounded w-32 animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded w-16 animate-pulse"></div>
        </div>
        <div className="divide-y divide-slate-100">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="p-4 flex items-center justify-between animate-pulse">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                  <div className="h-3 bg-slate-100 rounded w-1/4"></div>
                </div>
              </div>
              <div className="h-8 bg-slate-200 rounded w-28"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Generate department badge color mapping
  const getDepartmentBadge = (dept) => {
    const d = dept ? dept.toLowerCase() : '';
    if (d.includes('it') || d.includes('eng') || d.includes('tech') || d.includes('software')) {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    }
    if (d.includes('hr') || d.includes('human')) {
      return 'bg-rose-50 text-rose-700 border-rose-200';
    }
    if (d.includes('fin') || d.includes('account')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
    if (d.includes('market') || d.includes('sales')) {
      return 'bg-amber-50 text-amber-700 border-amber-200';
    }
    if (d.includes('design') || d.includes('ux') || d.includes('ui')) {
      return 'bg-purple-50 text-purple-700 border-purple-200';
    }
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div className="space-y-4">
      {/* Desktop Table View (Hidden on Mobile) */}
      <div className="hidden md:block bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50/80 text-xs uppercase font-semibold text-slate-600 tracking-wider">
            <tr>
              <th scope="col" className="px-6 py-3.5">
                Employee
              </th>
              <th scope="col" className="px-6 py-3.5">
                Email
              </th>
              <th scope="col" className="px-6 py-3.5">
                Department
              </th>
              <th scope="col" className="px-6 py-3.5">
                Designation
              </th>
              <th scope="col" className="px-6 py-3.5 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {employees.map((employee) => (
              <tr
                key={employee._id}
                className="hover:bg-slate-50/75 transition-colors group"
              >
                {/* Name & Avatar */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-semibold flex items-center justify-center text-xs flex-shrink-0">
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
                      <div className="font-medium text-slate-900">
                        {employee.name}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-mono text-xs">
                  {employee.email}
                </td>

                {/* Department */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getDepartmentBadge(
                      employee.department
                    )}`}
                  >
                    {employee.department}
                  </span>
                </td>

                {/* Designation */}
                <td className="px-6 py-4 whitespace-nowrap text-slate-700 font-medium">
                  {employee.designation}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <div className="inline-flex items-center space-x-1.5">
                    <button
                      id={`view-btn-${employee._id}`}
                      onClick={() => onViewEmployee(employee)}
                      title="View Details"
                      className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      id={`edit-btn-${employee._id}`}
                      onClick={() => onEditEmployee(employee)}
                      title="Edit Employee"
                      className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      id={`delete-btn-${employee._id}`}
                      onClick={() => onDeleteEmployee(employee)}
                      title="Delete Employee"
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Grid View (Shown on Mobile screens) */}
      <div className="md:hidden space-y-3">
        {employees.map((employee) => (
          <div
            key={employee._id}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-semibold flex items-center justify-center text-sm flex-shrink-0">
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
                  <h4 className="font-semibold text-slate-900">{employee.name}</h4>
                  <p className="text-xs text-slate-500 font-mono">{employee.email}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getDepartmentBadge(
                  employee.department
                )}`}
              >
                {employee.department}
              </span>
              <span className="text-slate-600 font-medium">{employee.designation}</span>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => onViewEmployee(employee)}
                className="inline-flex items-center space-x-1 text-xs px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View</span>
              </button>
              <button
                onClick={() => onEditEmployee(employee)}
                className="inline-flex items-center space-x-1 text-xs px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => onDeleteEmployee(employee)}
                className="inline-flex items-center space-x-1 text-xs px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeTable;
