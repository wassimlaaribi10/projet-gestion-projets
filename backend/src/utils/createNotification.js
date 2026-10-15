// ============================================
// Utilitaire : créer une notification
// ============================================

const { Notification } = require('../models');

/**
 * Crée une notification pour un utilisateur.
 *
 * @param {Object} options
 * @param {string} options.destinataire - ID de l'utilisateur à notifier
 * @param {string} options.type - Type de notification
 * @param {string} options.message - Message de la notification
 * @param {string} [options.lien] - Lien frontend vers la ressource
 * @param {string} [options.entiteType] - Type d'entité (task, project, comment)
 * @param {string} [options.entiteId] - ID de l'entité concernée
 * @returns {Promise<Object>} La notification créée
 */
const createNotification = async ({
  destinataire,
  type,
  message,
  lien = null,
  entiteType = null,
  entiteId = null,
}) => {
  // Ne pas se notifier soi-même (optionnel)
  // On ne peut pas vérifier ici car on n'a pas l'ID de l'auteur
  // C'est à l'appelant de gérer ce cas

  const notification = await Notification.create({
    destinataire,
    type,
    message,
    lien,
    reference: entiteType && entiteId ? { entiteType, entiteId } : undefined,
  });

  return notification;
};

module.exports = createNotification;
