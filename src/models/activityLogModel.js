const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ['auth', 'request', 'error'],
      required: true
    },
    action: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['success', 'failed', 'info'],
      default: 'info'
    },
    userId: {
      type: Number,
      default: null
    },
    email: {
      type: String,
      default: null
    },
    method: {
      type: String,
      default: null
    },
    path: {
      type: String,
      default: null
    },
    statusCode: {
      type: Number,
      default: null
    },
    message: {
      type: String,
      default: null
    },
    ip: {
      type: String,
      default: null
    },
    userAgent: {
      type: String,
      default: null
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    }
  },
  {
    timestamps: true,
    collection: 'activity_logs'
  }
);

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

const logActivity = async (payload) => {
  if (mongoose.connection.readyState !== 1) {
    return;
  }

  try {
    await ActivityLog.create(payload);
  } catch (error) {
    console.error('Failed to write activity log:', error.message);
  }
};

module.exports = {
  ActivityLog,
  logActivity
};
