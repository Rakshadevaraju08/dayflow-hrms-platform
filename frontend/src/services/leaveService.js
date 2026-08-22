import { apiClient } from './apiClient';

export const leaveService = {
  
  /**
   * Apply for a new leave
   * @param {Object} leaveData - { leaveType, startDate, endDate, reason }
   */
  applyLeave: async (leaveData) => {
    const response = await apiClient.post('/leave', leaveData);
    return response.data;
  },

  /**
   * Get leave history for the current employee
   */
  getMyLeaves: async () => {
    const response = await apiClient.get('/leave/me');
    return response.data;
  },

  /**
   * (HR Only) Get all leave requests for the organization
   */
  getAllLeaves: async () => {
    const response = await apiClient.get('/leave');
    return response.data;
  },

  /**
   * (HR Only) Approve a leave request
   * @param {String} id - Leave ID
   */
  approveLeave: async (id) => {
    const response = await apiClient.patch(`/leave/${id}/approve`);
    return response.data;
  },

  /**
   * (HR Only) Reject a leave request
   * @param {String} id - Leave ID
   * @param {String} reason - Reason for rejection
   */
  rejectLeave: async (id, reason) => {
    const response = await apiClient.patch(`/leave/${id}/reject`, { reason });
    return response.data;
  }
};
