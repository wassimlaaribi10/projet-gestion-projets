// ============================================
// Route protégée : nécessite d'être connecté
// ============================================

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  // Si non connecté → redirection vers /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si connecté → affiche la page demandée
  return <Outlet />;
}

export default ProtectedRoute;