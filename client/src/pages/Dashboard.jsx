import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from '../components/Header';
import StatsOverview from '../components/StatsOverview';
import SearchBar from '../components/SearchBar';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeModal from '../components/EmployeeModal';
import EmployeeDetailModal from '../components/EmployeeDetailModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import EmptyState from '../components/EmptyState';
import Toast from '../components/Toast';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  checkHealth,
} from '../services/employeeService';
import { AlertCircle, RefreshCw } from 'lucide-react';

const Dashboard = () => {
  // Main data states
  const [employees, setEmployees] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [isBackendOnline, setIsBackendOnline] = useState(false);

  // Search, Filter & Sort state
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [recentEmployees, setRecentEmployees] = useState([]);

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedEmployeeForEdit, setSelectedEmployeeForEdit] = useState(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedEmployeeForDetail, setSelectedEmployeeForDetail] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployeeForDelete, setSelectedEmployeeForDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Notification Toast state
  const [toast, setToast] = useState(null);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  // Check backend health
  const verifyBackend = useCallback(async () => {
    try {
      await checkHealth();
      setIsBackendOnline(true);
    } catch {
      setIsBackendOnline(false);
    }
  }, []);

  // Fetch stats (total count and recently added) from backend
  const refreshStats = useCallback(async () => {
    try {
      const res = await getEmployees({ sort: 'newest' });
      if (res && res.success) {
        setTotalCount(res.data.length);
        setRecentEmployees(res.data.slice(0, 3));
      }
    } catch (e) {
      // background refresh
    }
  }, []);

  // Fetch employees from API with current search, department, and sort
  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const response = await getEmployees({
        search: searchQuery,
        department: departmentFilter,
        sort: sortBy,
      });

      if (response && response.success) {
        setEmployees(response.data || []);
        setIsBackendOnline(true);
      }
    } catch (err) {
      console.error('Failed to fetch employees:', err);
      const errMsg =
        err.message ||
        'Unable to connect to the backend server. Please verify your MongoDB & API connection.';
      setApiError(errMsg);
      setIsBackendOnline(false);
      showToast('error', 'API Failure', errMsg);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, departmentFilter, sortBy]);

  // Initial load and filter change trigger with slight debounce for typing
  useEffect(() => {
    verifyBackend();
    refreshStats();
    const timer = setTimeout(() => {
      fetchEmployees();
    }, 250); // 250ms debounce for search query

    return () => clearTimeout(timer);
  }, [fetchEmployees, verifyBackend, refreshStats]);

  // Extract distinct departments list from all known employees
  const distinctDepartments = useMemo(() => {
    const defaultDepts = [
      'Engineering',
      'Human Resources',
      'Finance',
      'Marketing',
      'Sales',
      'Design',
      'Operations',
      'Customer Support',
    ];
    const foundDepts = employees.map((e) => e.department).filter(Boolean);
    const set = new Set([...defaultDepts, ...foundDepts]);
    return Array.from(set).sort();
  }, [employees]);

  // Handler: Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setDepartmentFilter('All');
    setSortBy('newest');
  };

  // Handler: Open Add Modal
  const handleOpenAddModal = () => {
    setSelectedEmployeeForEdit(null);
    setIsFormModalOpen(true);
  };

  // Handler: Open Edit Modal
  const handleOpenEditModal = (employee) => {
    setSelectedEmployeeForEdit(employee);
    setIsFormModalOpen(true);
  };

  // Handler: Open Details Modal (with fresh API fetch for accuracy)
  const handleOpenDetailModal = async (employee) => {
    setSelectedEmployeeForDetail(employee);
    setIsDetailModalOpen(true);
    try {
      const res = await getEmployeeById(employee._id);
      if (res && res.success) {
        setSelectedEmployeeForDetail(res.data);
      }
    } catch (err) {
      console.error('Could not refresh employee detail:', err);
    }
  };

  // Handler: Open Delete Confirmation Modal
  const handleOpenDeleteModal = (employee) => {
    setSelectedEmployeeForDelete(employee);
    setIsDeleteModalOpen(true);
  };

  // Handler: Submit Create / Edit Form
  const handleFormSubmit = async (formData) => {
    setIsSubmittingForm(true);
    try {
      if (selectedEmployeeForEdit) {
        // Update
        const res = await updateEmployee(selectedEmployeeForEdit._id, formData);
        showToast('success', 'Employee Updated', `${res.data.name}'s profile has been updated.`);
      } else {
        // Create
        const res = await createEmployee(formData);
        showToast('success', 'Employee Created', `${res.data.name} has been added successfully.`);
      }
      setIsFormModalOpen(false);
      fetchEmployees();
      refreshStats();
    } catch (err) {
      showToast('error', 'Operation Failed', err.message || 'Failed to save employee');
    } finally {
      setIsSubmittingForm(false);
    }
  };

  // Handler: Confirm Deletion
  const handleConfirmDelete = async () => {
    if (!selectedEmployeeForDelete) return;
    setIsDeleting(true);
    try {
      await deleteEmployee(selectedEmployeeForDelete._id);
      showToast(
        'success',
        'Employee Deleted',
        `${selectedEmployeeForDelete.name} was removed from the database.`
      );
      setIsDeleteModalOpen(false);
      setSelectedEmployeeForDelete(null);
      fetchEmployees();
      refreshStats();
    } catch (err) {
      showToast('error', 'Deletion Failed', err.message || 'Failed to delete employee');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Navigation Header */}
      <Header isBackendOnline={isBackendOnline} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* API Error Notification */}
        {apiError && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start justify-between text-rose-900 shadow-sm">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Database / API Connection Error</h4>
                <p className="text-xs text-rose-700 mt-0.5">{apiError}</p>
              </div>
            </div>
            <button
              onClick={() => {
                verifyBackend();
                fetchEmployees();
                refreshStats();
              }}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg transition-colors flex-shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Dashboard Title & Overview */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Employee Directory
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage your organization's workforce, departments, and roles in real-time.
          </p>
        </div>

        {/* Stats Metrics Cards */}
        <StatsOverview
          totalEmployees={totalCount || employees.length}
          departmentsCount={distinctDepartments.length}
          recentEmployees={recentEmployees}
        />

        {/* Search, Filter & Action Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          departmentFilter={departmentFilter}
          onDepartmentChange={setDepartmentFilter}
          departments={distinctDepartments}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onOpenAddModal={handleOpenAddModal}
          onClearFilters={handleClearFilters}
        />

        {/* Employee Content (Table / Card Grid / Empty State) */}
        {isLoading ? (
          <EmployeeTable isLoading={true} />
        ) : employees.length === 0 ? (
          <EmptyState
            isFiltered={searchQuery.trim() !== '' || departmentFilter !== 'All'}
            onClearFilters={handleClearFilters}
            onOpenAddModal={handleOpenAddModal}
          />
        ) : (
          <EmployeeTable
            employees={employees}
            isLoading={false}
            onViewEmployee={handleOpenDetailModal}
            onEditEmployee={handleOpenEditModal}
            onDeleteEmployee={handleOpenDeleteModal}
          />
        )}
      </main>

      {/* Add / Edit Modal */}
      <EmployeeModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        employee={selectedEmployeeForEdit}
        isSubmitting={isSubmittingForm}
      />

      {/* Employee Detail Modal */}
      <EmployeeDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        employee={selectedEmployeeForDetail}
        onEdit={(emp) => {
          setSelectedEmployeeForEdit(emp);
          setIsFormModalOpen(true);
        }}
        onDelete={(emp) => {
          setSelectedEmployeeForDelete(emp);
          setIsDeleteModalOpen(true);
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        employee={selectedEmployeeForDelete}
        isDeleting={isDeleting}
      />

      {/* Toast Notification Alert */}
      <Toast notification={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default Dashboard;
