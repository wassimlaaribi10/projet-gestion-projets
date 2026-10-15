// ============================================
// Modèle ActivityLog
// ============================================

const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema(
  {
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "L'utilisateur est obligatoire"],
    },
    action: {
      type: String,
      enum: {
        values: ['create', 'update', 'delete', 'assign'],
        message: 'Action invalide : {VALUE}',
      },
      required: [true, "L'action est obligatoire"],
    },
    entiteType: {
      type: String,
      enum: {
        values: ['project', 'task', 'comment'],
        message: "Type d'entité invalide : {VALUE}",
      },
      required: [true, "Le type d'entité est obligatoire"],
    },
    entiteId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "L'identifiant de l'entité est obligatoire"],
    },
    projet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      default: null,
    },
    details: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: { createdAt: 'dateCreation', updatedAt: false },
  }
);

// Indexes
activityLogSchema.index({ projet: 1, dateCreation: -1 });
activityLogSchema.index({ utilisateur: 1 });
activityLogSchema.index({ entiteType: 1, entiteId: 1 });

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;
