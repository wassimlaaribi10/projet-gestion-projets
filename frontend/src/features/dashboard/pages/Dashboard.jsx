// ============================================
// Page Dashboard
// ============================================

import { useAuth } from '../../../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-dark mb-2">Tableau de bord</h1>
      <p className="text-neutral mb-6">
        Bienvenue, {user?.prenom} {user?.nom} !
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-5">
          <p className="text-sm text-neutral">Projets</p>
          <p className="text-2xl font-bold text-primary mt-1">0</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5">
          <p className="text-sm text-neutral">Tâches</p>
          <p className="text-2xl font-bold text-primary mt-1">0</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5">
          <p className="text-sm text-neutral">En retard</p>
          <p className="text-2xl font-bold text-warning mt-1">0</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5">
          <p className="text-sm text-neutral">Terminées</p>
          <p className="text-2xl font-bold text-success mt-1">0</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;