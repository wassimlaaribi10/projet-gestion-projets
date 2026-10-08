// ============================================
// Configuration Express
// ============================================

const express = require('express');

const app = express();

// ============================================
// Middlewares globaux
// ============================================

// Parser le JSON dans les requêtes
app.use(express.json());

// Parser les données de formulaires
app.use(express.urlencoded({ extended: true }));

// ============================================
// Route de santé (health check)
// ============================================

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API opérationnelle 5',
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// Route 404 (par défaut)
// ============================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route introuvable',
  });
});

// ============================================
// Export de l'application
// ============================================

module.exports = app;