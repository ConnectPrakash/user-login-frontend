import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`https://last-change-2.onrender.com/reset/${token}`, { password });
      setMessage(response.data.message);
      setErrorMessage('');
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response?.data.message || 'Password reset failed. Please try again.');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" required className="reset-password-input" />
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" required className="reset-password-input" />
        <button type="submit" className="reset-password-button">Reset Password</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default ResetPassword;
