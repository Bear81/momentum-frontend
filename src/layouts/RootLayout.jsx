import Navbar from '../components/Navbar.jsx';

export default function RootLayout({ children }) {
  return (
    <div className="app">
      <Navbar />
      <main style={{ maxWidth: 960, margin: '1.5rem auto', padding: '0 1rem' }}>
        {children}
      </main>
    </div>
  );
}
