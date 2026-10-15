// ============================================
// Connexion à MongoDB via Mongoose
// ============================================

const mongoose = require('mongoose');

/**
 * Connecte l'application à MongoDB.
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB connecté : ${conn.connection.host}`);
    console.log(`Base de données : ${conn.connection.name}`);
  } catch (error) {
    console.error(`Erreur de connexion MongoDB : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
