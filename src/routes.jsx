import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import HabitsList from './pages/HabitsList';
import CreateHabit from './pages/CreateHabit';
import EditHabit from './pages/EditHabit';
import DeleteHabit from './pages/DeleteHabit';

// Updated import — new location for Register form
import Register from './pages/Register.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route
        path="/habits"
        element={
          <ProtectedRoute>
            <HabitsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/habits/create"
        element={
          <ProtectedRoute>
            <CreateHabit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/habits/:id/edit"
        element={
          <ProtectedRoute>
            <EditHabit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/habits/:id/delete"
        element={
          <ProtectedRoute>
            <DeleteHabit />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
