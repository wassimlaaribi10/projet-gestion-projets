// ============================================
// Routes de l'application
// ============================================

import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/layout/Layout';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import Dashboard from '../features/dashboard/pages/Dashboard';
import ProjectList from '../features/projects/pages/ProjectList';
import ProjectDetail from '../features/projects/pages/ProjectDetail';
import ProjectForm from '../features/projects/pages/ProjectForm';
import TaskDetail from '../features/tasks/pages/TaskDetail';
import Notifications from '../features/notifications/pages/Notifications';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/new" element={<ProjectForm />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route element={<ProtectedRoute />}>
  <Route element={<Layout />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/projects" element={<ProjectList />} />
    <Route path="/projects/new" element={<ProjectForm />} />
    <Route path="/projects/:id" element={<ProjectDetail />} />
    <Route path="/tasks/:id" element={<TaskDetail />} />
    <Route path="/notifications" element={<Notifications />} />

  </Route>
</Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;