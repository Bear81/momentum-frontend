import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Updated import — new location for Register form
import Register from './pages/auth/Register.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
