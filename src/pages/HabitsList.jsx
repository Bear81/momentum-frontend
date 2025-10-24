import React, { useEffect, useState } from 'react';
import { Card, Spinner, Alert, Container } from 'react-bootstrap';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

const HabitsList = () => {
  const { isAuthenticated } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    let active = true;

    (async () => {
      try {
        const { data } = await api.get('habits/'); // -> <base>/habits/
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
          ? data.results
          : [];
        if (active) setHabits(list);
      } catch (err) {
        if (!active) return;
        const status = err?.response?.status;
        setError(
          status === 401
            ? 'Unauthorized. Please log in again.'
            : 'Failed to load habits. Please try again.'
        );
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

  return (
    <Container className="mt-4">
      <h2 className="mb-3">My Habits</h2>
      {habits.length ? (
        habits.map((h) => (
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
              <div className="d-flex gap-2">
                <Link
                  to={`/habits/${h.id}/edit`}
                  className="btn btn-sm btn-outline-primary"
                >
                  Edit
                </Link>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Alert variant="secondary">No habits found.</Alert>
      )}
    </Container>
  );
};

export default HabitsList;
