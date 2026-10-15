// ============================================
// Service Statistiques (agrégations MongoDB)
// ============================================

const mongoose = require('mongoose');
const { Project, Task, User } = require('../models');
// ============================================
// Statistiques globales (admin)
// ============================================

const getGlobalStats = async () => {
  const [totalUsers, totalProjects, totalTasks, tasksByStatus] = await Promise.all([
    User.countDocuments(),
    Project.countDocuments(),
    Task.countDocuments(),
    Task.aggregate([{ $group: { _id: '$statut', count: { $sum: 1 } } }]),
  ]);

  // Transformer le tableau en objet
  const statusMap = {
    a_faire: 0,
    en_cours: 0,
    en_revue: 0,
    terminee: 0,
  };

  tasksByStatus.forEach((item) => {
    statusMap[item._id] = item.count;
  });

  return {
    totalUsers,
    totalProjects,
    totalTasks,
    tasksByStatus: statusMap,
  };
};

// ============================================
// Statistiques d'un projet
// ============================================

const getProjectStats = async (projectId) => {
  // Convertir la chaîne en ObjectId pour les agrégations
  const projectObjectId = new mongoose.Types.ObjectId(projectId);

  // 1. Statistiques de base
  const [totalTasks, tasksByStatus, tasksByPriority] = await Promise.all([
    Task.countDocuments({ projet: projectId }),

    Task.aggregate([
      { $match: { projet: projectObjectId } }, // ← changer
      { $group: { _id: '$statut', count: { $sum: 1 } } },
    ]),

    Task.aggregate([
      { $match: { projet: projectObjectId } }, // ← changer
      { $group: { _id: '$priorite', count: { $sum: 1 } } },
    ]),
  ]);

  // 2. Tâches en retard
  const now = new Date();
  const lateTasks = await Task.countDocuments({
    projet: projectId,
    dateEcheance: { $lt: now },
    statut: { $ne: 'terminee' },
  });

  // 3. Charge de travail par membre
  const workloadByMember = await Task.aggregate([
    {
      $match: {
        projet: projectObjectId,
        assigneA: { $ne: null },
        statut: { $ne: 'terminee' },
      },
    },
    {
      $group: {
        _id: '$assigneA',
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $project: {
        _id: 0,
        userId: '$_id',
        nom: '$user.nom',
        prenom: '$user.prenom',
        count: 1,
      },
    },
    { $sort: { count: -1 } },
  ]);

  // Transformer les tableaux en objets
  const statusMap = { a_faire: 0, en_cours: 0, en_revue: 0, terminee: 0 };
  tasksByStatus.forEach((item) => {
    statusMap[item._id] = item.count;
  });

  const priorityMap = { basse: 0, moyenne: 0, haute: 0, urgente: 0 };
  tasksByPriority.forEach((item) => {
    priorityMap[item._id] = item.count;
  });

  // 4. Taux de progression
  const progression = totalTasks > 0 ? Math.round((statusMap.terminee / totalTasks) * 100) : 0;

  return {
    totalTasks,
    lateTasks,
    tasksByStatus: statusMap,
    tasksByPriority: priorityMap,
    workloadByMember,
    progression,
  };
};

module.exports = {
  getGlobalStats,
  getProjectStats,
};
