const express = require('express');
const Doctor = require('../models/Doctor');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find({ isActive: true }).populate('user', 'name email');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('user', 'name email');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create doctor profile (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { user, specialization, experience, consultationFee, availableSlots } = req.body;
    
    const doctor = new Doctor({
      user,
      specialization,
      experience,
      consultationFee,
      availableSlots
    });
    
    await doctor.save();
    await doctor.populate('user', 'name email');
    
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;