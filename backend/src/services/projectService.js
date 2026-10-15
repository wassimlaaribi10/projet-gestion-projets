// ============================================
// Service Project : logique métier
// ============================================

const createNotification = require('../utils/createNotification');
const { Project } = require('../models');

// Ajouter un membre à un projet
const addMember = async (projectId, userId, role = 'membre') => {
  const project = await Project.findById(projectId);

  if (!project) {
    const error = new Error('Projet introuvable');
    error.status = 404;
    throw error;
  }

  // Vérifier si déjà membre
  const alreadyMember = project.membres.some((m) => m.user.toString() === userId.toString());

  if (alreadyMember) {
    const error = new Error('Cet utilisateur est déjà membre du projet');
    error.status = 409;
    throw error;
  }

  // Ajouter le membre
  project.membres.push({ user: userId, role });
  await project.save();

  // Créer une notification
  try {
    await createNotification({
      destinataire: userId,
      type: 'projet_ajout',
      message: `Vous avez été ajouté au projet "${project.nom}"`,
      lien: `/projects/${project._id}`,
      entiteType: 'project',
      entiteId: project._id,
    });
  } catch (err) {
    console.error('Erreur création notification projet :', err.message);
  }

  return project;
};

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
    .populate('membres.user', 'nom prenom email')
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
  const project = await Project.findById(id)
    .populate('proprietaire', 'nom prenom email')
    .populate('membres.user', 'nom prenom email');

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
  addMember,
};
