import { apiClient } from './apiClient';

export const employeeService = {
  
  /**
   * Get the current authenticated employee's profile
   */
  getMyProfile: async () => {
    const response = await apiClient.get('/employees/me');
    return response.data;
  },

  /**
   * Update the current authenticated employee's profile
   * @param {Object} data - Profile data to update (e.g. phone, address)
   */
  updateMyProfile: async (data) => {
    const response = await apiClient.put('/employees/me', data);
    return response.data;
  },

  /**
   * (HR Only) Get all employees
   */
  getAllEmployees: async () => {
    const response = await apiClient.get('/employees');
    return response.data;
  },

  /**
   * (HR Only) Get a specific employee by ID
   */
  getEmployeeById: async (id) => {
    const response = await apiClient.get(`/employees/${id}`);
    return response.data;
  },

  /**
   * (HR Only) Update a specific employee
   */
  updateEmployee: async (id, data) => {
    const response = await apiClient.put(`/employees/${id}`, data);
    return response.data;
  }
};
