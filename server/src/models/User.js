import mongoose from 'mongoose';

// User Schema for Alumni Network
const userSchema = new mongoose.Schema({
  // Authentication fields
  googleId: {
    type: String,
    unique: true,
    sparse: true // Allows null values but ensures uniqueness when present
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  // Basic profile information
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  
  // Profile details
  avatar: {
    type: String, // URL to profile picture
    default: null
  },
  bio: {
    type: String,
    maxLength: 500,
    default: ''
  },
  
  // Academic information
  graduationYear: {
    type: Number,
    min: 1850,
    max: new Date().getFullYear() + 10
  },
  degree: {
    type: String,
    trim: true
  },
  major: {
    type: String,
    trim: true
  },
  
  // Professional information
  currentPosition: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  location: {
    city: String,
    state: String,
    country: String
  },
  
  // Tech stack and skills
  techStack: [{
    name: {
      type: String,
      required: true
    },
    proficiency: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Intermediate'
    },
    yearsExperience: {
      type: Number,
      min: 0,
      max: 50
    }
  }],
  
  // Social links
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String,
    portfolio: String,
    other: [{
      platform: String,
      url: String
    }]
  },
  
  // Contact preferences
  contactPreferences: {
    showEmail: {
      type: Boolean,
      default: false
    },
    allowNetworking: {
      type: Boolean,
      default: true
    },
    mentorshipAvailable: {
      type: Boolean,
      default: false
    },
    seekingMentorship: {
      type: Boolean,
      default: false
    }
  },
  
  // Network membership status
  hasJoinedNetwork: {
    type: Boolean,
    default: false
  },
  networkJoinedAt: {
    type: Date,
    default: null
  },
  
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  
  // Activity tracking
  lastLogin: {
    type: Date,
    default: Date.now
  },
  profileViews: {
    type: Number,
    default: 0
  },
  
  // Privacy settings
  privacy: {
    profileVisibility: {
      type: String,
      enum: ['public', 'alumni-only', 'private'],
      default: 'alumni-only'
    },
    showGraduationYear: {
      type: Boolean,
      default: true
    },
    showLocation: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for profile completion percentage
userSchema.virtual('profileCompleteness').get(function() {
  let completeness = 0;
  const fields = ['bio', 'graduationYear', 'degree', 'major', 'currentPosition', 'company', 'location.city'];
  
  fields.forEach(field => {
    if (this.get(field)) completeness += 1;
  });
  
  if (this.techStack && this.techStack.length > 0) completeness += 1;
  if (this.avatar) completeness += 1;
  
  return Math.round((completeness / (fields.length + 2)) * 100);
});

// Index for search functionality
userSchema.index({ 
  displayName: 'text', 
  firstName: 'text', 
  lastName: 'text', 
  company: 'text',
  'techStack.name': 'text'
});

// Index for graduation year filtering
userSchema.index({ graduationYear: 1 });

// Index for location filtering
userSchema.index({ 'location.city': 1, 'location.state': 1 });

// Pre-save middleware to generate displayName if not provided
userSchema.pre('save', function(next) {
  if (!this.displayName) {
    this.displayName = `${this.firstName} ${this.lastName}`;
  }
  next();
});

const User = mongoose.model('User', userSchema);
export default User;