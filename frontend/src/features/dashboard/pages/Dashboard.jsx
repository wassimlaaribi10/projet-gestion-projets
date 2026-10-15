// ============================================
// Page Dashboard
// ============================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import statsService from '../services/statsService';
import projectService from '../../projects/services/projectService';
import { useAuth } from '../../../context/AuthContext';
import { Button, Card, Badge } from '../../../components/ui';

function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, projectsRes] = await Promise.all([
          statsService.getGlobal(),
          projectService.getAll(),
        ]);

        setStats(statsRes.data);
        setRecentProjects(projectsRes.data.slice(0, 3)); // 3 projets récents
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-neutral text-center py-12">Chargement...</p>;
  }

  if (error) {
    return (
      <Card>
        <p className="text-danger">{error}</p>
      </Card>
    );
  }

  // Récupérer les statuts
  const statusCounts = stats?.tasksByStatus || {
    a_faire: 0,
    en_cours: 0,
    en_revue: 0,
    terminee: 0,
  };

  const statusLabels = {
    a_faire: 'À faire',
    en_cours: 'En cours',
    en_revue: 'En revue',
    terminee: 'Terminée',
  };

  return (
    <div>
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-dark">Tableau de bord</h1>
        <p className="text-neutral">
          Bienvenue, {user?.prenom} {user?.nom} !
        </p>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <p className="text-sm text-neutral">Projets</p>
          <p className="text-3xl font-bold text-primary mt-1">{stats?.totalProjects || 0}</p>
        </Card>

        <Card>
          <p className="text-sm text-neutral">Tâches</p>
          <p className="text-3xl font-bold text-primary mt-1">{stats?.totalTasks || 0}</p>
        </Card>

        <Card>
          <p className="text-sm text-neutral">Tâches terminées</p>
          <p className="text-3xl font-bold text-success mt-1">{statusCounts.terminee}</p>
        </Card>

        <Card>
          <p className="text-sm text-neutral">Utilisateurs</p>
          <p className="text-3xl font-bold text-primary mt-1">{stats?.totalUsers || 0}</p>
        </Card>
      </div>

      {/* Répartition des tâches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Par statut */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Tâches par statut</h2>
          <div className="space-y-3">
            {Object.entries(statusCounts).map(([statut, count]) => {
              const total = stats?.totalTasks || 1;
              const percent = Math.round((count / total) * 100);

              return (
                <div key={statut}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-dark">{statusLabels[statut]}</span>
                    <span className="text-neutral">
                      {count} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-neutral-light rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        statut === 'terminee'
                          ? 'bg-success'
                          : statut === 'en_cours'
                            ? 'bg-primary'
                            : statut === 'en_revue'
                              ? 'bg-warning'
                              : 'bg-gray-400'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Projets récents */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Projets récents</h2>
            <Link
              to="/projects"
              className="text-sm text-primary hover:underline"
            >
              Voir tout
            </Link>
          </div>

          {recentProjects.length === 0 ? (
            <p className="text-neutral text-sm text-center py-4">
              Aucun projet pour l&apos;instant.
            </p>
          ) : (
            <div className="space-y-2">
              {recentProjects.map((project) => (
                <Link
                  key={project._id}
                  to={`/projects/${project._id}`}
                  className="block p-3 bg-neutral-light rounded-lg hover:bg-primary-light transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm">{project.nom}</p>
                    <Badge variant="info">{project.priorite}</Badge>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Accès rapide */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Actions rapides</h2>
        <div className="flex gap-3 flex-wrap">
          <Link to="/projects/new">
            <Button>+ Nouveau projet</Button>
          </Link>
          <Link to="/projects">
            <Button variant="secondary">Voir mes projets</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;