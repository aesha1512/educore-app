import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Progress from './pages/Progress';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  const { user, login, logout, checkedStorage } = useAuth();

  if (!checkedStorage) {
    return null;
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar onLogout={logout} user={user} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/courses" element={<Courses user={user} />} />
          <Route path="/courses/:id" element={<CourseDetail user={user} />} />
          <Route path="/progress" element={<Progress user={user} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;