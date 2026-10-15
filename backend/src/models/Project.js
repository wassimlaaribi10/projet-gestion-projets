// ============================================
// Modèle Project
// ============================================

const mongoose = require('mongoose');

// ============================================
// Sous-schéma : Member (embarqué dans Project)
// ============================================

const memberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "L'utilisateur est obligatoire"],
    },
    role: {
      type: String,
      enum: {
        values: ['chef_projet', 'membre'],
        message: 'Rôle invalide : {VALUE}',
      },
      default: 'membre',
    },
    dateAjout: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

// ============================================
// Schéma Project
// ============================================

const projectSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'Le nom du projet est obligatoire'],
      trim: true,
      minlength: [3, 'Le nom doit contenir au moins 3 caractères'],
      maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères'],
    },
    description: {
      type: String,
      default: '',
      maxlength: [1000, 'La description ne peut pas dépasser 1000 caractères'],
    },
    statut: {
      type: String,
      enum: {
        values: ['actif', 'archive'],
        message: 'Statut invalide : {VALUE}',
      },
      default: 'actif',
    },
    priorite: {
      type: String,
      enum: {
        values: ['basse', 'moyenne', 'haute'],
        message: 'Priorité invalide : {VALUE}',
      },
      default: 'moyenne',
    },
    dateDebut: {
      type: Date,
      default: Date.now,
    },
    dateFinPrevue: {
      type: Date,
      required: [true, 'La date de fin prévue est obligatoire'],
    },
    proprietaire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Le propriétaire est obligatoire'],
    },
    membres: {
      type: [memberSchema],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    couleur: {
      type: String,
      default: '#3B82F6',
      match: [/^#[0-9A-Fa-f]{6}$/, 'Couleur invalide (format #RRGGBB)'],
    },
  },
  {
    timestamps: { createdAt: 'dateCreation', updatedAt: false },
  }
);

// Indexes
projectSchema.index({ proprietaire: 1 });
projectSchema.index({ 'membres.user': 1 });
projectSchema.index({ statut: 1 });
projectSchema.index({ dateCreation: -1 });

// Validation : dateFinPrevue doit être > dateDebut
projectSchema.pre('save', function (next) {
  if (this.dateFinPrevue && this.dateDebut && this.dateFinPrevue <= this.dateDebut) {
    return next(new Error('La date de fin doit être postérieure à la date de début'));
  }
  next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
