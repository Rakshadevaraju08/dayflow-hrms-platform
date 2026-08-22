import { apiClient } from './apiClient';

export const payrollService = {
  
  /**
   * Get payroll details for the current employee
   */
  getMyPayroll: async () => {
    const response = await apiClient.get('/payroll/me');
    return response.data;
  },

  /**
   * (HR Only) Get payroll details for all employees
   */
  getAllPayroll: async () => {
    const response = await apiClient.get('/payroll');
    return response.data;
  },

  /**
   * (HR Only) Update an employee's payroll
   * @param {String} employeeId - ID of the employee
   * @param {Object} payrollData - { baseSalary, allowances, deductions, effectiveDate }
   */
  updatePayroll: async (employeeId, payrollData) => {
    const response = await apiClient.put(`/payroll/${employeeId}`, payrollData);
    return response.data;
  }
};
