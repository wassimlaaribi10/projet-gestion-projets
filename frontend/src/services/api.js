// ============================================
// Client Axios centralisé
// ============================================

import axios from 'axios';

// URL de base du backend
const API_URL = 'http://localhost:5000/api';

// Créer une instance Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================
// Intercepteur de requête : ajoute le token JWT
// ============================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================
// Intercepteur de réponse : gère les erreurs
// ============================================

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Ne pas déconnecter sur les routes publiques
    const url = error.config?.url || '';
    const isAuthRoute = url.includes('/auth/login') || url.includes('/auth/register');

    if (error.response && error.response.status === 401 && !isAuthRoute) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;