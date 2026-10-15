// ============================================
// Configuration Express
// ============================================

const express = require('express');
const errorHandler = require('./middlewares/errorMiddleware');
const notFound = require('./middlewares/notFoundMiddleware');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const commentRoutes = require('./routes/commentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const activityLogRoutes = require('./routes/activityLogRoutes');

const app = express();

// Parser le JSON
app.use(express.json());

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API opérationnelle' });
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/activity-logs', activityLogRoutes);

// 404 (après les routes)
app.use(notFound);

// Gestion des erreurs (en dernier)
app.use(errorHandler);

module.exports = app;
