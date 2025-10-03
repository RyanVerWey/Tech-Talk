import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// @desc    Get API health status
// @route   GET /api/health
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Check database connection status
    const dbStatus = {
      connected: mongoose.connection.readyState === 1,
      state: getConnectionState(mongoose.connection.readyState),
      host: mongoose.connection.host || 'Unknown',
      name: mongoose.connection.name || 'Unknown',
      collections: mongoose.connection.readyState === 1 ? 
        Object.keys(mongoose.connection.collections).length : 0
    };

    const healthData = {
      success: true,
      message: 'API is healthy',
      timestamp: new Date().toISOString(),
      database: dbStatus,
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      memory: process.memoryUsage(),
      pid: process.pid,
      server: {
        port: process.env.PORT || 3002,
        ready: true
      }
    };

    // Return appropriate status code based on database connection
    const statusCode = dbStatus.connected ? 200 : 503;
    res.status(statusCode).json(healthData);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Health check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Helper function to get human-readable connection state
function getConnectionState(readyState) {
  const states = {
    0: 'disconnected',
    1: 'connected', 
    2: 'connecting',
    3: 'disconnecting'
  };
  return states[readyState] || 'unknown';
}

export default router;