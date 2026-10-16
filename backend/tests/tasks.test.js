// ============================================
// Tests d'intégration : Tâches
// ============================================

const request = require('supertest');
const app = require('../src/app');
const { createUserAndLogin } = require('./helpers');

describe('Tâches', () => {
  let token;
  let user;
  let projectId;

  // Avant chaque test : utilisateur + projet
  beforeEach(async () => {
    const result = await createUserAndLogin();
    token = result.token;
    user = result.user;

    const projectResponse = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nom: 'Projet de test',
        dateFinPrevue: '2026-12-31',
        priorite: 'moyenne',
      });

    projectId = projectResponse.body.data._id;
  });

  // ============================================
  // POST /api/tasks
  // ============================================

  describe('POST /api/tasks', () => {
    it('devrait créer une tâche avec des données valides', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          titre: "Créer la page d'accueil",
          description: 'Page principale du site',
          projet: projectId,
          createur: user._id,
          priorite: 'haute',
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.titre).toBe("Créer la page d'accueil");
      expect(response.body.data.statut).toBe('a_faire');
    });

    it('devrait refuser avec un projet inexistant', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          titre: 'Test',
          projet: fakeId,
          createur: user._id,
        });

      expect(response.status).toBe(404);
    });

    it('devrait refuser si le titre est trop court', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          titre: 'A',
          projet: projectId,
          createur: user._id,
        });

      expect(response.status).toBe(400);
    });
  });

  // ============================================
  // GET /api/tasks
  // ============================================

  describe('GET /api/tasks', () => {
    beforeEach(async () => {
      // Créer 3 tâches avec des statuts différents
      const tasks = [
        { titre: 'Tâche à faire', statut: 'a_faire', priorite: 'basse' },
        { titre: 'Tâche en cours', statut: 'en_cours', priorite: 'moyenne' },
        { titre: 'Tâche terminée', statut: 'terminee', priorite: 'haute' },
      ];

      for (const task of tasks) {
        await request(app)
          .post('/api/tasks')
          .set('Authorization', `Bearer ${token}`)
          .send({
            ...task,
            projet: projectId,
            createur: user._id,
          });
      }
    });

    it('devrait retourner toutes les tâches', async () => {
      const response = await request(app)
        .get(`/api/tasks?projet=${projectId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(3);
    });

    it('devrait filtrer par statut', async () => {
      const response = await request(app)
        .get(`/api/tasks?projet=${projectId}&statut=en_cours`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].statut).toBe('en_cours');
    });

    it('devrait filtrer par priorité', async () => {
      const response = await request(app)
        .get(`/api/tasks?projet=${projectId}&priorite=haute`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].priorite).toBe('haute');
    });

    it('devrait cumuler les filtres', async () => {
      const response = await request(app)
        .get(`/api/tasks?projet=${projectId}&statut=terminee&priorite=haute`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
    });
  });

  // ============================================
  // PUT /api/tasks/:id
  // ============================================

  describe('PUT /api/tasks/:id', () => {
    let taskId;

    beforeEach(async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          titre: 'Tâche à modifier',
          projet: projectId,
          createur: user._id,
        });

      taskId = response.body.data._id;
    });

    it("devrait modifier le statut d'une tâche", async () => {
      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ statut: 'en_cours' });

      expect(response.status).toBe(200);
      expect(response.body.data.statut).toBe('en_cours');
    });

    it('devrait retourner 404 pour un ID inexistant', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .put(`/api/tasks/${fakeId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ statut: 'en_cours' });

      expect(response.status).toBe(404);
    });
  });

  // ============================================
  // DELETE /api/tasks/:id
  // ============================================

  describe('DELETE /api/tasks/:id', () => {
    it('devrait supprimer une tâche', async () => {
      const createResponse = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          titre: 'Tâche à supprimer',
          projet: projectId,
          createur: user._id,
        });

      const taskId = createResponse.body.data._id;

      const response = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);

      // Vérifier que la tâche est supprimée
      const getResponse = await request(app)
        .get(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(getResponse.status).toBe(404);
    });
  });
});
