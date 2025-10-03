import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Validation middleware for URLs
const urlValidation = (field) => {
  return body(field)
    .optional({ nullable: true, checkFalsy: true })
    .isURL({ 
      protocols: ['http', 'https'],
      require_protocol: true 
    })
    .withMessage(`${field} must be a valid URL with http or https protocol`);
};

// @desc    Get all network members
// @route   GET /api/profiles/all
// @access  Private
router.get('/all', authenticateToken, async (req, res) => {
  try {
    const networkMembers = await User.find({ 
      hasJoinedNetwork: true,
      isActive: true 
    }).select('-__v -refreshTokens -googleId');



    res.json({
      success: true,
      data: networkMembers,
      count: networkMembers.length,
      message: 'Network members retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving network members',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Join the alumni network
// @route   POST /api/profiles/join
// @access  Private
router.post('/join', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.hasJoinedNetwork) {
      return res.status(400).json({
        success: false,
        message: 'You have already joined the network'
      });
    }

    user.hasJoinedNetwork = true;
    user.networkJoinedAt = new Date();
    await user.save();

    res.json({
      success: true,
      data: user,
      message: 'Successfully joined the alumni network'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error joining network',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get current user's profile
// @route   GET /api/profile
// @access  Private
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    res.json({
      success: true,
      data: user,
      message: 'Profile retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Update current user's profile
// @route   PUT /api/profile
// @access  Private
router.put('/', 
  [
    urlValidation('socialLinks.portfolio'),
    urlValidation('socialLinks.github'),
    urlValidation('socialLinks.linkedin'),
    body('firstName')
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage('First name must be between 1 and 50 characters'),
    body('lastName')
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage('Last name must be between 1 and 50 characters'),
    body('graduationYear')
      .optional()
      .isInt({ min: 1850, max: new Date().getFullYear() + 10 })
      .withMessage('Graduation year must be a valid year'),
    body('degree')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('Degree must be 100 characters or less'),
    body('company')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('Company must be 100 characters or less'),
    body('city')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('City must be 100 characters or less')
  ],
  authenticateToken,
  async (req, res) => {
    try {
      console.log('Profile update request received:', {
        userId: req.user?._id || 'undefined',
        body: req.body,
        timestamp: new Date().toISOString(),
        hasUser: !!req.user,
        authHeader: req.headers.authorization ? 'present' : 'missing'
      });

      // Check if user is authenticated
      if (!req.user) {
        console.error('Authentication failed: req.user is undefined');
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const {
        firstName,
        lastName,
        graduationYear,
        degree,
        company,
        city,
        socialLinks
      } = req.body;

      // Get current user data once
      const currentUser = await User.findById(req.user._id);
      if (!currentUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Build update object
      const updateData = {};
      
      if (firstName !== undefined) updateData.firstName = firstName;
      if (lastName !== undefined) updateData.lastName = lastName;
      if (graduationYear !== undefined) updateData.graduationYear = graduationYear;
      if (degree !== undefined) updateData.degree = degree;
      if (company !== undefined) updateData.company = company;
      
      // Handle location update safely
      if (city !== undefined) {
        const currentLocation = currentUser.location || {};
        updateData.location = {
          ...currentLocation,
          city: city
        };
        console.log('Location update:', { currentLocation, newCity: city, updateData: updateData.location });
      }
      
      // Handle social links update
      if (socialLinks) {
        const currentSocialLinks = currentUser.socialLinks || {};
        const updatedSocialLinks = { ...currentSocialLinks };
        
        if (socialLinks.portfolio !== undefined) updatedSocialLinks.portfolio = socialLinks.portfolio;
        if (socialLinks.github !== undefined) updatedSocialLinks.github = socialLinks.github;
        if (socialLinks.linkedin !== undefined) updatedSocialLinks.linkedin = socialLinks.linkedin;
        
        updateData.socialLinks = updatedSocialLinks;
      }

      // Update displayName if firstName or lastName changed
      if (firstName !== undefined || lastName !== undefined) {
        const newFirstName = firstName !== undefined ? firstName : currentUser.firstName;
        const newLastName = lastName !== undefined ? lastName : currentUser.lastName;
        updateData.displayName = `${newFirstName} ${newLastName}`.trim();
      }

      // Ensure we're updating the correct user and not creating duplicates
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id }, // Ensure we match by exact user ID
        { $set: updateData },
        { 
          new: true, 
          runValidators: true,
          upsert: false // Never create new documents, only update existing ones
        }
      ).select('-__v -refreshTokens -googleId');

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: updatedUser,
        message: 'Profile updated successfully'
      });
    } catch (error) {
      // Enhanced error logging for debugging
      console.error('Profile update error:', {
        message: error.message,
        stack: error.stack,
        requestBody: req.body,
        userId: req.user?._id || 'undefined'
      });

      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }));
        
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validationErrors
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error updating profile',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// @desc    Get public profile by user ID
// @route   GET /api/users/:id
// @access  Private
router.get('/users/:id', [
  param('id').isMongoId().withMessage('Invalid user ID')
], authenticateToken, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format',
        errors: errors.array()
      });
    }

    const user = await User.findById(req.params.id)
      .select('-__v -refreshTokens -googleId');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

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

export default router;