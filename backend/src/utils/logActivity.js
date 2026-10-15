// ============================================
// Utilitaire : enregistrer une action dans le journal d'audit
// ============================================

const { ActivityLog } = require('../models');

/**
 * Enregistre une action dans le journal d'audit.
 *
 * @param {Object} options
 * @param {string} options.utilisateur - ID de l'utilisateur qui a fait l'action
 * @param {string} options.action - Type d'action (create, update, delete, assign)
 * @param {string} options.entiteType - Type d'entité (project, task, comment)
 * @param {string} options.entiteId - ID de l'entité concernée
 * @param {string} [options.projet] - ID du projet concerné (optionnel)
 * @param {Object} [options.details] - Détails supplémentaires (optionnel)
 */
const logActivity = async ({
  utilisateur,
  action,
  entiteType,
  entiteId,
  projet = null,
  details = {},
}) => {
  try {
    await ActivityLog.create({
      utilisateur,
      action,
      entiteType,
      entiteId,
      projet,
      details,
    });
  } catch (err) {
    // Ne pas bloquer l'action principale si le log échoue
    console.error("Erreur lors de l'enregistrement du log :", err.message);
  }
};

module.exports = logActivity;
