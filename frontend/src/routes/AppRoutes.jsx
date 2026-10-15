// ============================================
// Routes de l'application
// ============================================

import { Routes, Route, Navigate } from 'react-router-dom';

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

      {/* Routes protégées (seront protégées à l'étape 5.12) */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Route 404 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;