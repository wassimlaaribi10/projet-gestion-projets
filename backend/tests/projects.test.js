// ============================================
// Tests d'intégration : Projets
// ============================================

const request = require('supertest');
const app = require('../src/app');
const { createUserAndLogin } = require('./helpers');

describe('Projets', () => {
  let token;
  let user;

  // Avant chaque test : créer un utilisateur + token
  beforeEach(async () => {
    const result = await createUserAndLogin();
    token = result.token;
    user = result.user;
  });

  // ============================================
  // POST /api/projects
  // ============================================

  describe('POST /api/projects', () => {
    const validProject = {
      nom: 'Refonte du site',
      description: 'Refonte complète du site vitrine',
      dateFinPrevue: '2026-12-31',
      priorite: 'haute',
    };

    it('devrait créer un projet avec des données valides', async () => {
      const response = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send(validProject);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.nom).toBe(validProject.nom);
      expect(response.body.data.proprietaire).toBe(user._id.toString());
      expect(response.body.data.membres).toHaveLength(1);
    });

    it('devrait refuser sans token', async () => {
      const response = await request(app).post('/api/projects').send(validProject);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it('devrait refuser si le nom est trop court', async () => {
      const response = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...validProject, nom: 'A' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('devrait refuser si la date de fin manque', async () => {
      const response = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({ nom: 'Test', description: 'Test' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  // ============================================
  // GET /api/projects
  // ============================================

  describe('GET /api/projects', () => {
    beforeEach(async () => {
      // Créer 2 projets
      await request(app).post('/api/projects').set('Authorization', `Bearer ${token}`).send({
        nom: 'Projet 1',
        dateFinPrevue: '2026-12-31',
        priorite: 'haute',
      });

      await request(app).post('/api/projects').set('Authorization', `Bearer ${token}`).send({
        nom: 'Projet 2',
        dateFinPrevue: '2026-11-30',
        priorite: 'basse',
      });
    });

    it("devrait retourner la liste des projets de l'utilisateur", async () => {
      const response = await request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination).toBeDefined();
    });

    it('devrait refuser sans token', async () => {
      const response = await request(app).get('/api/projects');

      expect(response.status).toBe(401);
    });
  });

  // ============================================
  // GET /api/projects/:id
  // ============================================

  describe('GET /api/projects/:id', () => {
    let projectId;

    beforeEach(async () => {
      const response = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nom: 'Mon projet',
          dateFinPrevue: '2026-12-31',
          priorite: 'moyenne',
        });

      projectId = response.body.data._id;
    });

    it("devrait retourner le détail d'un projet", async () => {
      const response = await request(app)
        .get(`/api/projects/${projectId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data._id).toBe(projectId);
      expect(response.body.data.nom).toBe('Mon projet');
    });

    it('devrait retourner 404 pour un ID inexistant', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .get(`/api/projects/${fakeId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });

    it('devrait retourner 400 pour un ID invalide', async () => {
      const response = await request(app)
        .get('/api/projects/id-invalide')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
    });
  });

  // ============================================
  // PUT /api/projects/:id
  // ============================================

  describe('PUT /api/projects/:id', () => {
    let projectId;

    beforeEach(async () => {
      const response = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nom: 'Projet à modifier',
          dateFinPrevue: '2026-12-31',
          priorite: 'basse',
        });

      projectId = response.body.data._id;
    });

    it('devrait modifier un projet', async () => {
      const response = await request(app)
        .put(`/api/projects/${projectId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nom: 'Projet modifié', priorite: 'haute' });

      expect(response.status).toBe(200);
      expect(response.body.data.nom).toBe('Projet modifié');
      expect(response.body.data.priorite).toBe('haute');
    });

    it('devrait refuser si un autre utilisateur modifie', async () => {
      // Créer un autre utilisateur
      const autre = await createUserAndLogin({
        email: `autre${Date.now()}@example.com`,
      });

      const response = await request(app)
        .put(`/api/projects/${projectId}`)
        .set('Authorization', `Bearer ${autre.token}`)
        .send({ nom: 'Tentative de modification' });

      expect(response.status).toBe(403);
    });
  });

  // ============================================
  // PATCH /api/projects/:id/archive
  // ============================================

  describe('PATCH /api/projects/:id/archive', () => {
    it('devrait archiver un projet', async () => {
      const createResponse = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nom: 'Projet à archiver',
          dateFinPrevue: '2026-12-31',
          priorite: 'moyenne',
        });

      const projectId = createResponse.body.data._id;

      const response = await request(app)
        .patch(`/api/projects/${projectId}/archive`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data.statut).toBe('archive');
    });
  });
});
