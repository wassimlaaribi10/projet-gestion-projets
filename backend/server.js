// ============================================
// Point d'entrée du serveur
// ============================================

// Charger les variables d'environnement EN PREMIER
require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// ============================================
// Démarrage du serveur
// ============================================

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
      console.log(`Environnement : ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error(`Erreur au démarrage : ${error.message}`);
    process.exit(1);
  }
};

startServer();
