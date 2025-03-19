// src/HospitalDashboard.js
import React, { useEffect, useState } from 'react';

function HospitalDashboard({ token }) {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('');

  // Use environment variable for the API base URL
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Fetch hospital data after login using the dynamic API URL
    fetch(`${API_BASE_URL}/api/hospital/data`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [API_BASE_URL]);

  const handleBooking = (field, decrementBy = 1) => {
    const newValue = data[field] - decrementBy;
    // Update via API call using the environment variable URL
    fetch(`${API_BASE_URL}/api/hospital/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: newValue })
    })
      .then(res => res.json())
      .then(updated => {
        setData(updated.updatedData);
        setMessage(`Updated ${field} successfully.`);
      })
      .catch(() => setMessage('Error updating data'));
  };

  if (!data) return <div>Loading hospital data...</div>;

  return (
    <div className="dashboard-container">
      <h2>{data.hospitalName} Dashboard</h2>
      <div className="data-section">
        <p>Available Beds: {data.availableBeds}</p>
        <p>Blood Units: {data.bloodUnits}</p>
        <p>Ambulance Available: {data.ambulanceAvailable ? 'Yes' : 'No'}</p>
        <p>Doctors Available: {data.doctorsAvailable}</p>
      </div>
      <div className="booking-actions">
        <button onClick={() => handleBooking('availableBeds')}>Book a Bed</button>
        <button onClick={() => handleBooking('bloodUnits')}>Book Blood</button>
        {/* Add additional buttons for ambulance or doctor bookings as needed */}
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default HospitalDashboard;
