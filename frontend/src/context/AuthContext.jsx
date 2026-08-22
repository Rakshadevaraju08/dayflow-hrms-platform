import { createContext, useContext, useEffect, useState } from 'react';
import * as authApi from '../services/authApi';

const TOKEN_KEY = 'hrms_token';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    authApi.getMe(token)
      .then(({ user: restoredUser }) => setUser(restoredUser))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  async function login(credentials) {
    setError('');
    const response = await authApi.login(credentials);
    localStorage.setItem(TOKEN_KEY, response.token);
    setToken(response.token);
    setUser(response.user);
    return response.user;
  }

  async function signup(details) {
    setError('');
    await authApi.signup(details);
    return login({ email: details.email, password: details.password });
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    setError('');
  }

  return <AuthContext.Provider value={{ token, user, loading, error, setError, login, signup, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}