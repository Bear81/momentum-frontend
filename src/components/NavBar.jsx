import { Link, NavLink } from 'react-router-dom';

const linkStyle = { textDecoration: 'none' };

export default function Navbar() {
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

        <div style={{ display: 'flex', gap: '1rem' }}>
          <NavLink to="/" end style={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/dashboard" style={linkStyle}>
            Dashboard
          </NavLink>
          <NavLink to="/login" style={linkStyle}>
            Login
          </NavLink>
          <NavLink to="/register" style={linkStyle}>
            Register
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
