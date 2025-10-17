# Quick Setup Guide

## Step 1: Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
cd ..
```

## Step 2: Setup Database
- Install MongoDB locally OR use MongoDB Atlas (cloud)
- Update `backend/.env` with your MongoDB connection string

## Step 3: Start the Application
```bash
# Option 1: Start both frontend and backend together
npm run dev

# Option 2: Start separately
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm start
```

## Step 4: Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## How to Use the System

### For Patients:
1. **Register** with role "Patient"
2. **Login** with your credentials
3. **Book Appointment**:
   - Click "Book Appointment" in navbar
   - Select doctor, date, time, and reason
   - Submit the form
4. **Cancel Appointment**:
   - Go to Dashboard
   - Find your appointment
   - Click "Cancel Appointment" (available for pending/confirmed appointments)

### For Doctors:
1. **Register** with role "Doctor"
2. **Login** with your credentials
3. **Manage Appointments**:
   - View all patient appointments in Dashboard
   - Confirm pending appointments
   - Cancel appointments if needed
   - Add notes to appointments

### Sample Doctor Data
To test the system, you'll need to create doctor profiles. Here's how:

1. Register a user with role "Doctor"
2. Use a tool like Postman or create an admin interface to add doctor details:

```json
POST /api/doctors
{
  "user": "doctor_user_id",
  "specialization": "Cardiology",
  "experience": 5,
  "consultationFee": 100,
  "availableSlots": [
    {"day": "Monday", "startTime": "09:00", "endTime": "17:00"},
    {"day": "Tuesday", "startTime": "09:00", "endTime": "17:00"}
  ]
}
```

## Appointment Status Flow:
1. **Pending** - Just booked by patient
2. **Confirmed** - Approved by doctor
3. **Cancelled** - Cancelled by patient or doctor
4. **Completed** - Appointment finished (can be set by doctor)