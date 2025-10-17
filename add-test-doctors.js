// Run this script to add test doctors to your database
// Usage: node add-test-doctors.js

const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

// Import models
const User = require('./backend/models/User');
const Doctor = require('./backend/models/Doctor');

const testDoctors = [
  {
    name: 'Dr. John Smith',
    email: 'john.smith@hospital.com',
    password: 'password123',
    phone: '+1234567890',
    role: 'doctor',
    specialization: 'Cardiology',
    experience: 10,
    consultationFee: 150,
    availableSlots: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00' },
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00' }
    ]
  },
  {
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hospital.com',
    password: 'password123',
    phone: '+1234567891',
    role: 'doctor',
    specialization: 'Dermatology',
    experience: 8,
    consultationFee: 120,
    availableSlots: [
      { day: 'Monday', startTime: '10:00', endTime: '16:00' },
      { day: 'Thursday', startTime: '10:00', endTime: '16:00' },
      { day: 'Friday', startTime: '10:00', endTime: '16:00' }
    ]
  },
  {
    name: 'Dr. Michael Brown',
    email: 'michael.brown@hospital.com',
    password: 'password123',
    phone: '+1234567892',
    role: 'doctor',
    specialization: 'Orthopedics',
    experience: 15,
    consultationFee: 200,
    availableSlots: [
      { day: 'Tuesday', startTime: '08:00', endTime: '14:00' },
      { day: 'Wednesday', startTime: '08:00', endTime: '14:00' },
      { day: 'Saturday', startTime: '09:00', endTime: '13:00' }
    ]
  },
  {
    name: 'Dr. Pabba Satwika',
    email: 'bhasker _medical@hospital.com',
    password: 'sai',
    phone: '+9874563217',
    role: 'doctor',
    specialization: 'Gynic',
    experience: 15,
    consultationFee: 200,
    availableSlots: [
      { day: 'Tuesday', startTime: '08:00', endTime: '14:00' },
      { day: 'Wednesday', startTime: '08:00', endTime: '14:00' },
      { day: 'Saturday', startTime: '09:00', endTime: '13:00' }
    ]
  }
];

async function addTestDoctors() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const doctorData of testDoctors) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: doctorData.email });
      if (existingUser) {
        console.log(`Doctor ${doctorData.name} already exists, skipping...`);
        continue;
      }

      // Create user
      const user = new User({
        name: doctorData.name,
        email: doctorData.email,
        password: doctorData.password,
        phone: doctorData.phone,
        role: doctorData.role
      });
      await user.save();

      // Create doctor profile
      const doctor = new Doctor({
        user: user._id,
        specialization: doctorData.specialization,
        experience: doctorData.experience,
        consultationFee: doctorData.consultationFee,
        availableSlots: doctorData.availableSlots
      });
      await doctor.save();

      console.log(`✅ Added doctor: ${doctorData.name} - ${doctorData.specialization}`);
    }

    console.log('\n🎉 Test doctors added successfully!');
    console.log('\nYou can now:');
    console.log('1. Go to Book Appointment page');
    console.log('2. Select from available doctors');
    console.log('3. Book your appointment');
    
  } catch (error) {
    console.error('Error adding test doctors:', error);
  } finally {
    mongoose.connection.close();
  }
}

addTestDoctors();