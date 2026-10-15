// ============================================
// Service Project : logique métier
// ============================================

const { Project } = require('../models');

// Créer un projet
const createProject = async (data) => {
  const project = await Project.create(data);
  return project;
};

// Lister les projets (avec pagination)
const getAllProjects = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const projects = await Project.find()
    .populate('proprietaire', 'nom prenom email')
    .sort('-dateCreation')
    .skip(skip)
    .limit(limit);

  const total = await Project.countDocuments();

  return {
    projects,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

// Récupérer un projet par ID
const getProjectById = async (id) => {
  const project = await Project.findById(id).populate('proprietaire', 'nom prenom email');

  if (!project) {
    const error = new Error('Projet introuvable');
    error.status = 404;
    throw error;
  }

  return project;
};

// Modifier un projet
const updateProject = async (id, data) => {
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error('Projet introuvable');
    error.status = 404;
    throw error;
  }

  Object.assign(project, data);
  await project.save();

  return project;
};

// Archiver un projet
const archiveProject = async (id) => {
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error('Projet introuvable');
    error.status = 404;
    throw error;
  }

  project.statut = 'archive';
  await project.save();

  return project;
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  archiveProject,
};
