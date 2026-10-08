// ============================================
// Point d'entrée du serveur
// ============================================

const app = require('./src/app');

const PORT = process.env.PORT || 5000;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
  console.log(`Environnement : ${process.env.NODE_ENV || 'development'}`);
});
