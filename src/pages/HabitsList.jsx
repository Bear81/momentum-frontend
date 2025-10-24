import React, { useEffect, useState } from 'react';
import {
  Card,
  Spinner,
  Alert,
  Container,
  Form,
  Row,
  Col,
} from 'react-bootstrap';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext.jsx';

const HabitsList = () => {
  const { isAuthenticated } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [period, setPeriod] = useState('all');

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    let active = true;
    (async () => {
      try {
        const { data } = await api.get('habits/'); // baseURL + "habits/"
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
          ? data.results
          : [];
        if (active) setHabits(list);
      } catch (err) {
        if (!active) return;
        const status = err?.response?.status;
        if (status === 401) {
          setError('Unauthorized. Please log in again.');
        } else {
          setError('Failed to load habits. Please try again.');
        }
        console.error('Habits fetch error:', err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [isAuthenticated]);

  if (!isAuthenticated)
    return <Alert variant="info">Please log in to view your habits.</Alert>;
  if (loading) return <Spinner animation="border" className="mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  // ✅ Filter logic
  const filtered = habits.filter((h) => {
    const text = `${h.name} ${h.description || ''} ${
      h.tags || ''
    }`.toLowerCase();
    const matchesQuery = text.includes(query.toLowerCase());
    const matchesPeriod =
      period === 'all' || h.period?.toLowerCase() === period.toLowerCase();
    return matchesQuery && matchesPeriod;
  });

  return (
    <Container className="mt-4">
      <h2 className="mb-3">My Habits</h2>

      {/* 🔍 Search + Filter Controls */}
      <Form className="mb-4">
        <Row>
          <Col md={8} className="mb-2">
            <Form.Control
              type="text"
              placeholder="Search by name, tags, or description..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
          <Col md={4} className="mb-2">
            <Form.Select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="all">All Periods</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>

      {filtered.length ? (
        filtered.map((h) => (
          <Card key={h.id} className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>{h.name}</Card.Title>
              <Card.Text>
                Period: {h.period}
                {h.target ? ` • Target: ${h.target}` : ''}
                {h.tags ? ` • Tags: ${h.tags}` : ''}
              </Card.Text>
              {h.description && (
                <Card.Text className="mb-1">{h.description}</Card.Text>
              )}
              {h.created_at && (
                <small className="text-muted">
                  Created: {new Date(h.created_at).toLocaleDateString()}
                </small>
              )}
            </Card.Body>
          </Card>
        ))
      ) : habits.length ? (
        <Alert variant="secondary">No habits match your filters.</Alert>
      ) : (
        <Alert variant="secondary">No habits found.</Alert>
      )}
    </Container>
  );
};

export default HabitsList;
