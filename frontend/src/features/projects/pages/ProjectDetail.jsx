// ============================================
// Page Détail d'un projet
// ============================================

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import projectService from '../services/projectService';
import taskService from '../../tasks/services/taskService';
import statsService from '../../dashboard/services/statsService';
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
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('infos');

  // Formulaire nouvelle tâche
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Formulaire édition projet
  const [editData, setEditData] = useState({
    nom: '',
    description: '',
    priorite: 'moyenne',
  });
  const [savingEdit, setSavingEdit] = useState(false);

  // Charger le projet, ses tâches et ses stats
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRes, tasksRes, statsRes] = await Promise.all([
          projectService.getById(id),
          taskService.getByProject(id),
          statsService.getProject(id),
        ]);

        setProject(projectRes.data);
        setTasks(tasksRes.data);
        setStats(statsRes.data);

        // Initialiser le formulaire d'édition
        setEditData({
          nom: projectRes.data.nom || '',
          description: projectRes.data.description || '',
          priorite: projectRes.data.priorite || 'moyenne',
        });
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

      // Recharger les stats
      const statsRes = await statsService.getProject(id);
      setStats(statsRes.data);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        'Erreur lors de la création';
      alert(message);
      console.error('Erreur complète :', err.response?.data);
    }
  };

  // Mettre à jour le projet
  const handleUpdateProject = async (e) => {
    e.preventDefault();

    setSavingEdit(true);

    try {
      // 1. Envoyer la modification
      await projectService.update(id, editData);

      // 2. Recharger le projet complet (avec populate)
      const projectRes = await projectService.getById(id);
      setProject(projectRes.data);

      // 3. Retourner à l'onglet Informations
      setActiveTab('infos');

      // 4. Message de succès
      alert('Projet modifié avec succès');
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la modification');
    } finally {
      setSavingEdit(false);
    }
  };

  // États de chargement
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

  // Vérifier si l'utilisateur est propriétaire
  const isOwner = project.proprietaire?._id === user._id;

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
      <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('infos')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'infos'
              ? 'text-primary border-b-2 border-primary'
              : 'text-neutral hover:text-primary'
          }`}
        >
          Informations
        </button>
        <button
          onClick={() => setActiveTab('membres')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'membres'
              ? 'text-primary border-b-2 border-primary'
              : 'text-neutral hover:text-primary'
          }`}
        >
          Membres ({project.membres?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('taches')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'taches'
              ? 'text-primary border-b-2 border-primary'
              : 'text-neutral hover:text-primary'
          }`}
        >
          Tâches ({tasks.length})
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'stats'
              ? 'text-primary border-b-2 border-primary'
              : 'text-neutral hover:text-primary'
          }`}
        >
          Statistiques
        </button>
        {isOwner && (
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === 'edit'
                ? 'text-primary border-b-2 border-primary'
                : 'text-neutral hover:text-primary'
            }`}
          >
            Modifier
          </button>
        )}
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

      {/* Onglet Statistiques */}
      {activeTab === 'stats' && stats && (
        <div className="space-y-6">
          {/* Cartes résumées */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <p className="text-sm text-neutral">Total tâches</p>
              <p className="text-3xl font-bold text-primary mt-1">{stats.totalTasks}</p>
            </Card>
            <Card>
              <p className="text-sm text-neutral">Terminées</p>
              <p className="text-3xl font-bold text-success mt-1">
                {stats.tasksByStatus.terminee}
              </p>
            </Card>
            <Card>
              <p className="text-sm text-neutral">En retard</p>
              <p className="text-3xl font-bold text-danger mt-1">{stats.lateTasks}</p>
            </Card>
          </div>

          {/* Progression */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Progression</h2>
            <div className="w-full bg-neutral-light rounded-full h-4">
              <div
                className="h-4 rounded-full bg-success transition-all"
                style={{ width: `${stats.progression}%` }}
              />
            </div>
            <p className="text-sm text-neutral mt-2">
              {stats.progression}% des tâches terminées
            </p>
          </Card>

          {/* Répartition par statut */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Tâches par statut</h2>
            <div className="space-y-3">
              {Object.entries(stats.tasksByStatus).map(([statut, count]) => {
                const total = stats.totalTasks || 1;
                const percent = Math.round((count / total) * 100);

                const labels = {
                  a_faire: 'À faire',
                  en_cours: 'En cours',
                  en_revue: 'En revue',
                  terminee: 'Terminée',
                };

                const colors = {
                  a_faire: 'bg-gray-400',
                  en_cours: 'bg-primary',
                  en_revue: 'bg-warning',
                  terminee: 'bg-success',
                };

                return (
                  <div key={statut}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-neutral-dark">{labels[statut]}</span>
                      <span className="text-neutral">
                        {count} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-neutral-light rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${colors[statut]}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Charge par membre */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Charge par membre</h2>
            {stats.workloadByMember.length === 0 ? (
              <p className="text-sm text-neutral">Aucune tâche assignée.</p>
            ) : (
              <div className="space-y-2">
                {stats.workloadByMember.map((member) => (
                  <div
                    key={member.userId}
                    className="flex justify-between p-3 bg-neutral-light rounded-lg"
                  >
                    <span className="text-sm font-medium">
                      {member.prenom} {member.nom}
                    </span>
                    <span className="text-sm text-neutral">{member.count} tâche(s)</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Onglet Modifier */}
      {activeTab === 'edit' && isOwner && (
        <Card>
          <h2 className="text-lg font-semibold mb-4">Modifier le projet</h2>

          <form onSubmit={handleUpdateProject}>
            <Input
              label="Nom du projet"
              name="nom"
              value={editData.nom}
              onChange={(e) => setEditData({ ...editData, nom: e.target.value })}
              required
            />

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-neutral-dark mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="priorite"
                className="block text-sm font-medium text-neutral-dark mb-1"
              >
                Priorité
              </label>
              <select
                id="priorite"
                value={editData.priorite}
                onChange={(e) => setEditData({ ...editData, priorite: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="basse">Basse</option>
                <option value="moyenne">Moyenne</option>
                <option value="haute">Haute</option>
              </select>
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={savingEdit}>
                {savingEdit ? 'Enregistrement...' : 'Enregistrer'}
              </Button>
              <Button
                variant="secondary"
                onClick={() => setActiveTab('infos')}
              >
                Annuler
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}

export default ProjectDetail;