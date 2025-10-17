const express = require('express');
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

const router = express.Router();

// Get appointments for current user
router.get('/', auth, async (req, res) => {
  try {
    let appointments;
    if (req.user.role === 'patient') {
      appointments = await Appointment.find({ patient: req.user._id })
        .populate('doctor')
        .populate({
          path: 'doctor',
          populate: { path: 'user', select: 'name' }
        });
    } else if (req.user.role === 'doctor') {
      // Find doctor profile first
      const Doctor = require('../models/Doctor');
      const doctorProfile = await Doctor.findOne({ user: req.user._id });
      if (doctorProfile) {
        appointments = await Appointment.find({ doctor: doctorProfile._id })
          .populate('patient', 'name email phone');
      }
    }
    res.json(appointments || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create appointment
router.post('/', auth, async (req, res) => {
  try {
    const { doctor, date, time, reason } = req.body;
    
    const appointment = new Appointment({
      patient: req.user._id,
      doctor,
      date,
      time,
      reason
    });
    
    await appointment.save();
    await appointment.populate('doctor');
    await appointment.populate({
      path: 'doctor',
      populate: { path: 'user', select: 'name' }
    });
    
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update appointment status
router.patch('/:id', auth, async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    ).populate('doctor').populate('patient', 'name email');
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;