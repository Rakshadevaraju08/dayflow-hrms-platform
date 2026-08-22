import axios from 'axios';

// Create a configured axios instance
export const apiClient = axios.create({
  // Use environment variable if set, otherwise default to local backend
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle global errors like 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the token is invalid or expired
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized access. Token may have expired.");
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // We don't want to force reload if we're already on login page
      if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
        window.location.href = '/login';
      }
    }
    
    // Provide a consistent error object shape to the services
    const apiError = new Error(
      error.response?.data?.message || error.message || 'An unexpected error occurred'
    );
    apiError.status = error.response?.status;
    apiError.data = error.response?.data;
    
    return Promise.reject(apiError);
  }
);
