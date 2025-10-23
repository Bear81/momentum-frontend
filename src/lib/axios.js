import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000/api/v1/',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false, // JWT in header
});

const TOKEN_KEY = 'auth_tokens';
const USER_KEY = 'auth_user';

// token helpers
export function getTokens() {
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
export function setTokens(tokens) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
}
export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
function clearAuthAndRedirect() {
  clearAuth();
  if (typeof window !== 'undefined') window.location.assign('/login');
}

// attach access token
api.interceptors.request.use((config) => {
  const tokens = getTokens();
  if (tokens?.access) config.headers.Authorization = `Bearer ${tokens.access}`;
  return config;
});

// auto-refresh on 401 once
let isRefreshing = false;
let queue = [];

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error.config;
    const status = error?.response?.status;

    if (status !== 401 || original._retry) return Promise.reject(error);

    const tokens = getTokens();
    if (!tokens?.refresh) {
      clearAuthAndRedirect();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject });
      })
        .then((newAccess) => {
          original.headers.Authorization = `Bearer ${newAccess}`;
          return api(original);
        })
        .catch(Promise.reject);
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const refreshUrl =
        import.meta.env.VITE_JWT_REFRESH || '/auth/token/refresh/';
      const { data } = await api.post(refreshUrl, { refresh: tokens.refresh });
      const newTokens = { access: data.access, refresh: tokens.refresh };
      setTokens(newTokens);

      queue.forEach(({ resolve }) => resolve(newTokens.access));
      queue = [];
      isRefreshing = false;

      original.headers.Authorization = `Bearer ${newTokens.access}`;
      return api(original);
    } catch (e) {
      queue.forEach(({ reject }) => reject(e));
      queue = [];
      isRefreshing = false;
      clearAuthAndRedirect();
      return Promise.reject(e);
    }
  }
);

export default api;
