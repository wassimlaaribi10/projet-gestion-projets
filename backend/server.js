// ============================================
// Point d'entrée du serveur backend
// ============================================

const http = require('http');

const PORT = 5000;

// Création d'un serveur HTTP minimal
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Backend opérationnel\n');
});

// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});