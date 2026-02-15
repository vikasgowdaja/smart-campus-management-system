const { logActivity } = require('../models/activityLogModel');

const requestLogMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on('finish', async () => {
    if (req.originalUrl === '/api/health') {
      return;
    }

    await logActivity({
      category: 'request',
      action: 'api_request',
      status: res.statusCode >= 400 ? 'failed' : 'success',
      userId: req.user?.id || null,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      ip: req.ip,
      userAgent: req.get('user-agent') || null,
      metadata: {
        durationMs: Date.now() - start
      }
    });

    if (res.statusCode >= 500) {
      await logActivity({
        category: 'error',
        action: 'api_error_response',
        status: 'failed',
        userId: req.user?.id || null,
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        message: 'API responded with server error',
        ip: req.ip,
        userAgent: req.get('user-agent') || null
      });
    }
  });

  next();
};

module.exports = requestLogMiddleware;
