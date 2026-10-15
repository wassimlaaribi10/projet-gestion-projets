// ============================================
// Header (mobile uniquement)
// ============================================

import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg ${
      isActive ? 'bg-primary text-white' : 'text-neutral-dark hover:bg-primary-light'
    }`;

  return (
    <header className="lg:hidden bg-white border-b border-gray-200">
      {/* Barre supérieure */}
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-bold text-primary">GestionProjets</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl text-neutral-dark"
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {/* Menu déroulant */}
      {menuOpen && (
        <nav className="border-t border-gray-200 p-4 space-y-1">
          <NavLink to="/dashboard" className={linkClass} onClick={() => setMenuOpen(false)}>
            📊 Tableau de bord
          </NavLink>
          <NavLink to="/projects" className={linkClass} onClick={() => setMenuOpen(false)}>
            📁 Projets
          </NavLink>
          <NavLink to="/notifications" className={linkClass} onClick={() => setMenuOpen(false)}>
            🔔 Notifications
          </NavLink>
          <NavLink to="/profile" className={linkClass} onClick={() => setMenuOpen(false)}>
            👤 Profil
          </NavLink>

          <hr className="my-2" />

          <div className="px-4 py-2">
            <p className="text-sm font-medium">
              {user?.prenom} {user?.nom}
            </p>
            <p className="text-xs text-neutral">{user?.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-red-50 rounded-lg"
          >
            🚪 Se déconnecter
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;