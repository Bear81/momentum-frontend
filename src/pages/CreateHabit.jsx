import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import api from '../api/axios';
import { notify } from '../utils/notify';
import { useAuth } from '../context/AuthContext.jsx';

export default function CreateHabit() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // match backend model fields
  const [form, setForm] = useState({
    name: '',
    period: 'daily', // backend default
    target: 1, // backend default
    description: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthenticated)
    return <Alert variant="info">Please log in to create a habit.</Alert>;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === 'period' ? value.toLowerCase() : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) {
      setError('Name is required.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // build payload with only relevant fields
      const payload = {
        name: form.name.trim(),
        period: form.period || 'daily',
        ...(form.description ? { description: form.description } : {}),
        ...(form.tags ? { tags: form.tags } : {}),
        ...(form.target ? { target: Number(form.target) } : {}),
      };

      await api.post('habits/', payload); // -> <base>/habits/
      notify.success('Habit created successfully!');
      navigate('/habits');
    } catch (err) {
      console.error('Create habit error:', err?.response || err);
      const data = err?.response?.data || {};
      // surface DRF errors if present
      const firstField = Object.keys(data)[0];
      if (firstField)
        setError(
          `${firstField}: ${
            Array.isArray(data[firstField])
              ? data[firstField][0]
              : data[firstField]
          }`
        );
      else if (err?.response?.status === 401)
        setError('Unauthorized. Please log in again.');
      else if (err?.response?.status === 400)
        setError('Please fill all required fields.');
      else setError('Failed to create habit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4" style={{ maxWidth: 560 }}>
      <h2 className="mb-3">Create Habit</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="e.g. Morning Run"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Period</Form.Label>
          <Form.Select name="period" value={form.period} onChange={onChange}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Target (per period)</Form.Label>
          <Form.Control
            name="target"
            type="number"
            min={1}
            value={form.target}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description (optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={form.description}
            onChange={onChange}
            placeholder="Short description…"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Tags (optional)</Form.Label>
          <Form.Control
            name="tags"
            value={form.tags}
            onChange={onChange}
            placeholder="e.g. health, cardio"
          />
        </Form.Group>

        <Button type="submit" className="w-100" disabled={loading}>
          {loading ? 'Saving...' : 'Save Habit'}
        </Button>
      </Form>
    </Container>
  );
}
