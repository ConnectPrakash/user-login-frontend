import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Protected = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Not authenticated');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/data', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response.data.message || 'Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Protected Data</h2>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Protected;
