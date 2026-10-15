// ============================================
// Controller Task : gestion HTTP
// ============================================

const taskService = require('../services/taskService');

// POST /api/tasks
const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body);

    res.status(201).json({
      success: true,
      message: 'Tâche créée',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/tasks
const getAllTasks = async (req, res, next) => {
  try {
    const result = await taskService.getAllTasks(req.query);

    res.status(200).json({
      success: true,
      data: result.tasks,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/tasks/:id
const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: 'Tâche modifiée',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Tâche supprimée',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
