import { apiClient } from './apiClient';

export const attendanceService = {
  
  /**
   * Check in the current user for today
   */
  checkIn: async () => {
    const response = await apiClient.post('/attendance/check-in');
    return response.data;
  },

  /**
   * Check out the current user for today
   */
  checkOut: async () => {
    const response = await apiClient.post('/attendance/check-out');
    return response.data;
  },

  /**
   * Get attendance records for the current user
   * @param {Object} params - Query params (e.g. startDate, endDate)
   */
  getMyAttendance: async (params) => {
    const response = await apiClient.get('/attendance/me', { params });
    return response.data;
  },

  /**
   * (HR Only) Get all attendance records for the organization
   * @param {Object} params - Query params (e.g. date, employeeId, department)
   */
  getAllAttendance: async (params) => {
    const response = await apiClient.get('/attendance', { params });
    return response.data;
  }
};
