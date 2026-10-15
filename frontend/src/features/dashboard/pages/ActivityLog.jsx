// ============================================
// Page Journal d'activité
// ============================================

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../../services/api';
import { Card, Badge } from '../../../components/ui';

function ActivityLog() {
  const { id } = useParams();

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const url = id ? `/activity-logs?projet=${id}` : '/activity-logs';
        const response = await api.get(url);
        setLogs(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [id]);

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

  // Labels
  const actionLabels = {
    create: 'a créé',
    update: 'a modifié',
    delete: 'a supprimé',
    assign: 'a assigné',
  };

  const actionVariants = {
    create: 'success',
    update: 'info',
    delete: 'danger',
    assign: 'warning',
  };

  const entityLabels = {
    project: 'le projet',
    task: 'la tâche',
    comment: 'le commentaire',
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-dark mb-2">Journal d&apos;activité</h1>
      <p className="text-neutral mb-6">Historique des actions effectuées</p>

      {logs.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-neutral">Aucune activité pour l&apos;instant.</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {logs.map((log) => (
            <div
              key={log._id}
              className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-start"
            >
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">
                    {log.utilisateur?.prenom} {log.utilisateur?.nom}
                  </span>{' '}
                  <span className="text-neutral">{actionLabels[log.action]}</span>{' '}
                  <span className="font-medium">
                    {entityLabels[log.entiteType]}
                  </span>
                  {log.details?.nom && <span> &quot;{log.details.nom}&quot;</span>}
                  {log.details?.titre && <span> &quot;{log.details.titre}&quot;</span>}
                </p>
                <p className="text-xs text-neutral mt-1">
                  {new Date(log.dateCreation).toLocaleString('fr-FR')}
                </p>
              </div>

              <Badge variant={actionVariants[log.action]}>{log.action}</Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActivityLog;