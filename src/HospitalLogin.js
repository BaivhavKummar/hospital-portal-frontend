// src/HospitalLogin.js
import React, { useState } from 'react';

function HospitalLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/hospital/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        if(data.success) {
          onLoginSuccess(data); // Pass token and hospitalId to parent
        } else {
          setError('Invalid login credentials');
        }
      })
      .catch(() => setError('An error occurred'));
  };

  return (
    <div className="login-container">
      <h2>Hospital Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default HospitalLogin;
