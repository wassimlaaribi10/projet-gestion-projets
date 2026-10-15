// ============================================
// Service Task : logique métier
// ============================================

const logActivity = require('../utils/logActivity');
const createNotification = require('../utils/createNotification');
const { Task, Project } = require('../models');

// Créer une tâche
const createTask = async (data, userId = null) => {
  const project = await Project.findById(data.projet);
  if (!project) {
    const error = new Error('Projet introuvable');
    error.status = 404;
    throw error;
  }

  const task = await Task.create(data);

  if (userId) {
    await logActivity({
      utilisateur: userId,
      action: 'create',
      entiteType: 'task',
      entiteId: task._id,
      projet: task.projet,
      details: { titre: task.titre },
    });
  }

  return task;
};

// Lister les tâches (avec filtres et pagination)
const getAllTasks = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  // Filtres
  const filter = {};
  if (query.projet) filter.projet = query.projet;
  if (query.statut) filter.statut = query.statut;
  if (query.priorite) filter.priorite = query.priorite;
  if (query.assigneA) filter.assigneA = query.assigneA;
  if (query.search) {
    filter.titre = { $regex: query.search, $options: 'i' };
  }

  const tasks = await Task.find(filter)
    .populate('assigneA', 'nom prenom email')
    .populate('createur', 'nom prenom email')
    .populate('projet', 'nom')
    .sort('-dateCreation')
    .skip(skip)
    .limit(limit);

  const total = await Task.countDocuments(filter);

  return {
    tasks,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

// Récupérer une tâche par ID
const getTaskById = async (id) => {
  const task = await Task.findById(id)
    .populate('assigneA', 'nom prenom email')
    .populate('createur', 'nom prenom email')
    .populate('projet', 'nom');

  if (!task) {
    const error = new Error('Tâche introuvable');
    error.status = 404;
    throw error;
  }

  return task;
};

// Modifier une tâche
const updateTask = async (id, data, userId = null) => {
  const task = await Task.findById(id);

  if (!task) {
    const error = new Error('Tâche introuvable');
    error.status = 404;
    throw error;
  }

  // Vérifier si l'assigné a changé
  const oldAssignee = task.assigneA?.toString();
  const newAssignee = data.assigneA?.toString();

  Object.assign(task, data);
  await task.save();

  // Créer une notification si un nouvel utilisateur est assigné
  if (newAssignee && newAssignee !== oldAssignee) {
    try {
      await createNotification({
        destinataire: newAssignee,
        type: 'tache_assignee',
        message: `Vous avez été assigné à la tâche "${task.titre}"`,
        lien: `/tasks/${task._id}`,
        entiteType: 'task',
        entiteId: task._id,
      });
    } catch (err) {
      // Ne pas bloquer si la notification échoue
      console.error('Erreur création notification :', err.message);
    }
  }
  if (userId) {
    await logActivity({
      utilisateur: userId,
      action: 'update',
      entiteType: 'task',
      entiteId: task._id,
      projet: task.projet,
      details: { modifications: Object.keys(data) },
    });
  }

  return task;
};

// Supprimer une tâche
const deleteTask = async (id, userId = null) => {
  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    const error = new Error('Tâche introuvable');
    error.status = 404;
    throw error;
  }

  if (userId) {
    await logActivity({
      utilisateur: userId,
      action: 'delete',
      entiteType: 'task',
      entiteId: task._id,
      projet: task.projet,
      details: { titre: task.titre },
    });
  }

  return task;
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
