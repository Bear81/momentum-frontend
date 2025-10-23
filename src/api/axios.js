import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // now points to .../api/v1
});

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('auth');
  if (raw) {
    try {
      const { access } = JSON.parse(raw);
      if (access) config.headers.Authorization = `Bearer ${access}`;
    } catch {}
  }
  return config;
});

export default api;
