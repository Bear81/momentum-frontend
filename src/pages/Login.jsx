// src/pages/Login.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, from, navigate]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) return;

    setLoading(true);
    try {
      // ✅ NOTE: no leading slash — baseURL already ends with /api/v1/
      const { data } = await api.post('auth/token/', {
        username: form.username,
        password: form.password,
      });
      // data: { access, refresh }
      toast.success('Login successful!');

      // ✅ Write tokens exactly where axios interceptor expects them
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      localStorage.setItem('authTokens', JSON.stringify(data));

      // ✅ Update context (preserve your existing shape)
      const user = { username: form.username }; // SimpleJWT doesn't return user details
      if (typeof login === 'function') {
        login({ user, access: data.access, refresh: data.refresh });
      }

      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err?.response || err);
      const status = err?.response?.status;
      if (status === 401) {
        toast.error('Invalid username or password');
      } else {
        toast.error('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-4" style={{ maxWidth: 420 }}>
      <h1 className="mb-3">Login</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            name="username"
            className="form-control"
            autoComplete="username"
            value={form.username}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            autoComplete="current-password"
            value={form.password}
            onChange={onChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </section>
  );
}
