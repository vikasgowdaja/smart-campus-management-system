const { logActivity } = require('../models/activityLogModel');

const errorLogMiddleware = async (err, req, res, next) => {
  await logActivity({
    category: 'error',
    action: 'api_error',
    status: 'failed',
    userId: req.user?.id || null,
    method: req.method,
    path: req.originalUrl,
    statusCode: err.statusCode || 500,
    message: err.message || 'Unhandled API error',
    ip: req.ip,
    userAgent: req.get('user-agent') || null,
    metadata: {
      stack: err.stack || null
    }
  });

  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal server error'
  });
};

module.exports = errorLogMiddleware;
