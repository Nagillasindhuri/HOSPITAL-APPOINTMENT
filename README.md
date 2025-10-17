# Hospital Appointment System

A full-stack MERN application for managing hospital appointments with patient and doctor portals.

## Features

- **User Authentication**: Login/Register for patients and doctors
- **Patient Portal**: Book appointments, view appointment history
- **Doctor Portal**: View and manage patient appointments
- **Appointment Management**: Create, confirm, cancel appointments
- **Real-time Status Updates**: Track appointment status

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Install dependencies for all parts:**
   ```bash
   npm run install-deps
   ```

2. **Set up environment variables:**
   - Update `backend/.env` with your MongoDB URI and JWT secret

3. **Start the application:**
   ```bash
   npm run dev
   ```

This will start:
- Backend server on http://localhost:5000
- Frontend React app on http://localhost:3000

### Manual Setup

If you prefer to run each part separately:

1. **Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## Usage

1. **Register** as a patient or doctor
2. **Patients** can:
   - Browse available doctors
   - Book appointments
   - View appointment history
3. **Doctors** can:
   - View patient appointments
   - Confirm or cancel appointments
   - Add notes to appointments

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Appointments
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments` - Create appointment
- `PATCH /api/appointments/:id` - Update appointment status

### Doctors
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Create doctor profile

## Project Structure

```
hospital-appointment-system/
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   └── server.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API services
│   │   └── App.js       # Main app component
│   └── public/
└── package.json         # Root package.json
```

## Default Test Users

You can register new users or create test data by registering through the UI.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request"# HOSPITAL-APPOINTMENT-1" 
