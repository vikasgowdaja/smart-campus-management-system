import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import CreateEvent from './pages/CreateEvent';
import Resources from './pages/Resources';
import Bookings from './pages/Bookings';
import KnowledgeHub from './pages/KnowledgeHub';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/knowledge-hub" element={<KnowledgeHub />} />
        </Route>

        <Route element={<ProtectedRoute roles={['admin', 'Admin']} />}>
          <Route path="/events/create" element={<CreateEvent />} />
        </Route>

        <Route element={<ProtectedRoute roles={['student']} />}>
          <Route path="/resources" element={<Resources />} />
          <Route path="/bookings" element={<Bookings />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}
