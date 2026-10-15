// ============================================
// Controller Comment : gestion HTTP
// ============================================

const commentService = require('../services/commentService');

// POST /api/comments
const createComment = async (req, res, next) => {
  try {
    const comment = await commentService.createComment(req.body);

    res.status(201).json({
      success: true,
      message: 'Commentaire créé',
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/comments
const getAllComments = async (req, res, next) => {
  try {
    const result = await commentService.getAllComments(req.query);

    res.status(200).json({
      success: true,
      data: result.comments,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/comments/:id
const getCommentById = async (req, res, next) => {
  try {
    const comment = await commentService.getCommentById(req.params.id);

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/comments/:id
const updateComment = async (req, res, next) => {
  try {
    const comment = await commentService.updateComment(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: 'Commentaire modifié',
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/comments/:id
const deleteComment = async (req, res, next) => {
  try {
    await commentService.deleteComment(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      message: 'Commentaire supprimé',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
