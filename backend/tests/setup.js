// ============================================
// Setup Jest : base MongoDB Atlas dédiée aux tests
// ============================================

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.test') });

// ============================================
// Configuration AVANT tous les tests
// ============================================

beforeAll(async () => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret_pour_les_tests';
  process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
  process.env.NODE_ENV = 'test';

  // Forcer DNS publics pour MongoDB Atlas
  const dns = require('dns');
  dns.setServers(['8.8.8.8', '8.8.4.4']);

  // Lire depuis .env.test (pas de credentials en dur !)
  const testUri = process.env.MONGODB_TEST_URI;

  if (!testUri) {
    throw new Error('MONGODB_TEST_URI manquant dans .env.test');
  }

  await mongoose.connect(testUri);
}, 60000);

// ============================================
// Nettoyage APRÈS tous les tests
// ============================================

afterAll(async () => {
  try {
    await mongoose.connection.dropDatabase();
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
