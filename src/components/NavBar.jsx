// src/components/NavBar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext.jsx';

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();            // clears localStorage + context
    navigate('/login');  // redirect after logout
  };

  return (
    <Navbar expand="md" bg="light" className="mb-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Momentum</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-center">
            {isAuthenticated ? (
              <>
                <span className="me-3 text-muted">
                  Welcome{user?.username ? `, ${user.username}` : ''}
                </span>
                <Button variant="outline-secondary" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
