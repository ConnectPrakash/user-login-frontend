import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/reset-password', { email });
      setMessage(response.data.message);
      setEmail('');
      
    } catch (error) {
      setMessage(error.response.data.message || 'Failed to reset password');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleReset}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
