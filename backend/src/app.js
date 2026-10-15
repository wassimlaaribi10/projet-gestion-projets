// ============================================
// Configuration Express
// ============================================

const express = require('express');
const errorHandler = require('./middlewares/errorMiddleware');
const notFound = require('./middlewares/notFoundMiddleware');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

// Parser le JSON
app.use(express.json());

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API opérationnelle' });
});

// Routes API
app.use('/api/projects', projectRoutes);

// 404 (après les routes)
app.use(notFound);

// Gestion des erreurs (en dernier)
app.use(errorHandler);

module.exports = app;
