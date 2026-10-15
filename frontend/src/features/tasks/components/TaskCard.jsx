// ============================================
// Carte d'une tâche
// ============================================

import { Link } from 'react-router-dom';
import { Card, Badge } from '../../../components/ui';

function TaskCard({ task }) {
  // Badge selon le statut
  const statusVariant = {
    a_faire: 'default',
    en_cours: 'info',
    en_revue: 'warning',
    terminee: 'success',
  };

  // Badge selon la priorité
  const priorityVariant = {
    basse: 'default',
    moyenne: 'info',
    haute: 'warning',
    urgente: 'danger',
  };

  // Libellé du statut
  const statusLabel = {
    a_faire: 'À faire',
    en_cours: 'En cours',
    en_revue: 'En revue',
    terminee: 'Terminée',
  };

  // Vérifie si en retard
  const isLate =
    task.dateEcheance &&
    task.statut !== 'terminee' &&
    new Date(task.dateEcheance) < new Date();

  return (
    <Link to={`/tasks/${task._id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-neutral-dark">{task.titre}</h3>
          {isLate && <Badge variant="danger">En retard</Badge>}
        </div>

        <div className="flex gap-2 flex-wrap mb-3">
          <Badge variant={statusVariant[task.statut]}>{statusLabel[task.statut]}</Badge>
          <Badge variant={priorityVariant[task.priorite]}>{task.priorite}</Badge>
        </div>

        <div className="flex justify-between text-xs text-neutral">
          <span>
            {task.assigneA
              ? `👤 ${task.assigneA.prenom} ${task.assigneA.nom}`
              : '👤 Non assignée'}
          </span>
          {task.dateEcheance && (
            <span>
              📅 {new Date(task.dateEcheance).toLocaleDateString('fr-FR')}
            </span>
          )}
        </div>
      </Card>
    </Link>
  );
}

export default TaskCard;