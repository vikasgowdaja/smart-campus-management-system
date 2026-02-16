import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProdNavbar from './components/ui/ProdNavbar';
import Footer from './components/ui/Footer';
import HeroSection from './components/ui/HeroSection';
import DatabaseHub from './components/ui/DatabaseHub';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import CreateEvent from './pages/CreateEvent';
import Resources from './pages/Resources';
import Bookings from './pages/Bookings';
import KnowledgeHub from './pages/KnowledgeHub';
import DatabaseMySQL from './pages/DatabaseMySQL';
import DatabasePostgreSQL from './pages/DatabasePostgreSQL';
import DatabaseMongoDB from './pages/DatabaseMongoDB';
import DatabaseScenarios from './pages/DatabaseScenarios';
import DatabaseOptimization from './pages/DatabaseOptimization';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <>
          <ProdNavbar />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/events" element={<Events />} />
                <Route path="/knowledge-hub" element={<KnowledgeHub />} />
                <Route path="/knowledge/optimization" element={<DatabaseOptimization />} />
                <Route path="/knowledge/mysql" element={<DatabaseMySQL />} />
                <Route path="/knowledge/postgresql" element={<DatabasePostgreSQL />} />
                <Route path="/knowledge/mongodb" element={<DatabaseMongoDB />} />
                <Route path="/knowledge/scenarios" element={<DatabaseScenarios />} />
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
          </main>
          <Footer />
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Public Database Hub */}
            <Route 
              path="/databases" 
              element={
                <>
                  <HeroSection />
                  <DatabaseHub />
                </>
              } 
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </>
      )}
    </>
  );
}
