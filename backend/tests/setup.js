// ============================================
// Setup Jest : base MongoDB Atlas dédiée aux tests
// ============================================

const mongoose = require('mongoose');

// ============================================
// Configuration AVANT tous les tests
// ============================================

beforeAll(async () => {
  // Variables d'environnement pour les tests
  process.env.JWT_SECRET = 'test_secret_pour_les_tests';
  process.env.JWT_EXPIRES_IN = '1h';
  process.env.NODE_ENV = 'test';

  // Forcer DNS publics pour MongoDB Atlas (bug Windows)
  const dns = require('dns');
  dns.setServers(['8.8.8.8', '8.8.4.4']);

  // Chaîne de connexion vers la base de TEST
  const testUri =
    'mongodb://wlaaribi_db_user:projet1986@ac-gficzd2-shard-00-00.05irgzk.mongodb.net:27017,ac-gficzd2-shard-00-01.05irgzk.mongodb.net:27017,ac-gficzd2-shard-00-02.05irgzk.mongodb.net:27017/gestion_projets_test?ssl=true&replicaSet=atlas-xf3wcs-shard-0&authSource=admin&retryWrites=true&w=majority';

  await mongoose.connect(testUri);
}, 60000);

// ============================================
// Nettoyage APRÈS tous les tests
// ============================================

afterAll(async () => {
  try {
    await mongoose.connection.dropDatabase(); // Supprime la base de test
    await mongoose.disconnect();
  } catch (err) {
    console.error('Erreur lors de la fermeture :', err.message);
  }
});

// ============================================
// Nettoyage ENTRE chaque test
// ============================================

afterEach(async () => {
  if (mongoose.connection.readyState === 1) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  }
});
