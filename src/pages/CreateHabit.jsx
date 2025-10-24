import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext.jsx';
import { notify } from '../utils/notify';

const PERIODS = ['daily', 'weekly', 'monthly'];

export default function CreateHabit() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    period: 'daily',
    target: 1,
    description: '',
    tags: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthenticated)
    return <Alert variant="info">Please log in to create a habit.</Alert>;

  const setField = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        name === 'target'
          ? value === ''
            ? ''
            : Number(value)
          : name === 'period'
          ? String(value).toLowerCase()
          : value,
    }));
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = 'Name is required.';
    if (!PERIODS.includes(String(form.period).toLowerCase()))
      err.period = 'Period must be daily, weekly, or monthly.';
    const t = Number(form.target);
    if (!(t >= 1)) err.target = 'Target must be 1 or greater.';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        period: form.period,
        target: Number(form.target),
        ...(form.description ? { description: form.description } : {}),
        ...(form.tags ? { tags: form.tags } : {}),
      };
      await api.post('habits/', payload);
      notify.success('Habit created successfully!');
      navigate('/habits');
    } catch (err) {
      const data = err?.response?.data || {};
      const first = Object.keys(data)[0];
      if (first)
        notify.error(
          `${first}: ${
            Array.isArray(data[first]) ? data[first][0] : data[first]
          }`
        );
      else notify.error('Failed to create habit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-4" style={{ maxWidth: 560 }}>
      <h2 className="mb-3">Create Habit</h2>

      <Form noValidate onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="hab-name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={form.name}
            onChange={setField}
            isInvalid={!!errors.name}
            placeholder="e.g. Morning Run"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="hab-period">
          <Form.Label>Period</Form.Label>
          <Form.Select
            name="period"
            value={form.period}
            onChange={setField}
            isInvalid={!!errors.period}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.period}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="hab-target">
          <Form.Label>Target (per period)</Form.Label>
          <Form.Control
            name="target"
            type="number"
            min={1}
            value={form.target}
            onChange={setField}
            isInvalid={!!errors.target}
          />
          <Form.Control.Feedback type="invalid">
            {errors.target}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="hab-desc">
          <Form.Label>Description (optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={form.description}
            onChange={setField}
            placeholder="Short description…"
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="hab-tags">
          <Form.Label>Tags (optional)</Form.Label>
          <Form.Control
            name="tags"
            value={form.tags}
            onChange={setField}
            placeholder="e.g. health, cardio"
          />
        </Form.Group>

        <Button type="submit" className="w-100" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Habit'}
        </Button>
      </Form>
    </Container>
  );
}
