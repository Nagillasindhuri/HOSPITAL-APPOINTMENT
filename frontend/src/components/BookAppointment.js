import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentService } from '../services/appointmentService';

const BookAppointment = ({ user }) => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const data = await appointmentService.getDoctors();
      setDoctors(data);
    } catch (error) {
      setError('Failed to load doctors');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await appointmentService.createAppointment(formData);
      setSuccess('Appointment booked successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto'
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    margin: '0.5rem 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem'
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#2c3e50' }}>
          Book Appointment
        </h2>

        {error && (
          <div style={{ color: '#e74c3c', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ color: '#27ae60', marginBottom: '1rem', textAlign: 'center' }}>
            {success}
          </div>
        )}

        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Select Doctor:
        </label>
        <select
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">Choose a doctor...</option>
          {doctors.map(doctor => (
            <option key={doctor._id} value={doctor._id}>
              Dr. {doctor.user.name} - {doctor.specialization} (${doctor.consultationFee})
            </option>
          ))}
        </select>

        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Date:
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          required
          style={inputStyle}
        />

        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Time:
        </label>
        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">Select time...</option>
          {timeSlots.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>

        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Reason for Visit:
        </label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Describe your symptoms or reason for the appointment..."
          required
          rows="4"
          style={inputStyle}
        />

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;