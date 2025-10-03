import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const testSchema = new mongoose.Schema({
  testType: String,
  timestamp: { type: Date, default: Date.now },
  status: String
});

const TestConnection = mongoose.model('TestConnection', testSchema);

async function testMongoDBConnection() {
  try {
    console.log('🔄 Testing MongoDB Atlas connection...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Successfully connected to MongoDB Atlas');
    
    // Test write operation
    const testDoc = new TestConnection({
      testType: 'Atlas Connection Test',
      status: 'SUCCESS'
    });
    
    const savedDoc = await testDoc.save();
    console.log('✅ Write operation successful:', savedDoc._id);
    
    // Test read operation
    const testDocs = await TestConnection.find().limit(1);
    console.log('✅ Read operation successful, found', testDocs.length, 'documents');
    
    // Test database info
    const dbStats = await mongoose.connection.db.stats();
    console.log('📊 Database stats:');
    console.log(`   - Database: ${mongoose.connection.name}`);
    console.log(`   - Collections: ${dbStats.collections}`);
    console.log(`   - Data size: ${(dbStats.dataSize / 1024).toFixed(2)} KB`);
    
    console.log('\nAll database operations completed successfully!');
    console.log('MILESTONE COMPLETED: MongoDB Atlas integration is working perfectly!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the test
testMongoDBConnection();