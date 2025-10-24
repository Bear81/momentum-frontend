import axios from 'axios';

const raw = import.meta.env.VITE_API_BASE;
if (!raw) throw new Error('VITE_API_BASE is not set');

const baseURL = raw.endsWith('/') ? raw : `${raw}/`;

const api = axios.create({
  baseURL, // e.g. https://.../api/v1/
  withCredentials: false, // JWT tokens, not cookies
});

// Always send JWT from localStorage under key "access"
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
