// ============================================
// Service Stats (frontend)
// ============================================

import api from '../../../services/api';

// Statistiques globales
const getGlobal = async () => {
  const response = await api.get('/stats/global');
  return response.data;
};

// Statistiques d'un projet
const getProject = async (projectId) => {
  const response = await api.get(`/stats/projects/${projectId}`);
  return response.data;
};

export default {
  getGlobal,
  getProject,
};