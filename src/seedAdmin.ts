import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User, { UserRole } from './models/User.js';

const seedUsers = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${process.env.DB_NAME || 'TEST_CRM_DB'}`;
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    // Standard password for all test users
    const defaultPassword = 'password123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(defaultPassword, salt);

    const usersToSeed = [
      { name: 'Receiving Officer', email: 'receiving@gadal.com', role: UserRole.RECEIVING },
      { name: 'Workshop Foreman', email: 'foreman@gadal.com', role: UserRole.FOREMAN },
      { name: 'Tech: Diagnostic Lead', email: 'tech1@gadal.com', role: UserRole.TECHNICIAN },
      { name: 'Tech: Mechanical Specialist', email: 'tech2@gadal.com', role: UserRole.TECHNICIAN },
      { name: 'Tech: Junior Assistant', email: 'tech3@gadal.com', role: UserRole.TECHNICIAN },
      { name: 'Field Technician', email: 'tech@gadal.com', role: UserRole.TECHNICIAN },
      { name: 'QA Inspector', email: 'inspector@gadal.com', role: UserRole.INSPECTOR },
      { name: 'Inventory Manager', email: 'stores@gadal.com', role: UserRole.STORES },
      { name: 'Finance Lead', email: 'finance@gadal.com', role: UserRole.FINANCE },
    ];

    console.log('--- Starting User Seeding ---');

    for (const u of usersToSeed) {
      const existingUser = await User.findOne({ email: u.email });
      if (existingUser) {
        console.log(`[SKIP] User ${u.email} already exists.`);
        continue;
      }

      const newUser = new User({
        ...u,
        password: hashedPassword,
        isActive: true
      });

      await newUser.save();
      console.log(`[CREATED] ${u.name} (${u.role}) - ${u.email}`);
    }

    console.log('--- Seeding Completed ---');
    console.log('Use "password123" for all newly seeded accounts.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
