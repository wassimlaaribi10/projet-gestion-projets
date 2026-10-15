// ============================================
// Service Task : logique métier
// ============================================

const { Task, Project } = require('../models');

// Créer une tâche
const createTask = async (data) => {
  // Vérifier que le projet existe
  const project = await Project.findById(data.projet);
  if (!project) {
    const error = new Error('Projet introuvable');
    error.status = 404;
    throw error;
  }

  const task = await Task.create(data);
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
const updateTask = async (id, data) => {
  const task = await Task.findById(id);

  if (!task) {
    const error = new Error('Tâche introuvable');
    error.status = 404;
    throw error;
  }

  Object.assign(task, data);
  await task.save();

  return task;
};

// Supprimer une tâche
const deleteTask = async (id) => {
  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    const error = new Error('Tâche introuvable');
    error.status = 404;
    throw error;
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
