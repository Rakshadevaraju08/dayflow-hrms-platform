import { apiClient } from './apiClient';

export const authService = {
  
  /**
   * Register a new user
   * @param {Object} userData - { firstName, lastName, email, password }
   */
  signup: async (userData) => {
    const response = await apiClient.post('/auth/signup', userData);
    return response.data;
  },

  /**
   * Login an existing user
   * @param {Object} credentials - { email, password }
   */
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  /**
   * Get the current authenticated user's details
   */
  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  /**
   * Logout user (Client-side clear)
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
