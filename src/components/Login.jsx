import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/authenticate', { email, password });
      localStorage.setItem('token', response.data.token);
      setMessage('Login successful');
    } catch (error) {
      setMessage(error.response.data.message || 'Failed to login');
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
        <Link to='/reset-password' id='forget'>Forget Password</Link>
      </div>
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
      <p>if you don't have an account <Link to='register'>Register</Link></p>
    </div>
  );
};

export default Login;
