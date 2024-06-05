import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://last-change-2.onrender.com/api/user', { email: formData.email, password: formData.password });
      setIsSuccess(true);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {isSuccess ? (
        <p>Signup successful! You can now <Link to="/login">login</Link>.</p>
      ) : (
        <form className="signup-form" onSubmit={handleSubmit}>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="signup-input" />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="signup-input" />
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required className="signup-input" />
          {formData.password !== formData.confirmPassword && <p className="error-message">Passwords do not match</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? 'Signing up...' : 'Signup'}
          </button>
        </form>
      )}
      <p>Already have an account? <Link to="/login">Login here</Link>.</p>
    </div>
  );
}

export default Signup;
