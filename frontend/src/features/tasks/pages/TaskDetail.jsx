// ============================================
// Page Détail d'une tâche
// ============================================

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import taskService from '../services/taskService';
import commentService from '../services/commentService';
import { useAuth } from '../../../context/AuthContext';
import { Button, Card, Badge, Input } from '../../../components/ui';

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // États
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Formulaire commentaire
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  // Charger la tâche et ses commentaires
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [taskRes, commentsRes] = await Promise.all([
          taskService.getById(id),
          commentService.getByTask(id),
        ]);

        setTask(taskRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        const message = err.response?.data?.message || 'Erreur lors du chargement';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Changer le statut
  const handleStatusChange = async (newStatus) => {
    try {
      const response = await taskService.update(id, { statut: newStatus });
      setTask(response.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors du changement de statut');
    }
  };

  // Ajouter un commentaire
  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    setSubmittingComment(true);

    try {
      const response = await commentService.create({
        contenu: newComment,
        tache: id,
        auteur: user._id,
      });

      setComments([...comments, response.data]);
      setNewComment('');
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de l'ajout du commentaire");
    } finally {
      setSubmittingComment(false);
    }
  };

  // Supprimer un commentaire
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Supprimer ce commentaire ?')) return;

    try {
      await commentService.remove(commentId);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la suppression');
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
      </Card>
    );
  }

  if (!task) return null;

  // Badges
  const statusVariant = {
    a_faire: 'default',
    en_cours: 'info',
    en_revue: 'warning',
    terminee: 'success',
  };

  const statusLabel = {
    a_faire: 'À faire',
    en_cours: 'En cours',
    en_revue: 'En revue',
    terminee: 'Terminée',
  };

  const priorityVariant = {
    basse: 'default',
    moyenne: 'info',
    haute: 'warning',
    urgente: 'danger',
  };

  // Vérifier si en retard
  const isLate =
    task.dateEcheance && task.statut !== 'terminee' && new Date(task.dateEcheance) < new Date();

  return (
    <div>
      {/* Retour */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-primary hover:underline mb-4"
      >
        ← Retour
      </button>

      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-dark mb-2">{task.titre}</h1>
        <div className="flex gap-2 flex-wrap">
          <Badge variant={statusVariant[task.statut]}>{statusLabel[task.statut]}</Badge>
          <Badge variant={priorityVariant[task.priorite]}>{task.priorite}</Badge>
          {isLate && <Badge variant="danger">En retard</Badge>}
        </div>
      </div>

      {/* Informations */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Informations</h2>

        <div className="space-y-3 text-sm">
          <div>
            <span className="text-neutral">Description :</span>
            <p className="mt-1">{task.description || 'Aucune description'}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-neutral">Assignée à :</span>
              <p className="mt-1">
                {task.assigneA
                  ? `${task.assigneA.prenom} ${task.assigneA.nom}`
                  : 'Non assignée'}
              </p>
            </div>
            <div>
              <span className="text-neutral">Créée par :</span>
              <p className="mt-1">
                {task.createur?.prenom} {task.createur?.nom}
              </p>
            </div>
          </div>

          {task.dateEcheance && (
            <div>
              <span className="text-neutral">Date d&apos;échéance :</span>
              <p className="mt-1">
                {new Date(task.dateEcheance).toLocaleDateString('fr-FR')}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Changement de statut */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Changer le statut</h2>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant={task.statut === 'a_faire' ? 'primary' : 'secondary'}
            onClick={() => handleStatusChange('a_faire')}
          >
            À faire
          </Button>
          <Button
            variant={task.statut === 'en_cours' ? 'primary' : 'secondary'}
            onClick={() => handleStatusChange('en_cours')}
          >
            En cours
          </Button>
          <Button
            variant={task.statut === 'en_revue' ? 'primary' : 'secondary'}
            onClick={() => handleStatusChange('en_revue')}
          >
            En revue
          </Button>
          <Button
            variant={task.statut === 'terminee' ? 'primary' : 'secondary'}
            onClick={() => handleStatusChange('terminee')}
          >
            Terminée
          </Button>
        </div>
      </Card>

      {/* Commentaires */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Commentaires ({comments.length})</h2>

        {/* Formulaire d'ajout */}
        <form onSubmit={handleAddComment} className="mb-6">
          <Input
            label="Ajouter un commentaire"
            name="commentaire"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Écrivez votre commentaire..."
          />
          <Button type="submit" disabled={submittingComment}>
            {submittingComment ? 'Envoi...' : 'Publier'}
          </Button>
        </form>

        {/* Liste des commentaires */}
        {comments.length === 0 ? (
          <p className="text-neutral text-sm text-center py-4">
            Aucun commentaire pour l&apos;instant.
          </p>
        ) : (
          <div className="space-y-3">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="p-4 bg-neutral-light rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-sm">
                      {comment.auteur?.prenom} {comment.auteur?.nom}
                    </p>
                    <p className="text-xs text-neutral">
                      {new Date(comment.dateCreation).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  {comment.auteur?._id === user._id && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-xs text-danger hover:underline"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
                <p className="text-sm">{comment.contenu}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default TaskDetail;