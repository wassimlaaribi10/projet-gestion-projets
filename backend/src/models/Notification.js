// ============================================
// Modèle Notification
// ============================================

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    destinataire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Le destinataire est obligatoire'],
    },
    type: {
      type: String,
      enum: {
        values: ['tache_assignee', 'mention', 'echeance', 'projet_ajout'],
        message: 'Type invalide : {VALUE}',
      },
      required: [true, 'Le type est obligatoire'],
    },
    message: {
      type: String,
      required: [true, 'Le message est obligatoire'],
      maxlength: [300, 'Le message ne peut pas dépasser 300 caractères'],
    },
    lien: {
      type: String,
      default: null,
    },
    lue: {
      type: Boolean,
      default: false,
    },
    reference: {
      entiteType: {
        type: String,
        enum: ['task', 'project', 'comment', null],
        default: null,
      },
      entiteId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
      },
    },
  },
  {
    timestamps: { createdAt: 'dateCreation', updatedAt: false },
  }
);

// Indexes
notificationSchema.index({ destinataire: 1, lue: 1 });
notificationSchema.index({ dateCreation: -1 });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
