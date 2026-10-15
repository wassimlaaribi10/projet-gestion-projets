// ============================================
// Carte d'un projet
// ============================================

import { Link } from 'react-router-dom';
import { Card, Badge } from '../../../components/ui';

function ProjectCard({ project }) {
  // Variant de badge selon la priorité
  const priorityVariant = {
    basse: 'default',
    moyenne: 'info',
    haute: 'warning',
  };

  return (
    <Link to={`/projects/${project._id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-neutral-dark">{project.nom}</h3>
          <Badge variant={priorityVariant[project.priorite]}>{project.priorite}</Badge>
        </div>

        {project.description && (
          <p className="text-sm text-neutral mb-4 line-clamp-2">{project.description}</p>
        )}

        <div className="flex justify-between items-center text-xs text-neutral">
          <span>
            👥 {project.membres?.length || 0} membre
            {project.membres?.length > 1 ? 's' : ''}
          </span>
          <span>{new Date(project.dateCreation).toLocaleDateString('fr-FR')}</span>
        </div>
      </Card>
    </Link>
  );
}

export default ProjectCard;