// ============================================
// Controller ActivityLog : gestion HTTP
// ============================================

const activityLogService = require('../services/activityLogService');

// GET /api/activity-logs
const getAllLogs = async (req, res, next) => {
  try {
    const result = await activityLogService.getAllLogs(req.query);

    res.status(200).json({
      success: true,
      data: result.logs,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllLogs,
};
