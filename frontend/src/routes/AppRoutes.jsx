// ============================================
// Routes de l'application
// ============================================

import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import Dashboard from '../features/dashboard/pages/Dashboard';

function AppRoutes() {
  return (
    <Routes>
      {/* Redirection de la racine vers /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Routes publiques */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Routes protégées (avec Layout) */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* On ajoutera d'autres routes ici plus tard */}
      </Route>

      {/* Route 404 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;