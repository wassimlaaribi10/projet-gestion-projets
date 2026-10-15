// ============================================
// Controller Notification : gestion HTTP
// ============================================

const notificationService = require('../services/notificationService');

// POST /api/notifications
const createNotification = async (req, res, next) => {
  try {
    const notification = await notificationService.createNotification(req.body);

    res.status(201).json({
      success: true,
      message: 'Notification créée',
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/notifications
const getAllNotifications = async (req, res, next) => {
  try {
    const result = await notificationService.getAllNotifications(req.query);

    res.status(200).json({
      success: true,
      data: result.notifications,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/notifications/:id/read
const markAsRead = async (req, res, next) => {
  try {
    const notification = await notificationService.markAsRead(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Notification marquée comme lue',
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/notifications/read-all
const markAllAsRead = async (req, res, next) => {
  try {
    // TODO Sprint 4 : remplacer par req.user.id
    const destinataire = req.query.destinataire;

    if (!destinataire) {
      const error = new Error('Paramètre destinataire requis');
      error.status = 400;
      throw error;
    }

    await notificationService.markAllAsRead(destinataire);

    res.status(200).json({
      success: true,
      message: 'Toutes les notifications ont été marquées comme lues',
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/notifications/:id
const deleteNotification = async (req, res, next) => {
  try {
    await notificationService.deleteNotification(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Notification supprimée',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNotification,
  getAllNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};
