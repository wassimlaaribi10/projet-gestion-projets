// ============================================
// Service Tâches (frontend)
// ============================================

import api from '../../../services/api';

const getByProject = async (projectId) => {
  const response = await api.get(`/tasks?projet=${projectId}`);
  return response.data;
};

const getById = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

const create = async (data) => {
  const response = await api.post('/tasks', data);
  return response.data;
};

const update = async (id, data) => {
  const response = await api.put(`/tasks/${id}`, data);
  return response.data;
};

const remove = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export default {
  getByProject,
  getById,
  create,
  update,
  remove,
};