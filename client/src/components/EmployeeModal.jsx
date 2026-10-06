import React, { useState, useEffect } from 'react';
import { X, User, Mail, Building2, Briefcase, AlertCircle, Loader2 } from 'lucide-react';

const DEPARTMENT_OPTIONS = [
  'Engineering',
  'Human Resources',
  'Finance',
  'Marketing',
  'Sales',
  'Design',
  'Operations',
  'Customer Support',
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmployeeModal = ({ isOpen, onClose, onSubmit, employee, isSubmitting }) => {
  const isEditing = Boolean(employee);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    designation: '',
  });

  const [errors, setErrors] = useState({});
  const [customDepartment, setCustomDepartment] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        department: employee.department || '',
        designation: employee.designation || '',
      });
      // Check if department is in predefined list
      if (employee.department && !DEPARTMENT_OPTIONS.includes(employee.department)) {
        setCustomDepartment(true);
      } else {
        setCustomDepartment(false);
      }
    } else {
      setFormData({
        name: '',
        email: '',
        department: '',
        designation: '',
      });
      setCustomDepartment(false);
    }
    setErrors({});
    setServerError('');
  }, [employee, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Name is required (minimum 2 characters)';
    }

    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.department || formData.department.trim() === '') {
      newErrors.department = 'Department is required';
    }

    if (!formData.designation || formData.designation.trim() === '') {
      newErrors.designation = 'Designation is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await onSubmit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        department: formData.department.trim(),
        designation: formData.designation.trim(),
      });
    } catch (err) {
      setServerError(err.message || 'Failed to save employee record');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-scale-up">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {isEditing ? 'Edit Employee' : 'Add New Employee'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditing
                ? 'Update employee profile details in the database'
                : 'Fill in the information below to register a new employee'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Server Error Alert */}
          {serverError && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start space-x-2 text-rose-800 text-sm">
              <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="name"
                id="input-employee-name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Jane Doe"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                    : 'border-slate-200 focus:ring-teal-500 focus:bg-white'
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-rose-600 mt-1 flex items-center space-x-1">
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                name="email"
                id="input-employee-email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. jane.doe@company.com"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                    : 'border-slate-200 focus:ring-teal-500 focus:bg-white'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-rose-600 mt-1 flex items-center space-x-1">
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Department Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Department <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setCustomDepartment(!customDepartment);
                  setFormData((prev) => ({ ...prev, department: '' }));
                }}
                className="text-[11px] text-teal-600 hover:text-teal-700 hover:underline"
              >
                {customDepartment ? 'Choose from list' : '+ Enter custom'}
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Building2 className="w-4 h-4" />
              </div>
              {customDepartment ? (
                <input
                  type="text"
                  name="department"
                  id="input-employee-department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g. Product Research"
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.department
                      ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                      : 'border-slate-200 focus:ring-teal-500 focus:bg-white'
                  }`}
                />
              ) : (
                <select
                  name="department"
                  id="select-employee-department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-8 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                    errors.department
                      ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                      : 'border-slate-200 focus:ring-teal-500 focus:bg-white'
                  }`}
                >
                  <option value="">Select Department</option>
                  {DEPARTMENT_OPTIONS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {errors.department && (
              <p className="text-xs text-rose-600 mt-1 flex items-center space-x-1">
                <span>{errors.department}</span>
              </p>
            )}
          </div>

          {/* Designation Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Designation / Role <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Briefcase className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="designation"
                id="input-employee-designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="e.g. Senior Software Engineer"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.designation
                    ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                    : 'border-slate-200 focus:ring-teal-500 focus:bg-white'
                }`}
              />
            </div>
            {errors.designation && (
              <p className="text-xs text-rose-600 mt-1 flex items-center space-x-1">
                <span>{errors.designation}</span>
              </p>
            )}
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="submit-employee-btn"
              disabled={isSubmitting}
              className="inline-flex items-center space-x-2 px-5 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>{isEditing ? 'Save Changes' : 'Create Employee'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
