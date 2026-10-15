// ============================================
// Configuration Express
// ============================================

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const { apiLimiter } = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorMiddleware');
const notFound = require('./middlewares/notFoundMiddleware');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const commentRoutes = require('./routes/commentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const activityLogRoutes = require('./routes/activityLogRoutes');

const app = express();

// ============================================
// Sécurité HTTP
// ============================================

app.use(helmet());

// CORS : autorise uniquement le frontend
const corsOptions = {
  origin: [
    'http://localhost:5173', // Vite (frontend en dev)
    'http://localhost:3000', // CRA (React classique)
  ],
  credentials: true,
};
app.use(cors(corsOptions));

// ============================================
// Parsers
// ============================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// Route de santé
// ============================================

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API opérationnelle' });
});

// ============================================
// Routes API
// ============================================

app.use('/api/auth', authRoutes);
app.use('/api/projects', apiLimiter, projectRoutes);
app.use('/api/tasks', apiLimiter, taskRoutes);
app.use('/api/comments', apiLimiter, commentRoutes);
app.use('/api/notifications', apiLimiter, notificationRoutes);
app.use('/api/activity-logs', apiLimiter, activityLogRoutes);

// ============================================
// 404 puis erreurs
// ============================================

app.use(notFound);
app.use(errorHandler);

module.exports = app;
