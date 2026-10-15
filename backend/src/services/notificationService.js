// ============================================
// Service Notification : logique métier
// ============================================

const { Notification } = require('../models');

// Créer une notification
const createNotification = async (data) => {
  const notification = await Notification.create(data);
  return notification;
};

// Lister les notifications d'un utilisateur
const getAllNotifications = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;
  const skip = (page - 1) * limit;

  const filter = {};
  if (query.destinataire) filter.destinataire = query.destinataire;
  if (query.lue !== undefined) filter.lue = query.lue === 'true';

  const notifications = await Notification.find(filter)
    .sort('-dateCreation')
    .skip(skip)
    .limit(limit);

  const total = await Notification.countDocuments(filter);

  return {
    notifications,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

// Marquer une notification comme lue
const markAsRead = async (id) => {
  const notification = await Notification.findById(id);

  if (!notification) {
    const error = new Error('Notification introuvable');
    error.status = 404;
    throw error;
  }

  notification.lue = true;
  await notification.save();

  return notification;
};

// Marquer toutes les notifications d'un user comme lues
const markAllAsRead = async (destinataire) => {
  await Notification.updateMany({ destinataire, lue: false }, { lue: true });
  return { success: true };
};

// Supprimer une notification
const deleteNotification = async (id) => {
  const notification = await Notification.findByIdAndDelete(id);

  if (!notification) {
    const error = new Error('Notification introuvable');
    error.status = 404;
    throw error;
  }

  return notification;
};

module.exports = {
  createNotification,
  getAllNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};
