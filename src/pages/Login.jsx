import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) return;
    setLoading(true);
    const ok = await login(form);
    setLoading(false);
    if (ok) navigate(from, { replace: true });
  };

  if (isAuthenticated) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={onSubmit} style={{ maxWidth: 380 }}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={form.username}
          onChange={onChange}
          required
        />

        <label htmlFor="password" style={{ marginTop: 12 }}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          required
        />

        <button type="submit" disabled={loading} style={{ marginTop: 16 }}>
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </section>
  );
}
