// ============================================
// Sidebar (desktop)
// ============================================

import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Classes pour les liens de navigation
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
      isActive ? 'bg-primary text-white' : 'text-neutral-dark hover:bg-primary-light'
    }`;

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-primary">GestionProjets</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <NavLink to="/dashboard" className={linkClass}>
          <span aria-hidden="true">📊</span> Tableau de bord
        </NavLink>
        <NavLink to="/projects" className={linkClass}>
          <span aria-hidden="true">📁</span> Projets
        </NavLink>
        <NavLink to="/notifications" className={linkClass}>
          <span aria-hidden="true">🔔</span> Notifications
        </NavLink>
        <NavLink to="/profile" className={linkClass}>
          <span aria-hidden="true">👤</span> Profil
        </NavLink>
      </nav>

      {/* Utilisateur + Déconnexion */}
      <div className="p-4 border-t border-gray-200">
        <div className="mb-3 px-2">
          <p className="text-sm font-medium text-neutral-dark">
            {user?.prenom} {user?.nom}
          </p>
          <p className="text-xs text-neutral">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-red-50 rounded-lg"
        >
          <span aria-hidden="true">🚪</span> Se déconnecter
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;