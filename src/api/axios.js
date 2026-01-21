// src/api/axios.js
import axios from 'axios';
import { notify } from '../utils/notify';

const raw = import.meta.env.VITE_API_BASE;
if (!raw) throw new Error('VITE_API_BASE is not set');

const root = raw.replace(/\/+$/, '');
const baseURL = `${root}/api/v1/`;

const api = axios.create({
  baseURL,
  withCredentials: false, // JWT tokens, not cookies
});

// ✅ Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Global error handler for 401s and generic API errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      notify.error('Session expired. Please log in again.');
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('authTokens');
      // avoid redirect loops
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    } else if (status >= 500) {
      notify.error('Server error. Please try again later.');
    }

    return Promise.reject(error);
  }
);

export default api;
