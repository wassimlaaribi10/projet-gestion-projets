// ============================================
// Tests d'intégration : Authentification
// ============================================

const request = require('supertest');
const app = require('../src/app');
const { createUserAndLogin } = require('./helpers');

describe('Authentification', () => {
  // ============================================
  // POST /api/auth/register
  // ============================================

  describe('POST /api/auth/register', () => {
    const validUser = {
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      password: 'motdepasse123',
    };

    it('devrait créer un utilisateur avec des données valides', async () => {
      const response = await request(app).post('/api/auth/register').send(validUser);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data.user.email).toBe(validUser.email);
      expect(response.body.data.user).not.toHaveProperty('password');
    });

    it('devrait refuser un email déjà utilisé', async () => {
      await request(app).post('/api/auth/register').send(validUser);
      const response = await request(app).post('/api/auth/register').send(validUser);

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('déjà utilisé');
    });

    it('devrait refuser un email invalide', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ ...validUser, email: 'pas-un-email' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('devrait refuser un mot de passe trop court', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ ...validUser, password: 'abc' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('devrait refuser si un champ obligatoire manque', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com', password: 'motdepasse123' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  // ============================================
  // POST /api/auth/login
  // ============================================

  describe('POST /api/auth/login', () => {
    const user = {
      nom: 'Martin',
      prenom: 'Sophie',
      email: 'sophie.martin@example.com',
      password: 'motdepasse123',
    };

    beforeEach(async () => {
      await request(app).post('/api/auth/register').send(user);
    });

    it('devrait connecter un utilisateur avec des identifiants valides', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: user.email,
        password: user.password,
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data.user.email).toBe(user.email);
    });

    it('devrait refuser un mauvais mot de passe', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: user.email,
        password: 'mauvais',
      });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it('devrait refuser un email inexistant', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: 'inconnu@example.com',
        password: 'motdepasse123',
      });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it('devrait retourner le même message pour email inexistant et mauvais mot de passe', async () => {
      const res1 = await request(app).post('/api/auth/login').send({
        email: 'inconnu@example.com',
        password: 'motdepasse123',
      });

      const res2 = await request(app).post('/api/auth/login').send({
        email: user.email,
        password: 'mauvais',
      });

      expect(res1.body.message).toBe(res2.body.message);
    });
  });

  // ============================================
  // GET /api/auth/me
  // ============================================

  describe('GET /api/auth/me', () => {
    it("devrait retourner le profil de l'utilisateur connecté", async () => {
      const { user, token } = await createUserAndLogin();

      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe(user.email);
      expect(response.body.data).not.toHaveProperty('password');
    });

    it('devrait refuser sans token', async () => {
      const response = await request(app).get('/api/auth/me');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it('devrait refuser avec un token invalide', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer tokenbidon');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it('devrait refuser avec un mauvais format de header', async () => {
      const response = await request(app).get('/api/auth/me').set('Authorization', 'tokenbidon');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });
});
