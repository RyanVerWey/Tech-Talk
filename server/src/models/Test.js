import mongoose from 'mongoose';

// Test schema to verify MongoDB connection works
const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Export the model
const TestModel = mongoose.model('Test', testSchema);

export default TestModel;