import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  // Basic project information
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  description: {
    type: String,
    required: true,
    maxLength: 2000
  },
  shortDescription: {
    type: String,
    required: true,
    maxLength: 200
  },
  
  // Project owner
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Project details
  category: {
    type: String,
    required: true,
    enum: [
      'Web Development',
      'Mobile App',
      'Desktop Application',
      'Game Development',
      'AI/Machine Learning',
      'Data Science',
      'DevOps/Infrastructure',
      'API/Backend',
      'UI/UX Design',
      'Open Source',
      'Research',
      'Other'
    ]
  },
  
  // Technical details
  techStack: [{
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Design', 'Other'],
      default: 'Other'
    }
  }],
  
  // Project links
  links: {
    demo: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Demo link must be a valid URL'
      }
    },
    github: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/(www\.)?github\.com\/.+/.test(v);
        },
        message: 'GitHub link must be a valid GitHub URL'
      }
    },
    website: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Website link must be a valid URL'
      }
    }
  },
  
  // Media
  images: [{
    url: {
      type: String,
      required: true
    },
    caption: String,
    isMain: {
      type: Boolean,
      default: false
    }
  }],
  
  // Project status
  status: {
    type: String,
    enum: ['In Progress', 'Completed', 'Paused', 'Archived'],
    default: 'In Progress'
  },
  
  // Collaboration
  collaborators: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      default: 'Contributor'
    }
  }],
  
  // Engagement metrics
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Comments
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxLength: 1000
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Visibility and moderation
  isPublic: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: true
  },
  
  // Project timeline
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  
  // Tags for better search
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for like count
projectSchema.virtual('likeCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

// Virtual for comment count
projectSchema.virtual('commentCount').get(function() {
  return this.comments ? this.comments.length : 0;
});

// Virtual for main image
projectSchema.virtual('mainImage').get(function() {
  if (!this.images || this.images.length === 0) return null;
  const main = this.images.find(img => img.isMain);
  return main || this.images[0];
});

// Index for search functionality
projectSchema.index({
  title: 'text',
  description: 'text',
  shortDescription: 'text',
  'techStack.name': 'text',
  tags: 'text'
});

// Index for filtering
projectSchema.index({ category: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ isFeatured: 1 });
projectSchema.index({ createdAt: -1 });
projectSchema.index({ 'likes.user': 1 });

// Pre-save middleware to ensure only one main image
projectSchema.pre('save', function(next) {
  if (this.images && this.images.length > 0) {
    const mainImages = this.images.filter(img => img.isMain);
    if (mainImages.length > 1) {
      // If multiple main images, make only the first one main
      this.images.forEach((img, index) => {
        img.isMain = index === 0;
      });
    } else if (mainImages.length === 0) {
      // If no main image, make the first one main
      this.images[0].isMain = true;
    }
  }
  next();
});

const Project = mongoose.model('Project', projectSchema);
export default Project;