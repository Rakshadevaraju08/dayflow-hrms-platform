import { API_BASE_URL } from './api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Something went wrong. Please try again.');
  return data;
}

export const login = (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
export const signup = (details) => request('/auth/signup', { method: 'POST', body: JSON.stringify(details) });
export const getMe = (token) => request('/auth/me', { headers: { Authorization: `Bearer ${token}` } });