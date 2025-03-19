// src/HospitalDashboard.js
import React, { useEffect, useState } from 'react';

function HospitalDashboard({ token }) {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch hospital data after login
    fetch('http://localhost:3000/api/hospital/data')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const handleBooking = (field, decrementBy = 1) => {
    // For example, booking a bed decreases the availableBeds count.
    // This function will update the data locally and via the API.
    const newValue = data[field] - decrementBy;
    // Update via API call:
    fetch('http://localhost:3000/api/hospital/data', {
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
