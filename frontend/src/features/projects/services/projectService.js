// ============================================
// Service Projets (frontend)
// ============================================

import api from '../../../services/api';

// Récupérer tous les projets
const getAll = async () => {
  const response = await api.get('/projects');
  return response.data;
};

// Récupérer un projet par ID
const getById = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

// Créer un projet
const create = async (data) => {
  const response = await api.post('/projects', data);
  return response.data;
};

// Modifier un projet
const update = async (id, data) => {
  const response = await api.put(`/projects/${id}`, data);
  return response.data;
};

// Archiver un projet
const archive = async (id) => {
  const response = await api.patch(`/projects/${id}/archive`);
  return response.data;
};

export default {
  getAll,
  getById,
  create,
  update,
  archive,
};