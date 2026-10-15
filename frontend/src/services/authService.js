// ============================================
// Service Auth (frontend)
// ============================================

import api from './api';

// Inscription
const register = async ({ nom, prenom, email, password }) => {
  const response = await api.post('/auth/register', {
    nom,
    prenom,
    email,
    password,
  });
  return response.data;
};

// Connexion
const login = async ({ email, password }) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// Récupérer le profil de l'utilisateur connecté
const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export default {
  register,
  login,
  getMe,
};