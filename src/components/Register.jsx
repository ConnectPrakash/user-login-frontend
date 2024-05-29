import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css'
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/user', { email, password });
      setMessage(response.data.message);
      setEmail('');
      setPassword('');
    } catch (error) {
      setMessage(error.response.data.message || 'Failed to register');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
      <p>If you already have an account, <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
