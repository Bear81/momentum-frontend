import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext.jsx';
import { notify } from '../utils/notify';

export default function DeleteHabit() {
  const { isAuthenticated } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
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
        if (active) setHabit(data);
      } catch (err) {
        if (active) {
          console.error('Load habit error:', err?.response || err);
          setError('Failed to load habit details.');
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id, isAuthenticated]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this habit?')) return;
    setDeleting(true);
    setError('');
    try {
      await api.delete(`habits/${id}/`);
      notify.success('Habit deleted successfully!');
      navigate('/habits');
    } catch (err) {
      console.error('Delete habit error:', err?.response || err);
      setError('Failed to delete habit. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  if (!isAuthenticated)
    return <Alert variant="info">Please log in to manage habits.</Alert>;
  if (loading) return <Spinner animation="border" className="mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="py-4" style={{ maxWidth: 560 }}>
      <h2 className="mb-3">Delete Habit</h2>
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title>{habit?.name}</Card.Title>
          <Card.Text>
            Period: {habit?.period}
            {habit?.target ? ` • Target: ${habit.target}` : ''}
          </Card.Text>
          {habit?.description && <Card.Text>{habit.description}</Card.Text>}
          {habit?.tags && (
            <Card.Text>
              <strong>Tags:</strong> {habit.tags}
            </Card.Text>
          )}
        </Card.Body>
      </Card>

      <Alert variant="warning">
        This action <strong>cannot</strong> be undone. Are you sure?
      </Alert>

      <div className="d-flex gap-2">
        <Button
          variant="danger"
          className="flex-grow-1"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? 'Deleting...' : 'Delete Habit'}
        </Button>
        <Button
          variant="secondary"
          className="flex-grow-1"
          onClick={() => navigate('/habits')}
        >
          Cancel
        </Button>
      </div>
    </Container>
  );
}
