// ============================================
// Service Commentaires (frontend)
// ============================================

import api from '../../../services/api';

// Récupérer les commentaires d'une tâche
const getByTask = async (taskId) => {
  const response = await api.get(`/comments?tache=${taskId}`);
  return response.data;
};

// Créer un commentaire
const create = async (data) => {
  const response = await api.post('/comments', data);
  return response.data;
};

// Supprimer un commentaire
const remove = async (id) => {
  const response = await api.delete(`/comments/${id}`);
  return response.data;
};

export default {
  getByTask,
  create,
  remove,
};