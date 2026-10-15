// ============================================
// Controller Project : gestion HTTP
// ============================================

const projectService = require('../services/projectService');

// POST /api/projects/:id/members
const addMember = async (req, res, next) => {
  try {
    const { userId, role } = req.body;

    const project = await projectService.addMember(req.params.id, userId, role);

    res.status(200).json({
      success: true,
      message: 'Membre ajouté',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/projects
const createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body, req.user.id);

    res.status(201).json({
      success: true,
      message: 'Projet créé',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/projects
const getAllProjects = async (req, res, next) => {
  try {
    const result = await projectService.getAllProjects(req.query);

    res.status(200).json({
      success: true,
      data: result.projects,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/:id
const getProjectById = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id);

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/projects/:id
const updateProject = async (req, res, next) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.body, req.user.id);

    res.status(200).json({
      success: true,
      message: 'Projet modifié',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/projects/:id/archive
const archiveProject = async (req, res, next) => {
  try {
    const project = await projectService.archiveProject(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      message: 'Projet archivé',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  archiveProject,
  addMember,
};
