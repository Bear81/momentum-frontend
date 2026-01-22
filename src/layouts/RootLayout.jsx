import Navbar from '../components/NavBar.jsx';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

export default function RootLayout({ children }) {
  const { pathname } = useLocation();
  const isLanding = pathname === '/';

  return (
    <div className="app">
      <Navbar />
      {isLanding ? (
        // Full-width landing page (Home)
        <main>{children}</main>
      ) : (
        // Constrained app pages
        <main
          style={{ maxWidth: 960, margin: '1.5rem auto', padding: '0 1rem' }}
        >
          {children}
        </main>
      )}
    </div>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
