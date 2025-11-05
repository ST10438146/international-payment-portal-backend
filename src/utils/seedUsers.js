import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const seedUsers = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
    
    console.log('🗑️  Clearing existing users...');
    await User.deleteMany({});
    
    console.log('👥 Creating test users...');
    const users = [
      {
        fullName: 'John Customer',
        username: 'johncust',
        idNumber: '8901015800089',
        accountNumber: '1234567890',
        password: 'Customer@123',
        role: 'customer',
        isActive: true
      },
      {
        fullName: 'Jane Employee',
        username: 'janeemp',
        idNumber: '9001015800089',
        accountNumber: '9876543210',
        password: 'Employee@123',
        role: 'employee',
        isActive: true
      },
      {
        fullName: 'Sarah Customer',
        username: 'sarahcust',
        idNumber: '9105126700086',
        accountNumber: '5555666677',
        password: 'SecurePass@456',
        role: 'customer',
        isActive: true
      },
      {
        fullName: 'Mike Supervisor',
        username: 'mikesup',
        idNumber: '8807085400088',
        accountNumber: '8888999900',
        password: 'Supervisor@789',
        role: 'employee',
        isActive: true
      }
    ];
    
    await User.create(users);
    
    console.log('');
    console.log('✅ Users seeded successfully!');
    console.log('');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📋 TEST CREDENTIALS');
    console.log('═══════════════════════════════════════════════════════');
    console.log('');
    console.log('👤 CUSTOMER ACCOUNTS:');
    console.log('─────────────────────────────────────────────────────');
    console.log('Account 1:');
    console.log('  Username: johncust');
    console.log('  Account Number: 1234567890');
    console.log('  Password: Customer@123');
    console.log('');
    console.log('Account 2:');
    console.log('  Username: sarahcust');
    console.log('  Account Number: 5555666677');
    console.log('  Password: SecurePass@456');
    console.log('');
    console.log('👨‍💼 EMPLOYEE ACCOUNTS:');
    console.log('─────────────────────────────────────────────────────');
    console.log('Account 1:');
    console.log('  Username: janeemp');
    console.log('  Account Number: 9876543210');
    console.log('  Password: Employee@123');
    console.log('');
    console.log('Account 2:');
    console.log('  Username: mikesup');
    console.log('  Account Number: 8888999900');
    console.log('  Password: Supervisor@789');
    console.log('');
    console.log('═══════════════════════════════════════════════════════');
    console.log('');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedUsers();