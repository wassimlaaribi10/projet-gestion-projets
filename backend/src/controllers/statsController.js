// ============================================
// Controller Stats : gestion HTTP
// ============================================

const statsService = require('../services/statsService');

// GET /api/stats/global
const getGlobalStats = async (req, res, next) => {
  try {
    const stats = await statsService.getGlobalStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/stats/projects/:id
const getProjectStats = async (req, res, next) => {
  try {
    const stats = await statsService.getProjectStats(req.params.id);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGlobalStats,
  getProjectStats,
};
