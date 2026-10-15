// ============================================
// Helpers pour les tests
// ============================================

const request = require('supertest');
const app = require('../src/app');
const { User } = require('../src/models');

// Créer un utilisateur et retourner son token
const createUserAndLogin = async (options = {}) => {
  const userData = {
    nom: options.nom || 'Test',
    prenom: options.prenom || 'User',
    email: options.email || `test${Date.now()}@example.com`,
    password: options.password || 'motdepasse123',
    role: options.role || 'membre',
  };

  // Créer l'utilisateur
  const user = await User.create(userData);

  // Se connecter pour obtenir le token
  const loginResponse = await request(app).post('/api/auth/login').send({
    email: userData.email,
    password: userData.password,
  });

  return {
    user,
    token: loginResponse.body.data?.token,
  };
};

module.exports = {
  createUserAndLogin,
};
