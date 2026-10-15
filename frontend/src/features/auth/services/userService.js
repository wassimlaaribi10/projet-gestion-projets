// ============================================
// Service Utilisateur (frontend)
// ============================================

import api from '../../../services/api';

// Modifier le profil
const updateProfile = async (id, data) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

// Changer le mot de passe
const changePassword = async (id, data) => {
  const response = await api.patch(`/users/${id}/password`, data);
  return response.data;
};

export default {
  updateProfile,
  changePassword,
};