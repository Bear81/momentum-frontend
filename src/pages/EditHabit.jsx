import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';

export default function EditHabit() {
  const { isAuthenticated } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    period: 'daily',
    target: 1,
    description: '',
    tags: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    let active = true;
    (async () => {
      try {
        const { data } = await api.get(`habits/${id}/`);
        if (!active) return;
        setForm({
          name: data.name ?? '',
          period: data.period ?? 'daily',
          target: data.target ?? 1,
          description: data.description ?? '',
          tags: data.tags ?? '',
        });
      } catch (err) {
        if (!active) return;
        setError('Failed to load habit.');
        console.error('Load habit error:', err?.response || err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id, isAuthenticated]);

  if (!isAuthenticated)
    return <Alert variant="info">Please log in to edit a habit.</Alert>;
  if (loading) return <Spinner animation="border" className="mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === 'period' ? value.toLowerCase() : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return setError('Name is required.');

    setSaving(true);
    setError('');
    try {
      const payload = {
        name: form.name.trim(),
        period: form.period || 'daily',
        target: Number(form.target) || 1,
        description: form.description || '',
        tags: form.tags || '',
      };
      await api.put(`habits/${id}/`, payload);
      toast.success('Habit updated!');
      navigate('/habits');
    } catch (err) {
      console.error('Update habit error:', err?.response || err);
      const data = err?.response?.data || {};
      const first = Object.keys(data)[0];
      if (first)
        setError(
          `${first}: ${
            Array.isArray(data[first]) ? data[first][0] : data[first]
          }`
        );
      else if (err?.response?.status === 401)
        setError('Unauthorized. Please log in again.');
      else setError('Failed to update habit. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container className="py-4" style={{ maxWidth: 560 }}>
      <h2 className="mb-3">Edit Habit</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={form.name}
            onChange={onChange}
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
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Tags (optional)</Form.Label>
          <Form.Control name="tags" value={form.tags} onChange={onChange} />
        </Form.Group>

        <Button type="submit" className="w-100" disabled={saving}>
          {saving ? 'Saving...' : 'Update Habit'}
        </Button>
      </Form>
    </Container>
  );
}
