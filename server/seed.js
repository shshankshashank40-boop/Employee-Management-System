const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('./src/models/Employee');

dotenv.config();

const sampleEmployees = [
  {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    department: 'Engineering',
    designation: 'Senior Full Stack Developer',
  },
  {
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    department: 'Human Resources',
    designation: 'HR Specialist',
  },
  {
    name: 'Rohan Mehta',
    email: 'rohan.mehta@example.com',
    department: 'Engineering',
    designation: 'Backend Architect',
  },
  {
    name: 'Sneha Rao',
    email: 'sneha.rao@example.com',
    department: 'Design',
    designation: 'Lead UI/UX Designer',
  },
  {
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    department: 'Finance',
    designation: 'Financial Analyst',
  },
  {
    name: 'Ananya Gupta',
    email: 'ananya.gupta@example.com',
    department: 'Marketing',
    designation: 'Growth Marketing Manager',
  },
];

const seedDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/employee_management';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing sample data if needed or insert if empty
    const count = await Employee.countDocuments();
    if (count < 3) {
      for (const emp of sampleEmployees) {
        await Employee.findOneAndUpdate({ email: emp.email }, emp, {
          upsert: true,
          new: true,
        });
      }
      console.log('✅ Sample employees seeded successfully.');
    } else {
      console.log(`Database already has ${count} employees. Keeping existing records.`);
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();
