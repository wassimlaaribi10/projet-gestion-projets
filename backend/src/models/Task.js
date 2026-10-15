// ============================================
// Modèle Task
// ============================================

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: [true, 'Le titre est obligatoire'],
      trim: true,
      minlength: [3, 'Le titre doit contenir au moins 3 caractères'],
      maxlength: [200, 'Le titre ne peut pas dépasser 200 caractères'],
    },
    description: {
      type: String,
      default: '',
      maxlength: [2000, 'La description ne peut pas dépasser 2000 caractères'],
    },
    projet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Le projet est obligatoire'],
    },
    statut: {
      type: String,
      enum: {
        values: ['a_faire', 'en_cours', 'en_revue', 'terminee'],
        message: 'Statut invalide : {VALUE}',
      },
      default: 'a_faire',
    },
    priorite: {
      type: String,
      enum: {
        values: ['basse', 'moyenne', 'haute', 'urgente'],
        message: 'Priorité invalide : {VALUE}',
      },
      default: 'moyenne',
    },
    assigneA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    createur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Le créateur est obligatoire'],
    },
    dateEcheance: {
      type: Date,
      default: null,
    },
    dateDebut: {
      type: Date,
      default: null,
    },
    dateFin: {
      type: Date,
      default: null,
    },
    estimation: {
      type: Number,
      default: 0,
      min: [0, "L'estimation ne peut pas être négative"],
    },
    tempsPasse: {
      type: Number,
      default: 0,
      min: [0, 'Le temps passé ne peut pas être négatif'],
    },
    tags: {
      type: [String],
      default: [],
    },
    ordre: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: { createdAt: 'dateCreation', updatedAt: false },
  }
);

// Indexes
taskSchema.index({ projet: 1 });
taskSchema.index({ assigneA: 1 });
taskSchema.index({ statut: 1 });
taskSchema.index({ dateEcheance: 1 });
taskSchema.index({ projet: 1, statut: 1 });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
