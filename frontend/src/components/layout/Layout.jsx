// ============================================
// Layout principal (Sidebar + Header + Contenu)
// ============================================

import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

function Layout() {
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Sidebar (desktop) */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="lg:ml-64">
        {/* Header (mobile) */}
        <Header />

        {/* Contenu de la page active */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;