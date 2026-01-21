// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api/axios';
import { notify } from '../utils/notify';

// API URL
const REGISTER_PATH = 'api/v1/auth/register/';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth(); // for auto-login after successful register

  const [form, setForm] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Username is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = 'Enter a valid email address';
    if (!form.password1) e.password1 = 'Password is required';
    else if (form.password1.length < 8)
      e.password1 = 'Password must be at least 8 characters';
    if (!form.password2) e.password2 = 'Please confirm your password';
    else if (form.password2 !== form.password1)
      e.password2 = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Backend expects: username, email, password, password2
      const payload = {
        username: form.username,
        email: form.email,
        password: form.password1,
        password2: form.password2,
      };

      const { data, status } = await api.post(REGISTER_PATH, payload);
      console.log('Register response:', status, data);

      // If backend returns tokens, auto-login; else redirect to login
      const { user, access, refresh } = data || {};
      if (access && refresh) {
        const u = user || { username: form.username, email: form.email };
        login({ user: u, access, refresh });
        notify.success('Account created — you’re in!');
        navigate('/dashboard', { replace: true });
      } else {
        notify.success('Account created! Please log in.');
        navigate('/login', { replace: true });
      }
    } catch (err) {
      const resp = err?.response;
      console.error('Register error:', resp || err);

      const data = resp?.data || {};
      const newErrors = {};
      // Map common field errors
      ['username', 'email', 'password', 'password2'].forEach((k) => {
        if (data[k])
          newErrors[k] = Array.isArray(data[k]) ? data[k][0] : String(data[k]);
      });
      // Handle non_field_errors or detail strings
      if (
        !Object.keys(newErrors).length &&
        (data.non_field_errors || data.detail)
      ) {
        notify.error(
          Array.isArray(data.non_field_errors)
            ? data.non_field_errors.join(' ')
            : data.detail || 'Registration failed.'
        );
      }
      setErrors(newErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-4" style={{ maxWidth: 520 }}>
      <h1 className="mb-3">Create an account</h1>
      <form onSubmit={onSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="reg-username" className="form-label">
            Username
          </label>
          <input
            id="reg-username"
            name="username"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            value={form.username}
            onChange={onChange}
            required
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="reg-email" className="form-label">
            Email
          </label>
          <input
            id="reg-email"
            name="email"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={form.email}
            onChange={onChange}
            required
          />
          {errors.email && (
            <div className="invalid-feedback d-block">{errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="reg-password1" className="form-label">
            Password
          </label>
          <input
            id="reg-password1"
            name="password1"
            type="password"
            className={`form-control ${errors.password1 ? 'is-invalid' : ''}`}
            value={form.password1}
            onChange={onChange}
            required
            autoComplete="new-password"
          />
          <div className="form-text">Minimum 8 characters</div>
          {errors.password1 && (
            <div className="invalid-feedback">{errors.password1}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="reg-password2" className="form-label">
            Confirm password
          </label>
          <input
            id="reg-password2"
            name="password2"
            type="password"
            className={`form-control ${errors.password2 ? 'is-invalid' : ''}`}
            value={form.password2}
            onChange={onChange}
            required
            autoComplete="new-password"
          />
          {errors.password2 && (
            <div className="invalid-feedback">{errors.password2}</div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </section>
  );
}
