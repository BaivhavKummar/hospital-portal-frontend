// src/App.js
import React, { useState } from 'react';
import HospitalLogin from './HospitalLogin';
import HospitalDashboard from './HospitalDashboard';
import './App.css';
import background from './see.jpg'; // Import the local background image

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const handleLoginSuccess = (data) => {
    setToken(data.token);
    setLoggedIn(true);
  };

  // Define inline style for the App container to add the background image
  const appStyle = {
    background: `url(${background}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    minHeight: '100vh'
  };

  return (
    <div className="App" style={appStyle}>
      <header className="App-header">
        <h1>Hospital Portal</h1>
      </header>
      <main>
        {loggedIn ? (
          <HospitalDashboard token={token} />
        ) : (
          <HospitalLogin onLoginSuccess={handleLoginSuccess} />
        )}
      </main>
    </div>
  );
}

export default App;
