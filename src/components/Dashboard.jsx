import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get('https://last-change-2.onrender.com/api/data', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data.userData);
      } catch (error) {
        setErrorMessage(error.response?.data.message || 'Failed to fetch user data.');
      }
    };

    fetchUserData();
  }, [navigate]);

  if (errorMessage) {
    return <p className="error-message">{errorMessage}</p>;
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {userData ? (
        <p>Welcome, {userData.email}!</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
