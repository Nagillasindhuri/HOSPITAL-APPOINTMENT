import axios from 'axios';

const API_URL = '/api';

const appointmentService = {
  getAppointments: async () => {
    const response = await axios.get(`${API_URL}/appointments`);
    return response.data;
  },

  createAppointment: async (appointmentData) => {
    const response = await axios.post(`${API_URL}/appointments`, appointmentData);
    return response.data;
  },

  updateAppointmentStatus: async (id, status, notes) => {
    const response = await axios.patch(`${API_URL}/appointments/${id}`, { status, notes });
    return response.data;
  },

  getDoctors: async () => {
    const response = await axios.get(`${API_URL}/doctors`);
    return response.data;
  }
};

export { appointmentService };