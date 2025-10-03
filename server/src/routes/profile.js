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
  authenticateToken,
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
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
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

      // Build update object
      const updateData = {};
      
      if (firstName !== undefined) updateData.firstName = firstName;
      if (lastName !== undefined) updateData.lastName = lastName;
      if (graduationYear !== undefined) updateData.graduationYear = graduationYear;
      if (degree !== undefined) updateData.degree = degree;
      if (company !== undefined) updateData.company = company;
      if (city !== undefined) {
        updateData['location.city'] = city;
      }
      
      // Handle social links update
      if (socialLinks) {
        const currentUser = await User.findById(req.user._id);
        const updatedSocialLinks = { ...currentUser.socialLinks.toObject() };
        
        if (socialLinks.portfolio !== undefined) updatedSocialLinks.portfolio = socialLinks.portfolio;
        if (socialLinks.github !== undefined) updatedSocialLinks.github = socialLinks.github;
        if (socialLinks.linkedin !== undefined) updatedSocialLinks.linkedin = socialLinks.linkedin;
        
        updateData.socialLinks = updatedSocialLinks;
      }

      // Update displayName if firstName or lastName changed
      if (firstName !== undefined || lastName !== undefined) {
        const user = await User.findById(req.user._id);
        const newFirstName = firstName !== undefined ? firstName : user.firstName;
        const newLastName = lastName !== undefined ? lastName : user.lastName;
        updateData.displayName = `${newFirstName} ${newLastName}`;
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        updateData,
        { new: true, runValidators: true }
      ).select('-__v');

      res.json({
        success: true,
        data: updatedUser,
        message: 'Profile updated successfully'
      });
    } catch (error) {
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

// @desc    Get user profile by ID
// @route   GET /api/users/:id
// @access  Public
router.get('/users/:id', [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID format')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
        errors: errors.array()
      });
    }

    const user = await User.findById(req.params.id)
      .select('-__v -email -googleId -lastLogin -createdAt -updatedAt -isActive -isVerified -role -privacy')
      .lean();
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Apply privacy settings (if user has privacy settings configured)
    const publicProfile = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      avatar: user.avatar,
      bio: user.bio,
      graduationYear: user.graduationYear,
      degree: user.degree,
      major: user.major,
      socialLinks: user.socialLinks,
      skills: user.skills,
      experience: user.experience
    };

    // Apply contact preferences
    if (user.contactPreferences?.showEmail) {
      publicProfile.email = user.email;
    }

    res.json({
      success: true,
      data: publicProfile,
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