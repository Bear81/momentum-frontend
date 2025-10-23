/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api, {
  setTokens as persistTokens,
  getTokens as readTokens,
} from '../lib/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);
const USER_KEY = 'auth_user';

export function AuthProvider({ children }) {
  const [tokens, setTokens] = useState(() => readTokens());
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  const isAuthenticated = !!tokens?.access;

  useEffect(() => {
    // keep localStorage in sync when tokens change through axios interceptor
    if (tokens) persistTokens(tokens);
  }, [tokens]);

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  const login = async ({ username, password }) => {
    try {
      const obtainUrl = import.meta.env.VITE_JWT_OBTAIN || '/auth/token/';
      const { data } = await api.post(obtainUrl, { username, password });
      const next = { access: data.access, refresh: data.refresh };
      setTokens(next);
      persistTokens(next);
      setUser({ username });
      toast.success('Logged in');
      return true;
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.non_field_errors?.[0] ||
        'Invalid credentials';
      toast.error(String(msg));
      return false;
    }
  };

  const logout = () => {
    setTokens(null);
    localStorage.removeItem('auth_tokens');
    localStorage.removeItem(USER_KEY);
    toast.success('Logged out');
  };

  const value = useMemo(
    () => ({ tokens, user, isAuthenticated, login, logout }),
    [tokens, user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
