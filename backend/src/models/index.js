// ============================================
// Export centralisé des modèles
// ============================================

const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');
const Comment = require('./Comment');
const Notification = require('./Notification');
const ActivityLog = require('./ActivityLog');

module.exports = {
  User,
  Project,
  Task,
  Comment,
  Notification,
  ActivityLog,
};
