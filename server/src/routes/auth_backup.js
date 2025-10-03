import express from 'express';
import passport from '../config/passport.js';
import { generateTokens, refreshAccessToken, revokeRefreshToken, revokeAllUserTokens } from '../utils/auth.js';
import { authenticateToken, authRateLimit } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// @desc    Initiate Google OAuth
// @route   GET /api/auth/google
// @access  Public
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
      
      // Set secure HTTP-only cookie for refresh token
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      // Redirect to client with access token
      const clientURL = process.env.CLIENT_URL || 'http://localhost:5173';
      const redirectURL = `${clientURL}/auth/callback?token=${tokens.accessToken}&user=${encodeURIComponent(JSON.stringify({
        id: req.user._id,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        avatar: req.user.avatar,
        role: req.user.role
      }))}`;

      res.redirect(redirectURL);
    } catch (error) {
      console.error('OAuth callback error:', error);
      const clientURL = process.env.CLIENT_URL || 'http://localhost:5173';
      res.redirect(`${clientURL}/auth/error?message=Authentication failed`);
    }
  }
);

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
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
  res.json({
    success: false,
    message: 'Google OAuth not yet implemented'
  });
});

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
router.get('/google/callback', (req, res) => {
  // TODO: Implement Google OAuth callback
  res.json({
    success: false,
    message: 'Google OAuth callback not yet implemented'
  });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', (req, res) => {
  // TODO: Implement logout
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

export default router;