// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

// Storage key kept in one place for easy refactor
const AUTH_KEY = 'auth'; // { user: { username, ... }, access?: string, refresh?: string }

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Rehydrate on first load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed?.user?.username) setUser(parsed.user);
    } catch {
      // if corrupted, clear it
      localStorage.removeItem(AUTH_KEY);
    }
  }, []);

  const isAuthenticated = !!user;

  const login = ({ user, access, refresh }) => {
    // `user` must at least contain { username }
    const payload = {
      user,
      ...(access ? { access } : {}),
      ...(refresh ? { refresh } : {}),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
    setUser(user);
  };

  const logout = () => {
    // await axios.post("/dj-rest-auth/logout/");
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated, login, logout }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
