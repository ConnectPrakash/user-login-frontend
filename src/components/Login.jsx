import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://last-change-2.onrender.com/api/authenticate', formData);
      localStorage.setItem('token', response.data.token);
      setErrorMessage('');
      navigate('/dashboard');
      window.alert('Logged in successfully!');
    } catch (error) {
      setErrorMessage(error.response?.data.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="login-input" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="login-input" />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="login-button" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
      </form>
      <Link to="/reset-password" className="forgot-password-link">Forgot Password?</Link>
    </div>
  );
}

export default Login;
