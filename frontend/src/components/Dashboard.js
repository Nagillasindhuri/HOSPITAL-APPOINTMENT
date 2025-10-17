import React, { useState, useEffect } from 'react';
import { appointmentService } from '../services/appointmentService';

const Dashboard = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await appointmentService.getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      await appointmentService.updateAppointmentStatus(appointmentId, newStatus);
      loadAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const containerStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    margin: '1rem 0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0'
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    margin: '0 0.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f39c12',
      confirmed: '#27ae60',
      cancelled: '#e74c3c',
      completed: '#3498db'
    };
    return colors[status] || '#95a5a6';
  };

  if (loading) {
    return <div style={containerStyle}>Loading appointments...</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#2c3e50', marginBottom: '2rem' }}>
        {user.role === 'patient' ? 'My Appointments' : 'Patient Appointments'}
      </h1>

      {appointments.length === 0 ? (
        <div style={cardStyle}>
          <p>No appointments found.</p>
        </div>
      ) : (
        appointments.map(appointment => (
          <div key={appointment._id} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>
                  {user.role === 'patient'
                    ? `Dr. ${appointment.doctor?.user?.name || 'Unknown'}`
                    : appointment.patient?.name || 'Unknown Patient'
                  }
                </h3>
                <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Reason:</strong> {appointment.reason}</p>
                {user.role === 'patient' && appointment.doctor && (
                  <p><strong>Specialization:</strong> {appointment.doctor.specialization}</p>
                )}
                {user.role === 'doctor' && appointment.patient && (
                  <p><strong>Patient Contact:</strong> {appointment.patient.email}</p>
                )}
                {appointment.notes && (
                  <p><strong>Notes:</strong> {appointment.notes}</p>
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    backgroundColor: getStatusColor(appointment.status),
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    marginBottom: '1rem'
                  }}
                >
                  {appointment.status}
                </div>
                {user.role === 'doctor' && appointment.status === 'pending' && (
                  <div>
                    <button
                      onClick={() => handleStatusUpdate(appointment._id, 'confirmed')}
                      style={{
                        ...buttonStyle,
                        backgroundColor: '#27ae60',
                        color: 'white'
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(appointment._id, 'cancelled')}
                      style={{
                        ...buttonStyle,
                        backgroundColor: '#e74c3c',
                        color: 'white'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
                {user.role === 'patient' && (appointment.status === 'pending' || appointment.status === 'confirmed') && (
                  <div>
                    <button
                      onClick={() => handleStatusUpdate(appointment._id, 'cancelled')}
                      style={{
                        ...buttonStyle,
                        backgroundColor: '#e74c3c',
                        color: 'white'
                      }}
                    >
                      Cancel Appointment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;