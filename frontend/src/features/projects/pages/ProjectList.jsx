// ============================================
// Page Liste des projets
// ============================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import projectService from '../services/projectService';
import ProjectCard from '../components/ProjectCard';
import { Button, Card } from '../../../components/ui';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Charger les projets au montage
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectService.getAll();
        setProjects(response.data);
      } catch (err) {
        const message =
          err.response?.data?.message || 'Erreur lors du chargement des projets';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // État loading
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-neutral">Chargement...</p>
      </div>
    );
  }

  // État erreur
  if (error) {
    return (
      <Card>
        <p className="text-danger">{error}</p>
      </Card>
    );
  }

  return (
    <div>
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-dark">Projets</h1>
          <p className="text-sm text-neutral">
            {projects.length} projet{projects.length > 1 ? 's' : ''}
          </p>
        </div>

        <Link to="/projects/new">
          <Button>+ Nouveau projet</Button>
        </Link>
      </div>

      {/* État vide */}
      {projects.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-neutral mb-4">Aucun projet pour l&apos;instant.</p>
          <Link to="/projects/new">
            <Button>Créer mon premier projet</Button>
          </Link>
        </Card>
      ) : (
        /* Grille de projets */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectList;