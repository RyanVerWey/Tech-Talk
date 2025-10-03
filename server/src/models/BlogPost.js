import mongoose from 'mongoose';
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 150
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    minLength: 100
  },
  excerpt: {
    type: String,
    required: true,
    maxLength: 300
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Career Advice',
      'Technical Tutorial',
      'Industry Insights',
      'Personal Journey',
      'Project Showcase',
      'Interview Experience',
      'Learning Resources',
      'Networking Tips',
      'Startup Experience',
      'Technology Trends',
      'Full Sail Memories',
      'Other'
    ]
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  featuredImage: {
    url: String,
    alt: String,
    caption: String
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  },
  readTime: {
    type: Number, 
    default: 0
  },
  reactions: {
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
    helpful: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],
    insightful: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxLength: 2000
    },
    isApproved: {
      type: Boolean,
      default: true
    },
    replies: [{
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
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  metaDescription: {
    type: String,
    maxLength: 160
  },
  metaKeywords: [String],
  isApproved: {
    type: Boolean,
    default: true
  },
  moderationNotes: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});
blogPostSchema.virtual('likeCount').get(function() {
  return this.reactions?.likes?.length || 0;
});
blogPostSchema.virtual('helpfulCount').get(function() {
  return this.reactions?.helpful?.length || 0;
});
blogPostSchema.virtual('insightfulCount').get(function() {
  return this.reactions?.insightful?.length || 0;
});
blogPostSchema.virtual('commentCount').get(function() {
  return this.comments?.length || 0;
});
blogPostSchema.virtual('totalReactions').get(function() {
  return this.likeCount + this.helpfulCount + this.insightfulCount;
});
blogPostSchema.virtual('url').get(function() {
  return `/blog/${this.slug}`;
});
blogPostSchema.index({
  title: 'text',
  content: 'text',
  excerpt: 'text',
  tags: 'text'
});
blogPostSchema.index({ category: 1 });
blogPostSchema.index({ status: 1 });
blogPostSchema.index({ isFeatured: 1 });
blogPostSchema.index({ publishedAt: -1 });
blogPostSchema.index({ views: -1 });
blogPostSchema.index({ 'reactions.likes.user': 1 });
blogPostSchema.index({ slug: 1 }, { 
  unique: true,
  partialFilterExpression: { status: 'published' }
});
blogPostSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }
  if (this.content) {
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / 200);
  }
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;
