import express from 'express';
import passport from '../config/passport.js';
import { generateTokens, refreshAccessToken, revokeRefreshToken } from '../utils/auth.js';
import { authenticateToken } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    try {
      // Generate JWT tokens
      const tokens = await generateTokens(req.user);
      
      // Redirect to client with access token
      const clientURL = process.env.CLIENT_URL || 'http://localhost:5173';
      const redirectURL = `${clientURL}/auth/callback?token=${tokens.accessToken}&user=${encodeURIComponent(JSON.stringify({
        id: req.user._id,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        avatar: req.user.avatar,
        role: req.user.role,
        hasJoinedNetwork: req.user.hasJoinedNetwork
      }))}`;        res.redirect(redirectURL);
    } catch (error) {
      console.error('OAuth callback error:', error);
      const clientURL = process.env.CLIENT_URL || 'http://localhost:5173';
      res.redirect(`${clientURL}/auth/error?message=Authentication failed`);
    }
  }
);

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    
    res.json({
      success: true,
      data: user,
      message: 'User profile retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving user profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.post('/refresh', async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token required'
      });
    }

    const tokens = await refreshAccessToken(refreshToken);
    
    res.json({
      success: true,
      data: tokens,
      message: 'Token refreshed successfully'
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired refresh token'
    });
  }
});

router.post('/logout', authenticateToken, async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
    if (refreshToken) {
      await revokeRefreshToken(refreshToken);
    }
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during logout'
    });
  }
});

router.get('/status', (req, res) => {
  res.json({
    success: true,
    data: {
      googleAuth: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
      jwtSecret: !!process.env.JWT_SECRET,
      environment: process.env.NODE_ENV || 'development'
    },
    message: 'Authentication service status'
  });
});

export default router;