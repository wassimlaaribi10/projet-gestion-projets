// ============================================
// Page Détail d'un projet
// ============================================

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import projectService from '../services/projectService';
import taskService from '../../tasks/services/taskService';
import TaskCard from '../../tasks/components/TaskCard';
import { useAuth } from '../../../context/AuthContext';
import { Button, Card, Badge, Input } from '../../../components/ui';

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // États
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('infos');

  // Formulaire nouvelle tâche
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Charger le projet et ses tâches au montage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRes, tasksRes] = await Promise.all([
          projectService.getById(id),
          taskService.getByProject(id),
        ]);

        setProject(projectRes.data);
        setTasks(tasksRes.data);
      } catch (err) {
        const message = err.response?.data?.message || 'Erreur lors du chargement';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Créer une nouvelle tâche
  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!newTaskTitle.trim()) return;

    try {
      const response = await taskService.create({
        titre: newTaskTitle,
        projet: id,
        createur: user._id,
      });

      setTasks([response.data, ...tasks]);
      setNewTaskTitle('');
      setShowTaskForm(false);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        'Erreur lors de la création';
      alert(message);
      console.error('Erreur complète :', err.response?.data);
    }
  };

  // États
  if (loading) {
    return <p className="text-neutral text-center py-12">Chargement...</p>;
  }

  if (error) {
    return (
      <Card>
        <p className="text-danger">{error}</p>
        <Button onClick={() => navigate('/projects')} className="mt-4">
          Retour aux projets
        </Button>
      </Card>
    );
  }

  if (!project) return null;

  // Libellés
  const priorityVariant = {
    basse: 'default',
    moyenne: 'info',
    haute: 'warning',
  };

  const statusVariant = {
    actif: 'success',
    archive: 'default',
  };

  return (
    <div>
      {/* En-tête */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/projects')}
          className="text-sm text-primary hover:underline mb-2"
        >
          ← Retour aux projets
        </button>

        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-dark">{project.nom}</h1>
            <div className="flex gap-2 mt-2">
              <Badge variant={statusVariant[project.statut]}>{project.statut}</Badge>
              <Badge variant={priorityVariant[project.priorite]}>{project.priorite}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('infos')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'infos'
              ? 'text-primary border-b-2 border-primary'
              : 'text-neutral hover:text-primary'
          }`}
        >
          Informations
        </button>
        <button
          onClick={() => setActiveTab('membres')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'membres'
              ? 'text-primary border-b-2 border-primary'
              : 'text-neutral hover:text-primary'
          }`}
        >
          Membres ({project.membres?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('taches')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'taches'
              ? 'text-primary border-b-2 border-primary'
              : 'text-neutral hover:text-primary'
          }`}
        >
          Tâches ({tasks.length})
        </button>
      </div>

      {/* Onglet Informations */}
      {activeTab === 'infos' && (
        <Card>
          <h2 className="text-lg font-semibold mb-4">Informations</h2>

          <div className="space-y-3 text-sm">
            <div>
              <span className="text-neutral">Description :</span>
              <p className="mt-1">{project.description || 'Aucune description'}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-neutral">Date de début :</span>
                <p className="mt-1">
                  {new Date(project.dateDebut).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div>
                <span className="text-neutral">Date de fin prévue :</span>
                <p className="mt-1">
                  {new Date(project.dateFinPrevue).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>

            <div>
              <span className="text-neutral">Propriétaire :</span>
              <p className="mt-1">
                {project.proprietaire?.prenom} {project.proprietaire?.nom}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Onglet Membres */}
      {activeTab === 'membres' && (
        <Card>
          <h2 className="text-lg font-semibold mb-4">Membres du projet</h2>

          <div className="space-y-2">
            {project.membres?.map((membre) => (
              <div
                key={membre.user._id}
                className="flex justify-between items-center p-3 bg-neutral-light rounded-lg"
              >
                <div>
                  <p className="font-medium">
                    {membre.user.prenom} {membre.user.nom}
                  </p>
                  <p className="text-xs text-neutral">{membre.user.email}</p>
                </div>
                <Badge variant="info">{membre.role}</Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Onglet Tâches */}
      {activeTab === 'taches' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Tâches ({tasks.length})</h2>
            <Button onClick={() => setShowTaskForm(!showTaskForm)}>
              {showTaskForm ? 'Annuler' : '+ Nouvelle tâche'}
            </Button>
          </div>

          {/* Formulaire nouvelle tâche */}
          {showTaskForm && (
            <Card className="mb-4">
              <form onSubmit={handleCreateTask}>
                <Input
                  label="Titre de la tâche"
                  name="titre"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Ex: Créer la page d'accueil"
                  required
                />
                <Button type="submit">Créer</Button>
              </form>
            </Card>
          )}

          {/* Liste des tâches */}
          {tasks.length === 0 ? (
            <Card className="text-center py-8">
              <p className="text-neutral">Aucune tâche pour l&apos;instant.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;