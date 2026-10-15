// ============================================
// Service Notifications (frontend)
// ============================================

import api from '../../../services/api';

// Récupérer les notifications d'un utilisateur
const getByUser = async (userId) => {
  const response = await api.get(`/notifications?destinataire=${userId}`);
  return response.data;
};

// Marquer une notification comme lue
const markAsRead = async (id) => {
  const response = await api.patch(`/notifications/${id}/read`);
  return response.data;
};

// Marquer toutes comme lues
const markAllAsRead = async (userId) => {
  const response = await api.patch(`/notifications/read-all?destinataire=${userId}`);
  return response.data;
};

// Supprimer une notification
const remove = async (id) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};

export default {
  getByUser,
  markAsRead,
  markAllAsRead,
  remove,
};