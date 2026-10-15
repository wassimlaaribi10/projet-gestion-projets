// ============================================
// Modèle Comment
// ============================================

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    contenu: {
      type: String,
      required: [true, 'Le contenu est obligatoire'],
      trim: true,
      minlength: [1, 'Le commentaire ne peut pas être vide'],
      maxlength: [1000, 'Le commentaire ne peut pas dépasser 1000 caractères'],
    },
    auteur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "L'auteur est obligatoire"],
    },
    tache: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      required: [true, 'La tâche est obligatoire'],
    },
    mentions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: 'dateCreation',
      updatedAt: 'dateModification',
    },
  }
);

// Indexes
commentSchema.index({ tache: 1 });
commentSchema.index({ auteur: 1 });
commentSchema.index({ dateCreation: -1 });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
