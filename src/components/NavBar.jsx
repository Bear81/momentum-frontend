import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const linkStyle = { textDecoration: 'none' };

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header style={{ borderBottom: '1px solid #eee' }}>
      <nav
        aria-label="Primary"
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link to="/" style={{ ...linkStyle, fontWeight: 700 }}>
          Momentum
        </Link>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <NavLink to="/" end style={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/dashboard" style={linkStyle}>
            Dashboard
          </NavLink>

          {isAuthenticated ? (
            <>
              <span aria-live="polite" style={{ opacity: 0.8 }}>
                {user?.username ? `Hi, ${user.username}` : 'Logged in'}
              </span>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" style={linkStyle}>
                Login
              </NavLink>
              <NavLink to="/register" style={linkStyle}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
