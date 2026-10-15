// ============================================
// Service ActivityLog : journal d'audit
// ============================================

const { ActivityLog } = require('../models');

// Enregistrer une action
const logAction = async ({ utilisateur, action, entiteType, entiteId, projet, details }) => {
  const log = await ActivityLog.create({
    utilisateur,
    action,
    entiteType,
    entiteId,
    projet,
    details,
  });

  return log;
};

// Lister les logs (avec filtre par projet)
const getAllLogs = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;
  const skip = (page - 1) * limit;

  const filter = {};
  if (query.projet) filter.projet = query.projet;
  if (query.utilisateur) filter.utilisateur = query.utilisateur;

  const logs = await ActivityLog.find(filter)
    .populate('utilisateur', 'nom prenom email')
    .populate('projet', 'nom')
    .sort('-dateCreation')
    .skip(skip)
    .limit(limit);

  const total = await ActivityLog.countDocuments(filter);

  return {
    logs,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

module.exports = {
  logAction,
  getAllLogs,
};
