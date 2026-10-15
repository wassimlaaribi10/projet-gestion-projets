// ============================================
// Service Comment : logique métier
// ============================================

const createNotification = require('../utils/createNotification');
const { Comment, Task } = require('../models');

// Créer un commentaire
const createComment = async (data) => {
  // Vérifier que la tâche existe
  const task = await Task.findById(data.tache);
  if (!task) {
    const error = new Error('Tâche introuvable');
    error.status = 404;
    throw error;
  }

  const comment = await Comment.create(data);

  // Créer des notifications pour les utilisateurs mentionnés
  if (data.mentions && data.mentions.length > 0) {
    for (const userId of data.mentions) {
      // Ne pas se notifier soi-même
      if (userId.toString() === data.auteur.toString()) continue;

      try {
        await createNotification({
          destinataire: userId,
          type: 'mention',
          message: `Vous avez été mentionné dans un commentaire sur "${task.titre}"`,
          lien: `/tasks/${task._id}`,
          entiteType: 'comment',
          entiteId: comment._id,
        });
      } catch (err) {
        console.error('Erreur création notification mention :', err.message);
      }
    }
  }

  return comment;
};
// Lister les commentaires (filtre par tâche)
const getAllComments = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (query.tache) filter.tache = query.tache;

  const comments = await Comment.find(filter)
    .populate('auteur', 'nom prenom email')
    .populate('mentions', 'nom prenom email')
    .sort('-dateCreation')
    .skip(skip)
    .limit(limit);

  const total = await Comment.countDocuments(filter);

  return {
    comments,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

// Récupérer un commentaire par ID
const getCommentById = async (id) => {
  const comment = await Comment.findById(id)
    .populate('auteur', 'nom prenom email')
    .populate('mentions', 'nom prenom email');

  if (!comment) {
    const error = new Error('Commentaire introuvable');
    error.status = 404;
    throw error;
  }

  return comment;
};

// Modifier un commentaire
const updateComment = async (id, data) => {
  const comment = await Comment.findById(id);

  if (!comment) {
    const error = new Error('Commentaire introuvable');
    error.status = 404;
    throw error;
  }

  if (data.contenu) comment.contenu = data.contenu;
  await comment.save();

  return comment;
};

// Supprimer un commentaire
const deleteComment = async (id) => {
  const comment = await Comment.findByIdAndDelete(id);

  if (!comment) {
    const error = new Error('Commentaire introuvable');
    error.status = 404;
    throw error;
  }

  return comment;
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
