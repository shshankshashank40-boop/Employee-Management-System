import api from './api';

export const getEmployees = async (params = {}) => {
  const queryParams = new URLSearchParams();
  if (params.search && params.search.trim()) {
    queryParams.append('search', params.search.trim());
  }
  if (params.department && params.department.trim() && params.department !== 'All') {
    queryParams.append('department', params.department.trim());
  }
  if (params.sort && params.sort !== 'newest') {
    queryParams.append('sort', params.sort);
  }

  const queryString = queryParams.toString();
  const url = queryString ? `/employees?${queryString}` : '/employees';
  const response = await api.get(url);
  return response.data;
};

export const getEmployeeById = async (id) => {
  const response = await api.get(`/employees/${id}`);
  return response.data;
};

export const createEmployee = async (employeeData) => {
  const response = await api.post('/employees', employeeData);
  return response.data;
};

export const updateEmployee = async (id, employeeData) => {
  const response = await api.put(`/employees/${id}`, employeeData);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await api.delete(`/employees/${id}`);
  return response.data;
};

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};
