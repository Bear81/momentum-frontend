// components/NavBar.jsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { user } = useAuth(); // null or {username, ...}

  return (
    <nav className="navbar navbar-expand">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Momentum
        </NavLink>
        <ul className="navbar-nav ms-auto">
          {!user && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li className="nav-item">
                <span className="nav-link disabled">Hi, {user.username}</span>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
