import React, { useState } from 'react';
import axios from 'axios';
import './RequestPasswordReset.css';

function RequestPasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://last-change-2.onrender.com/api/reset-password', { email });
      setMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data.message || 'Reset password request failed. Please try again.');
    }
  };

  return (
    <div className="request-password-reset-container">
      <h2>Request Password Reset</h2>
      <form className="request-password-reset-form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="request-password-reset-input"
        />
        <button type="submit" className="request-password-reset-button">Request Password Reset</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default RequestPasswordReset;
